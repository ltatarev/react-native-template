# AI Agent Instructions for React Native + TypeScript Project

> **Purpose**: This file provides guidelines for AI coding assistants working on this React Native project. It ensures consistency, quality, and adherence to project conventions.

## Project Overview

- **Framework**: React Native
- **Language**: TypeScript (strict mode)
- **Package Manager**: yarn
- **Styling**: react-native-unistyles (v3.x)
- **State Management**: Redux Toolkit
- **Server State**: RTK Query
- **Navigation**: React Navigation
- **Internationalization**: react-i18next
- **Local Storage**: MMKV
- **Environment Config**: react-native-config
- **Error Tracking**: Interface-based (Sentry implementation)
- **Analytics**: Interface-based (Amplitude implementation)
- **Minimum Versions**: React Native 0.70+, TypeScript 5.0+

## Code Conventions

### ESLint Configuration

This project uses ESLint with Airbnb config, TypeScript, and React Native specific rules. All code must pass ESLint checks before committing.

**Key Rules**:
- **Max line length**: 90 characters
- **Console statements**: Warnings only (remove before production)
- **Prefer const**: Use `const` by default, `let` when reassignment needed
- **No unused imports**: Automatically enforced
- **JSX accessibility**: All accessibility rules must be followed

### Code Style

**General**:
- Maximum line length: **90 characters**
// Props type above component
type UserCardProps = {
  userId: string;
  name?: string; // Optional props must have default values
  onPress?: () => void;
};

export function UserCard({
  userId,
  name = 'Unknown User', // Default value required by ESLint
  onPress,
}: UserCardProps) {
  const { styles, theme } = useStyles(stylesheet);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // Effect logic
  }, [userId]);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user?.name || name}</Text>
    </View>
  );
}

// Styles at bottom using Unistyles (never inline styles or color literals)
const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: theme.spacing.md,

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
} as const;

type Status = typeof STATUS[keyof typeof STATUS];

// Bad
enum Status { IDLE, LOADING, SUCCESS } // Avoid enums
let data: any; // Never use any
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Files**: 
  - Components: PascalCase with `.tsx` (e.g., `UserProfile.tsx`)
  - Utilities: camelCase with `.ts` (e.g., `formatDate.ts`)
  - Hooks: camelCase starting with `use` with `.ts` (e.g., `useAuth.ts`)
  - Constants: camelCase with `.ts` (e.g., `const.ts` in modules, or descriptive names)
  - Redux files: camelCase with `.ts` (e.g., `actions.ts`, `slices.ts`)
  - Navigators: camelCase with `.tsx` (e.g., `navigator.tsx`)
- **Variables/Functions**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Types/Interfaces**: PascalCase with descriptive names

### File Structure

**Architecture Philosophy**: This project uses **Package by Feature** (not Package by Type). Each module is self-contained with its own components, services, hooks, and Redux logic. This improves maintainability, makes features easier to locate, and reduces coupling between modules.

```
src/
├── assets/             # Global assets (images, fonts, etc.)
├── modules/            # Feature modules (package by feature)
│   ├── main/          # Main module example
│   │   ├── assets/    # Module-specific assets
│   │   ├── components/# Module UI components
│   │   ├── fragments/ # Reusable module fragments
│   │   ├── hooks/     # Module-specific hooks
│   │   ├── redux/     # Module state management
│   │   │   ├── actions.ts
│   │   │   ├── index.ts
│   │   │   ├── slices.ts
│   │   │   ├── selectors.ts
│   │   │   └── reducers.ts
│   │   ├── screens/   # Module screen components
│   │   ├── services/  # Module API calls
│   │   ├── const.ts   # Module constants
│   │   ├── index.ts   # Module exports
│   │   └── navigator.tsx # Module navigation
│   ├── auth/          # Another module example
│   └── index.ts       # Module registry
├── common/            # Shared utilities across modules
│   ├── services/      # Shared API services
│   ├── hooks/         # Shared custom hooks
│   ├── types/         # Shared TypeScript types
│   ├── utils/         # Shared helper functions
│   └── constants/     # Shared app constants
├── ui/                # Shared UI component library
│   ├── Button/
│   ├── Input/
│   └── index.ts
└── index.ts           # App entry point
```

**Key Principles**:
- Each module in `modules/` is a self-contained feature
- Module components are NOT shared between modules (they belong to their module)
- Only truly shared/reusable components go in `ui/`
- Only truly shared utilities go in `common/`
- If something is used by only one module, it stays in that module

### Component Structure

**Functional Components Only** - No class components
**Prefer function declarations for React components over const arrow components.**

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { createStyleSheet, useStyles } from 'react-native-unistyles';

