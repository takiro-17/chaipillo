create table if not exists public.entry_requests (
    id text primary key,
    gym_id bigint null,
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

create index if not exists entry_requests_gym_name_idx
    on public.entry_requests (gym_name);

create index if not exists entry_requests_user_phone_idx
    on public.entry_requests (user_phone);

create index if not exists entry_requests_status_requested_at_idx
    on public.entry_requests (status, requested_at desc);

alter table public.entry_requests enable row level security;

drop policy if exists "entry_requests_public_read" on public.entry_requests;
create policy "entry_requests_public_read"
on public.entry_requests
for select
to anon, authenticated
using (true);

drop policy if exists "entry_requests_public_insert" on public.entry_requests;
create policy "entry_requests_public_insert"
on public.entry_requests
for insert
to anon, authenticated
with check (true);

drop policy if exists "entry_requests_public_update" on public.entry_requests;
create policy "entry_requests_public_update"
on public.entry_requests
for update
to anon, authenticated
using (true)
with check (true);

alter publication supabase_realtime add table public.entry_requests;
