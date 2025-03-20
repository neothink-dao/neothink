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
create index idx_user_profiles_pathway on user_profiles(pathway);
create index idx_experience_progress_user_id on experience_progress(user_id);
create index idx_experience_progress_pathway on experience_progress(pathway);
create index idx_achievements_user_id on achievements(user_id);
create index idx_achievements_type on achievements(type);

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

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

-- Create RLS (Row Level Security) policies
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