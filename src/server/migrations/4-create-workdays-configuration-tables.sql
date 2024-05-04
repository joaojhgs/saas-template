CREATE TYPE WEEK_DAY_ENUM AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

CREATE TABLE work_days (
    id_barber UUID REFERENCES barbers(id),
    week_day WEEK_DAY_ENUM,
    work_period_start TIMESTAMP,
    work_period_end TIMESTAMP
);

CREATE TABLE custom_day_of_work (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_barber UUID REFERENCES barbers(id),
    work_period_start TIMESTAMP,
    work_period_end TIMESTAMP,
    away BOOLEAN
);