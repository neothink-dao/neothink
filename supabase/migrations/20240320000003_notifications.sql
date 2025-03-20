-- Create notifications table
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  type text not null,
  read boolean default false,
  data jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create notification_preferences table
create table notification_preferences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  channel text not null,
  enabled boolean default true,
  frequency text default 'instant',
  quiet_hours_start time,
  quiet_hours_end time,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, channel)
);

-- Enable RLS
alter table notifications enable row level security;
alter table notification_preferences enable row level security;

-- Create policies
create policy "Users can view their own notifications"
  on notifications for select
  using (auth.uid() = user_id);

create policy "Users can update their own notifications"
  on notifications for update
  using (auth.uid() = user_id);

create policy "Users can view their notification preferences"
  on notification_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update their notification preferences"
  on notification_preferences for update
  using (auth.uid() = user_id);

create policy "Users can insert their notification preferences"
  on notification_preferences for insert
  with check (auth.uid() = user_id);

-- Create function to handle notification updates
create or replace function handle_notification_update()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Create triggers for updates
create trigger on_notification_update
  before update on notifications
  for each row
  execute procedure handle_notification_update();

create trigger on_notification_preferences_update
  before update on notification_preferences
  for each row
  execute procedure handle_notification_update();

-- Create function to create default notification preferences
create or replace function create_default_notification_preferences()
returns trigger as $$
begin
  insert into notification_preferences (user_id, channel)
  values
    (new.id, 'email'),
    (new.id, 'push'),
    (new.id, 'in_app');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger to set up default notification preferences for new users
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure create_default_notification_preferences(); 