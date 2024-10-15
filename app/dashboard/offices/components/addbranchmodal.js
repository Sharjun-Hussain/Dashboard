import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMediaQuery from "@/Hooks/useMediaQuery";
import { Plus } from "lucide-react";

export default function DialogDemo() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Dialog>
      <DialogTrigger asChild className="mt-3">
        {isMobile ? (
          <Plus className="mt-[20px] hover:cursor-pointer" />
        ) : (
          <Button className="pe-2 ps-1" variant="outline"> <Plus size={15} className="me-1" />Add Branches</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-full bg-card dark:bg-accent">
        <DialogHeader>
          <DialogTitle>Add Branches</DialogTitle>
          <DialogDescription className="text-gray-600">
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Branch Name
            </Label>
            <Input
              id="name"
              defaultValue="Batticoloa Branch"
              className="col-span-3 "
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="branchcode" className="text-right">
              Branch Code
            </Label>
            <Input
              id="branchcode"
              defaultValue="CMB_3322"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" type="submit">Add Branch</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
