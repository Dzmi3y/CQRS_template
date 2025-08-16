import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import CartProvider from "./context/Cart/CartProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <CartProvider>
        <App />
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>
);
