# KiloAgent skills

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Small, readable skills for boring operations work.

This repository is the public index for KiloAgent skills. Each skill lives in its own public repository. This repo holds the list, conventions, and links.

## What's a skill here?

A skill is a folder with a `SKILL.md` that tells an agent (or a human) what the skill does, its inputs and outputs, plus prompts, schemas, and evals. Each skill is its own public repo.

## Skills index

Status values: `live`, `building`, `idea`. Hosted tool pages are still being built, so every skill is `building` for now. Repo links already resolve. [agentic-loop-analyzer](https://github.com/KiloAgent/agentic-loop-analyzer) has an [open initial release PR](https://github.com/KiloAgent/agentic-loop-analyzer/pull/1).

| Skill | What it does | Repo | Try it online | Status |
| --- | --- | --- | --- | --- |
| agentic-loop-analyzer | Ranks your recurring tasks by how much an agent could take over. | [KiloAgent/agentic-loop-analyzer](https://github.com/KiloAgent/agentic-loop-analyzer) | [loop-audit](https://www.kiloagent.com/tools/loop-audit) | building |
| portal-agent-readiness | Checks how automatable a portal or web tool is, with the best route in. | [KiloAgent/portal-agent-readiness](https://github.com/KiloAgent/portal-agent-readiness) | [portal-check](https://www.kiloagent.com/tools/portal-check) | building |
| chase-email-templates | 12 follow-up scenarios x 3 escalating emails. | [KiloAgent/chase-email-templates](https://github.com/KiloAgent/chase-email-templates) | [chase-emails](https://www.kiloagent.com/tools/chase-emails) | building |

The same list is in [`skills.json`](skills.json).

## Quick start

Use the hosted tool page, or clone the skill repo and point your agent at `SKILL.md`.

### Hosted tool page

Open the "Try it online" link from the table. Example:

```text
https://www.kiloagent.com/tools/loop-audit
```

### Clone and run locally

```bash
git clone https://github.com/KiloAgent/<skill>.git
```

Then tell your coding agent to read `SKILL.md`.

## Conventions every skill follows

- Standard layout: `SKILL.md`, `schema/`, `prompts/`, `evals/`, `README.md`
- Structured input and output schemas
- Deterministic scoring in code; LLM for judgment and writing
- Evals included
- No secrets or customer data in the repo

A starter tree lives in [`SKILL_TEMPLATE/`](SKILL_TEMPLATE/).

## Safety and privacy

Prompts treat user input as untrusted data. No skill sends email or messages on a user's behalf without their approval. Hosted tools send one email with a link and an unsubscribe footer.

See the [privacy policy](https://www.kiloagent.com/privacy).

## Contributing

To propose a skill, open an issue with the [new-skill](.github/ISSUE_TEMPLATE/new-skill.md) template (problem, inputs, outputs, how to eval).

To report a problem with a skill, open an issue with the [skill-problem](.github/ISSUE_TEMPLATE/skill-problem.md) template.

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Code, prompts, and templates are [MIT](LICENSE). The KiloAgent name and logo are not licensed.

## About KiloAgent

KiloAgent lives at [kiloagent.com](https://www.kiloagent.com). It is built by ZenStudy Technologies FZCO.

## Contact

[bot@kiloagent.com](mailto:bot@kiloagent.com)

[Imprint](https://www.kiloagent.com/imprint)
