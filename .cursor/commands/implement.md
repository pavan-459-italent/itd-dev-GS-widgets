# Feature Implementation

> **Note:** This file is in `.cursor/` which is gitignored. Do not mention cursor commands in commit messages.

Implement features following established patterns. Write minimal code that covers all cases.

## 🚨 BLOCKERS - NON-NEGOTIABLE 🚨

### 1. Integration Tests (FIREABLE OFFENSE IF MISSING)

Every new hook/feature MUST have integration tests in `integration.test.tsx` BEFORE committing.

```typescript
describe("New feature", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("should work with real component", async () => {
    let requestCount = 0;
    server.use(http.get("/api/endpoint", () => { requestCount++; return HttpResponse.json(data); }));
    
    renderWithProviders(<Component />);
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
    
    await act(async () => { await vi.advanceTimersByTimeAsync(INTERVAL_MS); });
    await waitFor(() => expect(requestCount).toBe(2));
  });
});
```

### 2. Inspect Must Pass

```bash
yarn workspace @gainsight-customer-hub/widget-service-frontend inspect
```

Run after EVERY change. Must exit with code 0.

---

## Implementation Steps

### 1. Plan File Structure
```
ComponentName/
  types.ts           # Define types FIRST
  constants.ts       # Extract ALL strings and magic numbers
  helpers.ts         # Type guards (with helpers.test.ts)
  hooks.ts           # ALL business logic
  index.tsx          # Pure UI only
  index.test.tsx     # Unit tests (edge cases)
  integration.test.tsx  # Feature tests (happy path)
```

### 2. Types First (`types.ts`)
```typescript
export type MyComponentProps = {
  data: DataType;
  onSubmit: () => void | Promise<void>;  // Support async callbacks
};
```

### 3. Constants (`constants.ts`)
```typescript
export const POLLING_INTERVAL_MS = 5000;
export const ERROR_MESSAGE = "Something went wrong";
```

### 4. Helpers with Type Guards (`helpers.ts`)
```typescript
export const isValidStatus = (val: string | undefined): val is Status =>
  val === STATUS.ACTIVE || val === STATUS.INACTIVE;

export const getStatus = (val: string | undefined, fallback: Status): Status =>
  isValidStatus(val) ? val : fallback;
```

### 5. Hooks - All Logic (`hooks.ts`)
```typescript
export const useMyFeature = ({ onSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const isSavingRef = useRef(false);  // Prevent double-submission

  const handleSubmit = useCallback(async () => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setIsLoading(true);
    try {
      const result = await api();
      if (result.success) await onSubmit();  // AWAIT callbacks
    } finally {
      isSavingRef.current = false;
      setIsLoading(false);
    }
  }, [onSubmit]);

  return { isLoading, handleSubmit };
};
```

### 6. Component - Pure UI (`index.tsx`)
```typescript
export const MyComponent = (props: Props) => {
  const { isLoading, handleSubmit } = useMyFeature(props);
  return <button onClick={handleSubmit} disabled={isLoading}>{LABEL}</button>;
};
```

---

## Code Standards Quick Reference

| Rule | Good | Bad |
|------|------|-----|
| Defaults | `value ?? ""` | `value \|\| ""` |
| Type safety | Type guards in helpers.ts | `as` assertions |
| Callbacks | `await onSubmit()` | `onSubmit()` |
| Double-submit | `if (isSavingRef.current) return` | No guard |
| Imports | `import { x, type T }` | Separate type imports |
| Keyboard | `KEYBOARD_KEY.ENTER` | `"Enter"` |
| Strings | `constants.ts` | Inline strings |
| waitFor | `await waitFor(() => expect(...))` | `await waitFor(() => { expect(...); })` |

---

## Progress Checklist

- [ ] Types defined
- [ ] Constants extracted  
- [ ] Helpers + helper tests
- [ ] Hooks implemented
- [ ] Component built
- [ ] Unit tests (edge cases)
- [ ] **Integration tests** (BLOCKING)
- [ ] Inspect passes

---

## ⚠️ NEVER COMMIT WITHOUT ⚠️

1. Integration tests for ALL new hooks/features
2. `yarn workspace @gainsight-customer-hub/widget-service-frontend inspect` passing

**Missing integration tests is a FIREABLE OFFENSE.**
