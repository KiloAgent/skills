# Skill template

Copy this folder into a new public skill repo. Rename `skills/skill-template/` to `skills/<skill-name>/` and set the `name` field in `SKILL.md` to the same string as the folder.

This repo is the public index: [KiloAgent/skills](https://github.com/KiloAgent/skills).

## Layout

```text
PASTE_IN.md
README.md
skills/<skill-name>/
  SKILL.md
  references/
  scripts/
  assets/
  evals/
```

`SKILL.md` needs YAML frontmatter with `name` and `description`. The [skills CLI](https://www.npmjs.com/package/skills) discovers `skills/<name>/SKILL.md`.

## Use

From the skill repo:

```bash
npx skills add .
```

If you have no skills directory, paste [`PASTE_IN.md`](PASTE_IN.md) into the chat.
