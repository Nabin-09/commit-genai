// src/commit/commit.ts
import { run } from "../utils/exec";

export function performCommit(message: string) {
  run(`git commit -m "${message.replace(/"/g, '\\"')}"`);
}