// Props interface above component
interface UserCardProps {
  userId: string;
  name?: string; // Optional props must have default values
  onPress?: () => void;
}

// Component with explicit return type and default props
export const UserCard: React.FC<UserCardProps> = ({ 
  userId, 
  name = 'Unknown User', // Default value required by ESLint
  onPress 
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Effect logic
  }, [userId]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user?.name || name}</Text>
    </View>
  );
};

// Styles at bottom using Unistyles (never inline styles or color literals)
const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background, // Use theme, never literals
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text, // Use theme, never literals
  },
}));
```

**JSX Props Sorting** (enforced by ESLint):
Props must be sorted in this order:
1. `key` (reserved, always first)
2. Shorthand props
3. Regular props (alphabetically)
4. Callbacks (always last)

```typescript
// ✅ Correct order
<Button
  key="submit"
  disabled
  accessible
  style={styles.button}
  testID="submit-btn"
  title="Submit"
  onPress={handleSubmit}
  onLongPress={handleLongPress}
/>

// ❌ Wrong order - ESLint will error
<Button
  onPress={handleSubmit}
  title="Submit"
  disabled
/>
```

### Import Order (Enforced by ESLint)

**CRITICAL**: Import order is automatically enforced by `simple-import-sort`. Follow this exact order:

1. **React** packages (always first)
2. **External packages** (third-party libraries)
3. **Side effect imports**
4. **Parent imports** (`../`)
5. **Same-folder imports** (`./`)

```typescript
// 1. React packages (ALWAYS FIRST)
import React, { useState } from 'react';
import { View, Text } from 'react-native';

// 2. External packages
import { useNavigation } from '@react-navigation/native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

// 3. Parent imports (../)
import { Button } from '../../ui/Button';
import { useAuth } from '../../common/hooks/useAuth';

// 4. Same folder imports (./)
import { formatDate } from './utils';
import type { User } from './types';

// Component code here
```

**ESLint will auto-fix import order** - run `yarn lint --fix` to automatically sort imports.

## React Native Specific

### Platform-Specific Code

```typescript
import { Platform } from 'react-native';

// Prefer Platform.select for simple cases
const padding = Platform.select({
  ios: 20,
  android: 16,
  default: 16,
});

// Use .ios.tsx and .android.tsx for complex platform differences
```

### Deep Linking

Deep linking is handled through React Navigation. Configure linking in your navigation setup:

```typescript
// modules/main/navigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Home: 'home',
      Profile: 'profile/:id',
      Settings: 'settings',
    },
  },
};

export const AppNavigator = () => (
  <NavigationContainer linking={linking}>
    <Stack.Navigator>
      {/* screens */}
    </Stack.Navigator>
  </NavigationContainer>
);
```

**Deep Link URL Examples**:
- `myapp://profile/123` → Opens Profile screen with id=123
- `https://myapp.com/settings` → Opens Settings screen

### Performance Guidelines

- **Memoization**: Use `React.memo`, `useMemo`, `useCallback` appropriately
- **FlatList**: Always use for long lists (never ScrollView + map)
- **Images**: Use `resizeMode` appropriately, optimize image sizes
- **Heavy Computations**: Move to web workers or native modules
- **Unistyles Performance**: Unistyles is compiled at build time and adds <0.1ms overhead
- **Theme Changes**: Use `UnistylesRuntime.setTheme()` for instant theme switching without re-renders

### Styling with Unistyles

**Always use react-native-unistyles** for styling. Never use plain StyleSheet.create.

```typescript
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface UserCardProps {
  userId: string;
  onPress?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ userId, onPress }) => {
  const { styles, theme } = useStyles(stylesheet);
  
  return (
    <View style={styles.container}>
      <Text style={styles.name}>User Name</Text>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: 16,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
}));
```

**Key Unistyles Principles**:
- Use `createStyleSheet` instead of `StyleSheet.create`
- Access theme values via the theme parameter: `(theme) => ({...})`
- Use `useStyles(stylesheet)` hook to get styles and theme
- Leverage breakpoints for responsive design
- Use variants for conditional styling
- Access runtime values (screen dimensions, insets, etc.) via `theme.runtime`

**Theme Setup** (in `src/common/theme/`):
```typescript
// themes.ts
export const lightTheme = {
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    text: '#000000',
    // ... more colors
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
} as const;

export const darkTheme = {
  colors: {
    primary: '#0A84FF',
    background: '#000000',
    text: '#FFFFFF',
    // ... more colors
  },
  spacing: lightTheme.spacing,
} as const;

// unistyles.ts
import { UnistylesRegistry } from 'react-native-unistyles';
import { lightTheme, darkTheme } from './themes';

UnistylesRegistry
  .addThemes({
    light: lightTheme,
    dark: darkTheme,
  })
  .addConfig({
    adaptiveThemes: true,
  });
```

