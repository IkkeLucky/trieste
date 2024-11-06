"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { appointment } from "@/types/appwrite.types";

import { StatusBadge } from "../StatusBadge";
import { appointmentModal } from "../appointmentModal";

export const columns: ColumnDef<appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium ">{appointment.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Stato",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appuntamento",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "doctoro",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctor = doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-1">
          <appointmentModal
            patientsd={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="schedule"
            title="Schedule appointment"
            description="Please confirm the following details to schedule."
          />
          <appointmentModal
            patientsd={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="cancel"
            title="Cancel appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];