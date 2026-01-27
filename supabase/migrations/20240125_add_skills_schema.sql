-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  category TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create normalized name index for faster lookups
CREATE INDEX IF NOT EXISTS idx_skills_name ON skills (name);

-- Profiles update: Add status column
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'github_verification_status') THEN 
        ALTER TABLE profiles ADD COLUMN github_verification_status TEXT DEFAULT 'idle';
        ALTER TABLE profiles ADD CONSTRAINT profiles_github_verification_status_check CHECK (github_verification_status IN ('idle', 'processing', 'completed', 'failed'));
    END IF; 
END $$;

-- Create user_skills table
CREATE TABLE IF NOT EXISTS user_skills (
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  proficiency TEXT CHECK (proficiency IN ('foundational', 'intermediate', 'advanced')),
  evidence TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, skill_id)
);
