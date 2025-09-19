"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  AlertTriangle,
  UserCheck,
  Droplet,
  Clock,
} from "lucide-react";
import type { Patient } from "@/lib/mock-data";

interface PatientDetailsModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PatientDetailsModal({
  patient,
  isOpen,
  onClose,
}: PatientDetailsModalProps) {
  if (!patient) return null;

  const hasAllergies =
    patient.allergies.length > 0 && patient.allergies[0] !== "None known";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground truncate">
                {patient.name}
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Patient ID: {patient.id}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Basic Information
            </h3>

            <div className="space-y-3 bg-white shadow-sm p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Age:</span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {patient.age} years old
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Droplet className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">
                  Blood Type:
                </span>
                <Badge variant="outline" className="text-xs">
                  {patient.bloodType}
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">
                  Last Visit:
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {new Date(patient.lastVisit).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Contact Information
            </h3>

            <div className="space-y-3 bg-white shadow-sm p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Phone:</span>
                <span className="text-xs sm:text-sm text-muted-foreground truncate">
                  {patient.contact}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Email:</span>
                <span className="text-xs sm:text-sm text-muted-foreground truncate">
                  {patient.email}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Address:</span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {patient.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4 sm:my-6" />

        {/* Medical History */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
            <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Medical History
          </h3>

          {patient.medicalHistory.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {patient.medicalHistory.map((condition) => (
                <Badge
                  key={condition}
                  className="text-xs sm:text-sm bg-blue-400"
                >
                  {condition}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-muted-foreground bg-muted/50 p-3 sm:p-4 rounded-lg">
              No medical history recorded
            </p>
          )}
        </div>

        <Separator className="my-4 sm:my-6" />

        {/* Allergies */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
            Allergies
          </h3>

          {hasAllergies ? (
            <div className="bg-destructive/5 border border-destructive/20 p-3 sm:p-4 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((allergy) => (
                  <Badge
                    key={allergy}
                    variant="destructive"
                    className="text-xs sm:text-sm"
                  >
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 p-3 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm text-green-700">
                No known allergies
              </p>
            </div>
          )}
        </div>

        <Separator className="my-4 sm:my-6" />

        {/* Emergency Contact */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
            <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Emergency Contact
          </h3>

          <div className="bg-white shadow-sm p-3 sm:p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">Name:</span>
              <span className="text-xs sm:text-sm text-muted-foreground truncate">
                {patient.emergencyContact.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">Phone:</span>
              <span className="text-xs sm:text-sm text-muted-foreground truncate">
                {patient.emergencyContact.phone}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">
                Relationship:
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {patient.emergencyContact.relationship}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
          <Button onClick={onClose} className="w-full sm:w-auto bg-gray-400">
            Close
          </Button>
          <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            Edit Patient
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
