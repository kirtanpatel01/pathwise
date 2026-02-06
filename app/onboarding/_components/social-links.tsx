"use client";

import { Control } from "react-hook-form";
import { OnboardingFormData } from "../types";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Controller } from "react-hook-form";
import { Github, Linkedin, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SocialLinksProps {
  control: Control<OnboardingFormData>;
}

export function SocialLinks({ control }: SocialLinksProps) {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 gap-4">
        {/* GitHub */}
        <Controller
          name="github"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>GitHub *</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Github />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  placeholder="github-username"
                  aria-invalid={fieldState.invalid}
                />
              </InputGroup>
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />

        {/* LinkedIn */}
        <Controller
          name="linkedin"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>LinkedIn</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Linkedin />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  placeholder="linkedin-username"
                  aria-invalid={fieldState.invalid}
                />
              </InputGroup>
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />

        {/* Portfolio */}
        <Controller
          name="portfolio"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Portfolio</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Globe />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  type="url"
                  placeholder="https://your-portfolio.com"
                  aria-invalid={fieldState.invalid}
                />
              </InputGroup>
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />

        <Controller
          name="target_role"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Target Role</FieldLabel>
                <Input
                  {...field}
                  placeholder="e.g. Software Engineer"
                  aria-invalid={fieldState.invalid}
                />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />
      </div>
    </div>
  );
}
