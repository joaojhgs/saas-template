CREATE TABLE organization (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    picture VARCHAR(255),
    document VARCHAR(255) NOT NULL,
    id_contractor_owner UUID references auth.users on delete cascade not null,
    latitude VARCHAR(255),
    longitude VARCHAR(255),
    full_address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT NOW()
);

CREATE TABLE service_type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    picture_link VARCHAR(255),
    created_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT NOW()
);

CREATE TABLE contractor_has_service_type (
    id_service_type UUID REFERENCES service_type(id) on delete cascade NOT NULL,
    id_contractor UUID references auth.users on delete cascade not null,
    duration_minutes Int NOT NULL,
    price BigInt NOT NULL,
    picture_link VARCHAR(255),
    custom_calendar_color VARCHAR(255),
    created_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),

    PRIMARY KEY (id_service_type, id_contractor)
);

CREATE TABLE previous_service (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    id_contractor UUID references auth.users on delete cascade not null,
    description TEXT,
    picture_link TEXT[],
    id_service_type UUID REFERENCES service_type(id) on delete cascade not null,
    created_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT NOW()
);


-- Enable RLS for all the tables
ALTER TABLE organization ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractor_has_service_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE previous_service ENABLE ROW LEVEL SECURITY;

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

-- Service_type table
CREATE POLICY "Read_Service_type" ON service_type
    AS PERMISSIVE
    FOR SELECT
    to authenticated
    USING (true);

-- User_has_service_type table
CREATE POLICY "Insert_Contractor_has_service_type" ON contractor_has_service_type
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id_contractor);

CREATE POLICY "Update_Contractor_has_service_type" ON contractor_has_service_type
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id_contractor);

CREATE POLICY "Delete_Contractor_has_service_type" ON contractor_has_service_type
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (auth.uid() = id_contractor);

CREATE POLICY "Read_Contractor_has_service_type" ON contractor_has_service_type
    AS PERMISSIVE
    FOR SELECT
    USING (true);

-- Previous_service table
CREATE POLICY "Insert_Previous_service" ON previous_service
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id_contractor);

CREATE POLICY "Update_Previous_service" ON previous_service
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id_contractor);

CREATE POLICY "Delete_Previous_service" ON previous_service
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (auth.uid() = id_contractor);

CREATE POLICY "Read_Previous_service" ON previous_service
    AS PERMISSIVE
    FOR SELECT
    USING (true);


