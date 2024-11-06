"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { getappuntamentiichema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/clienti.actions"
import { Dispatch, SetStateAction, useState } from "react";
import { FormFieldType } from "./ClientiForm"
import { servizii } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { createappuntamenti, updateappuntamenti } from "@/lib/actions/appuntamenti.actions"
import { appuntamenti } from "@/types/appwrite.types"


 
const AppuntamentiForm = ({ userId, clientiId, type, appuntamenti, setOpen}: 
  {userId: string; 
    clientiId: string; 
    type: "create" | "cancel" | "schedule";
    appuntamenti?: appuntamenti;
    setOpen?: Dispatch<SetStateAction<boolean>>;
  }) => {
  // 1. Define your form.

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const AppuntamentiFormValidation = getappuntamentiichema(type);

  const form = useForm<z.infer<typeof AppuntamentiFormValidation>>({
    resolver: zodResolver(AppuntamentiFormValidation),
    defaultValues: {
      primaryPhysician: appuntamenti ? appuntamenti?.primaryPhysician : "",
      schedule: appuntamenti
        ? new Date(appuntamenti?.schedule!)
        : new Date(Date.now()),
      reason: appuntamenti ? appuntamenti.reason : "",
      note: appuntamenti?.note || "",
      cancellationReason: appuntamenti?.cancellationReason || "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppuntamentiFormValidation>) {
    setIsLoading(true)

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      
        if(type === 'create' && clientiId) {
            const appuntamentiData = {
                userId,
                clienti: clientiId,
                primaryPhysician: values.primaryPhysician,
                schedule: new Date(values.schedule),
                reason: values.reason!,
                note: values.note,
                status: status as Status,
            }

            const appuntamenti = await createappuntamenti(appuntamentiData)

            if(appuntamenti) {
                form.reset();
                router.push(`/clientii/${userId}/new-appuntamenti/success?appuntamentiId=${appuntamenti.$id}`);
            }
        } else {
          const appuntamentiToUpdate = {
            userId,
            appuntamentiId: appuntamenti?.$id!,
            appuntamenti: {
              primaryPhysician: values?.primaryPhysician,
              schedule: new Date(values?.schedule),
              status: status as Status,
              cancellationReason: values?.cancellationReason
            },
            type
          }

          const updatedappuntamenti = await updateappuntamenti(appuntamentiToUpdate)

          if(updatedappuntamenti) {
            setOpen && setOpen(false);
            form.reset()
          }
        }

    } catch (error) {
      console.log(error);
    }

    setIsLoading(false)
  }

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel appuntamenti";
      break;
    case "schedule":
      buttonLabel = "Schedule appuntamenti";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
                <h1 className="header">Nuovo Appuntamento -FACOLTATIVO-</h1>
                <p className="text-dark-700">Funzionalita per appuntamenti. Torna indietro se vuoi fare otro inserimento alla base dati</p>
            </section>

            {type !== "cancel" && (
                <>
                    <CustomFormField 
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="Servizio desiderato"
                    placeholder="Seleziona un servizio"
                    >
                        {servizii.map((servizi) => (
                        <SelectItem key={servizi.name} value={servizi.name}>
                            <div className="flex cursor-pointer items-center gap-2">
                            <Image 
                                src={servizi.image}
                                width={32}
                                height={32}
                                alt={servizi.name}
                                className="rounded-full border border-dark-500"
                            />
                            <p>{servizi.name}</p>
                            </div>
                        </SelectItem>
                        ))}
                    </CustomFormField>

                    <CustomFormField 
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="schedule"
                        label="Ora desiderata del appuntamento"
                        showTimeSelect
                        dateFormat="MM/dd/yyyy  -  h:mm aa"
                    />

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField 
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="reason"
                            label="Raggione del appuntamento"
                            placeholder="Aggiungi informazione"
                        />

                        <CustomFormField 
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="note"
                            label="Notes"
                            placeholder="Enter notes"
                        />
                    </div>
                </>
            )}

            {type === "cancel" && (
                <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="cancellationReason"
                label="Raggione di cancellazione"
                placeholder="Inserisci raggione della cancellazione"
            />
            )}
        
        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{buttonLabel}</SubmitButton>

        </form>
    </Form>
  )
}

export default AppuntamentiForm
