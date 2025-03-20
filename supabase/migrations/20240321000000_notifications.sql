-- Create notifications table
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  type text not null,
  read boolean default false,
  data jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create notification_preferences table
create table if not exists notification_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null,
  enabled boolean default true,
  frequency text default 'instant',
  quiet_hours_start time,
  quiet_hours_end time,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, type)
);

-- Create RLS policies for notifications
alter table notifications enable row level security;

create policy "Users can view their own notifications"
  on notifications for select
  using (auth.uid() = user_id);

create policy "Users can update their own notifications"
  on notifications for update
  using (auth.uid() = user_id);

create policy "Users can delete their own notifications"
  on notifications for delete
  using (auth.uid() = user_id);

create policy "Service role can create notifications"
  on notifications for insert
  to service_role
  with check (true);

-- Create RLS policies for notification_preferences
alter table notification_preferences enable row level security;

create policy "Users can view their own notification preferences"
  on notification_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update their own notification preferences"
  on notification_preferences for update
  using (auth.uid() = user_id);

create policy "Service role can manage notification preferences"
  on notification_preferences for all
  to service_role
  using (true)
  with check (true);

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger update_notifications_updated_at
  before update on notifications
  for each row
  execute function update_updated_at_column();

create trigger update_notification_preferences_updated_at
  before update on notification_preferences
  for each row
  execute function update_updated_at_column();

-- Create function to initialize notification preferences
create or replace function initialize_notification_preferences()
returns trigger as $$
declare
  notification_type text;
  notification_types text[] := array[
    'achievement',
    'milestone',
    'reminder',
    'system',
    'pathway',
    'streak',
    'content',
    'profile',
    'security',
    'goal',
    'innovation',
    'feedback',
    'collaboration',
    'mentorship',
    'community'
  ];
begin
  foreach notification_type in array notification_types
  loop
    insert into notification_preferences (user_id, type)
    values (new.id, notification_type);
  end loop;
  return new;
end;
$$ language plpgsql;

-- Create trigger to initialize notification preferences for new users
create trigger initialize_user_notification_preferences
  after insert on auth.users
  for each row
  execute function initialize_notification_preferences(); 