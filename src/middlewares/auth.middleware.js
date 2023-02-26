export default function auth(req, res, next) {
  if (req.session.logged) {
    req.session.touch();
    next();
  } else {
    res.status(400).send("Ruta restringida");
  }
}
