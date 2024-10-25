import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App.tsx";
import "./index.css";
import { persistor, store } from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
 <StrictMode>
  <BrowserRouter>
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
     <App />
    </PersistGate>
   </Provider>
  </BrowserRouter>
 </StrictMode>
);
