const pedidoModels = require("../models/pedido.models");
const produtoModels = require("../models/produto.models");

async function criarPedido(req, res) {
    const data = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
    try {
        const criaPedido = await pedidoModels.criarPedido('aberto', 0, data);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({erro: "Erro ao criar pedido"});
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
        listPedido.total += preco*quantidade; 
        const atualizarPedido = await pedidoModels.atualizarPedido(idPedido, listPedido.status, listPedido.total, listPedido.data_criacao);
        const addItemPedido = await pedidoModels.adicionarItemPedido(idPedido, produto_id, quantidade, preco);
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(400);
    }
}

module.exports = {
    criarPedido,
    listarPedidos,
    listarPedido,
    adicionarItemPedido
}