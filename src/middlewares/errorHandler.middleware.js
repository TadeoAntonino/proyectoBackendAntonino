// import CustomError from "../utils/customError";
// import errorDictionary from "../utils/errorDictionary";

export default (error, req, res, next) => {
  console.log(
    "Message:",
    error.message,
    "Path",
    req.path,
    "Data",
    { query: req.query },
    { params: req.params },
    { body: req.body }
  );
  next();
};
