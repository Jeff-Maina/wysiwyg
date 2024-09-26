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
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import React from "react";

type TLinkModalProps = {
  linkText: string;
  linkUrl: string;
  setLinkText: (value: string) => void;
  setLinkUrl: (value: string) => void;
  onSubmit: () => void;
  toggleLinkModal: () => void;
  isModalOpen: boolean;
};

const LinkModal = ({
  linkText,
  linkUrl,
  setLinkText,
  setLinkUrl,
  isModalOpen,
  toggleLinkModal,
  onSubmit,
}: TLinkModalProps) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={toggleLinkModal}>
      <DialogContent className="w-[400px] p-4">
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
          <DialogDescription className="sr-only">add link.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label className="text-sm font-medium" htmlFor="title">
              Text
            </Label>
            <Input
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              name="title"
              type="text"
            />
          </div>
          <div className="grid gap-1.5">
            <Label className="text-sm font-medium" htmlFor="link">
              Link
            </Label>
            <Input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              type="url"
              name="link"
            />
          </div>
        </div>
        <DialogFooter className="w-full grid grid-cols-2">
          <DialogClose asChild className="w-full">
            <Button className="w-full" variant={"outline"} size={"sm"}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={() => {
              onSubmit();
            }}
            disabled={linkUrl === ""}
            className={cn(
              "bg-neutral-200 ",
              linkUrl === ""
                ? "cursor-not-allowed bg-neutral-200 hover:bg-neutral-300"
                : "bg-green-600 text-white hover:bg-green-700"
            )}
            variant={"secondary"}
            size={"sm"}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkModal;
