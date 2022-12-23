import express from 'express';
import productsRouter from './products.router.js';
import cartsRouter from './carts.router.js';
import { engine } from 'express-handlebars';
import { viewsRouter } from './routers/views.router.js';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('src/public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const PORT = 8080;

const server = app.listen(PORT, ()=> 
    console.log(`🚀 Server started on port http://localhost:${PORT}` ),
);
server.on("error", (err)=> console.log(err));


const io = new Server(server)

io.on('connection', (socket) => {
    console.log(`Conectado desde el id: ${socket.id}`);

    socket.on('disconnect', (socket) => {
        console.log(`Desconectado`);
    });

})