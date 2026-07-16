// Cloudflare Worker
//
// Sirve los archivos estaticos del proyecto (index.html, etc.) y
// ademas responde la ruta /api/config leyendo las variables de
// entorno SUPABASE_URL y SUPABASE_ANON_KEY configuradas en
// Cloudflare (Workers & Pages -> tu proyecto -> Settings ->
// Variables and Secrets).

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/config") {
      const supabaseUrl = env.SUPABASE_URL;
      const anonKey = env.SUPABASE_ANON_KEY;

      if (!supabaseUrl || !anonKey) {
        return new Response(
          JSON.stringify({ error: "Faltan SUPABASE_URL o SUPABASE_ANON_KEY en las variables de entorno" }),
          { status: 500, headers: { "content-type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ url: supabaseUrl, anonKey }),
        { headers: { "content-type": "application/json" } }
      );
    }

    // Cualquier otra ruta: sirve el archivo estatico correspondiente
    return env.ASSETS.fetch(request);
  }
};
