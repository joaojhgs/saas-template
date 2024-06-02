CREATE TYPE WEEK_DAY_ENUM AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

CREATE TABLE work_day (
    id_contractor UUID references profile on delete cascade not null,
    week_day WEEK_DAY_ENUM NOT NULL,
    start_time TIMESTAMP with time zone NOT NULL,
    end_time TIMESTAMP with time zone NOT NULL,
    created_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
    enabled BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE custom_day_of_work (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_contractor UUID references profile on delete cascade not null,
    start_time TIMESTAMP with time zone NOT NULL,
    end_time TIMESTAMP with time zone NOT NULL,
    created_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
    away BOOLEAN NOT NULL
);


-- Enable RLS for the work_day table
ALTER TABLE work_day ENABLE ROW LEVEL SECURITY;

-- Create policies
-- select
CREATE POLICY "Select_WorkDay" ON work_day
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id_contractor);

CREATE POLICY "Insert_WorkDay" ON work_day
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id_contractor);

CREATE POLICY "Update_WorkDay" ON work_day
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id_contractor);

CREATE POLICY "Delete_WorkDay" ON work_day
    FOR DELETE
    TO authenticated
    USING (auth.uid() = id_contractor);

-- Enable RLS for the custom_day_of_work table
ALTER TABLE custom_day_of_work ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Select_CustomDayOfWork" ON custom_day_of_work
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id_contractor);

CREATE POLICY "Insert_CustomDayOfWork" ON custom_day_of_work
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id_contractor);

CREATE POLICY "Update_CustomDayOfWork" ON custom_day_of_work
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id_contractor);

CREATE POLICY "Delete_CustomDayOfWork" ON custom_day_of_work
    FOR DELETE
    TO authenticated
    USING (auth.uid() = id_contractor);

