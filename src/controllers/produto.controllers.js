const produtoModel = require("../models/produto.models");

async function adicionarProduto(req, res) {
    try {
        const { nome, preco } = req.body;
        if (!nome || !preco) {
            return res.status(400).json({ erro: "Nome ou preço não definidos!" })
        }
        const adProduto = await produtoModel.adicionarProduto(req.body);
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao adcionar produto" });
    }
}
async function listarProdutos(req, res) {
    try {
        const lisProdutos = await produtoModel.listarProdutos();
        return res.status(200).json(lisProdutos);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao listar produto" });
    }
}
async function listarProduto(req, res) {
    try {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({ erro: "Id Inválido" });
        }
        const lisProduto = await produtoModel.listarProduto(id);
        return res.status(200).json(lisProduto);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao listar produto" });
    }
}
async function listarProdutosAtv(req, res) {
    try {
        const produtosAtv = await produtoModel.listarProdutosAtv();
        return res.status(200).json(produtosAtv);
    } catch (error) {
        return res.status(500).json({erro: "Erro ao listar produto"})
    }
}
async function deletarProduto(req, res) {
    try {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({ erro: "Id Inválido" });
        }
        const delProduto = await produtoModel.deletarProduto(id);
        if (delProduto.rowCount === 0) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }
        return res.status(204);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao deletar produto" });
    }
}
async function atualizarProduto(req, res) {
    const {nome, preco} = req.body;
    const id = req.params.id;
    try {
        if(!id){
            return res.status(400).json({erro: "Id inválido"});
        }
        if(!nome && !preco){
            return res.status(400).json({erro: "Não houve alteração no banco de dados"});
        }
        const [produto] = await produtoModel.listarProduto(id);
        if(!produto){
            return res.status(400).json({erro: "Produto não encontrado"});
        } else if(produto.nome === nome && produto.preco === preco){
            return res.sendStatus(200);
        }
        const novoNome = nome ?? produto.nome;
        const novoPreco = preco ?? produto.preco;
        const atuProduto = await produtoModel.atualizarProduto(id, novoNome, novoPreco);
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro ao atualizar produto" });
    }
}
async function atualizarProdutoAtv(req, res) {
    const id = Number(req.params.id);
    const acao = req.params.acao;
    console.log(acao);
    let parametro;
    try {
        if(!id){
            return res.status(400).json({erro: "Id inválido"});
        }
        if(acao==="ativar"){
            parametro = true;
        } else if(acao==="desativar"){
            parametro = false;
        } else {
            return res.status(400).json({erro: "Ação Inválida"})
        }
        console.log(parametro);
        const atuProdAtv = await produtoModel.atualizarProdutoAtv(id, parametro);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({erro: "Erro ao atualizar produto"})
    }
}

module.exports = {
    adicionarProduto,
    listarProdutos,
    listarProduto,
    listarProdutosAtv,
    deletarProduto,
    atualizarProduto,
    atualizarProdutoAtv
}