import { run } from "../utils/exec";

export function getStagedDiff(): string {
  const diff = run("git diff --staged");
  if (!diff) {
    throw new Error("No staged changes found.");
  }
  return diff.slice(0, 4000);
}
