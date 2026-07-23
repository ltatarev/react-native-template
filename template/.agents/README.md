# 💖 Companion skills

This folder holds the skills bundled with the template under `skills/`
(`code-score`, `domain-modeling`, `gitmoji`, `grill-me`, `grill-with-docs`,
`grilling`). For the full, subscribable library, install the **adora** plugin
from [`ltatarev/skills`](https://github.com/ltatarev/skills) in Claude Code:

```bash
/plugin marketplace add ltatarev/skills
/plugin install adora@adora-skills
```

Skills then resolve as `/adora:<skill-name>`; update with
`/plugin marketplace update adora-skills`.

Not on Claude Code? The same skills install into any Agent-Skills-standard
harness via the `skills.sh` picker:

```bash
npx skills@latest add ltatarev/skills
```
