import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPassword() {
    return (
      
         <div>
           <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Reset Password</h2>
          <form className="mt-6 space-y-4">
            <Input placeholder="New Password" type="password" className="dark:bg-gray-700 w-full" />
            <Input placeholder="Confirm Password" type="password" className="dark:bg-gray-700 w-full" />
            <Button variant="outline" className="w-full">Reset Password</Button>
          </form>
         </div>
        
    );
  }
  