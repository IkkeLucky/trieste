'use server'

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { appuntamenti_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { appuntamenti } from "@/types/appwrite.types";

export const createappuntamenti = async (appuntamenti: CreateappuntamentiParams) => {
    try {
        const newappuntamenti = await databases.createDocument(
            DATABASE_ID!,
            appuntamenti_COLLECTION_ID!,
            ID.unique(),
            appuntamenti
          )
      
          revalidatePath("/admin");
          return parseStringify(newappuntamenti);
    } catch (error) {
        console.error("An error occurred while creating a new appuntamenti:", error);
    }
}

export const getappuntamenti = async (appuntamentiId: string) => {
    try {
        const appuntamenti = await databases.getDocument(
            DATABASE_ID!,
            appuntamenti_COLLECTION_ID!,
            appuntamentiId
        )

        return parseStringify(appuntamenti)
    } catch (error) {
        console.log(error)
    }
}

export const getRecentappuntamentiiList = async () => {
    try {
        const appuntamentii = await databases.listDocuments(
            DATABASE_ID!,
            appuntamenti_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        const counts = (appuntamentii.documents as appuntamenti[]).reduce((acc, appuntamenti) => {
            switch (appuntamenti.status) {
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
            totalCount: appuntamentii.total,
            ...counts,
            documents: appuntamentii.documents
        }

        return parseStringify(data);
    } catch (error) {
        console.log(error)
    }
}

//  UPDATE appuntamenti
export const updateappuntamenti = async ({
    appuntamentiId,
    userId,
    // timeZone,
    appuntamenti,
    type,
  }: UpdateappuntamentiParams) => {
    try {
      // Update appuntamenti to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
      const updatedappuntamenti = await databases.updateDocument(
        DATABASE_ID!,
        appuntamenti_COLLECTION_ID!,
        appuntamentiId,
        appuntamenti
      );
  
      if (!updatedappuntamenti) throw Error;
  
    //   const smsMessage = `Greetings from CarePulse. ${type === "schedule" ? `Your appuntamenti is confirmed for ${formatDateTime(appuntamenti.schedule!, timeZone).dateTime} with Dr. ${appuntamenti.primaryPhysician}` : `We regret to inform that your appuntamenti for ${formatDateTime(appuntamenti.schedule!, timeZone).dateTime} is cancelled. Reason:  ${appuntamenti.cancellationReason}`}.`;
    //   await sendSMSNotification(userId, smsMessage);
  
      revalidatePath("/admin");
      return parseStringify(updatedappuntamenti);
    } catch (error) {
      console.error("An error occurred while scheduling an appuntamenti:", error);
    }
  };