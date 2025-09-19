import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { mockPatients, type Patient } from "@/lib/mock-data"

// Simulate API calls with delays
const API_DELAY = 1000

// Async thunks for API calls
export const fetchPatients = createAsyncThunk("patients/fetchPatients", async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, API_DELAY))
  return mockPatients
})

export const addPatient = createAsyncThunk("patients/addPatient", async (patientData: Omit<Patient, "id">) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, API_DELAY))

  // Generate a simple ID (in real app, this would come from the backend)
  const newId = (Date.now() + Math.random()).toString()
  const newPatient: Patient = {
    ...patientData,
    id: newId,
  }

  return newPatient
})

export const updatePatient = createAsyncThunk("patients/updatePatient", async (patient: Patient) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, API_DELAY))
  return patient
})

export const deletePatient = createAsyncThunk("patients/deletePatient", async (patientId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, API_DELAY))
  return patientId
})

interface PatientsState {
  patients: Patient[]
  loading: boolean
  error: string | null
  searchQuery: string
}

const initialState: PatientsState = {
  patients: [],
  loading: false,
  error: null,
  searchQuery: "",
}

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch patients
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false
        state.patients = action.payload
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch patients"
      })
      // Add patient
      .addCase(addPatient.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.loading = false
        state.patients.unshift(action.payload)
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to add patient"
      })
      // Update patient
      .addCase(updatePatient.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading = false
        const index = state.patients.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.patients[index] = action.payload
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to update patient"
      })
      // Delete patient
      .addCase(deletePatient.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading = false
        state.patients = state.patients.filter((p) => p.id !== action.payload)
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to delete patient"
      })
  },
})

export const { setSearchQuery, clearError } = patientsSlice.actions

// Selectors
export const selectPatients = (state: { patients: PatientsState }) => state.patients.patients
export const selectLoading = (state: { patients: PatientsState }) => state.patients.loading
export const selectError = (state: { patients: PatientsState }) => state.patients.error
export const selectSearchQuery = (state: { patients: PatientsState }) => state.patients.searchQuery

export const selectFilteredPatients = (state: { patients: PatientsState }) => {
  const { patients, searchQuery } = state.patients
  if (!searchQuery.trim()) return patients

  return patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.contact.includes(searchQuery) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )
}

export default patientsSlice.reducer
