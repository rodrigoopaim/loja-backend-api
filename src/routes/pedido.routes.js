const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedido.controllers");

router.get("/", pedidoController.listarPedidos);
router.get("/:id", pedidoController.listarPedido);
router.post("/:id/itens", pedidoController.adicionarItemPedido);

module.exports = router;