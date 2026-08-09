# 💖 Skills for non-Claude harnesses

This template ships its skills under `../.claude/skills/` and registers the rest
as a Claude Code plugin (see `../.claude/README.md`). Nothing is mirrored here —
duplicated copies only drift.

Cursor, Codex, Zed, opencode, Gemini CLI and the other Agent-Skills-standard
harnesses install the same library themselves:

```bash
npx skills@latest add ltatarev/skills
```

The picker lets you choose which skills and which harness directories to write
to. To match what this template vendors:

```bash
npx skills@latest add ltatarev/skills \
  --skill add-feature --skill build-ui --skill validate-change \
  --agent <your-harness> --copy -y
```

Run `npx skills@latest add ltatarev/skills --list` to see everything available,
and `npx skills@latest update` to refresh what you installed.
