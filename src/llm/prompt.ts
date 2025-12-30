export function buildPrompt(
  intent: string,
  scope: string,
  diff: string
): string {
  return `
You are a senior software engineer.

Generate ONE git commit message.

Rules:
- Conventional Commit format: <type>(<scope>): <message>
- Imperative mood
- Max 72 characters
- No markdown
- No emojis
- No explanation

Intent: ${intent}
Scope: ${scope}

Git diff:
${diff}

Return ONLY the commit message.
`.trim();
}