**Responsive Design with Breakpoints**:
```typescript
const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: {
      xs: 8,
      sm: 16,
      md: 24,
    },
  },
}));
```

**Using Variants**:
```typescript
const stylesheet = createStyleSheet((theme) => ({
  button: {
    padding: 12,
    borderRadius: 8,
    variants: {
      type: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
        },
      },
    },
  },
}));

// Usage
<View style={styles.button({ type: 'primary' })} />
```

## State Management

- **Global State**: Redux Toolkit (see module `redux/` folders)
- **Local State**: Use `useState` for component-local state
- **Server State**: RTK Query (never use axios/fetch directly for API calls)
- **Module State**: Each module manages its own Redux slice in `redux/slices.ts`
- **Redux Structure**: 
  - `slices.ts` - Redux Toolkit slices (recommended)
  - `actions.ts` - Action creators if needed
  - `reducers.ts` - Reducers (if not using slices)
  - `selectors.ts` - Memoized selectors
  - `index.ts` - Module exports
- **Avoid**: Prop drilling beyond 2 levels; use Redux or Context

**Example Module Redux Structure**:
```typescript
// modules/auth/redux/slices.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
```

## Environment Configuration

Use `react-native-config` for managing environment variables. Never hardcode API URLs, keys, or environment-specific values.

**Setup**:
```bash
# .env.development
API_BASE_URL=https://dev-api.example.com
SENTRY_DSN=your-dev-dsn
AMPLITUDE_API_KEY=your-dev-key

# .env.production
API_BASE_URL=https://api.example.com
SENTRY_DSN=your-prod-dsn
AMPLITUDE_API_KEY=your-prod-key
```

**Usage**:
```typescript
import Config from 'react-native-config';

// Access environment variables
const apiUrl = Config.API_BASE_URL;
const sentryDsn = Config.SENTRY_DSN;

// In RTK Query baseQuery
baseQuery: fetchBaseQuery({ 
  baseUrl: Config.API_BASE_URL,
}),
```

**TypeScript Types**:
```typescript
// common/types/config.d.ts
declare module 'react-native-config' {
  export interface NativeConfig {
    API_BASE_URL: string;
    SENTRY_DSN: string;
    AMPLITUDE_API_KEY: string;
    // Add all your env vars here
  }

  export const Config: NativeConfig;
  export default Config;
}
```

## Local Storage with MMKV

Use MMKV for all local storage needs. It's significantly faster than AsyncStorage.

**Setup**:
```typescript
// common/services/storage.ts
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'app-storage',
  encryptionKey: 'your-encryption-key', // Optional
});

// Storage utilities
export const storageService = {
  set: (key: string, value: string | number | boolean): void => {
    storage.set(key, value);
  },

  get: (key: string): string | undefined => {
    return storage.getString(key);
  },

  getNumber: (key: string): number | undefined => {
    return storage.getNumber(key);
  },

  getBoolean: (key: string): boolean | undefined => {
    return storage.getBoolean(key);
  },

  delete: (key: string): void => {
    storage.delete(key);
  },

  clearAll: (): void => {
    storage.clearAll();
  },

  // For objects
  setObject: <T>(key: string, value: T): void => {
    storage.set(key, JSON.stringify(value));
  },

  getObject: <T>(key: string): T | undefined => {
    const json = storage.getString(key);
    return json ? JSON.parse(json) : undefined;
  },
};
```

**Usage**:
```typescript
import { storageService } from '@/common/services/storage';

// Store values
storageService.set('user_token', token);
storageService.setBoolean('onboarding_complete', true);
storageService.setObject('user_preferences', { theme: 'dark' });

// Retrieve values
const token = storageService.get('user_token');
const isOnboarded = storageService.getBoolean('onboarding_complete');
const prefs = storageService.getObject<UserPreferences>('user_preferences');
```

**Redux Persist with MMKV**:
```typescript
import { persistStore, persistReducer } from 'redux-persist';
import { MMKV } from 'react-native-mmkv';

const mmkvStorage = new MMKV();

export const reduxStorage = {
  setItem: (key: string, value: string) => {
    mmkvStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = mmkvStorage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    mmkvStorage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['auth', 'settings'], // Only persist these reducers
};
```

## Internationalization (i18n)

Use `react-i18next` for all text content. Never hardcode user-facing strings.

