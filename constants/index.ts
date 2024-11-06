export const GenderOptions = ["maschile", "femminile", "altri"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "maschile" as Gender,
  // address: "",
  // occupation: "",
  // emergencyContactName: "",
  // emergencyContactNumber: "",
  primaryPhysician: "",
  // insuranceProvider: "",
  // insurancePolicyNumber: "",
  // allergies: "",
  // currentMedication: "",
  // familyMedicalHistory: "",
  // pastMedicalHistory: "",
  identificationType: "Passaporto",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
  deceso: new Date(Date.now()),
  uscita: new Date(Date.now()),
  presidio: "",
  reparto: "",
  matricola: "",
  infetta: "",
  giudiz: "",
  anatomico: "",
  transporto: "",
  funerale: ""
};

export const IdentificationTypes = [
  "Passaporto",
  "Carta d'identita",
  "Codice Fiscale",
  "Patente",
  "Altro",
];

export const doctors = [
  {
    image: "/assets/images/circolotrans.png",
    name: "doctoro1",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};