-- Create privacy_settings table
create table if not exists privacy_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  public_profile boolean default true,
  show_pathway boolean default true,
  show_achievements boolean default true,
  show_activity boolean default true,
  allow_mentions boolean default true,
  allow_messages boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Create RLS policies for privacy_settings
alter table privacy_settings enable row level security;

create policy "Users can view their own privacy settings"
  on privacy_settings for select
  using (auth.uid() = user_id);

create policy "Users can update their own privacy settings"
  on privacy_settings for update
  using (auth.uid() = user_id);

create policy "Service role can manage privacy settings"
  on privacy_settings for all
  to service_role
  using (true)
  with check (true);

-- Create trigger for updated_at
create trigger update_privacy_settings_updated_at
  before update on privacy_settings
  for each row
  execute function update_updated_at_column();

-- Create function to initialize privacy settings
create or replace function initialize_privacy_settings()
returns trigger as $$
begin
  insert into privacy_settings (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql;

-- Create trigger to initialize privacy settings for new users
create trigger initialize_user_privacy_settings
  after insert on auth.users
  for each row
  execute function initialize_privacy_settings(); 