**Setup**:
```typescript
// common/services/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from '@/assets/translations/en.json';
import de from '@/assets/translations/de.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lang: string) => void) => {
    const locales = RNLocalize.getLocales();
    callback(locales[0]?.languageCode || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
  });

export default i18n;
```

**Translation Files** (`assets/translations/en.json`):
```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  },
  "home": {
    "welcome": "Welcome back, {{name}}!",
    "subtitle": "Here's what's new"
  },
  "errors": {
    "network": "Network error. Please try again.",
    "unauthorized": "Please log in to continue"
  }
}
```

**Usage in Components**:
```typescript
import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const HomeScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { styles } = useStyles(stylesheet);

  const userName = 'John';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('home.welcome', { name: userName })}
      </Text>
      <Text>{t('home.subtitle')}</Text>
    </View>
  );
};

// Change language
const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
};
```

**Pluralization**:
```json
{
  "items": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```typescript
{t('items', { count: 1 })} // "1 item"
{t('items', { count: 5 })} // "5 items"
```

```typescript
// Use try-catch for async operations
try {
  const response = await fetchUser(userId);
  setUser(response.data);
} catch (error) {
  if (error instanceof Error) {
    console.error('Failed to fetch user:', error.message);
    // Show user-friendly error
  }
}

// Type error boundaries for components
class ErrorBoundary extends React.Component<Props, State> {
  // Implementation
}
```

## Testing Requirements

- **Unit Tests**: All utility functions and hooks
- **Component Tests**: Critical user flows
- **Testing Library**: [Jest/React Native Testing Library]
- **Coverage**: Aim for 80%+ on utilities

## API Integration with RTK Query

**CRITICAL**: Always use RTK Query for all API calls. Never use axios, fetch, or other HTTP clients directly.

### RTK Query Setup

**Module-Specific API**: Each module should have its own RTK Query API in `services/api.ts`

```typescript
// modules/user/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, UpdateUserRequest } from '../types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'User', id }],
    }),
  }),
});

export const { 
  useGetUserQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} = userApi;
```

### Using RTK Query in Components

```typescript
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useGetUserQuery, useUpdateUserMutation } from '../services/api';

interface UserProfileProps {
  userId: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { styles } = useStyles(stylesheet);
  
  // Query hook - automatically handles loading, error, and data states
  const { data: user, isLoading, error, refetch } = useGetUserQuery(userId);
  
  // Mutation hook
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  
  const handleUpdate = async () => {
    try {
      await updateUser({ id: userId, name: 'New Name' }).unwrap();
      // Success - cache is automatically updated
    } catch (err) {
      // Handle error
      console.error('Failed to update user:', err);
    }
  };
  
  if (isLoading) {
    return <ActivityIndicator />;
  }
  
  if (error) {
    return <Text>Error loading user</Text>;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user?.name}</Text>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: theme.spacing.md,
  },
  name: {
    fontSize: 18,
    color: theme.colors.text,
  },
}));
```

### RTK Query Best Practices

**Queries** (GET requests):
- Use `builder.query` for fetching data
- Automatically cached and shared across components
- Use `providesTags` for cache invalidation
- Polling: `useGetUserQuery(id, { pollingInterval: 3000 })`
- Skip: `useGetUserQuery(id, { skip: !id })`

**Mutations** (POST, PUT, DELETE):
- Use `builder.mutation` for data modifications
- Use `invalidatesTags` to refetch related queries
- Call `.unwrap()` on mutations to handle errors with try/catch
- Optimistic updates supported

**Cache Management**:
```typescript
tagTypes: ['User', 'Post', 'Comment'],

// Provide tags (what data this query provides)
providesTags: (result, error, id) => [{ type: 'User', id }],

// Invalidate tags (what to refetch after mutation)
invalidatesTags: (result, error, id) => [{ type: 'User', id }],

// Multiple tags
providesTags: (result) => 
  result 
    ? [...result.map(({ id }) => ({ type: 'User' as const, id })), 'User']
    : ['User'],
```

**Global API Setup** (if needed in `common/services/`):
```typescript
// common/services/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.API_BASE_URL,
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
```

**Store Configuration**:
```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '@/modules/user/services/api';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
```

### Service Interfaces Pattern

**CRITICAL**: All external services (error tracking, analytics, etc.) must be implemented through interfaces. This allows easy swapping of providers without changing application code.

### Error Tracking Interface

Never import Sentry directly in your code. Use the error tracking interface.

**Interface Definition**:
```typescript
// common/services/errorTracking/types.ts
export interface ErrorTrackingService {
  initialize: (config: ErrorTrackingConfig) => void;
  captureException: (error: Error, context?: ErrorContext) => void;
  captureMessage: (message: string, level?: ErrorLevel) => void;
  setUser: (user: User | null) => void;
  addBreadcrumb: (breadcrumb: Breadcrumb) => void;
  setContext: (key: string, value: unknown) => void;
}

