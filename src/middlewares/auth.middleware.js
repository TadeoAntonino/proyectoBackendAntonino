export default async function auth(req, res, next) {
  if (req?.session?.logged) {
    await req?.session?.touch();
    next();
  } else {
    await res?.status(403).send("Usuario no registrado");
  }
}
