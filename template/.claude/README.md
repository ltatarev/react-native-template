# 💖 Skills

Skills reach this app two ways: a few are **vendored** into `skills/`, the rest
arrive as a **plugin** from [`ltatarev/skills`](https://github.com/ltatarev/skills).

## Vendored (`skills/`)

These are committed, so they work with no install step, offline, and for anyone
who clones the repo.

| Skill             | Why it is vendored                                                       |
| ----------------- | ------------------------------------------------------------------------ |
| `add-feature`     | Encodes this template's package-by-feature module boundaries.            |
| `build-ui`        | Encodes the `theme/ui` + Unistyles + i18n + a11y house standard.         |
| `validate-change` | Encodes the `yarn lint` / `tsc` / `test:unit` / `madge` handoff.         |
| `rozenite-agent`  | Drives the Rozenite devtools this template wires up in `utils/devtools`. |

They are tracked in `../skills-lock.json`. Refresh them with:

```bash
npx skills@latest update
```

## Plugin (the rest of the library)

`settings.json` registers the `adora-skills` marketplace and enables the `adora`
plugin, so opening this project in Claude Code prompts you to trust and install
it. After that the full library resolves as `/adora:<skill-name>` — `write-tests`,
`verify`, `commit-changes`, `gitmoji`, `unistyles`, `truesheet-usage`,
`domain-model`, `grill-plan`, `ticket-shaping`, `implement-ticket`, `ios-widget`,
`bootsplash`, `xcode-cloud`, `maintain-skills`.

Install or update it by hand with:

```bash
/plugin marketplace add ltatarev/skills
/plugin install adora@adora-skills
/plugin marketplace update adora-skills
```

Not on Claude Code? See `../.agents/README.md`.
