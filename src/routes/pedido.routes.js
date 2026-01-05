const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedido.controllers");

router.get("/", pedidoController.listarPedidos);
router.get("/:id", pedidoController.listarProdutosPedido);

module.exports = router;