export interface ErrorTrackingConfig {
  dsn: string;
  environment: string;
  enabled: boolean;
}

export type ErrorLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

export interface ErrorContext {
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
  level?: ErrorLevel;
}

export interface Breadcrumb {
  message: string;
  category?: string;
  level?: ErrorLevel;
  data?: Record<string, unknown>;
}
```

**Sentry Implementation**:
```typescript
// common/services/errorTracking/sentry.ts
import * as Sentry from '@sentry/react-native';
import type { 
  ErrorTrackingService, 
  ErrorTrackingConfig 
} from './types';

class SentryErrorTracking implements ErrorTrackingService {
  initialize(config: ErrorTrackingConfig): void {
    if (!config.enabled) return;

    Sentry.init({
      dsn: config.dsn,
      environment: config.environment,
      tracesSampleRate: 1.0,
    });
  }

  captureException(error: Error, context?: ErrorContext): void {
    Sentry.captureException(error, {
      tags: context?.tags,
      extra: context?.extra,
      level: context?.level,
    });
  }

  captureMessage(message: string, level: ErrorLevel = 'info'): void {
    Sentry.captureMessage(message, level);
  }

  setUser(user: User | null): void {
    Sentry.setUser(user ? { id: user.id, email: user.email } : null);
  }

  addBreadcrumb(breadcrumb: Breadcrumb): void {
    Sentry.addBreadcrumb({
      message: breadcrumb.message,
      category: breadcrumb.category,
      level: breadcrumb.level,
      data: breadcrumb.data,
    });
  }

  setContext(key: string, value: unknown): void {
    Sentry.setContext(key, value);
  }
}

export const sentryErrorTracking = new SentryErrorTracking();
```

**Service Factory**:
```typescript
// common/services/errorTracking/index.ts
import Config from 'react-native-config';

import { sentryErrorTracking } from './sentry';
import type { ErrorTrackingService } from './types';

// Export the interface, not the implementation
export const errorTracking: ErrorTrackingService = sentryErrorTracking;

// Initialize on app start
export const initializeErrorTracking = (): void => {
  errorTracking.initialize({
    dsn: Config.SENTRY_DSN,
    environment: Config.ENVIRONMENT || 'development',
    enabled: Config.ENVIRONMENT === 'production',
  });
};
```

**Usage in App**:
```typescript
import { errorTracking } from '@/common/services/errorTracking';

// Capture errors
try {
  await someFunction();
} catch (error) {
  errorTracking.captureException(error as Error, {
    tags: { feature: 'authentication' },
    extra: { userId: user.id },
  });
}

// Add breadcrumbs
errorTracking.addBreadcrumb({
  message: 'User navigated to profile',
  category: 'navigation',
  level: 'info',
});

// Set user context
errorTracking.setUser(currentUser);
```

### Analytics Interface

Never import Amplitude directly. Use the analytics interface.

**Interface Definition**:
```typescript
// common/services/analytics/types.ts
export interface AnalyticsService {
  initialize: (config: AnalyticsConfig) => void;
  identify: (userId: string, traits?: UserTraits) => void;
  track: (event: string, properties?: EventProperties) => void;
  screen: (screenName: string, properties?: EventProperties) => void;
  reset: () => void;
}

export interface AnalyticsConfig {
  apiKey: string;
  enabled: boolean;
}

export interface UserTraits {
  email?: string;
  name?: string;
  plan?: string;
  [key: string]: unknown;
}

export interface EventProperties {
  [key: string]: string | number | boolean | null;
}
```

**Amplitude Implementation**:
```typescript
// common/services/analytics/amplitude.ts
import { Amplitude } from '@amplitude/react-native';
import type { AnalyticsService, AnalyticsConfig } from './types';

class AmplitudeAnalytics implements AnalyticsService {
  private client: Amplitude | null = null;

  initialize(config: AnalyticsConfig): void {
    if (!config.enabled) return;

    this.client = Amplitude.getInstance();
    this.client.init(config.apiKey);
  }

  identify(userId: string, traits?: UserTraits): void {
    if (!this.client) return;
    
    this.client.setUserId(userId);
    if (traits) {
      this.client.setUserProperties(traits);
    }
  }

  track(event: string, properties?: EventProperties): void {
    if (!this.client) return;
    this.client.logEvent(event, properties);
  }

  screen(screenName: string, properties?: EventProperties): void {
    if (!this.client) return;
    this.client.logEvent('Screen Viewed', {
      screen: screenName,
      ...properties,
    });
  }

