CREATE TABLE service_type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255)
);

CREATE TABLE previous_service (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_barber UUID REFERENCES barber(id),
    description TEXT,
    picture VARCHAR(255),
    id_service_type UUID REFERENCES service_type(id)
);

CREATE TABLE barber_has_service_type (
    id_service_type UUID REFERENCES service_type(id),
    id_barber UUID REFERENCES barber(id),
    duration_minutes Int,
    price BigInt
);