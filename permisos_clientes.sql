-- =====================================================================
-- PERMISOS (RLS) PARA LA APP CONTASAV
-- Ejecutar en el SQL Editor de Supabase
-- =====================================================================
-- Estas políticas permiten leer, crear y actualizar clientes desde el
-- frontend usando la clave "anon" (sin login de usuario).
-- Si más adelante agregas autenticación de usuarios en ContaSav,
-- reemplaza "anon" por "authenticated" en cada política para que solo
-- usuarios logueados puedan escribir datos.
-- =====================================================================

-- 1) TblCliente ---------------------------------------------------------
alter table public."TblCliente" enable row level security;

create policy "Lectura publica de clientes"
on public."TblCliente"
for select
to anon, authenticated
using (true);

create policy "Crear clientes"
on public."TblCliente"
for insert
to anon, authenticated
with check (true);

create policy "Actualizar clientes"
on public."TblCliente"
for update
to anon, authenticated
using (true)
with check (true);

-- 2) Catálogos usados por el formulario (solo lectura) ------------------
alter table public."TbltipoPersona" enable row level security;

create policy "Lectura publica tipo de persona"
on public."TbltipoPersona"
for select
to anon, authenticated
using (true);

alter table public."TbltipoDocumento" enable row level security;

create policy "Lectura publica tipo de documento"
on public."TbltipoDocumento"
for select
to anon, authenticated
using (true);

-- =====================================================================
-- NOTA DE SEGURIDAD
-- Estas políticas dejan la tabla TblCliente abierta a cualquiera que
-- tenga la anon key (que es pública en el HTML). Es un buen punto de
-- partida para probar la app, pero antes de usarla en producción con
-- datos reales de clientes conviene:
--   1. Activar Supabase Auth (login).
--   2. Cambiar "to anon, authenticated" por "to authenticated" en las
--      políticas de insert/update, para que solo usuarios logueados
--      puedan crear o modificar clientes.
-- =====================================================================
