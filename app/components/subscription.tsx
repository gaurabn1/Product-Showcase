import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/Input";
import Button from "./ui/Button";
import toast from "react-hot-toast";
import { sendEmail } from "../contact/lib/send-message";
import { FormEvent, useState } from "react";

export default function Subscription() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }
    const response = await sendEmail({ email });
    if (response === 201) {
      setEmail("");
      setTimeout(() => {
        setOpen(false);
      }, 100)
    }
  };

  return (
    <div className="border border-gray-400 mt-5 w-fit py-2 px-5 hover:bg-gray-500 hover:text-white">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger onClick={() => setOpen(true)}>Subscribe</PopoverTrigger>
        <PopoverContent className="w-fit">
          <h2 className="text-xl mb-2">Subscribe to our newsletter</h2>
          <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-2 border border-gray-400"
              placeholder="Enter your email"
            />
            <Button
              variant="secondary"
              className="border border-gray-400 w-fit py-2 px-5 hover:bg-gray-400 hover:text-white"
            >
              Send
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div >
  );
}
