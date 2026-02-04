'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner";
import {
  User,
  Building2,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Briefcase
} from "lucide-react";

import { ProfileFormData } from './types';
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { profileSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateProfile } from "./action";

function ProfileForm({ profile }: { profile: ProfileFormData }) {
  const [isEditable, setIsEditable] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      full_name: profile?.full_name || "",
      institute: profile?.institute || "",
      status: profile?.status || undefined,
      graduation_year: profile?.graduation_year || undefined,
      location: profile?.location || "",
      github: profile.github?.replace("https://github.com/", "") ?? "",
      linkedin: profile.linkedin?.replace("https://linkedin.com/in/", "") ?? "",
      portfolio: profile?.portfolio || "",
      target_role: profile?.target_role || "",
    },
  });

  const status = useWatch({ control: form.control, name: "status" });
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 7 }, (_, i) => currentYear + i);
  const statusLabels = {
    student: "Student",
    graduate: "Graduate",
    professional: "Professional",
  };

  async function onSubmit(data: ProfileFormData) {
    setIsSubmitting(true);

    try {
      const { success, error } = await updateProfile(data);
      if(!success && error) {
        toast.error(error);
      } else {
        toast.success("Profile saved successfully.");
        setIsEditable(false);
      }
    } catch (error) {
      toast.error("Failed to save profile information.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your profile details.</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form
          id="profile-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex gap-6"
        >
          <div className="max-w-sm w-full space-y-4">
            {isEditable ? (
              <Controller
                name="full_name"
                control={form.control}
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
            ) : (
              <p className="px-3 py-1.5 rounded-md border border-border">{profile.full_name}</p>
            )}
            {isEditable ? (
              <Controller
                name="institute"
                control={form.control}
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
                        placeholder="e.g. John Doe"
                        aria-invalid={fieldState.invalid}
                      />
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            ) : (
              <p className="px-3 py-1.5 rounded-md border border-border">{profile.institute}</p>
            )}
            {isEditable ? (
              <Controller
                name="target_role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Target role</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Briefcase />
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
            ) : (
              <p className="px-3 py-1.5 rounded-md border border-border">{profile.target_role}</p>
            )}
            {isEditable ? (
              <Controller
                name="location"
                control={form.control}
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
                        placeholder="e.g. John Doe"
                        aria-invalid={fieldState.invalid}
                      />
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            ) : (
              <p className="px-3 py-1.5 rounded-md border border-border">{profile.location}</p>
            )}

            {isEditable ? (
              <Controller
                name="status"
                control={form.control}
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
            ) : (
              <p className="px-3 py-1.5 rounded-md border border-border capatilize">{profile.status}</p>
            )}

            {status === "student" && (
              <>
                {isEditable ? (
                  <Controller
                    name="graduation_year"
                    control={form.control}
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
                ) : (
                  <p className="px-3 py-1.5 rounded-md border border-border">{profile.graduation_year}</p>
                )}
              </>
            )}
          </div>

          <div className="max-w-sm w-full space-y-4">
            {isEditable ? (
              <Controller
                name="github"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>GitHub</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Github />
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
            ) : (
              <p className="px-3 py-1.5 rounded-md border border-border">{profile.github}</p>
            )}
            {isEditable ? (
              <Controller
                name="linkedin"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>LinkedIn</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Linkedin />
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
            ) : (
              <p className="px-3 py-1.5 rounded-md border border-border">{profile.linkedin}</p>
            )}
            {isEditable ? (
              <Controller
                name="portfolio"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Portfolio</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Globe />
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
            ) : (
              <p className="px-3 py-1.5 rounded-md border border-border">{profile.portfolio}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {isEditable ? (
          <Button
            key="save-button"
            type="submit"
            form="profile-form"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner /> Saving...
              </span>
            ) : (
              "Save"
            )}
          </Button>
        ) : (
          <Button
            key="update-button"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsEditable(true);
            }}
            className="cursor-pointer"
          >
            Update
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProfileForm