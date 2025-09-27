export async function onRequest(context) {
  const auth = context.request.headers.get("Authorization");

  if (!auth) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  const [scheme, encoded] = auth.split(" ");

  if (!encoded || scheme !== "Basic") {
    return new Response("Invalid authentication", { status: 401 });
  }

  const decoded = atob(encoded);
  const [username, password] = decoded.split(":");

  // Your credentials here
  const VALID_USERNAME = import.meta.env.VITE_VALID_USERNAME;
  const VALID_PASSWORD = import.meta.env.VITE_VALID_PASSWORD;

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return new Response("Invalid credentials", { status: 401 });
  }

  // Continue to the requested page
  return context.next();
}
