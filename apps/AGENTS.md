# Commit Message Generator

## Instructions

1. Run `git diff --staged` to view staged changes.

2. Review the diff and identify:
   - **What changed**
   - **Why it changed**
   - **Any breaking changes or important side effects**

3. Generate a commit message that follows these conventions:
   - **Header:** Short and descriptive commit message header that strictly fallows commit header converntions.
   - **Blank line(required only-if Body is present):** Always include a blank line after the summary.
   - **Body (wrapped at 72 characters)(optional):** Explain what and why, not how.
   - **Footer (optional):** Reference issues with `Fixes #123` or `Refs #456`.

4. Header Format
   - Scope(commit-type): message

### Scopes

| Scope    | Description                                                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Backend  | Changes to the backend application, including APIs, business logic, database interactions, and server-side functionality (apps/backend). |
| Frontend | Changes to the frontend application, including UI components, pages, styling, client-side logic, and user interactions (apps/frontend).  |

### Commit type

| Type       | Description                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| `feat`     | Adds, modifies, or removes a feature in the API or UI.                                                    |
| `fix`      | Fixes an API or UI bug introduced by a previous `feat` commit.                                            |
| `refactor` | Restructures code without changing API or UI behavior.                                                    |
| `perf`     | Improves performance without changing functionality. A subtype of `refactor`.                             |
| `style`    | Changes code formatting, whitespace, semicolons, etc., without affecting behavior.                        |
| `test`     | Adds missing tests or corrects existing tests.                                                            |
| `docs`     | Changes documentation only.                                                                               |
| `build`    | Changes build tools, dependencies, project versions, or other build-related components.                   |
| `ops`      | Changes infrastructure, deployment scripts, CI/CD pipelines, backups, monitoring, or recovery procedures. |
| `chore`    | Handles general maintenance tasks, such as initial commits or `.gitignore` updates.                       |

## Best Practices

- Use present tense: `Add feature`, not `Added feature`.
- Be specific and descriptive.
- Explain the reasoning behind changes.
- Keep the summary concise for readability.
- Break related changes into separate commits.
- Do not use emoji.

## Example

```text
Backend(feat): Add JWT authentication support

The backend previously lacked a secure mechanism for
authenticating users and protecting restricted endpoints.

Add JWT-based authentication to support secure user sessions
and role-based access control.

The changes include:
- User login and registration endpoints
- JWT access and refresh token support
- Authentication middleware for protected routes
- Role-based authorization

Fixes #42
```

## Tips

- Use `git diff --cached` to see what will be committed.
- Reference related issues or tickets in the footer.
- If your commit message needs explanation, the change might be too complex.
- Consider atomic commits: one logical change per commit.
