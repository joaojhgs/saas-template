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