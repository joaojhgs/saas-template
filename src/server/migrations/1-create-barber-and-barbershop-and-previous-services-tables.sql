CREATE TABLE barbers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_user_id VARCHAR(255),
    name VARCHAR(255),
    accept_schedules_automatically BOOLEAN
);

CREATE TABLE barbershops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    location VARCHAR(255),
    description VARCHAR(255),
    picture VARCHAR(255),
    document VARCHAR(255),
    owner_id UUID
);

CREATE TABLE previous_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_barber UUID REFERENCES barbers(id),
    description VARCHAR(255),
    picture VARCHAR(255),
    id_service_type UUID REFERENCES service_types(id)
);