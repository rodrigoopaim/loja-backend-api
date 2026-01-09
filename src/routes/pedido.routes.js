const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedido.controllers");

router.post("/", pedidoController.criarPedido);
router.get("/", pedidoController.listarPedidos);
router.get("/:id", pedidoController.listarPedido);
router.post("/:id/itens", pedidoController.adicionarItemPedido);
router.get("/:id/itens", pedidoController.listarItensPedido); 
router.delete("/:id/itens/:idItem", pedidoController.deletarItemPedido);

module.exports = router;