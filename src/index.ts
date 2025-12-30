
import { getStagedDiff } from "./git/diff";
import { normalizeMessage } from "./commit/normalize";

import { detectIntent, detectScope } from "./git/analyzer";
import { stageAll } from "./git/stage";
import { model } from "./llm/model";
import { buildPrompt } from "./llm/prompt";
import { commitSchema } from "./commit/validator";
import { performCommit } from "./commit/commit";

const AUTO_COMMIT = process.argv.includes("--commit");

async function main() {
  try {
    if (AUTO_COMMIT) {
      console.log("📦 Staging all changes...");
      stageAll();
    }

    console.log("🔍 Reading staged changes...");
    const diff = getStagedDiff();

    const intent = detectIntent(diff);
    const scope = detectScope(diff);

    console.log("🤖 Generating commit message...");
    const prompt = buildPrompt(intent, scope, diff);

    console.log("🚀 Sending prompt to Ollama...");
    const response = await model.invoke(prompt);
    const raw = response.content.toString();
    const message = normalizeMessage(raw);


    commitSchema.parse(message);

    console.log("\n📝 Generated Commit Message:\n");
    console.log(message);

    if (AUTO_COMMIT) {
      performCommit(message);
      console.log("\n✅ Changes committed successfully.");
    } else {
      console.log("\nℹ️ Run with --commit to auto stage & commit.");
    }

  } catch (err: any) {
    console.error("❌ Error:", err.message);
  }
}

main();
