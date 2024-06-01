-- create test users
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            '00000000-0000-0000-0000-000000000000',
            'authenticated',
            'authenticated',
            'admin@admin.com',
            crypt('password123', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
    );

-- test user email identities
INSERT INTO
    auth.identities (
        id,
        user_id,
        provider_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    )
    SELECT
        uuid_generate_v4 (),
        id,
        id,
        format('{"sub":"%s","email":"%s"}', id :: text, email) :: jsonb,
        'email',
        current_timestamp,
        current_timestamp,
        current_timestamp
    FROM
        auth.users;

-- Inserting sample data into ORGANIZATION table
INSERT INTO organization (id, name, description, picture, document, id_contractor_owner, latitude, longitude, full_address, created_at, updated_at) VALUES
('33333333-3333-3333-3333-333333333333', 'Best Org', 'A great organization', 'http://example.com/org.jpg', '1234567890', '00000000-0000-0000-0000-000000000000', '40.7128N', '74.0060W', '123 Main St, Cityville', now(), now());

-- Inserting sample data into SERVICE_TYPE table
INSERT INTO service_type (id, name, picture_link, created_at, updated_at) VALUES
('44444444-4444-4444-4444-444444444444', 'Haircut', 'http://example.com/haircut.jpg', now(), now()),
('55555555-5555-5555-5555-555555555555', 'Shave', 'http://example.com/shave.jpg', now(), now());

-- Inserting sample data into CONTRACTOR_HAS_SERVICE_TYPE table
INSERT INTO contractor_has_service_type (id_service_type, id_contractor, duration_minutes, price, picture_link, custom_calendar_color, created_at, updated_at) VALUES
('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 30, 2500, 'http://example.com/haircut_service.jpg', '#FF5733', now(), now()),
('55555555-5555-5555-5555-555555555555', '00000000-0000-0000-0000-000000000000', 15, 1500, 'http://example.com/shave_service.jpg', '#33FF57', now(), now());

-- Inserting sample data into PREVIOUS_SERVICE table
INSERT INTO previous_service (id, id_contractor, description, picture_link, id_service_type, created_at, updated_at) VALUES
('66666666-6666-6666-6666-666666666666', '00000000-0000-0000-0000-000000000000', 'Previous haircut service', '{"http://example.com/prev_haircut1.jpg"}', '44444444-4444-4444-4444-444444444444', now(), now()),
('77777777-7777-7777-7777-777777777777', '00000000-0000-0000-0000-000000000000', 'Previous shave service', '{"http://example.com/prev_shave1.jpg"}', '55555555-5555-5555-5555-555555555555', now(), now());

-- Inserting sample data into SCHEDULE table
INSERT INTO schedule (id, id_contractor, start_time, end_time, id_service_type, additional_information, status, allow_notifications, client_phone, client_name, created_at, updated_at) VALUES
('88888888-8888-8888-8888-888888888888', '00000000-0000-0000-0000-000000000000', '2024-06-01 10:00:00', '2024-06-01 10:30:00', '44444444-4444-4444-4444-444444444444', 'Customer requested special attention', 'Scheduled', true, '555-555-5555', 'Alex Johnson', now(), now());

-- Inserting sample data into WORK_DAY table
INSERT INTO work_day (id_contractor, week_day, start_time, end_time, enabled, created_at, updated_at) VALUES
('00000000-0000-0000-0000-000000000000', 'MONDAY', '2024-06-03 09:00:00', '2024-06-03 17:00:00', true, now(), now()),
('00000000-0000-0000-0000-000000000000', 'TUESDAY', '2024-06-04 09:00:00', '2024-06-04 17:00:00', true, now(), now());

-- Inserting sample data into CUSTOM_DAY_OF_WORK table
INSERT INTO custom_day_of_work (id, id_contractor, start_time, end_time, away, created_at, updated_at) VALUES
('99999999-9999-9999-9999-999999999999', '00000000-0000-0000-0000-000000000000', '2024-06-10 10:00:00', '2024-06-10 15:00:00', false, now(), now());
