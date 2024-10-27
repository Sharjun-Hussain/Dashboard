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
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddOfficeModal() {
  const [code, setcode] = useState(null);
  const [office_name, setoffice_name] = useState(null);
  const [address, setaddress] = useState(null);
  const [phone_number, setphone_number] = useState(null);
  const [email, setemail] = useState(null);

  const handleSubmit =async (e) => {
    e.preventDefault();
   const res =  await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/office`,
      {
        code: code,
        office_name: office_name,
        address: address,
        phone_number: phone_number,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(res);
    
  };
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Dialog>
      <DialogTrigger asChild className="mt-3">
        {isMobile ? (
          <Plus className="mt-[20px] hover:cursor-pointer" />
        ) : (
          <Button className="pe-2 ps-1" variant="outline">
            {" "}
            <Plus size={15} className="me-1" />
            Add Branch Office
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[455px] w-full  bg-card dark:bg-accent">
        <form onSubmit={handleSubmit}>

        <DialogHeader>
          <DialogTitle>Add Branch Office</DialogTitle>
          <DialogDescription className="text-gray-600">
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-4 pt-4">
          <div className="flex-row ">
            <div className=" items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Branch Name
              </Label>
              <Input id="name" onChange={(e)=>setoffice_name(e.target.value)} className="col-span-3 " />
            </div>
            <div className=" items-center gap-4 pt-4">
              <Label htmlFor="branchcode" className="text-right">
                Branch Code
              </Label>
              <Input id="branchcode" onChange={(e)=>setcode(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <div className="flex-row">
            <div className=" items-center gap-4 ">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" name="email" onChange={(e)=>setemail(e.target.value)} className="col-span-3 " />
            </div>
            <div className=" items-center gap-4 pt-4">
              <Label htmlFor="phone_number"  className="text-right">
                Pnone Number
              </Label>
              <Input
                id="phone_number"
                name="phone_number"
                className="col-span-3" onChange={(e)=>setphone_number(e.target.value)}
                />
            </div>
          </div>
        </div>
        <div>
          <div className=" items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input id="address" name="address" onChange={(e)=>setaddress(e.target.value)} className="col-span-3 " />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" type="submit">
            Add Branch
          </Button>
        </DialogFooter>
                </form>
      </DialogContent>
    </Dialog>
  );
}
