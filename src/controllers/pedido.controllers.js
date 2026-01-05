const pedidoModels = require("../models/pedido.models");
const produtoModels = require("../models/produto.models");

async function adicionarItemPedido(req, res) {
    const idPedido = req.params.id;
    const {produto_id, quantidade} = req.body;
    try {
        const [listPedido] = await pedidoModels.listarPedido(idPedido);
        const [produto] = await produtoModels.listarProduto(produto_id);
        if(!listPedido){
            return res.status(400).json({erro: "Pedido inexistente"});
        } else if (listPedido.status === "cancelado" || listPedido.status === "finalizado"){
            return res.status.json({erro: "Status do Pedido fechado para alterações"});
        }
        if(!produto){
            return res.status(400).json({erro: "Produto inexistente"});
        } else if(produto.status === false){
            return res.status(400).json({erro: "Status do produto desativado"});
        }
        const preco = produto.preco;
        const addItemPedido = await pedidoModels.adicionarItemPedido(idPedido, produto_id, quantidade, preco);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
async function listarPedidos(req, res) {
    try {
        const listPedido = await pedidoModels.listarPedidos();
        return res.status(200).json(listPedido);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao listar produto" });
    }
}
async function listarPedido(req, res) {
    try {
        const id = req.params.id;
        const listPedido = await pedidoModels.listarPedido(id);
        return res.status(200).json(listPedido);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao listar pedido" });
    }
}

module.exports = {
    adicionarItemPedido,
    listarPedidos,
    listarPedido
}