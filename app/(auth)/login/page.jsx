"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const session = useSession()
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (data.ok) {
      router.push("/dashboard");
      console.log( data);
      
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
        Login
      </h2>
      {error && <pre>{error}</pre>}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          placeholder="Email"
          type="email"
          value={email}
          className="dark:bg-gray-700 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          className="dark:bg-gray-700 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 dark:text-blue-400"
          >
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" variant="outline" className="w-full ">
          Sign In
        </Button>
      </form>
      <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
        Don&lsquo;t have an account?{" "}
        <Link
          href="/signup"
          className="text-pink-600 font-semibold dark:text-blue-400"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
