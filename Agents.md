# Project Architecture and Agent Instructions

This document outlines the architecture, best practices, and instructions for AI agents working on this project.

## Architecture Overview

This project is a SaaS template built with the following stack:

-   **Framework:** Next.js 16+ (App Router)
-   **UI Library:** Ant Design (v6) + TailwindCSS
-   **Backend/API:** tRPC (v11)
-   **Database/Auth:** Supabase
-   **State Management:** React Query (via tRPC) & Zustand
-   **Validation:** Zod
-   **Internationalization:** next-intl (v4)
-   **Environment Variables:** T3 Env

### Directory Structure

-   `src/app`: Next.js App Router pages and API routes.
-   `src/client`: Client-side code (components, hooks, stores).
-   `src/server`: Server-side code (tRPC routers, controllers, context).
-   `src/schemas`: Shared Zod schemas for validation.
-   `src/trpc`: tRPC client configuration and utilities.
-   `src/utils`: Helper functions.
-   `src/env.ts`: Environment variable definition.
-   `src/locale`: Translation files.

## Best Practices

### 1. Creating New Routes and Controllers (tRPC)

We follow a controller-router pattern for tRPC to separate implementation from definition.

**Steps:**
1.  Create a controller file in `src/server/controllers/<feature>.ts`.
2.  Define procedures using `publicProcedure` or `protectedProcedure`.
3.  Import and add the procedures to a router in `src/server/routers/<feature>.ts`.
4.  Add the router to the root `appRouter` in `src/server/routers/index.ts`.

**Example Controller (`src/server/controllers/example.ts`):**
```typescript
import { z } from 'zod';
import { publicProcedure, protectedProcedure } from '@/server/trpc';

export const hello = publicProcedure
  .input(z.object({ text: z.string() }))
  .query(({ input }) => {
    return {
      greeting: \`Hello \${input.text}\`,
    };
  });

export const secretData = protectedProcedure.query(({ ctx }) => {
  return {
    secret: 'This is protected data',
    user: ctx.user,
  };
});
```

**Example Router (`src/server/routers/example.ts`):**
```typescript
import { createTRPCRouter } from '@/server/trpc';
import { hello, secretData } from '@/server/controllers/example';

export const exampleRouter = createTRPCRouter({
  hello,
  secretData,
});
```

### 2. Calling from the Frontend

Use the `useTRPCClient` hook or the `trpc` proxy to call procedures.

**Example:**
```typescript
'use client';
import { useTRPCClient } from '@/trpc/client';

export default function MyComponent() {
  const trpc = useTRPCClient();
  const { data, isLoading } = trpc.example.hello.useQuery({ text: 'World' });

  if (isLoading) return <div>Loading...</div>;
  return <div>{data?.greeting}</div>;
}
```

### 3. Creating UI Components and Pages

-   **Components:** Place in `src/client/components`. Use functional components with TypeScript interfaces.
-   **Pages:** Place in `src/app/[locale]/...`. Ensure they are server components by default unless `'use client'` is needed.
-   **Styling:** Use TailwindCSS for layout and spacing, and Ant Design for complex components. Use `cn` utility for class merging.

**Example:**
```typescript
import { Button } from 'antd';
import { cn } from '@/utils/tailwind';

interface Props {
  className?: string;
}

export const MyButton = ({ className }: Props) => {
  return (
    <Button className={cn('bg-blue-500 text-white', className)}>
      Click me
    </Button>
  );
};
```

### 4. Using Environment Variables

ALWAYS use `src/env.ts` to access environment variables. Do NOT use `process.env` directly.

**Example:**
```typescript
import { env } from '@/env';

console.log(env.NEXT_PUBLIC_SITE_URL);
```

### 5. Forms and Validation

Use `zod` for schemas and `antd-zod` for integrating with Ant Design forms. Share schemas between client and server.

**Schema (`src/schemas/example.ts`):**
```typescript
import { z } from 'zod';

export const ExampleSchema = z.object({
  email: z.string().email(),
});

export type IExampleInput = z.infer<typeof ExampleSchema>;
```

