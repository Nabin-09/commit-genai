export type Intent = 
 | 'feat'
 | 'fix'
 | 'refactor'
 | 'docs'
 | 'test'
 | 'chore'
 | 'learning'



export function detectIntent(diff: string): Intent {
  if (/test|spec/i.test(diff)) return "test";
  if (/readme|docs/i.test(diff)) return "docs";
  if (/fix|bug|null|undefined/i.test(diff)) return "fix";
  if (/refactor/i.test(diff)) return "refactor";
  if (/package.json|lock/i.test(diff)) return "chore";
  return "feat";
}

export function detectScope(diff: string): string {
  if (/auth/i.test(diff)) return "auth";
  if (/api/i.test(diff)) return "api";
  if (/db|schema/i.test(diff)) return "db";
  if (/ui|component/i.test(diff)) return "ui";
  return "core";
}