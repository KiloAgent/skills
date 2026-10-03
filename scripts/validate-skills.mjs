#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED_KEYS = [
  "slug",
  "name",
  "description",
  "repo",
  "tool_url",
  "status",
  "skill_path",
  "install_command",
  "paste_in",
];
const ALLOWED_STATUS = new Set(["live", "building", "idea"]);
const HTTPS_URL = /^https:\/\/.+/;
const PASTE_IN = /^[A-Za-z0-9._-]+\.md$/;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsPath = join(root, "skills.json");
const templateSkillPath = join(
  root,
  "SKILL_TEMPLATE",
  "skills",
  "skill-template",
  "SKILL.md",
);
const sampleSkillPath = join(root, "skills", "skill-template", "SKILL.md");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function assertSkillMarkdown(path, label) {
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch (error) {
    fail(`${label} is missing: ${error.message}`);
  }

  if (!text.startsWith("---")) {
    fail(`${label} must start with YAML frontmatter`);
  }

  const end = text.indexOf("\n---", 3);
  if (end === -1) {
    fail(`${label} frontmatter is not closed`);
  }

  const frontmatter = text.slice(4, end);
  const name = frontmatter.match(/^name:\s*(.+)$/m);
  const description = frontmatter.match(/^description:\s*(.+)$/m);

  if (!name || name[1].trim() === "") {
    fail(`${label} frontmatter must include name`);
  }
  if (!description || description[1].trim() === "") {
    fail(`${label} frontmatter must include description`);
  }
}

let parsed;
try {
  parsed = JSON.parse(readFileSync(skillsPath, "utf8"));
} catch (error) {
  fail(`skills.json is not valid JSON: ${error.message}`);
}

if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
  fail("skills.json must be an object with a skills array");
}

if (parsed.install_command !== "npx skills add KiloAgent/skills") {
  fail(
    'skills.json.install_command must be "npx skills add KiloAgent/skills"',
  );
}

const skills = parsed.skills;
if (!Array.isArray(skills)) {
  fail("skills.json must have a skills array");
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

  if (skill.skill_path !== `skills/${skill.slug}`) {
    fail(`${label}.skill_path must be skills/${skill.slug}`);
  }

  if (skill.install_command !== `npx skills add KiloAgent/${skill.slug}`) {
    fail(
      `${label}.install_command must be npx skills add KiloAgent/${skill.slug}`,
    );
  }

  if (!PASTE_IN.test(skill.paste_in)) {
    fail(`${label}.paste_in must be a markdown file name`);
  }

  if (slugs.has(skill.slug)) {
    fail(`duplicate slug: ${skill.slug}`);
  }
  slugs.add(skill.slug);
}

assertSkillMarkdown(templateSkillPath, "SKILL_TEMPLATE/skills/skill-template/SKILL.md");
assertSkillMarkdown(sampleSkillPath, "skills/skill-template/SKILL.md");

console.log(`ok: ${skills.length} skill(s)`);
