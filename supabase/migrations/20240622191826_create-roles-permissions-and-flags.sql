-- ORGANIZATION
-- create table organization (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     name VARCHAR(255) NOT NULL,
--     description TEXT,
--     picture VARCHAR(255),
--     document VARCHAR(255) NOT NULL,
--     id_contractor_owner UUID references public.profile on delete cascade not null,
--     latitude VARCHAR(255),
--     longitude VARCHAR(255),
--     full_address VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMP with time zone NOT NULL DEFAULT NOW()
-- );
comment on table public.organization is 'List of organizations.';

-- ROLES
create table roles (
  role_name text primary key
);
comment on table public.roles is 'List of application roles.';

-- FLAGS (previously called permissions)
create table flags (
  flag_name      text primary key,
  is_activated   boolean not null default false
);
comment on table public.flags is 'List of application feature flags and their activation status.';

-- USER ROLES
create table user_roles (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid references auth.users on delete cascade not null,
  role_name      text references public.roles on delete cascade not null,
  organization_id uuid references public.organization on delete cascade not null,
  unique (user_id, role_name, organization_id)
);
comment on table public.user_roles is 'Application roles for each user within an organization.';

-- ROLE FLAGS (previously called role_permissions)
create table role_flags (
  id            uuid primary key default uuid_generate_v4(),
  role_name     text references public.roles on delete cascade not null,
  flag_id       text references public.flags (flag_name) on delete cascade not null,
  unique (role_name, flag_id)
);
comment on table public.role_flags is 'Application flags for each role.';

-- Create the auth hook function to store user roles
create or replace function custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
  declare
    claims jsonb;
    user_role text;
  begin
    -- Fetch the user role in the user_roles table
    select ur.*
    into user_role
    from public.user_roles ur
    where ur.user_id = (event->>'user_id')::uuid

    claims := event->'claims';

    if user_role is not null then
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
  end;
$$;

grant usage on schema public to supabase_auth_admin;

grant execute
  on function public.custom_access_token_hook
  to supabase_auth_admin;

revoke execute
  on function public.custom_access_token_hook
  from authenticated, anon, public;

grant all
  on table public.user_roles
to supabase_auth_admin;

revoke all
  on table public.user_roles
  from authenticated, anon, public;

grant all
  on table public.roles
to supabase_auth_admin;

revoke all
  on table public.roles
  from authenticated, anon, public;

grant all
  on table public.flags
to supabase_auth_admin;

revoke all
  on table public.flags
  from authenticated, anon, public;

create policy "Allow auth admin to read user roles" ON public.user_roles
as permissive for select
to supabase_auth_admin
using (true);

create policy "Allow auth admin to read roles" ON public.roles
as permissive for select
to supabase_auth_admin
using (true);

create policy "Allow auth admin to read flags" ON public.flags
as permissive for select
to supabase_auth_admin
using (true);

create or replace function public.authorize(
  requested_permission text
)
returns boolean as $$
declare
  bind_permissions int;
  user_role text;
begin
  -- Fetch user role once and store it to reduce number of calls
  select (auth.jwt() ->> 'user_role') into user_role;

  select count(*)
  into bind_permissions
  from public.role_flags rf
  where rf.flag_name = requested_permission
    and rf.role_name = user_role.role_name;

  return bind_permissions > 0;
end;
$$ language plpgsql stable security definer set search_path = 'public';
