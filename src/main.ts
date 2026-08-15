import { mountApp } from "./app.ts";
import "./style.css";

const root = document.querySelector("#app");

if (!(root instanceof HTMLElement)) {
  throw new Error("Missing #app root");
}

mountApp(root);
