CREATE TABLE schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_contractor UUID references auth.users on delete cascade not null,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    id_service_type UUID REFERENCES service_type(id) NOT NULL,
    additional_information TEXT,
    status VARCHAR(255) NOT NULL,
    allow_notifications BOOLEAN NOT NULL,
    client_phone VARCHAR(255),
    client_name VARCHAR(255) NOT NULL
);

CREATE INDEX ON schedule (id_contractor);

-- Enable RLS for the schedule table
ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Insert_Schedule" ON schedule
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id_contractor);

CREATE POLICY "Update_Schedule" ON schedule
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id_contractor);

CREATE POLICY "Delete_Schedule" ON schedule
    FOR DELETE
    TO authenticated
    USING (auth.uid() = id_contractor);
