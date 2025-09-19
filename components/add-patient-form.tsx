"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, X } from "lucide-react";
import type { Patient } from "@/lib/mock-data";

interface AddPatientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (patient: Omit<Patient, "id">) => void;
}

export function AddPatientForm({
  isOpen,
  onClose,
  onAddPatient,
}: AddPatientFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [newCondition, setNewCondition] = useState("");
  const [newAllergy, setNewAllergy] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    email: "",
    address: "",
    bloodType: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (
      !formData.age ||
      Number.parseInt(formData.age) < 1 ||
      Number.parseInt(formData.age) > 150
    ) {
      newErrors.age = "Please enter a valid age (1-150)";
    }
    if (!formData.contact.trim())
      newErrors.contact = "Contact number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.bloodType) newErrors.bloodType = "Blood type is required";
    if (!formData.emergencyContactName.trim())
      newErrors.emergencyContactName = "Emergency contact name is required";
    if (!formData.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone = "Emergency contact phone is required";
    }
    if (!formData.emergencyContactRelationship.trim()) {
      newErrors.emergencyContactRelationship =
        "Emergency contact relationship is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newPatient: Omit<Patient, "id"> = {
      name: formData.name.trim(),
      age: Number.parseInt(formData.age),
      contact: formData.contact.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      bloodType: formData.bloodType,
      medicalHistory: medicalConditions,
      allergies: allergies.length > 0 ? allergies : ["None known"],
      lastVisit: new Date().toISOString().split("T")[0],
      emergencyContact: {
        name: formData.emergencyContactName.trim(),
        phone: formData.emergencyContactPhone.trim(),
        relationship: formData.emergencyContactRelationship.trim(),
      },
    };

    onAddPatient(newPatient);
    handleClose();
    setIsLoading(false);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      age: "",
      contact: "",
      email: "",
      address: "",
      bloodType: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
    });
    setMedicalConditions([]);
    setAllergies([]);
    setNewCondition("");
    setNewAllergy("");
    setErrors({});
    onClose();
  };

  const addMedicalCondition = () => {
    if (
      newCondition.trim() &&
      !medicalConditions.includes(newCondition.trim())
    ) {
      setMedicalConditions([...medicalConditions, newCondition.trim()]);
      setNewCondition("");
    }
  };

  const removeMedicalCondition = (condition: string) => {
    setMedicalConditions(medicalConditions.filter((c) => c !== condition));
  };

  const addAllergy = () => {
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  };

  const removeAllergy = (allergy: string) => {
    setAllergies(allergies.filter((a) => a !== allergy));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
            Add New Patient
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Enter the patient's information to create a new record.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Basic Information */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  className={`text-sm ${
                    errors.name ? "border-destructive" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm">
                  Age *
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="150"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  placeholder="Enter age"
                  className={`text-sm ${
                    errors.age ? "border-destructive" : ""
                  }`}
                />
                {errors.age && (
                  <p className="text-xs text-destructive">{errors.age}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodType" className="text-sm">
                Blood Type *
              </Label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) =>
                  setFormData({ ...formData, bloodType: value })
                }
              >
                <SelectTrigger
                  className={`text-sm ${
                    errors.bloodType ? "border-destructive" : ""
                  }`}
                >
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
              {errors.bloodType && (
                <p className="text-xs text-destructive">{errors.bloodType}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact" className="text-sm">
                  Phone Number *
                </Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  placeholder="+1 (555) 123-4567"
                  className={`text-sm ${
                    errors.contact ? "border-destructive" : ""
                  }`}
                />
                {errors.contact && (
                  <p className="text-xs text-destructive">{errors.contact}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="patient@email.com"
                  className={`text-sm ${
                    errors.email ? "border-destructive" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm">
                Address *
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Enter full address"
                className={`text-sm ${
                  errors.address ? "border-destructive" : ""
                }`}
                rows={3}
              />
              {errors.address && (
                <p className="text-xs text-destructive">{errors.address}</p>
              )}
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Medical Information
            </h3>

            <div className="space-y-2">
              <Label>Medical Conditions</Label>
              <div className="flex gap-2">
                <Input
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  placeholder="Add medical condition"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), addMedicalCondition())
                  }
                />
                <Button type="button" onClick={addMedicalCondition} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {medicalConditions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {medicalConditions.map((condition) => (
                    <Badge
                      key={condition}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {condition}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeMedicalCondition(condition)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Allergies</Label>
              <div className="flex gap-2">
                <Input
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder="Add allergy"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addAllergy())
                  }
                />
                <Button type="button" onClick={addAllergy} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {allergies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {allergies.map((allergy) => (
                    <Badge
                      key={allergy}
                      variant="destructive"
                      className="flex items-center gap-1"
                    >
                      {allergy}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive-foreground"
                        onClick={() => removeAllergy(allergy)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Emergency Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Contact Name *</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContactName: e.target.value,
                    })
                  }
                  placeholder="Emergency contact name"
                  className={`text-sm ${
                    errors.emergencyContactName ? "border-destructive" : ""
                  }`}
                />
                {errors.emergencyContactName && (
                  <p className="text-xs text-destructive">
                    {errors.emergencyContactName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContactPhone: e.target.value,
                    })
                  }
                  placeholder="+1 (555) 123-4567"
                  className={`text-sm ${
                    errors.emergencyContactPhone ? "border-destructive" : ""
                  }`}
                />
                {errors.emergencyContactPhone && (
                  <p className="text-xs text-destructive">
                    {errors.emergencyContactPhone}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContactRelationship">
                Relationship *
              </Label>
              <Input
                id="emergencyContactRelationship"
                value={formData.emergencyContactRelationship}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContactRelationship: e.target.value,
                  })
                }
                placeholder="e.g., Spouse, Parent, Sibling"
                className={`text-sm ${
                  errors.emergencyContactRelationship
                    ? "border-destructive"
                    : ""
                }`}
              />
              {errors.emergencyContactRelationship && (
                <p className="text-xs text-destructive">
                  {errors.emergencyContactRelationship}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6 border-t">
            <Button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="w-full sm:w-auto bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding Patient...
                </>
              ) : (
                "Add Patient"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
