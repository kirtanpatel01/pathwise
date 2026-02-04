"use client";

import { Control, useWatch } from "react-hook-form";
import { OnboardingFormData } from "../types";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { User, Building2, MapPin } from "lucide-react";

interface PersonalInfoProps {
  control: Control<OnboardingFormData>;
}

export function PersonalInfo({ control }: PersonalInfoProps) {
  const status = useWatch({ control, name: "status" });

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 7 }, (_, i) => currentYear + i);
  const statusLabels = {
    student: "Student",
    graduate: "Graduate",
    professional: "Professional",
  };

  return (
    <div className="space-y-4 w-full">
      {/* Full Name */}
      <Controller
        name="full_name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                id={field.name}
                placeholder="e.g. John Doe"
                aria-invalid={fieldState.invalid}
              />
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Institute */}
      <Controller
        name="institute"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Institute</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <Building2 />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                id={field.name}
                placeholder="e.g. Parul University"
                aria-invalid={fieldState.invalid}
              />
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Location */}
      <Controller
        name="location"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Location</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <MapPin />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                id={field.name}
                placeholder="${city}, ${state}, India"
                aria-invalid={fieldState.invalid}
              />
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Status */}
      <Controller
        name="status"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="w-32">
            <FieldLabel>Status</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="Select status">
                  {field.value ? statusLabels[field.value] : undefined}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Graduation Year - Conditional */}
      {status === "student" && (
        <Controller
          name="graduation_year"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-fit">
              <FieldLabel>Graduation year</FieldLabel>
              <Select
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select year">
                    {field.value ? field.value : undefined}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {graduationYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldDescription>Expected year of graduation</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}
    </div>
  );
}
