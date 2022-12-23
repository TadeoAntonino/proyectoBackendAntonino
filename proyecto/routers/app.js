const Router = require('express');


const routes = require("../routes/index.js");

const app = Router();
app.use(Router.json());
app.use(Router.urlencoded({extended: true}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });
app.use("/api", routes)

const PORT = 8080;

const server = app.listen(PORT, ()=> 
    console.log(`🚀 Server started on port http://localhost:${PORT}` ),
);
server.on("error", (err)=> console.log(err));

module.exports = server;