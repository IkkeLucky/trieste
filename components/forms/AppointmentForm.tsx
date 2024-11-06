"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { getappointmentschema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { Dispatch, SetStateAction, useState } from "react";
import { FormFieldType } from "./PatientForm"
import { doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { createappointment, updateappointment } from "@/lib/actions/appointment.actions"
import { appointment } from "@/types/appwrite.types"


 
const AppointmentForm = ({ userId, patientsd, type, appointment, setOpen}: 
  {userId: string; 
    patientsd: string; 
    type: "create" | "cancel" | "schedule";
    appointment?: appointment;
    setOpen?: Dispatch<SetStateAction<boolean>>;
  }) => {
  // 1. Define your form.

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const AppointmentFormValidation = getappointmentschema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
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
      
        if(type === 'create' && patientsd) {
            const appointmentData = {
                userId,
                patient: patientsd,
                primaryPhysician: values.primaryPhysician,
                schedule: new Date(values.schedule),
                reason: values.reason!,
                note: values.note,
                status: status as Status,
            }

            const appointment = await createappointment(appointmentData)

            if(appointment) {
                form.reset();
                router.push(`/patients/${userId}/new-appointment/success?appointmentsd=${appointment.$id}`);
            }
        } else {
          const appointmentToUpdate = {
            userId,
            appointmentsd: appointment?.$id!,
            appointment: {
              primaryPhysician: values?.primaryPhysician,
              schedule: new Date(values?.schedule),
              status: status as Status,
              cancellationReason: values?.cancellationReason
            },
            type
          }

          const updatedappointment = await updateappointment(appointmentToUpdate)

          if(updatedappointment) {
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
      buttonLabel = "Cancel appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule appointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
                <h1 className="header">Nuovo Appuntamento -FACOLTATIVO-</h1>
                <p className="text-dark-700">Funzionalita per appointment. Torna indietro se vuoi fare otro inserimento alla base dati</p>
            </section>

            {type !== "cancel" && (
                <>
                    <CustomFormField 
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="doctoro desiderato"
                    placeholder="Seleziona un doctoro"
                    >
                        {doctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                            <div className="flex cursor-pointer items-center gap-2">
                            <Image 
                                src={doctor.image}
                                width={32}
                                height={32}
                                alt={doctor.name}
                                className="rounded-full border border-dark-500"
                            />
                            <p>{doctor.name}</p>
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

export default AppointmentForm
