const pedidoModels = require("../models/pedido.models");

async function listarPedidos(req, res) {
    try {
        const listPedido = await pedidoModels.listarPedidos();
        return res.status(200).json(listPedido);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao listar produto" });
    }
}
async function listarProdutosPedido(req, res) {
    try {
        const id = req.params.id;
        const listProdPedido = await pedidoModels.listarProdutosPedido(id);
        return res.status(200).json(listProdPedido);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao listar produto" });
    }
}

module.exports = {
    listarPedidos,
    listarProdutosPedido
}