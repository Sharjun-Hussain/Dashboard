import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
        Forgot Password
      </h2>
      <form className="mt-6 space-y-4">
        <Input
          placeholder="Email"
          type="email"
          className="dark:bg-gray-700 w-full"
        />
        <Button variant="outline" className="w-full">
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}
