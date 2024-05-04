CREATE TYPE WEEK_DAY_ENUM AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

CREATE TABLE work_day (
    id_barber UUID REFERENCES barber(id),
    week_day WEEK_DAY_ENUM,
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

CREATE TABLE custom_day_of_work (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_barber UUID REFERENCES barber(id),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    away BOOLEAN
);