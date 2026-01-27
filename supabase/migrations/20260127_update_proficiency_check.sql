-- Drop the existing constraint
ALTER TABLE "public"."user_skills" DROP CONSTRAINT "user_skills_proficiency_check";

-- Update existing data to match new enum values
UPDATE "public"."user_skills" SET "proficiency" = 'beginner' WHERE "proficiency" = 'foundational';

-- Add the new constraint
ALTER TABLE "public"."user_skills" ADD CONSTRAINT "user_skills_proficiency_check" CHECK (proficiency = ANY (ARRAY['beginner'::text, 'intermediate'::text, 'advanced'::text]));
