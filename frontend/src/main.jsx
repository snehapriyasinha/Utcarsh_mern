import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import DoneesContextProvider from "./context/DoneesContext.jsx";
import SchemeContextProvider from "./context/SchemesContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DoneesContextProvider>
      <SchemeContextProvider>
        <App />
      </SchemeContextProvider>
    </DoneesContextProvider>
  </BrowserRouter>
);
