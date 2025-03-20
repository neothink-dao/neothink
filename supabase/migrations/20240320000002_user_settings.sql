-- Create user_settings table
create table user_settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  theme text default 'system',
  font_size text default 'normal',
  reduced_motion boolean default false,
  high_contrast boolean default false,
  email_notifications boolean default true,
  push_notifications boolean default true,
  sound_enabled boolean default true,
  profile_visibility text default 'public',
  show_online_status boolean default true,
  show_progress boolean default true,
  learning_style text default 'visual',
  goal_reminders boolean default true,
  progress_tracking boolean default true,
  two_factor_enabled boolean default false,
  login_alerts boolean default true,
  device_history boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id)
);

-- Enable RLS
alter table user_settings enable row level security;

-- Create policies
create policy "Users can view their own settings"
  on user_settings for select
  using (auth.uid() = user_id);

create policy "Users can update their own settings"
  on user_settings for update
  using (auth.uid() = user_id);

create policy "Users can insert their own settings"
  on user_settings for insert
  with check (auth.uid() = user_id);

-- Create function to handle settings updates
create or replace function handle_settings_update()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for settings updates
create trigger on_settings_update
  before update on user_settings
  for each row
  execute procedure handle_settings_update(); 