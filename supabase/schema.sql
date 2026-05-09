-- ============================================================
-- Grão de Mostarda — Schema Supabase
-- Execute este script no SQL Editor do seu projeto Supabase
-- ============================================================

-- Enum para tipo de encerramento
create type closing_type as enum ('prayer', 'song');

-- --------------------------------------------------------
-- Tabela: devotionals
-- --------------------------------------------------------
create table devotionals (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  sermon_date         date not null,
  reflection_phrase   text not null,
  bible_reference     text not null,
  bible_text          text not null,
  puc_summary         text not null,
  reflection_questions text[] not null default '{}',
  closing_type        closing_type not null default 'prayer',
  closing_content     text not null,
  youtube_url         text,
  published           boolean not null default false,
  created_at          timestamptz not null default now()
);

-- RLS: membros autenticados lêem somente publicados
alter table devotionals enable row level security;

create policy "members_read_published" on devotionals
  for select using (auth.role() = 'authenticated' and published = true);

create policy "admins_all" on devotionals
  for all using (auth.jwt() ->> 'role' = 'admin'
    or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- --------------------------------------------------------
-- Tabela: user_progress
-- --------------------------------------------------------
create table user_progress (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  devotional_id  uuid not null references devotionals(id) on delete cascade,
  completed_at   timestamptz not null default now(),
  unique(user_id, devotional_id)
);

alter table user_progress enable row level security;

create policy "own_progress" on user_progress
  for all using (auth.uid() = user_id);

-- --------------------------------------------------------
-- Tabela: youtube_lives
-- --------------------------------------------------------
create table youtube_lives (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  youtube_url text not null,
  live_date   date not null,
  is_live     boolean not null default false
);

alter table youtube_lives enable row level security;

create policy "members_read_lives" on youtube_lives
  for select using (auth.role() = 'authenticated');

create policy "admins_manage_lives" on youtube_lives
  for all using ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- --------------------------------------------------------
-- Criar primeiro usuário admin (após registrar via Auth)
-- Substitua o UUID pelo id do usuário criado no painel Auth
-- --------------------------------------------------------
-- update auth.users
-- set raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'
-- where id = 'SEU-UUID-AQUI';
