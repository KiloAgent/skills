#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED_KEYS = ["slug", "name", "description", "repo", "tool_url", "status"];
const ALLOWED_STATUS = new Set(["live", "building", "idea"]);
const HTTPS_URL = /^https:\/\/.+/;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsPath = join(root, "skills.json");

function fail(message) {
  console.error(message);
  process.exit(1);
}

let parsed;
try {
  parsed = JSON.parse(readFileSync(skillsPath, "utf8"));
} catch (error) {
  fail(`skills.json is not valid JSON: ${error.message}`);
}

const skills = Array.isArray(parsed) ? parsed : parsed && parsed.skills;
if (!Array.isArray(skills)) {
  fail("skills.json must be an array or an object with a skills array");
}

const slugs = new Set();

for (const [index, skill] of skills.entries()) {
  const label = `skills[${index}]`;

  if (skill === null || typeof skill !== "object" || Array.isArray(skill)) {
    fail(`${label} must be an object`);
  }

  const missing = REQUIRED_KEYS.filter((key) => !(key in skill));
  if (missing.length > 0) {
    fail(`${label} is missing required keys: ${missing.join(", ")}`);
  }

  for (const key of REQUIRED_KEYS) {
    if (typeof skill[key] !== "string" || skill[key].trim() === "") {
      fail(`${label}.${key} must be a non-empty string`);
    }
  }

  if (!HTTPS_URL.test(skill.repo)) {
    fail(`${label}.repo must be a full https URL`);
  }

  if (!HTTPS_URL.test(skill.tool_url)) {
    fail(`${label}.tool_url must be a full https URL`);
  }

  if (!ALLOWED_STATUS.has(skill.status)) {
    fail(
      `${label}.status must be one of: ${[...ALLOWED_STATUS].join(", ")} (got ${skill.status})`,
    );
  }

  if (slugs.has(skill.slug)) {
    fail(`duplicate slug: ${skill.slug}`);
  }
  slugs.add(skill.slug);
}

console.log(`ok: ${skills.length} skill(s)`);
