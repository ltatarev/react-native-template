# 💖 Companion skills

This folder holds the skills bundled with the template (`code-score`,
`domain-modeling`, `gitmoji`, `grill-me`, `grill-with-docs`, `grilling`). For
the full, subscribable library, install the **adora** plugin from
[`ltatarev/skills`](https://github.com/ltatarev/skills) in Claude Code:

```bash
/plugin marketplace add ltatarev/skills
/plugin install adora@adora-skills
```

Skills then resolve as `/adora:<skill-name>`; update with
`/plugin marketplace update adora-skills`.

To auto-prompt the whole team to install it, add to this project's
`.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "adora-skills": { "source": { "source": "github", "repo": "ltatarev/skills" } }
  },
  "enabledPlugins": { "adora@adora-skills": true }
}
```
