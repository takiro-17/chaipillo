create extension if not exists pgcrypto;

create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    role text not null default 'member' check (role in ('member', 'owner', 'staff')),
    full_name text,
    phone text,
    avatar_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.gyms (
    id uuid primary key references auth.users (id) on delete cascade,
    owner_user_id uuid references auth.users (id) on delete cascade,
    name text,
    location text,
    phone text,
    logo_url text,
    is_published boolean not null default true,
    data jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.gyms add column if not exists owner_user_id uuid references auth.users (id) on delete cascade;
alter table public.gyms add column if not exists name text;
alter table public.gyms add column if not exists location text;
alter table public.gyms add column if not exists phone text;
alter table public.gyms add column if not exists logo_url text;
alter table public.gyms add column if not exists is_published boolean not null default true;
alter table public.gyms add column if not exists data jsonb not null default '{}'::jsonb;
alter table public.gyms add column if not exists created_at timestamptz not null default now();
alter table public.gyms add column if not exists updated_at timestamptz not null default now();

update public.gyms
set owner_user_id = coalesce(owner_user_id, id),
    name = coalesce(nullif(name, ''), data ->> 'gymName', 'My Gym'),
    location = coalesce(nullif(location, ''), data ->> 'location', ''),
    phone = coalesce(nullif(phone, ''), data ->> 'phone', ''),
    updated_at = now()
where owner_user_id is null
   or name is null
   or location is null
   or phone is null;

create table if not exists public.gym_memberships (
    id uuid primary key default gen_random_uuid(),
    gym_id text not null,
    member_user_id uuid null references auth.users (id) on delete set null,
    member_name text not null,
    member_phone text not null,
    plan_name text not null,
    fee_amount integer not null default 0,
    payment_status text not null default 'pending' check (payment_status in ('pending', 'completed', 'refunded')),
    membership_status text not null default 'active' check (membership_status in ('active', 'expired', 'cancelled', 'pending')),
    joined_at timestamptz not null default now(),
    expires_at timestamptz null,
    source_app text not null default 'UserApp',
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create unique index if not exists gym_memberships_gym_phone_uidx
    on public.gym_memberships (gym_id, member_phone);

create index if not exists gym_memberships_member_user_idx
    on public.gym_memberships (member_user_id);

create index if not exists gym_memberships_gym_status_idx
    on public.gym_memberships (gym_id, membership_status, joined_at desc);

create table if not exists public.attendance_logs (
    id uuid primary key default gen_random_uuid(),
    gym_id text not null,
    membership_id uuid null references public.gym_memberships (id) on delete set null,
    member_user_id uuid null references auth.users (id) on delete set null,
    member_name text not null,
    member_phone text,
    entry_request_id text null,
    entry_time timestamptz not null default now(),
    exit_time timestamptz null,
    source_app text not null default 'GymOwnerApp',
    created_at timestamptz not null default now()
);

create index if not exists attendance_logs_gym_entry_idx
    on public.attendance_logs (gym_id, entry_time desc);

create table if not exists public.entry_requests (
    id text primary key,
    gym_id text null,
    membership_id uuid null references public.gym_memberships (id) on delete set null,
    member_user_id uuid null references auth.users (id) on delete set null,
    gym_name text not null,
    user_name text not null,
    user_phone text not null,
    membership_plan text null,
    otp text not null check (char_length(otp) = 6),
    status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'expired')),
    source_app text null default 'UserApp',
    requested_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    approved_at timestamptz null,
    rejected_at timestamptz null,
    resolved_at timestamptz null,
    owner_gym_name text null
);