  reset(): void {
    if (!this.client) return;
    this.client.setUserId(null);
    this.client.regenerateDeviceId();
  }
}

export const amplitudeAnalytics = new AmplitudeAnalytics();
```

**Service Factory**:
```typescript
// common/services/analytics/index.ts
import Config from 'react-native-config';

import { amplitudeAnalytics } from './amplitude';
import type { AnalyticsService } from './types';

// Export the interface, not the implementation
export const analytics: AnalyticsService = amplitudeAnalytics;

export const initializeAnalytics = (): void => {
  analytics.initialize({
    apiKey: Config.AMPLITUDE_API_KEY,
    enabled: Config.ENVIRONMENT === 'production',
  });
};
```

**Usage in App**:
```typescript
import { analytics } from '@/common/services/analytics';

// Track events
analytics.track('Button Clicked', {
  button_name: 'submit',
  screen: 'checkout',
});

// Track screen views
analytics.screen('Profile Screen', {
  user_id: user.id,
});

// Identify users
analytics.identify(user.id, {
  email: user.email,
  name: user.name,
  plan: 'premium',
});
```

**Benefits of Interface Pattern**:
1. ✅ Easy to switch from Sentry to Bugsnag or other providers
2. ✅ Easy to switch from Amplitude to Mixpanel or other analytics
3. ✅ Can mock services easily for testing
4. ✅ Application code doesn't depend on third-party SDKs
5. ✅ Can implement multiple providers simultaneously
6. ✅ Type-safe across all implementations

## Standard App Entry Point

All apps should follow this standard initialization pattern in the main App component:

```typescript
// modules/main/screens/App.tsx
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/common/store';
import { initializeErrorTracking } from '@/common/services/errorTracking';
import { initializeAnalytics } from '@/common/services/analytics';
import '@/common/services/i18n'; // Initialize i18n

import { AppNavigator } from '../navigator';

// Initialize services before app renders
initializeErrorTracking();
initializeAnalytics();

