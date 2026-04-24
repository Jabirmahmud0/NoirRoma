import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoirRoma from "./pages/NoirRoma";
import { Toaster } from "@/components/ui/sonner";
import SmoothScroll from "./components/SmoothScroll";

function App() {
  return (
    <SmoothScroll>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NoirRoma />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#121212",
              color: "#F2F0E9",
              border: "1px solid rgba(242, 240, 233, 0.1)",
              borderRadius: "0px",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.05em",
            },
          }}
        />
      </div>
    </SmoothScroll>
  );
}

export default App;
