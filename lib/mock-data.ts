export interface Patient {
  id: string
  name: string
  age: number
  contact: string
  email: string
  address: string
  medicalHistory: string[]
  lastVisit: string
  bloodType: string
  allergies: string[]
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

export const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 34,
    contact: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    address: "123 Oak Street, Springfield, IL 62701",
    medicalHistory: ["Hypertension", "Type 2 Diabetes"],
    lastVisit: "2024-09-15",
    bloodType: "A+",
    allergies: ["Penicillin", "Shellfish"],
    emergencyContact: {
      name: "Michael Johnson",
      phone: "+1 (555) 123-4568",
      relationship: "Spouse",
    },
  },
  {
    id: "2",
    name: "Robert Chen",
    age: 45,
    contact: "+1 (555) 234-5678",
    email: "robert.chen@email.com",
    address: "456 Pine Avenue, Chicago, IL 60601",
    medicalHistory: ["Asthma", "High Cholesterol"],
    lastVisit: "2024-09-12",
    bloodType: "O-",
    allergies: ["Latex"],
    emergencyContact: {
      name: "Lisa Chen",
      phone: "+1 (555) 234-5679",
      relationship: "Wife",
    },
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    age: 28,
    contact: "+1 (555) 345-6789",
    email: "maria.rodriguez@email.com",
    address: "789 Elm Drive, Austin, TX 73301",
    medicalHistory: ["Migraine", "Anxiety"],
    lastVisit: "2024-09-18",
    bloodType: "B+",
    allergies: ["None known"],
    emergencyContact: {
      name: "Carlos Rodriguez",
      phone: "+1 (555) 345-6790",
      relationship: "Brother",
    },
  },
  {
    id: "4",
    name: "David Thompson",
    age: 52,
    contact: "+1 (555) 456-7890",
    email: "david.thompson@email.com",
    address: "321 Maple Lane, Denver, CO 80201",
    medicalHistory: ["Arthritis", "Sleep Apnea"],
    lastVisit: "2024-09-10",
    bloodType: "AB+",
    allergies: ["Sulfa drugs"],
    emergencyContact: {
      name: "Jennifer Thompson",
      phone: "+1 (555) 456-7891",
      relationship: "Daughter",
    },
  },
  {
    id: "5",
    name: "Emily Davis",
    age: 31,
    contact: "+1 (555) 567-8901",
    email: "emily.davis@email.com",
    address: "654 Cedar Court, Seattle, WA 98101",
    medicalHistory: ["Hypothyroidism"],
    lastVisit: "2024-09-16",
    bloodType: "A-",
    allergies: ["Iodine"],
    emergencyContact: {
      name: "James Davis",
      phone: "+1 (555) 567-8902",
      relationship: "Husband",
    },
  },
  {
    id: "6",
    name: "James Wilson",
    age: 67,
    contact: "+1 (555) 678-9012",
    email: "james.wilson@email.com",
    address: "987 Birch Street, Miami, FL 33101",
    medicalHistory: ["Heart Disease", "Diabetes", "Hypertension"],
    lastVisit: "2024-09-14",
    bloodType: "O+",
    allergies: ["Aspirin"],
    emergencyContact: {
      name: "Margaret Wilson",
      phone: "+1 (555) 678-9013",
      relationship: "Wife",
    },
  },
]
