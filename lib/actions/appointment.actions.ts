'use server'

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { appointment_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { appointment } from "@/types/appwrite.types";

export const createappointment = async (appointment: CreateappointmentParams) => {
    try {
        const newappointment = await databases.createDocument(
            DATABASE_ID!,
            appointment_COLLECTION_ID!,
            ID.unique(),
            appointment
          )
      
          revalidatePath("/admin");
          return parseStringify(newappointment);
    } catch (error) {
        console.error("An error occurred while creating a new appointment:", error);
    }
}

export const getappointment = async (appointmentsd: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            appointment_COLLECTION_ID!,
            appointmentsd
        )

        return parseStringify(appointment)
    } catch (error) {
        console.log(error)
    }
}

export const getRecentappointmentsList = async () => {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            appointment_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );

        const initialCounts = {
            scheduledCount: 1,
            pendingCount: 1,
            cancelledCount: 1,
        }

        const counts = (appointments.documents as appointment[]).reduce((acc, appointment) => {
            switch (appointment.status) {
                case "scheduled":
                  acc.scheduledCount++;
                  break;
                case "pending":
                  acc.pendingCount++;
                  break;
                case "cancelled":
                  acc.cancelledCount++;
                  break;
            }

            return acc;
        }, initialCounts);

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        }

        return parseStringify(data);
    } catch (error) {
        console.log(error)
    }
}

//  UPDATE appointment
export const updateappointment = async ({
    appointmentsd,
    userId,
    // timeZone,
    appointment,
    type,
  }: UpdateappointmentParams) => {
    try {
      // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
      const updatedappointment = await databases.updateDocument(
        DATABASE_ID!,
        appointment_COLLECTION_ID!,
        appointmentsd,
        appointment
      );
  
      if (!updatedappointment) throw Error;
  
    //   const smsMessage = `Greetings from CarePulse. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;
    //   await sendSMSNotification(userId, smsMessage);
  
      revalidatePath("/admin");
      return parseStringify(updatedappointment);
    } catch (error) {
      console.error("An error occurred while scheduling an appointment:", error);
    }
  };