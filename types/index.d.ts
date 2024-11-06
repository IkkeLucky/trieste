/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Gender = "maschile" | "femminile" | "altri";
  declare type Status = "pending" | "scheduled" | "cancelled";
  
  declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
  }
  declare interface User extends CreateUserParams {
    $id: string;
  }
  
  declare interface RegisterUserParams extends CreateUserParams {
    userId: string;
    birthDate: Date;
    gender: Gender;
    // address: string | undefined;
    // occupation: string | undefined;
    // emergencyContactName: string | undefined;
    // emergencyContactNumber: string | undefined;
    primaryPhysician: string;
    // insuranceProvider: string | undefined;
    // insurancePolicyNumber: string | undefined;
    // allergies: string | undefined;
    // currentMedication: string | undefined;
    // familyMedicalHistory: string | undefined;
    // pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    privacyConsent: boolean;
    deceso: Date;
    uscita: Date;
    presidio: string | undefined;
    reparto: string | undefined;
    matricola: string | undefined;
    infetta: string | undefined;
    giudiz: string | undefined;
    anatomico: string | undefined;
    transporto: string | undefined;
    funerale: string | undefined;
  }
  
  declare type CreateappointmentParams = {
    userId: string;
    patient: string;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
  };
  
  declare type UpdateappointmentParams = {
    appointmentsd: string;
    userId: string;
    appointment: appointment;
    type: string;
  };