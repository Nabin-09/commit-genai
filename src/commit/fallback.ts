export function buildFallbackCommit(
  intent: string,
  scope: string,
  diff: string
): string {
  // very simple summary heuristic
  const summary =
    diff.includes("fix") || diff.includes("error")
      ? "handle error case"
      : "update implementation";

  return `${intent}(${scope}): ${summary}`;
}
