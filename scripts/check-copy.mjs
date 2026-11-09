// Copy guard (spec: "Copy y vocabulario" + QA).
//   node scripts/check-copy.mjs            -> forbidden vocabulary only (fails)
//   node scripts/check-copy.mjs --release  -> also fails on pending drafts
import { readFileSync } from "node:fs";

const FORBIDDEN_TERMS = [
  "empleado", "empleada", "empleo", "puesto", "vacante", "oferta laboral",
  "trabajo", "sueldo", "salario",
  "jefe", "patrón", "equipo", "rrhh", "contratar gente",
  "fichar", "horario",
  "riesgo cero", "evitar impuestos", "evitar cargas",
];

const file = new URL("../src/content/landing.ts", import.meta.url);
const source = readFileSync(file, "utf8");

// Only inspect string literals (skip comments and identifiers).
const strings = [...source.matchAll(/"((?:[^"\\\n]|\\.)*)"/g)].map((m) => m[1]);

const errors = [];
for (const text of strings) {
  const lower = text.toLowerCase();
  for (const term of FORBIDDEN_TERMS) {
    const re = new RegExp(`(?<![\\p{L}])${term}(?![\\p{L}])`, "u");
    if (re.test(lower)) errors.push(`forbidden "${term}" in: "${text}"`);
  }
  if (/\[[^\]]*\]/.test(text)) errors.push(`bracketed text in: "${text}"`);
}

const pending = (source.match(/^\s+pending: true,/gm) ?? []).length;
const release = process.argv.includes("--release");
if (release && pending > 0) {
  errors.push(`${pending} FAQ answers still "Pendiente LIV" (blocked for release)`);
}

if (errors.length) {
  console.error("check-copy failed:\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log(`check-copy ok (${pending} pending drafts${release ? "" : ", not blocking"})`);
