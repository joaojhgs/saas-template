CREATE TABLE service_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255)
);

CREATE TABLE barber_has_service_types (
    id_service_type UUID REFERENCES service_types(id),
    id_barber UUID REFERENCES barbers(id),
    duration_minutes Int,
    price BigInt
);