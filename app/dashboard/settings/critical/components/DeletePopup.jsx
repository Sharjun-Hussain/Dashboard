import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DeletePopUp({ text }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">{text}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle> {text}</DialogTitle>
          <DialogDescription className="mb-3">
            Once you {text}, there is no going back. Please be certain.
          </DialogDescription>
          <Button variant="destructive">{text}</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
