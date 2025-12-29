const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produto.controllers');

router.post('/', produtoController.adicionarProduto);
router.get('/', produtoController.listarProdutos);
router.get('/ativos', produtoController.listarProdutosAtv);
router.get('/:id', produtoController.listarProduto);
router.delete('/:id', produtoController.deletarProduto);
router.patch('/:id', produtoController.atualizarProduto);
router.patch('/:id/:acao', produtoController.atualizarProdutoAtv);

module.exports = router;
