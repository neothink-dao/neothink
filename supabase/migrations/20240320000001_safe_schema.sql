-- Drop existing tables if they exist (in reverse order of dependencies)
drop table if exists achievements cascade;
drop table if exists experience_progress cascade;
drop table if exists user_profiles cascade;

-- Drop existing types if they exist
drop type if exists experience_phase cascade;
drop type if exists pathway_type cascade;

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create enum types
create type pathway_type as enum ('ascender', 'neothinker', 'immortal');
create type experience_phase as enum ('discovery', 'onboarding', 'progressing', 'endgame');

-- User Profiles table
create table user_profiles (
  id uuid references auth.users on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  pathway pathway_type,
  current_phase experience_phase,
  superachiever_progress jsonb default '{"ascender": 0, "neothinker": 0, "immortal": 0}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Experience Progress table
create table experience_progress (
  id uuid default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  pathway pathway_type not null,
  phase experience_phase not null,
  progress integer default 0,
  total integer not null,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id),
  unique(user_id, pathway, phase)
);

-- Achievements table
create table achievements (
  id uuid default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  title text not null,
  description text not null,
  type text not null,
  progress integer default 0,
  total integer not null,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Create indexes for better query performance
create index if not exists idx_user_profiles_pathway on user_profiles(pathway);
create index if not exists idx_experience_progress_user_id on experience_progress(user_id);
create index if not exists idx_experience_progress_pathway on experience_progress(pathway);
create index if not exists idx_achievements_user_id on achievements(user_id);
create index if not exists idx_achievements_type on achievements(type);

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Drop existing triggers if they exist
drop trigger if exists update_user_profiles_updated_at on user_profiles;
drop trigger if exists update_experience_progress_updated_at on experience_progress;
drop trigger if exists update_achievements_updated_at on achievements;

-- Create triggers for updated_at
create trigger update_user_profiles_updated_at
  before update on user_profiles
  for each row
  execute function update_updated_at_column();

create trigger update_experience_progress_updated_at
  before update on experience_progress
  for each row
  execute function update_updated_at_column();

create trigger update_achievements_updated_at
  before update on achievements
  for each row
  execute function update_updated_at_column();

-- Drop existing policies if they exist
drop policy if exists "Users can view their own profile" on user_profiles;
drop policy if exists "Users can update their own profile" on user_profiles;
drop policy if exists "Users can view their own progress" on experience_progress;
drop policy if exists "Users can update their own progress" on experience_progress;
drop policy if exists "Users can view their own achievements" on achievements;
drop policy if exists "Users can update their own achievements" on achievements;

-- Enable RLS (Row Level Security)
alter table user_profiles enable row level security;
alter table experience_progress enable row level security;
alter table achievements enable row level security;

-- User Profiles policies
create policy "Users can view their own profile"
  on user_profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on user_profiles for update
  using (auth.uid() = id);

-- Experience Progress policies
create policy "Users can view their own progress"
  on experience_progress for select
  using (auth.uid() = user_id);

create policy "Users can update their own progress"
  on experience_progress for all
  using (auth.uid() = user_id);

-- Achievements policies
create policy "Users can view their own achievements"
  on achievements for select
  using (auth.uid() = user_id);

create policy "Users can update their own achievements"
  on achievements for all
  using (auth.uid() = user_id); 