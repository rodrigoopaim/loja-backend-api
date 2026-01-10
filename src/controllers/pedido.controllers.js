const pedidoModels = require("../models/pedido.models");
const produtoModels = require("../models/produto.models");

async function criarPedido(req, res) {
    const data = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
    try {
        await pedidoModels.criarPedido('aberto', 0, data);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({erro: "Erro ao criar pedido"});
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
        const id = Number(req.params.id);
        const listPedido = await pedidoModels.listarPedido(id);
        return res.status(200).json(listPedido);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao listar pedido" });
    }
}
async function adicionarItemPedido(req, res) {
    const idPedido = Number(req.params.id);
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
        await pedidoModels.atualizarPedido(idPedido, listPedido.status, listPedido.total, listPedido.data_criacao);
        await pedidoModels.adicionarItemPedido(idPedido, produto_id, quantidade, preco);
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(400);
    }
}
async function listarItensPedido(req, res) {
    const idPedido = Number(req.params.id);
    try {
        const listItePedido = await pedidoModels.listarItensPedido(idPedido);
        return res.status(200).json(listItePedido);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao listar pedido" });
    }
}
async function listarItemPedido(req, res) {
    const idPedido = Number(req.params.id);
    const idItem = Number(req.params.idItem);
    try {
        const listItePedido = await pedidoModels.listarItemPedido(idPedido, idItem);
        return res.status(200).json(listItePedido);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao listar pedido" });
    }
}
async function deletarItemPedido(req, res) {
    const idPedido = Number(req.params.id);
    const idItem = Number(req.params.idItem);
    try {
        const itensPedido = await pedidoModels.listarItemPedido(idPedido, idItem);
        if (!itensPedido.length) {
            return res.status(400).json({ erro: "Produto não encontrado no pedido" });
        }
        const totalItem = itensPedido.reduce((soma, item) => {
            return soma + Number(item.preco);
        }, 0);
        const [pedido] = await pedidoModels.listarPedido(idPedido);
        pedido.total -= totalItem;
        if (pedido.total < 0) {
            pedido.total = 0;
        }
        await pedidoModels.deletarItemPedido(idPedido, idItem);
        await pedidoModels.atualizarPedido(idPedido, pedido.status, pedido.total, pedido.data_criacao);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao deletar produto" });
    }
}
async function atualizarQuantidadeItemPedido(req, res) {
    const idPedido = Number(req.params.id);
    const idItem = Number(req.params.idItem);
    const {quantidade} = req.body;
    try {
        const [pedido] = await pedidoModels.listarPedido(idPedido);
        const [listItePedido] = await pedidoModels.listarItemPedido(idPedido, idItem);
        console.log(listItePedido);
        if(!listItePedido) {
            return res.status(400).json({erro: "Produto não encontrado no pedido"});
        } 
        let total = pedido.total;
        total -= (listItePedido.preco * listItePedido.quantidade)-(listItePedido.preco * quantidade);
        await pedidoModels.atualizarPedido(idPedido, pedido.status, total, pedido.data_criacao);
        await pedidoModels.atualizarQuantidadeItemPedido(idPedido, idItem, quantidade);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({erro: "Não foi possível atualizar o item"});
    }
}

module.exports = {
    criarPedido,
    listarPedidos,
    listarPedido,
    adicionarItemPedido,
    listarItensPedido,
    listarItemPedido,
    deletarItemPedido,
    atualizarQuantidadeItemPedido
}
