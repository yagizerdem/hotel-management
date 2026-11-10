## Before starting any task

1. **Read the skills first.** Read every `SKILL.md` under `.agents/skills/` (e.g. `frontend-design`, `git-commit`) and follow the relevant ones for the task.
2. **Read the design docs.** Find and read all `DESIGN.md` files in the project (root and subdirectories, excluding `node_modules/`) before writing or changing any code. Follow the decisions documented there.
3. **Use the visual design references.** Before starting design or UI work, read `DESIGN.light.md` and `DESIGN.dark.md`; use the relevant reference and keep the implementation consistent with its guidance.

## Commit messages

- Do **not** add any `Co-authored-by:` trailers (Claude, Copilot, or any other AI/tool) to commit messages.
- Do not mention AI assistants or tools as authors anywhere in the commit message.

## Git worktrees

- Create Git worktrees only under `.claude/worktrees/`; do not create them elsewhere.
