import { invoke } from "@tauri-apps/api/core";

async function greet() {
  const greeting = await invoke<string>("greet", { name: "World" });
  const app = document.querySelector<HTMLDivElement>("#app");
  if (app) {
    app.innerHTML = `<h1>${greeting}</h1>`;
  }
}

greet();
