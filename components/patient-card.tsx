"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Calendar, AlertCircle } from "lucide-react";
import type { Patient } from "@/lib/mock-data";

interface PatientCardProps {
  patient: Patient;
  onViewDetails: (patient: Patient) => void;
}

export function PatientCard({ patient, onViewDetails }: PatientCardProps) {
  const hasAllergies =
    patient.allergies.length > 0 && patient.allergies[0] !== "None known";

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:border-primary/20 h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base sm:text-lg font-semibold text-foreground truncate">
                {patient.name}
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Age: {patient.age}
              </p>
            </div>
          </div>
          {hasAllergies && (
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive flex-shrink-0" />
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="truncate">{patient.contact}</span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="truncate">
            Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
          </span>
        </div>

        {patient.medicalHistory.length > 0 && (
          <div className="space-y-2 flex-1">
            <p className="text-xs sm:text-sm font-medium text-foreground">
              Medical History:
            </p>
            <div className="flex flex-wrap gap-1">
              {patient.medicalHistory.slice(0, 2).map((condition) => (
                <Badge key={condition} className="text-xs bg-blue-400">
                  {condition}
                </Badge>
              ))}
              {patient.medicalHistory.length > 2 && (
                <Badge className="text-xs bg-blue-400">
                  +{patient.medicalHistory.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <Button
          onClick={() => onViewDetails(patient)}
          className="w-full mt-auto text-sm bg-gray-400"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
