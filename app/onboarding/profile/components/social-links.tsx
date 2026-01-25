"use client";

import { Control } from "react-hook-form";
import { ProfileFormData } from "../schema";
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

interface SocialLinksProps {
  control: Control<ProfileFormData>;
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                  placeholder="https://your-portfolio.com"
                  aria-invalid={fieldState.invalid}
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </div>
  );
}
