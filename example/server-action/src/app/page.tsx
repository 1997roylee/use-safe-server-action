"use client";

import { useSafeServerAction } from "use-safe-server-action";
import { login } from "./action";

export default function Home() {
  const { mutate, mutateAsync, data, errors, state } =
    useSafeServerAction(login);

  const handleLogin = () => {
    mutate("roy@gmail.com");
  };

  const handleLoginAsync = async () => {
    const result = await mutateAsync("demo@gmail.com");
    console.log("result", result);
    if (result.ok) {
      alert("success");
    } else {
      alert("error");
    }
  };

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-3">
          <button
            className="bg-black text-white p-3 w-24"
            onClick={handleLogin}
          >
            run
          </button>
          <button
            className="bg-black text-white p-3 w-24"
            onClick={handleLoginAsync}
          >
            run async
          </button>
          {state.isLoading && <p>loading...</p>}
          {state.isSuccess && <p>success. {JSON.stringify(data)}</p>}
          {state.isError && <p>error. {JSON.stringify(errors.message)}</p>}
        </div>
      </main>
    </div>
  );
}
