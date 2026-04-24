import React, { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const SizeGuideContext = createContext({ open: () => {} });

export const useSizeGuide = () => useContext(SizeGuideContext);

const sizes = [
  { eu: "39", uk: "5.5", us: "6.5", cm: "24.7" },
  { eu: "40", uk: "6.5", us: "7.5", cm: "25.4" },
  { eu: "41", uk: "7", us: "8", cm: "26.0" },
  { eu: "42", uk: "8", us: "9", cm: "26.7" },
  { eu: "43", uk: "9", us: "10", cm: "27.3" },
  { eu: "44", uk: "10", us: "11", cm: "28.0" },
  { eu: "45", uk: "11", us: "12", cm: "28.6" },
  { eu: "46", uk: "12", us: "13", cm: "29.3" },
];

export default function SizeGuideProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return (
    <SizeGuideContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          data-testid="size-guide-dialog"
          className="max-w-3xl bg-[#121212] border border-[rgba(242,240,233,0.1)] rounded-none text-[#F2F0E9] p-0 [&>button]:text-[#F2F0E9] [&>button]:opacity-60 [&>button]:hover:opacity-100"
        >
          <div className="p-8 md:p-12">
            <DialogHeader className="text-left space-y-4 mb-10">
              <p className="overline">Atelier Reference</p>
              <DialogTitle className="font-serif text-4xl md:text-5xl font-light tracking-tight text-[#F2F0E9]">
                Size Guide
              </DialogTitle>
              <DialogDescription className="text-[#8A8A85] text-sm font-light leading-relaxed max-w-lg">
                NOIR ROMA lasts run a half-size large. For a close, considered fit,
                we advise selecting one-half size below your usual measurement. All
                figures reflect internal length of the leather insole.
              </DialogDescription>
            </DialogHeader>

            <div className="border-t border-[rgba(242,240,233,0.1)]">
              <div className="grid grid-cols-4 py-4 border-b border-[rgba(242,240,233,0.1)] overline text-[#A69076]">
                <span>EU</span>
                <span>UK</span>
                <span>US</span>
                <span>CM</span>
              </div>
              <div
                data-testid="size-guide-table"
                className="font-mono text-sm"
              >
                {sizes.map((s) => (
                  <div
                    key={s.eu}
                    className="grid grid-cols-4 py-3 border-b border-[rgba(242,240,233,0.06)] hover:bg-[rgba(242,240,233,0.03)] transition-colors"
                  >
                    <span className="text-[#F2F0E9]">{s.eu}</span>
                    <span className="text-[#8A8A85]">{s.uk}</span>
                    <span className="text-[#8A8A85]">{s.us}</span>
                    <span className="text-[#8A8A85]">{s.cm}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[rgba(242,240,233,0.1)] text-xs text-[#8A8A85] leading-relaxed tracking-wide">
              <p className="mb-2 overline">How to measure</p>
              <p>
                Place a sheet of paper against a wall. Stand barefoot with the heel
                touching the wall. Mark the longest toe, then measure from edge to
                mark. Measure both feet and use the larger figure.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SizeGuideContext.Provider>
  );
}
