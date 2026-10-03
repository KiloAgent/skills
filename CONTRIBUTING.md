# Contributing

This repo is the public index for KiloAgent skills. Skill code lives in each skill's own repository.

## Propose a skill

Open an issue with the [new-skill](.github/ISSUE_TEMPLATE/new-skill.md) template and fill in:

1. **Problem**: the operations task the skill should cover
2. **Inputs**: what the user or agent supplies
3. **Outputs**: what the skill returns
4. **How to eval**: cases or fixtures that show the skill is correct

A new public skill should follow [`SKILL_TEMPLATE/`](SKILL_TEMPLATE/) and the [skills CLI](https://www.npmjs.com/package/skills) layout:

```text
PASTE_IN.md
skills/<skill-name>/SKILL.md
skills/<skill-name>/references/
skills/<skill-name>/scripts/
skills/<skill-name>/assets/
skills/<skill-name>/evals/
```

`SKILL.md` needs `name` and `description` frontmatter. The `name` must match the folder. From the skill repo, check discovery with:

```bash
npx skills add . --list
```

After the skill repo exists, add a row to the README table and an entry in [`skills.json`](skills.json).

## Report a problem with a skill

Open an issue with the [skill-problem](.github/ISSUE_TEMPLATE/skill-problem.md) template. Name the skill (or its repo) and describe what happened.

For a change inside a skill, open the issue or PR on that skill's repository.

## Index changes

Keep the README table and `skills.json` in sync. Allowed status values: `live`, `building`, `idea`.

```bash
node scripts/validate-skills.mjs
```
