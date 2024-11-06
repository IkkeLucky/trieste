"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { appuntamenti } from "@/types/appwrite.types";


import "react-datepicker/dist/react-datepicker.css";
import AppuntamentiForm from "./forms/AppuntamentiForm";

export const appuntamentiModal = ({
  clientiId,
  userId,
  appuntamenti,
  type,
}: {
  clientiId: string;
  userId: string;
  appuntamenti?: appuntamenti;
  type: "schedule" | "cancel";
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500"}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} appuntamenti</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} appuntamenti
          </DialogDescription>
        </DialogHeader>

        <AppuntamentiForm
          userId={userId}
          clientiId={clientiId}
          type={type}
          appuntamenti={appuntamenti}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};