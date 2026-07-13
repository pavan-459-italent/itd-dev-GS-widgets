# Pre-PR Code Review

> **Note:** This file is in `.cursor/` which is gitignored. Do not mention cursor commands in commit messages.

Perform a comprehensive code review on all changed files before creating a PR.

## 🚨 BLOCKERS - VERIFY FIRST 🚨

### 1. Integration Tests (FIREABLE OFFENSE IF MISSING)

```bash
git diff --name-only origin/master...HEAD | grep -E "hooks\.ts$"
```

**For EVERY hooks.ts with changes, verify `integration.test.tsx` has tests for:**
- [ ] Each new hook's behavior with real component rendering
- [ ] Timer/polling behaviors (use `vi.useFakeTimers({ shouldAdvanceTime: true })`)
- [ ] API interactions with MSW
- [ ] User interactions that trigger the hook

**If ANY new hook lacks integration tests, STOP and write them.**

### 2. Inspect Must Pass

```bash
yarn workspace @gainsight-customer-hub/widget-service-frontend inspect
```

Run after EVERY change. Must exit with code 0.

---

## Review Checklist

### Code Organization
- [ ] Types in `./types.ts` (no inline types in components)
- [ ] Constants in `./constants.ts` (strings, magic numbers, messages)
- [ ] Keyboard keys use `KEYBOARD_KEY` from `@/shared/constants/keyboard`
- [ ] Business logic in `./hooks.ts` (components are pure UI only)
- [ ] Type guards/helpers in `./helpers.ts` with tests in `./helpers.test.ts`

### Code Quality
- [ ] No comments (code must be self-documenting)
- [ ] No `console.log`, `debugger`, or `alert()`
- [ ] No unused imports/variables
- [ ] No `as` type assertions (use type guards instead)
- [ ] Use `??` instead of `||` for undefined/null defaults
- [ ] DRY: extract repeated expressions to variables
- [ ] Combine type imports: `import { value, type Type } from "module"`

### Async Patterns (CRITICAL)
- [ ] Await callbacks before `setIsLoading(false)`: `await onSubmit()` not `onSubmit()`
- [ ] Use ref guards for double-submission prevention:
  ```typescript
  const isSavingRef = useRef(false);
  if (isSavingRef.current) return;
  isSavingRef.current = true;
  // ... finally { isSavingRef.current = false; }
  ```

### Testing
- [ ] Unit tests cover all edge cases and optional props as undefined
- [ ] Integration tests cover happy path and new features
- [ ] Helper functions have unit tests
- [ ] Single-statement `waitFor` uses arrow without braces: `await waitFor(() => expect(...))` not `await waitFor(() => { expect(...); })`

### File Structure
```
ComponentName/
  index.tsx, types.ts, constants.ts, hooks.ts
  helpers.ts + helpers.test.ts (if needed)
  index.test.tsx, integration.test.tsx
```

---

## Output Format

### Summary
- Files changed: X | Issues found: X | Issues fixed: X

### Issues Found
1. **🚨 Missing Integration Tests**: [list]
2. **Code Organization**: [list]
3. **Code Quality**: [list]
4. **Async Patterns**: [list]

### Verification
- Inspect: PASS/FAIL (MUST BE PASS)
- Status: READY FOR PR / NEEDS WORK

---

## ⚠️ NEVER COMMIT WITHOUT ⚠️

1. Integration tests for ALL new hooks/features
2. `yarn workspace @gainsight-customer-hub/widget-service-frontend inspect` passing

**Missing integration tests is a FIREABLE OFFENSE.**
