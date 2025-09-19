"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { PatientCard } from "@/components/patient-card";
import { PatientDetailsModal } from "@/components/patient-details-modal";
import { AddPatientForm } from "@/components/add-patient-form";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Plus,
  Users,
  Activity,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import type { Patient } from "@/lib/mock-data";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchPatients,
  addPatient,
  setSearchQuery,
  clearError,
  selectPatients,
  selectLoading,
  selectError,
  selectSearchQuery,
  selectFilteredPatients,
} from "@/lib/features/patients/patientsSlice";

export default function PatientsPage() {
  const dispatch = useAppDispatch();
  const patients = useAppSelector(selectPatients);
  const filteredPatients = useAppSelector(selectFilteredPatients);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const searchQuery = useAppSelector(selectSearchQuery);

  // Local UI state (not managed by Redux)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
        action: <AlertCircle className="h-4 w-4" />,
      });
      dispatch(clearError());
    }
  }, [error, toast, dispatch]);

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const handleAddPatient = async (newPatientData: Omit<Patient, "id">) => {
    try {
      await dispatch(addPatient(newPatientData)).unwrap();
      setShowAddForm(false);
      toast({
        title: "Patient Added Successfully",
        description: `${newPatientData.name} has been added to the patient records.`,
        action: <CheckCircle className="h-4 w-4 text-green-600" />,
      });
    } catch (error) {
      // Error is handled by the useEffect above
    }
  };

  const handleRefresh = () => {
    dispatch(fetchPatients());
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  if (error && patients.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorState
            title="Failed to Load Patients"
            description="Unable to fetch patient records. Please check your connection and try again."
            onRetry={handleRefresh}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Patient Records
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage and view patient information securely
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleRefresh}
              disabled={loading}
              className="w-full sm:w-auto bg-gray-400"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </>
              )}
            </Button>
            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
              disabled={loading}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add New Patient</span>
              <span className="sm:hidden">Add Patient</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Patients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {patients.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Active patient records
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Visits
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {
                  patients.filter(
                    (p) =>
                      new Date(p.lastVisit) >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length
                }
              </div>
              <p className="text-xs text-muted-foreground">
                In the last 7 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Search Results
              </CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {filteredPatients.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Matching current search
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 sm:mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search patients by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="bg-white pl-10 h-10 sm:h-12 text-sm sm:text-base"
            disabled={loading}
          />
          {loading && (
            <LoadingSpinner
              size="sm"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            />
          )}
        </div>

        {loading && patients.length === 0 && (
          <Card className="text-center py-12">
            <CardHeader>
              <LoadingSpinner size="lg" className="mx-auto mb-4" />
              <CardTitle>Loading Patient Records</CardTitle>
              <CardDescription>
                Please wait while we securely fetch the patient data...
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Patients Grid */}
        {!loading && filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          !loading && (
            <Card className="text-center py-12">
              <CardHeader>
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <CardTitle>No patients found</CardTitle>
                <CardDescription>
                  {searchQuery
                    ? `No patients match your search for "${searchQuery}"`
                    : "No patient records available"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {searchQuery && (
                  <Button
                    variant="outline"
                    onClick={() => handleSearchChange("")}
                    className="mr-2"
                  >
                    Clear Search
                  </Button>
                )}
                <Button onClick={() => setShowAddForm(true)}>
                  Add First Patient
                </Button>
              </CardContent>
            </Card>
          )
        )}

        {/* Modals */}
        <PatientDetailsModal
          patient={selectedPatient}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
        <AddPatientForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onAddPatient={handleAddPatient}
        />
      </main>
    </div>
  );
}
