export type User = {
  email: string;
  // token: string;
};

export async function login(email: string) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, 1000);
  });

  if (email === "demo@gmail.com") {
    return {
      email: email,
    };
  }

  throw new Error("Invalid email");
}
