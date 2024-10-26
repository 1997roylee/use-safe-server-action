# useSafeServerAction Hook

A React hook for safely handling server actions with loading, success, and error states.

## Installation

```bash
npm install use-safe-server-action
```

## Features

- Type-safe server action handling
- Automatic loading, success, and error states
- Supports both synchronous and asynchronous mutations
- TypeScript ready

## Usage

### Basic Example

```tsx
import { useSafeServerAction } from '@your-package/safe-server-action';

// Define your server action
"use server";
async function createUser(userData: UserData) {
  // Your server action logic here
  return await db.users.create(userData);
}

"use client";
function UserForm() {
  const { state, data, errors, mutate } = useSafeServerAction(createUser);

  const handleSubmit = (formData: UserData) => {
    mutate(formData);
  };

  return (
    <div>
      {state.isLoading && <div>Loading...</div>}
      {state.isError && <div>Error: {errors?.message}</div>}
      {state.isSuccess && <div>User created successfully!</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Your form fields */}
      </form>
    </div>
  );
}
```

### With Async Handler

```tsx
function UserForm() {
  const { mutateAsync } = useSafeServerAction(createUser);

  const handleSubmit = async (formData: UserData) => {
    const response = await mutateAsync(formData);
    
    if (response.success) {
      // Handle success
      console.log(response.data);
    } else {
      // Handle error
      console.error(response.error);
    }
  };
}
```

## API Reference

### `useSafeServerAction<TData, TError>`

#### Parameters

- `serverFn: (...args: any[]) => Promise<TData>` - The server action function to execute

#### Returns

```typescript
{
  state: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  data: TData | null;
  errors: TError | null;
  mutate: (...args: any[]) => void;
  mutateAsync: (...args: any[]) => Promise<ApiResponse<TData, TError>>;
}
```

#### State Properties

- `isLoading`: Indicates if the server action is in progress
- `isError`: Indicates if the server action failed
- `isSuccess`: Indicates if the server action completed successfully
- `data`: Contains the successful response data
- `errors`: Contains error information if the action failed

#### Methods

- `mutate`: Executes the server action without returning a promise
- `mutateAsync`: Executes the server action and returns a promise with the result

## TypeScript Support

The hook is fully typed and supports generic type parameters:

```typescript
interface User {
  id: string;
  name: string;
}

interface ApiError {
  code: string;
  message: string;
}

const { data, errors } = useSafeServerAction<User, ApiError>(createUser);
// data is typed as User | null
// errors is typed as ApiError | null
```

## License

MIT