import { getStagedDiff } from "./git/diff";
import { detectIntent, detectScope } from "./git/analyzer";
import { model } from "./llm/model";
import { buildPrompt } from "./llm/prompt";
import { commitSchema } from "./commit/validator";
import { performCommit } from "./commit/commit";
import readline from "readline";

async function main() {
  try {
    console.log("🔍 Reading staged changes...");
    const diff = getStagedDiff();

    const intent = detectIntent(diff);
    const scope = detectScope(diff);

    console.log("🤖 Generating commit message...");
    const prompt = buildPrompt(intent, scope, diff);

    const response = await model.invoke(prompt);
    const message = response.content.toString().trim();

    commitSchema.parse(message);

    console.log("\nSuggested commit:\n");
    console.log(`➡ ${message}\n`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("Proceed with this commit? (y/n): ", (ans) => {
      if (ans.toLowerCase() === "y") {
        performCommit(message);
        console.log("✅ Commit created.");
      } else {
        console.log("❌ Commit aborted.");
      }
      rl.close();
    });

  } catch (err: any) {
    console.error("Error:", err.message);
  }
}

main();
