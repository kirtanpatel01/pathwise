-- Add missing columns to profiles table
DO $$ 
BEGIN 
    -- Add bio column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'bio') THEN 
        ALTER TABLE profiles ADD COLUMN bio TEXT;
    END IF; 

    -- Add role column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'role') THEN 
        ALTER TABLE profiles ADD COLUMN role TEXT;
    END IF;

    -- Add github_stats column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'github_stats') THEN 
        ALTER TABLE profiles ADD COLUMN github_stats JSONB;
    END IF;
END $$;