**Form Component:**
```typescript
'use client';
import { Form, Input, Button } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { ExampleSchema, IExampleInput } from '@/schemas/example';
import { useTranslations } from 'next-intl';

export const ExampleForm = () => {
  const t = useTranslations('forms');
  const rule = createSchemaFieldRule(ExampleSchema);

  const onFinish = (values: IExampleInput) => {
    console.log(values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="email" rules={[rule]}>
        <Input placeholder={t('email')} />
      </Form.Item>
      <Button htmlType="submit">{t('submit')}</Button>
    </Form>
  );
};
```

### 6. Translations

Use `next-intl` for all text. Define keys in `src/locale/messages/*.json`.

-   **Client Components:** `useTranslations('namespace')`
-   **Server Components:** `getTranslations('namespace')`

**Important:** Any time you write up new keys, you should automatically add the translations across all existent locales in `src/locale/messages/*.json`.

**Example:**
```typescript
const t = useTranslations('common');
<h1>{t('welcome')}</h1>
```

### 7. Performance and Rendering Strategy

Optimize UI performance by intelligently choosing between Server and Client components.

-   **Server Components (RSC):**
    -   **Use for:** Initial data fetching, SEO-critical content, accessing backend resources (via tRPC caller), and static layout elements.
    -   **Benefit:** Reduces client bundle size and improves First Contentful Paint (FCP).
    -   **Example:** Fetching a list of blog posts or product details for a public page.

-   **Client Components:**
    -   **Use for:** Interactivity (`onClick`, `onChange`), hooks (`useState`, `useEffect`), browser APIs, and complex state management.
    -   **Benefit:** Enables rich user interactions.

-   **Data Fetching Strategy (tRPC + React Query):**
    -   **Prefer Server Pre-rendering (RSC) when:**
        -   Content is critical for SEO.
        -   Data is static or doesn't change often.
        -   You want to eliminate layout shift (CLS) on initial load.
        -   *How:* Use the tRPC server caller to fetch data in the RSC and pass it as props or use hydration.
    -   **Prefer Client-side Fetching (React Query) when:**
        -   Data is highly dynamic or user-specific (e.g., dashboard stats, notifications).
        -   You need polling, infinite loading, or optimistic updates.
        -   You want to leverage React Query's caching and background refetching to keep data fresh without page reloads.
        -   The UI can show a loading skeleton while data fetches (non-critical LCP).

### 8. State Management Strategy

Choose the right tool for the type of state you are managing.

-   **Server State (Async Data):**
    -   **Tool:** React Query (via tRPC).
    -   **Use for:** Data fetched from the backend, caching, synchronization, and optimistic updates.
    -   **Avoid:** Storing API data in `useState` or Zustand stores manually. Let React Query handle the cache.

-   **Simple Client State:**
    -   **Tool:** `useState` / `useReducer`.
    -   **Use for:** Local component state, toggles (modals, dropdowns), and UI state that doesn't need to be shared globally.

-   **Form State:**
    -   **Tool:** Ant Design `Form`.
    -   **Use for:** All form-related state (values, errors, touched). Ant Design handles this internally; do NOT use `useState` for form inputs.

