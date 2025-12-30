import { run } from "../utils/exec";

export function stageAll() {
  run("git add .");
}