export const App: React.FC = () => {
  useEffect(() => {
    // Any additional initialization logic
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
```

**Key Components**:
1. **SafeAreaProvider** - Handles safe areas on all devices
2. **Provider** - Redux store provider
3. **PersistGate** - Delays rendering until persisted state is retrieved
4. **Service Initialization** - Error tracking and analytics before render
5. **i18n Import** - Initializes translations

**Initialization Order** (Important):
1. Error tracking (catch early errors)
2. Analytics (track app opens)
3. i18n (load translations)
4. Redux store (with persistence)
5. Navigation (main app)

## Development Tools

### VSCode Snippets

Install the [React Native Dev Snippets](https://marketplace.visualstudio.com/items?itemName=Menelaia.react-native-dev-snippets) extension for faster development.

**Most Used Snippets**:

| Snippet | Description | Output |
|---------|-------------|--------|
| `rnf→` | React Native Functional Component | Component with hooks imports |
| `rnfd→` | RN Functional Component (default export) | Component with default export |
| `rnfm→` | RN Functional Component with React.memo | Memoized component |
| `ust→` | useState hook | `const [state, setState] = useState();` |
| `uef→` | useEffect hook | `useEffect(() => {}, []);` |
| `uca→` | useCallback hook | `const fn = useCallback(() => {}, []);` |
| `ume→` | useMemo hook | `const value = useMemo(() => {}, []);` |
| `udi→` | useDispatch hook | `const dispatch = useDispatch();` |
| `usl→` | useSelector hook | `const value = useSelector(state => state);` |
| `rdxi→` | Redux imports | Import useDispatch and useSelector |

**Note**: While snippets provide PropTypes, we use TypeScript interfaces instead. Adapt the output accordingly.

**Example Usage**:
1. Type `rnf` and press Tab
2. Component name will be auto-filled from filename
3. Remove PropTypes sections
4. Add TypeScript interface for props
5. Add Unistyles for styling

### Debugging

**React Native Debugger**:
- Use Reactotron for debugging (recommended)
- React DevTools for component inspection
- Redux DevTools for state inspection

**Logging**:
```typescript
// Development only logging
if (__DEV__) {
  console.log('Debug info:', data);
}

// Use error tracking for production issues
errorTracking.captureMessage('Important event', 'info');
```

**Network Debugging**:
- Flipper Network plugin shows all API calls
- RTK Query DevTools for query inspection

## Error Handling with RTK Query

```typescript
const { data, error, isLoading } = useGetUserQuery(userId);

if (error) {
  if ('status' in error) {
    // FetchBaseQueryError
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
    return <Text>Error: {errMsg}</Text>;
  } else {
    // SerializedError
    return <Text>Error: {error.message}</Text>;
  }
}
```

### When NOT to Use RTK Query

RTK Query is for server state only. Don't use it for:
- File uploads (use native fetch or axios)
- WebSocket connections (use separate WebSocket client)
- Non-HTTP protocols
- One-off requests that don't need caching

## Accessibility

**Accessibility is enforced by ESLint (jsx-a11y)**. All interactive elements must include proper accessibility props.

**Required for all interactive elements**:
- `accessibilityLabel` - Describes the element
- `accessibilityRole` - Defines the element's role
- `accessibilityHint` - Provides usage hint (optional but recommended)
- `accessible={true}` - Makes element accessible to screen readers

**Common roles**:
- `button` - Buttons and pressable elements
- `link` - Navigation links
- `text` - Static text
- `image` - Images
- `header` - Section headers
- `none` - Decorative elements

```typescript
// ✅ Correct - Full accessibility
<TouchableOpacity
  accessible
  accessibilityLabel="Submit form"
  accessibilityRole="button"
  accessibilityHint="Submits the registration form"
  onPress={handleSubmit}
>
  <Text>Submit</Text>
</TouchableOpacity>

// ❌ Wrong - ESLint will error
<TouchableOpacity onPress={handleSubmit}>
  <Text>Submit</Text>
</TouchableOpacity>
```

**Images must have alt text**:
```typescript
// ✅ Correct
<Image 
  source={avatar} 
  accessibilityLabel="User profile picture"
/>

// ❌ Wrong - ESLint will error
<Image source={avatar} />
```

**Text contrast**: Ensure sufficient color contrast (WCAG AA minimum - 4.5:1 for normal text, 3:1 for large text)

**Test with screen readers**:
- iOS: VoiceOver
- Android: TalkBack

## Git Commit Conventions

This project uses [Gitmoji](https://gitmoji.dev) for commit messages. Start each commit with an emoji that represents the type of change.

**Format**: `<emoji> <description>`

**Most Common Gitmojis**:
- ✨ `:sparkles:` - Introduce new features
- 🐛 `:bug:` - Fix a bug
- 🚑️ `:ambulance:` - Critical hotfix
- ♻️ `:recycle:` - Refactor code
- 🎨 `:art:` - Improve structure/format of code
- ⚡️ `:zap:` - Improve performance
- 📝 `:memo:` - Add or update documentation
- 🔥 `:fire:` - Remove code or files
- 💄 `:lipstick:` - Add or update UI/styles
- ✅ `:white_check_mark:` - Add or update tests
- 🚧 `:construction:` - Work in progress
- 🔧 `:wrench:` - Add or update config files
- ⬆️ `:arrow_up:` - Upgrade dependencies
- ⬇️ `:arrow_down:` - Downgrade dependencies
- 🏷️ `:label:` - Add or update types
- 🔒️ `:lock:` - Fix security issues
- 🚚 `:truck:` - Move or rename files
- 💥 `:boom:` - Introduce breaking changes
- ♿️ `:wheelchair:` - Improve accessibility
- 🌐 `:globe_with_meridians:` - i18n and localization
- 🗃️ `:card_file_box:` - Database changes
- 📱 `:iphone:` - Work on responsive design

**Examples**:
```
✨ Add user profile screen
🐛 Fix crash on logout
♻️ Refactor auth module redux structure
🎨 Improve navigation component structure
📝 Update AGENTS.md with new conventions
⚡️ Optimize FlatList rendering in messages
🔧 Update TypeScript config
⬆️ Upgrade react-navigation to v7
🏷️ Add types for user API responses
```

**Full Reference**: https://gitmoji.dev

## Common Anti-Patterns to Avoid

❌ **Don't:**
- Use `var` (use `const` or `let`)
- Mutate state directly
- Forget to clean up subscriptions in `useEffect`
- Use index as key in lists
- Hardcode strings (use i18n with `react-i18next`)
- Leave console.logs in code (warnings will show)
- Use default exports (prefer named exports)
- Use plain `StyleSheet.create` (use Unistyles instead)
- Hardcode colors or spacing values (use theme)
- Use inline styles (ESLint will error)
- Use color literals like `'#FF0000'` (ESLint will error)
- Create unused styles (ESLint will error)
- Exceed 90 character line length
- Use single element style arrays `[styles.container]` (use object directly)
- Use axios, fetch, or other HTTP clients directly (use RTK Query)
- Manually manage loading/error states for API calls (RTK Query handles this)
- Import Sentry or Amplitude directly (use service interfaces)
- Use AsyncStorage (use MMKV instead)
- Hardcode API URLs or keys (use react-native-config)
- Hardcode user-facing text (use i18n)

✅ **Do:**
- Use TypeScript strict mode
- Implement error boundaries
- Handle loading and error states
- Optimize images and assets
- Test on both iOS and Android
- Use proper typing for navigation
- Document complex logic
- Use Unistyles for all styling
- Leverage theme values for consistency
- Use breakpoints for responsive design
- Provide default values for all optional props
- Sort JSX props correctly (key, shorthand, props, callbacks)
- Include accessibility labels for all interactive elements
- Remove unused imports (ESLint will warn)
- Keep lines under 90 characters
- Use RTK Query for all API calls
- Use cache invalidation tags properly
- Handle RTK Query errors appropriately
- Use service interfaces for external services
- Use MMKV for local storage
- Use react-native-config for environment variables
- Use i18n for all user-facing text
- Initialize services in correct order
- Configure deep linking through React Navigation

## Code Review Checklist

Before submitting code, ensure:
- [ ] TypeScript compiles with no errors
- [ ] ESLint passes with no errors or warnings (`yarn lint`)
- [ ] Import order is correct (run `yarn lint --fix` to auto-sort)
- [ ] All lines are under 90 characters
- [ ] No unused imports remain
- [ ] No console.logs in code
- [ ] Tests pass
- [ ] All interactive elements have accessibility labels
- [ ] No inline styles or color literals used
- [ ] All styles use theme values
- [ ] Optional props have default values
- [ ] JSX props are sorted correctly
- [ ] Error handling implemented
- [ ] Code follows conventions in this document

## AI Agent Specific Instructions

When generating code:
1. **Always** include proper TypeScript types
2. **Prefer** functional components with hooks
3. **Use** explicit return types for functions
4. **Include** error handling and loading states
5. **Add** comments for complex logic only
6. **Follow** the file structure defined above
7. **Extract** reusable logic into custom hooks
8. **Consider** performance implications
9. **Add** basic tests for new utilities
10. **Use** Unistyles for all styling (never plain StyleSheet)
11. **Access** theme values instead of hardcoding
12. **Leverage** breakpoints for responsive layouts
13. **Ensure** all lines are under 90 characters
14. **Add** accessibility labels to all interactive elements
15. **Provide** default values for optional props
16. **Sort** JSX props correctly (key, shorthand, regular, callbacks)
17. **Avoid** inline styles and color literals
18. **Remove** any unused imports or styles
19. **Follow** the exact import order enforced by ESLint
20. **Use** RTK Query for all API calls (never axios/fetch directly)
21. **Implement** proper cache tags for queries and mutations
22. **Handle** RTK Query loading and error states
23. **Use** service interfaces for error tracking and analytics
24. **Use** MMKV for local storage (never AsyncStorage)
25. **Use** react-native-config for environment variables
26. **Use** i18n for all user-facing text
27. **Configure** deep linking through React Navigation
28. **Follow** the standard App entry point pattern

When refactoring:
1. Maintain existing functionality
2. Improve type safety
3. Reduce code duplication
4. Update related tests
5. Preserve accessibility features
6. Run `yarn lint --fix` to auto-fix import order and formatting
7. Ensure ESLint passes with zero errors/warnings
8. Convert any direct API calls to RTK Query
9. Add proper cache invalidation tags
10. Migrate AsyncStorage to MMKV if found
11. Extract hardcoded strings to i18n
12. Ensure all external services use interfaces

When creating new API endpoints:
1. Always use RTK Query's `createApi`
2. Place API definition in module's `services/api.ts`
3. Use appropriate tags for cache management
4. Export generated hooks for use in components
5. Type all requests and responses properly
6. Handle authentication in `prepareHeaders`
7. Add proper error handling

When integrating external services:
1. Create an interface in `common/services/[service]/types.ts`
2. Implement the interface for the specific provider
3. Export the interface, not the implementation
4. Use react-native-config for API keys
5. Initialize services in the App entry point
6. Never import the provider directly in application code

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [React Native Unistyles](https://unistyl.es/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [React Navigation](https://reactnavigation.org/)
- [react-i18next Documentation](https://react.i18next.com/)
- [MMKV Documentation](https://github.com/mrousavy/react-native-mmkv)
- [react-native-config Documentation](https://github.com/luggit/react-native-config)
- [Gitmoji Reference](https://gitmoji.dev/)
- [VSCode Snippets Extension](https://marketplace.visualstudio.com/items?itemName=Menelaia.react-native-dev-snippets)

---

**Last Updated**: 15.11.2025
**Maintained By**: @ltatarev
