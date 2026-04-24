import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

// Initialize AI client lazily to avoid top-level crashes if env vars are missing during build/init
let aiClient = null;
const getAIClient = () => {
  if (aiClient) return aiClient;
  const key = process.env.REACT_APP_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!key) return null;
  aiClient = new GoogleGenAI({ apiKey: key });
  return aiClient;
};

const SYSTEM_PROMPT = `You are the NOIR ROMA concierge. 
You provide a sophisticated, Italian editorial experience for a luxury men's footwear brand. 
Assistance focus: fit, leather craftsmanship (box-calf, suede, Goodyear welt), and the brand's heritage. 
Tone: Elegant, professional, helpful, minimal. 
Brand details: Focus on oxfords, loafers, derbys, and monk-straps.
Be concise but welcoming. Use Italian greetings like 'Buongiorno' or 'Benvenuto' occasionally.`;

const STORAGE_KEY = "noir-roma-chat-session";

const initialMessages = [
  {
    role: "assistant",
    content:
      "Buongiorno. I am the NOIR ROMA concierge. I can assist with fit, leather, or the story behind each pair. How may I be of service?",
  },
];

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId] = useState(() => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const fresh =
      "nr-" + Math.random().toString(36).slice(2) + "-" + Date.now().toString(36);
    localStorage.setItem(STORAGE_KEY, fresh);
    return fresh;
  });
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const send = async () => {
    const text = draft.trim();
    if (!text || sending) return;
    setDraft("");
    
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setSending(true);
    
    try {
      const ai = getAIClient();
      if (!ai) {
        throw new Error("Missing API Key. Please set REACT_APP_GEMINI_API_KEY in your .env file.");
      }

      // Map history to Google GenAI format
      // Note: role "assistant" maps to "model"
      const history = newMessages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      // Add an empty assistant message to stream into
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: history,
        config: {
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
        },
      });
      
      let fullReply = "";
      for await (const chunk of responseStream) {
        fullReply += chunk.text;
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = { role: "assistant", content: fullReply };
          return updated;
        });
      }
    } catch (e) {
      console.error("Detailed AI Error:", e);
      const isMissingKey = e.message?.includes("API Key");
      const is503 = e.message?.includes("503");
      
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: is503
            ? "L'atelier è temporaneamente occupato. Gemini 3 is currently experiencing high demand. Please try again in a moment."
            : isMissingKey 
              ? "Configurazione incompleta. The authentication key is missing." 
              : "I am having trouble connecting with the atelier. Please try again later.",
          error: true,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        data-testid="chat-widget-btn"
        onClick={() => setOpen(true)}
        aria-label="Open concierge chat"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex items-center gap-3 bg-[#F2F0E9] text-[#070707] px-5 py-4 shadow-[0_20px_60px_-20px_rgba(166,144,118,0.5)] hover:bg-[#A69076] hover:text-[#070707] transition-all duration-500 group"
      >
        <MessageSquare strokeWidth={1.5} className="w-5 h-5" />
        <span className="hidden md:inline text-[10px] tracking-[0.3em] uppercase font-medium">
          Concierge
        </span>
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          data-testid="chat-panel"
          side="right"
          className="w-full sm:max-w-md bg-[#0b0b0b] border-l border-[rgba(242,240,233,0.1)] text-[#F2F0E9] p-0 flex flex-col [&>button]:hidden"
        >
          {/* Header */}
          <SheetHeader className="p-6 border-b border-[rgba(242,240,233,0.08)] text-left space-y-3">
            <div className="flex items-center justify-between">
              <p className="overline">Concierge · Roma</p>
              <button
                data-testid="chat-close-btn"
                onClick={() => setOpen(false)}
                className="text-[#F2F0E9]/70 hover:text-[#F2F0E9] transition-colors"
                aria-label="Close chat"
              >
                <X strokeWidth={1.5} className="w-5 h-5" />
              </button>
            </div>
            <SheetTitle className="font-serif text-3xl font-light tracking-tight text-[#F2F0E9]">
              A personal stylist
            </SheetTitle>
            <SheetDescription className="text-xs text-[#8A8A85] font-light leading-relaxed tracking-wide">
              Ask about fit, leather, construction, or a particular occasion.
              Replies typically within seconds.
            </SheetDescription>
          </SheetHeader>

          {/* Messages */}
          <div
            data-testid="chat-messages"
            className="flex-1 overflow-y-auto px-6 py-6 space-y-5"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                data-testid={`chat-message-${m.role}-${i}`}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm font-light leading-relaxed tracking-wide whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-[#F2F0E9] text-[#070707]"
                      : m.error
                      ? "bg-[#1a1111] text-[#F2F0E9] border border-[rgba(200,100,100,0.2)]"
                      : "bg-[#121212] text-[#F2F0E9] border border-[rgba(242,240,233,0.08)]"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div
                data-testid="chat-typing"
                className="flex justify-start"
              >
                <div className="bg-[#121212] border border-[rgba(242,240,233,0.08)] px-4 py-3 text-sm">
                  <span className="inline-flex gap-1">
                    <Dot delay="0s" />
                    <Dot delay="0.15s" />
                    <Dot delay="0.3s" />
                  </span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="px-6 py-5 border-t border-[rgba(242,240,233,0.08)]">
            <div className="flex items-end gap-3 border-b border-[rgba(242,240,233,0.2)] focus-within:border-[#A69076] transition-colors">
              <textarea
                ref={inputRef}
                data-testid="chat-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Write a message…"
                rows={1}
                className="flex-1 bg-transparent py-3 text-sm font-light text-[#F2F0E9] placeholder:text-[#8A8A85]/60 outline-none tracking-wide resize-none max-h-32"
              />
              <button
                data-testid="chat-send-btn"
                onClick={send}
                disabled={!draft.trim() || sending}
                className="pb-3 pl-2 text-[#F2F0E9] hover:text-[#A69076] disabled:opacity-30 transition-colors"
                aria-label="Send message"
              >
                <Send strokeWidth={1.5} className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-3 text-[10px] tracking-[0.2em] uppercase text-[#8A8A85]">
              Enter to send · Shift + Enter for a new line
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function Dot({ delay }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full bg-[#A69076] animate-bounce"
      style={{ animationDelay: delay, animationDuration: "1.2s" }}
    />
  );
}
