// Cloudflare Pages Function
// Ruta resultante: /api/config
//
// Lee las variables de entorno configuradas en Cloudflare (Pages ->
// tu proyecto -> Settings -> Environment variables) y se las entrega
// al HTML en tiempo de ejecución, para no tener que escribirlas en el
// código fuente.
//
// Importante: la "anon key" de Supabase está diseñada para ser pública
// (queda visible en el navegador de todas formas); lo que protege tus
// datos son las políticas de RLS que ejecutaste en Supabase, no el
// hecho de ocultar esta llave.

export async function onRequestGet({ env }) {
  const url = env.SUPABASE_URL;
  const anonKey = env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return new Response(
      JSON.stringify({ error: "Faltan SUPABASE_URL o SUPABASE_ANON_KEY en las variables de entorno de Cloudflare" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ url, anonKey }),
    { headers: { "content-type": "application/json" } }
  );
}
