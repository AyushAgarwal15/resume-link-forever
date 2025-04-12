# Redux to Zustand Migration Guide

This document outlines the steps needed to migrate our application from Redux to Zustand for state management.

## Why Zustand?

- **Simpler API**: Zustand has a much simpler API with less boilerplate
- **TypeScript integration**: Zustand works excellently with TypeScript
- **Bundle size**: Zustand is significantly smaller than Redux + Redux Toolkit
- **Persistence**: Zustand supports persistence through middleware (similar to redux-persist)
- **Performance**: Fewer re-renders and better memoization out of the box

## Migration Steps

### 1. Update imports

Replace Redux imports with our new Zustand hooks:

```typescript
// BEFORE
import { useAppSelector, useAppDispatch, resumeActions } from "@/store/redux";

// AFTER
import { useResumeSelector, useResumeActions } from "@/store/hooks";
```

### 2. Update selectors

Change how you select state from the store:

```typescript
// BEFORE
const summary = useAppSelector((state) => state.resume.summary);

// AFTER
const summary = useResumeSelector((state) => state.summary);
```

### 3. Update dispatching actions

Replace Redux dispatching with direct Zustand actions:

```typescript
// BEFORE
const dispatch = useAppDispatch();
dispatch(resumeActions.updateSummary("New summary"));

// AFTER
const { updatePersonalInfo } = useResumeActions();
updatePersonalInfo({ summary: "New summary" });
```

### 4. Changes to forms

In forms that update state:

```typescript
// BEFORE
const handleSubmit = (data) => {
  dispatch(resumeActions.updatePersonalInfo(data));
};

// AFTER
const { updatePersonalInfo } = useResumeActions();
const handleSubmit = (data) => {
  updatePersonalInfo(data);
};
```

### 5. File Structure

The new Zustand store is organized as follows:

- `store/unified-store.ts` - Main store implementation
- `store/hooks.ts` - Convenience hooks for accessing the store
- `store/types.ts` - Type definitions (unchanged)

### 6. Testing

When testing components that use the store:

```typescript
// BEFORE (with Redux)
import { Provider } from "react-redux";
import { store } from "@/store/redux";

render(
  <Provider store={store}>
    <Component />
  </Provider>
);

// AFTER (with Zustand)
// No provider needed! Just render the component:
render(<Component />);
```

### 7. Final Checks

Once all components are migrated:

1. Verify that the app works as expected
2. Run all tests to ensure nothing broke
3. Remove the unused Redux files

## Example Migration

Here's an example of migrating the `ResumePreview` component:

**Before**:

```tsx
import { useAppSelector } from "@/store/redux";

const ResumePreview = () => {
  const { name, title, location, email, phone, linkedin, github } =
    useAppSelector((state) => state.resume);

  // Component logic...
};
```

**After**:

```tsx
import { useResumeSelector } from "@/store/hooks";

const ResumePreview = () => {
  const { name, title, location, email, phone, linkedin, github } =
    useResumeSelector((state) => state);

  // Component logic...
};
```

## Need Help?

If you encounter any issues while migrating, please refer to:

- [Zustand documentation](https://github.com/pmndrs/zustand)
- The unified-store.ts file for reference on available actions
