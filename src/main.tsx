import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "@/provider/StoreProvider";
import { AuthProvider } from "@/provider/AuthProvider";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StoreProvider>
  </StrictMode>,
);