-   **Complex/Global Client State:**
    -   **Tool:** Zustand.
    -   **Use for:**
        -   State shared across many disconnected components (e.g., sidebar open/close, user preferences, shopping cart).
        -   Complex state logic that would make a component too large.
        -   Avoiding prop drilling.
    -   **Pattern:** Create small, focused stores (e.g., `useUIStore`, `useAuthStore`) rather than one giant store.
    -   **Important:** Zustand state persists across navigations (SPA transitions). **ALWAYS** reset relevant state when navigating away from or between pages (e.g., using `useEffect` cleanup or a reset action) to prevent stale data (e.g., showing the previous product's details when navigating to a new product).

-   **URL State:**
    -   **Tool:** Next.js `searchParams`.
    -   **Use for:** Filters, pagination, sorting, and any state that should be shareable via a link.

## Context7 MCP Server Instructions

When using the Context7 MCP server to search for documentation or code snippets, ALWAYS use the exact library names specified below.

| Library | Context7 Lib Name | Version |
| :--- | :--- | :--- |
| Next.js | `next` | 16.0.7 |
| React | `react` | 19.2.1 |
| Tailwind CSS | `tailwindcss` | 3.4.3 |
| Ant Design | `antd` | 6.0.1 |
| Zod | `zod` | 3.23.8 |
| tRPC Server | `@trpc/server` | 11.7.2 |
| tRPC Client | `@trpc/client` | 11.7.2 |
| React Query | `@tanstack/react-query` | 5.90.11 |
| Next Intl | `next-intl` | 4.5.8 |
| Supabase JS | `supabase-js` | 2.86.0 |

**Instruction to Agents:**
"When searching for documentation or examples for the libraries listed above, use the `context7` MCP server with the specified library name. Also, utilize the `next-devtools` MCP server for Next.js specific debugging and documentation."

## Tooling and Conventions

### Package Manager

**ALWAYS** use `pnpm` for installing dependencies and running scripts. Do not use `npm` or `yarn`.

### Available Scripts

Refer to `package.json` for the full list, but here are the most common ones:

-   **Development:** `pnpm dev` (Starts the Next.js dev server with Turbopack)
-   **Build:** `pnpm build` (Builds the application for production)
-   **Linting:**
    -   `pnpm lint`: Runs ESLint.
    -   `pnpm lint:fix`: Runs ESLint and fixes auto-fixable issues.
    -   `pnpm lint:i18n`: Lints translation JSON files.
-   **Formatting:**
    -   `pnpm format`: Formats code using Prettier.
    -   `pnpm check`: Checks if code is formatted correctly.
-   **Supabase:**
    -   `pnpm supabase:generate`: Generates TypeScript types from your local Supabase instance.
    -   `pnpm supabase:migration:new <name>`: Creates a new migration file.
    -   `pnpm supabase:migration:up`: Applies pending migrations to the local database.
    -   `pnpm supabase`: Runs Supabase CLI commands (e.g., `pnpm supabase start`, `pnpm supabase status`).
-   **Type Checking:**
    -   `pnpm type-check`: Runs TypeScript compiler to check for type errors (faster than build).

### Husky Hooks and Enforced Rules

This project uses Husky to enforce rules before commits and pushes.

1.  **Commit Messages:**
    -   Must follow [Conventional Commits](https://www.conventionalcommits.org/) format.
    -   Enforced by `commitlint` in the `commit-msg` hook.
    -   **Format:** `<type>(<scope>): <subject>`
    -   **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

2.  **File Naming Conventions:**
    -   Enforced by `.husky/hooks/check_files_naming.sh` in the `pre-commit` hook.
    -   **Folders:** `kebab-case` (e.g., `src/server/controllers`)
    -   **Hooks (`src/client/hooks/`):** `camelCase` (e.g., `useLogin.ts`)
    -   **Components (`src/client/components/*.tsx`):** `PascalCase` (e.g., `LoginComponent.tsx`)
    -   **All Other Files:** `kebab-case` (e.g., `src/utils/helpers.ts`)

3.  **Linting and Formatting:**
    -   `lint-staged` runs on pre-commit to ensure staged files are linted and formatted.

## General Rules

1.  **Strict Typing:**
    -   **NEVER** use `any`. Always define proper types or interfaces.
    -   If you encounter a type error, investigate the source and fix it properly. Do NOT cast to `any` or `unknown` just to silence the error.

2.  **Date Handling:**
    -   Always use **UTC** for date instantiation and storage on both the client and server.
    -   Use `dayjs` (available in dependencies) or standard `Date` methods with UTC.
    -   Example: `dayjs.utc()` or `new Date().toISOString()`.

3.  **Code Quality:**
    -   Prefer `const` over `let`.
    -   Use `async/await` instead of `.then()` chains.
    -   Keep components small, focused, and reusable.
    -   Remove unused variables and imports.