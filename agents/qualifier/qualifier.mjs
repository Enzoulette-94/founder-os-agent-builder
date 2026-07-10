#!/usr/bin/env node
// Agent Qualifier — Founder OS / Web Studio OS
// Lance-le avec les variables d'environnement chargées, par ex. :
//   node --env-file=.env agents/qualifier/qualifier.mjs "ta demande ici"
// Sans argument, il utilise la demande par défaut ci-dessous.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Identifiant de modèle Anthropic actuel connu au moment de l'écriture.
// À confirmer sur https://docs.anthropic.com/en/docs/about-claude/models
// avant tout usage en production si ce script est repris plus tard.
const MODEL = "claude-sonnet-5";

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error(
    "Erreur : ANTHROPIC_API_KEY est absente de l'environnement.\n" +
      "Lance ce script avec : node --env-file=.env agents/qualifier/qualifier.mjs"
  );
  process.exit(1);
}

const DEMANDE_PAR_DEFAUT =
  "Un artisan me demande un site vitrine pour vendre ses prestations de " +
  "rénovation. Il veut savoir le prix, le délai et ce qu'il doit fournir.";

const demande = process.argv.slice(2).join(" ").trim() || DEMANDE_PAR_DEFAUT;

const systemPrompt = readFileSync(
  path.join(__dirname, "system-prompt.md"),
  "utf8"
);

async function main() {
  console.log("--- Demande envoyée ---");
  console.log(demande);
  console.log();

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: demande }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Erreur API Anthropic (HTTP ${response.status}) :`);
    console.error(errorBody);
    process.exit(1);
  }

  const data = await response.json();
  const texte = data.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");

  console.log("--- Sortie de l'agent Qualifier ---");
  console.log(texte);
  console.log();

  if (data.usage) {
    console.log("--- Tokens consommés ---");
    console.log(`input_tokens  : ${data.usage.input_tokens}`);
    console.log(`output_tokens : ${data.usage.output_tokens}`);
  }
}

main().catch((err) => {
  console.error("Erreur d'exécution :", err.message);
  process.exit(1);
});
