// Fixed: Joel Brigida (Wouldn't Render the App)
// Source: https://stackoverflow.com/questions/71945583/react-dom-client-webpack-imported-module-1-render-is-not-a-function-show-in-t

import { StrictMode } from "react";
import { createRoot } from "react-dom/client"
import './index.css';
import App from './App';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);