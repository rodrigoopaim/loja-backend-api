const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedido.controllers");

router.post("/", pedidoController.criarPedido);
router.get("/", pedidoController.listarPedidos);
router.get("/:id", pedidoController.listarPedido);
router.post("/:id/itens", pedidoController.adicionarItemPedido);
router.get("/:id/itens", pedidoController.listarItensPedido); 
router.get("/:id/itens/:idItem", pedidoController.listarItemPedido); 
router.delete("/:id/itens/:idItem", pedidoController.deletarItemPedido);
router.patch("/:id/itens/:idItem", pedidoController.atualizarQuantidadeItemPedido);

module.exports = router;