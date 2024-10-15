import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
        Login
      </h2>
      <form className="mt-6 space-y-4">
        <Input
          placeholder="Email"
          type="email"
          className="dark:bg-gray-700 w-full"
        />
        <Input
          placeholder="Password"
          type="password"
          className="dark:bg-gray-700 w-full"
        />
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 dark:text-blue-400"
          >
            Forgot Password?
          </Link>
        </div>
        <Button  variant="outline" className="w-full ">
          Sign In
        </Button>
      </form>
      <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
        Don&lsquo;t have an account?{" "}
        <Link href="/signup" className="text-pink-600 font-semibold dark:text-blue-400">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