create table if not exists public.gym_activity_events (
    id uuid primary key default gen_random_uuid(),
    gym_id text not null,
    member_user_id uuid null references auth.users (id) on delete set null,
    member_phone text null,
    member_name text null,
    event_type text not null,
    source_page text null,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create index if not exists gym_activity_events_gym_created_idx
    on public.gym_activity_events (gym_id, created_at desc);

create index if not exists gym_activity_events_type_created_idx
    on public.gym_activity_events (event_type, created_at desc);

create table if not exists public.gym_reviews (
    id text primary key,
    gym_id text not null,
    member_user_id uuid null references auth.users (id) on delete set null,
    member_phone text null,
    member_name text not null,
    rating integer not null check (rating between 1 and 5),
    comment text not null,
    reply text null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists gym_reviews_gym_created_idx
    on public.gym_reviews (gym_id, created_at desc);

create index if not exists entry_requests_gym_id_idx
    on public.entry_requests (gym_id, status, requested_at desc);

alter table public.entry_requests
    alter column gym_id type text
    using gym_id::text;

create index if not exists entry_requests_gym_name_idx
    on public.entry_requests (gym_name);

create index if not exists entry_requests_user_phone_idx
    on public.entry_requests (user_phone);

alter table public.profiles enable row level security;
alter table public.gyms enable row level security;
alter table public.gym_memberships enable row level security;
alter table public.attendance_logs enable row level security;
alter table public.entry_requests enable row level security;
alter table public.gym_activity_events enable row level security;
alter table public.gym_reviews enable row level security;

drop policy if exists "profiles_self_access" on public.profiles;
create policy "profiles_self_access"
on public.profiles
for all
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "gyms_public_read" on public.gyms;
create policy "gyms_public_read"
on public.gyms
for select
to anon, authenticated
using (is_published = true);

drop policy if exists "gyms_owner_manage" on public.gyms;
create policy "gyms_owner_manage"
on public.gyms
for all
to authenticated
using (auth.uid() = id or auth.uid() = owner_user_id)
with check (auth.uid() = id or auth.uid() = owner_user_id);

drop policy if exists "memberships_owner_read" on public.gym_memberships;
create policy "memberships_owner_read"
on public.gym_memberships
for select
to authenticated
using (
    exists (
        select 1
        from public.gyms g
        where g.id::text = gym_memberships.gym_id
          and (g.id = auth.uid() or g.owner_user_id = auth.uid())
    )
);

drop policy if exists "memberships_owner_manage" on public.gym_memberships;
create policy "memberships_owner_manage"
on public.gym_memberships
for all
to authenticated
using (
    exists (
        select 1
        from public.gyms g
        where g.id::text = gym_memberships.gym_id
          and (g.id = auth.uid() or g.owner_user_id = auth.uid())
    )
)
with check (
    exists (
        select 1
        from public.gyms g
        where g.id::text = gym_memberships.gym_id
          and (g.id = auth.uid() or g.owner_user_id = auth.uid())
    )
);

drop policy if exists "memberships_member_read" on public.gym_memberships;
create policy "memberships_member_read"
on public.gym_memberships
for select
to anon, authenticated
using (
    member_user_id = auth.uid()
    or member_phone is not null
);

drop policy if exists "memberships_member_insert" on public.gym_memberships;
create policy "memberships_member_insert"
on public.gym_memberships
for insert
to anon, authenticated
with check (member_phone is not null and gym_id is not null);

drop policy if exists "attendance_owner_read" on public.attendance_logs;
create policy "attendance_owner_read"
on public.attendance_logs
for select
to authenticated
using (
    exists (
        select 1
        from public.gyms g
        where g.id::text = attendance_logs.gym_id
          and (g.id = auth.uid() or g.owner_user_id = auth.uid())
    )
);

drop policy if exists "attendance_owner_insert" on public.attendance_logs;
create policy "attendance_owner_insert"
on public.attendance_logs
for insert
to authenticated
with check (
    exists (
        select 1
        from public.gyms g
        where g.id::text = attendance_logs.gym_id
          and (g.id = auth.uid() or g.owner_user_id = auth.uid())
    )
);

drop policy if exists "attendance_member_read" on public.attendance_logs;
create policy "attendance_member_read"
on public.attendance_logs
for select
to anon, authenticated
using (
    member_user_id = auth.uid()
    or member_phone is not null
);

drop policy if exists "entry_requests_owner_read" on public.entry_requests;
create policy "entry_requests_owner_read"
on public.entry_requests
for select
to authenticated
using (
    gym_id is not null and exists (
        select 1
        from public.gyms g
        where g.id::text = entry_requests.gym_id
          and (g.id = auth.uid() or g.owner_user_id = auth.uid())
    )
);

drop policy if exists "entry_requests_member_read" on public.entry_requests;
create policy "entry_requests_member_read"
on public.entry_requests
for select
to anon, authenticated
using (user_phone is not null);

drop policy if exists "entry_requests_member_insert" on public.entry_requests;
create policy "entry_requests_member_insert"
on public.entry_requests
for insert
to anon, authenticated
with check (user_phone is not null and gym_name is not null);

drop policy if exists "entry_requests_owner_update" on public.entry_requests;
create policy "entry_requests_owner_update"
on public.entry_requests
for update
to anon, authenticated
using (user_phone is not null)
with check (user_phone is not null);

drop policy if exists "activity_events_owner_read" on public.gym_activity_events;
create policy "activity_events_owner_read"
on public.gym_activity_events
for select
to authenticated
using (
    exists (
        select 1
        from public.gyms g
        where g.id::text = gym_activity_events.gym_id
          and (g.id = auth.uid() or g.owner_user_id = auth.uid())
    )
);

drop policy if exists "activity_events_public_insert" on public.gym_activity_events;
create policy "activity_events_public_insert"
on public.gym_activity_events
for insert
to anon, authenticated
with check (gym_id is not null and event_type is not null);

drop policy if exists "reviews_owner_read" on public.gym_reviews;
create policy "reviews_owner_read"
on public.gym_reviews
for select
to authenticated
using (
    exists (
        select 1
        from public.gyms g
        where g.id::text = gym_reviews.gym_id
          and (g.id = auth.uid() or g.owner_user_id = auth.uid())
    )
);

drop policy if exists "reviews_public_read" on public.gym_reviews;
create policy "reviews_public_read"
on public.gym_reviews
for select
to anon, authenticated
using (gym_id is not null);

drop policy if exists "reviews_public_insert" on public.gym_reviews;
create policy "reviews_public_insert"
on public.gym_reviews
for insert
to anon, authenticated
with check (gym_id is not null and member_name is not null);

drop policy if exists "reviews_owner_update" on public.gym_reviews;
create policy "reviews_owner_update"
on public.gym_reviews
for update
to authenticated
using (
    exists (
        select 1
        from public.gyms g
        where g.id::text = gym_reviews.gym_id
          and (g.id = auth.uid() or g.owner_user_id = auth.uid())
    )
)
with check (
    exists (
        select 1
        from public.gyms g
        where g.id::text = gym_reviews.gym_id
          and (g.id = auth.uid() or g.owner_user_id = auth.uid())
    )
);

do $$
begin
    begin
        alter publication supabase_realtime add table public.gym_memberships;
    exception when duplicate_object then
        null;
    end;
    begin
        alter publication supabase_realtime add table public.entry_requests;
    exception when duplicate_object then
        null;
    end;
    begin
        alter publication supabase_realtime add table public.gym_activity_events;
    exception when duplicate_object then
        null;
    end;
    begin
        alter publication supabase_realtime add table public.gym_reviews;
    exception when duplicate_object then
        null;
    end;
end $$;
