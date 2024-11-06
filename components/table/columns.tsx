"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { servizii } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { appuntamenti } from "@/types/appwrite.types";

import { StatusBadge } from "../StatusBadge";
import { appuntamentiModal } from "../appuntamentiModal";

export const columns: ColumnDef<appuntamenti>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "clienti",
    header: "Clienti",
    cell: ({ row }) => {
      const appuntamenti = row.original;
      return <p className="text-14-medium ">{appuntamenti.clienti.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Stato",
    cell: ({ row }) => {
      const appuntamenti = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appuntamenti.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appuntamento",
    cell: ({ row }) => {
      const appuntamenti = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appuntamenti.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Servizio",
    cell: ({ row }) => {
      const appuntamenti = row.original;

      const servizi = servizii.find(
        (servizi) => servizi.name === appuntamenti.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={servizi?.image!}
            alt="servizi"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">. {servizi?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appuntamenti = row.original;

      return (
        <div className="flex gap-1">
          <appuntamentiModal
            clientiId={appuntamenti.clienti.$id}
            userId={appuntamenti.userId}
            appuntamenti={appuntamenti}
            type="schedule"
            title="Schedule appuntamenti"
            description="Please confirm the following details to schedule."
          />
          <appuntamentiModal
            clientiId={appuntamenti.clienti.$id}
            userId={appuntamenti.userId}
            appuntamenti={appuntamenti}
            type="cancel"
            title="Cancel appuntamenti"
            description="Are you sure you want to cancel your appuntamenti?"
          />
        </div>
      );
    },
  },
];