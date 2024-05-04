CREATE TABLE schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_barber UUID REFERENCES barber(id),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    id_service_type UUID REFERENCES service_type(id),
    additional_information VARCHAR(255),
    status VARCHAR(255),
    allow_notifications BOOLEAN,
    user_phone VARCHAR(255),
    user_name VARCHAR(255)
);