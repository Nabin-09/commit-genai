export function normalizeMessage(raw: string): string {
  return raw
    .replace(/[`"]/g, "")          // remove quotes & backticks
    .split("\n")[0]                // take first line only
    .replace(/^.*?:\s*/, "")       // remove leading explanation text
    .trim();
}
