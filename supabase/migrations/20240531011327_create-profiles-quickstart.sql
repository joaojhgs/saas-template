-- Create a table for public profiles
create table profile (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  social_medias json,
  created_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP with time zone NOT NULL DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profile
  enable row level security;

create policy "Public profiles are viewable by everyone." on profile
  for select using (true);

create policy "Users can insert their own profile." on profile
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profile
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profile (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('provile-avatars', 'profile-avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');