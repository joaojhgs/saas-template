CREATE TABLE organization (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    picture VARCHAR(255),
    document VARCHAR(255) NOT NULL,
    id_contractor_owner UUID references profile on delete cascade not null,
    latitude VARCHAR(255),
    longitude VARCHAR(255),
    full_address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT NOW()
);

-- Enable RLS for all the tables
ALTER TABLE organization ENABLE ROW LEVEL SECURITY;

-- Organization table
CREATE POLICY "Insert_Delete_Organization" ON organization
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id_contractor_owner);

CREATE POLICY "Update_Organization" ON organization
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id_contractor_owner);

CREATE POLICY "Read_Organization" ON organization
    AS PERMISSIVE
    FOR SELECT
    USING (true);

-- Set up Storage!
insert into storage.buckets (id, name, public)
  values ('organization', 'organization', true);

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Organization images are publicly accessible." on storage.objects
  for select using (bucket_id = 'organization');

-- Should be updated in the future to use roles
create policy "Anyone can upload to organization." on storage.objects
  for insert with check (bucket_id = 'organization');