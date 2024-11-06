import { Models } from "node-appwrite";

export interface clienti extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
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

export interface appuntamenti extends Models.Document {
  clienti: clienti;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}