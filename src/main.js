require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const produtosRoutes = require("./routes/produto.routes");
const pedidosRoutes = require("./routes/pedido.routes");

app.use(express.json());
app.use('/produtos', produtosRoutes);
app.use("/pedidos", pedidosRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});