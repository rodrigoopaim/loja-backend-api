const db = require("../database");

async function criarPedido(st, total, data_criacao) {
    const pool = await db.connect();
    const sql = "INSERT INTO pedidos(status, total, data_criacao) " +
    "VALUES ($1, $2, $3);";
    const res = await pool.query(sql, [st, total, data_criacao]);
}
async function listarPedidos() {
    const pool = await db.connect();
    const sql = "SELECT * FROM pedidos;";
    const res = await pool.query(sql);
    return res.rows;
}
async function listarPedido(id) {
    const pool = await db.connect();
    const sql = "SELECT * FROM pedidos WHERE id=$1;";
    const res = await pool.query(sql, [id]);
    return res.rows;
}
async function atualizarPedido(idPedido, st, total, data_criacao) {
    const pool = await db.connect();
    const sql = "UPDATE pedidos SET status=$1, total=$2, data_criacao=$3 WHERE id=$4;";
    const res = await pool.query(sql, [st, total, data_criacao, idPedido]);
}
async function adicionarItemPedido(idPedido, idItem, quantidade, preco) {
    const pool = await db.connect();
    const sql = "INSERT INTO itens_pedido(pedido_id, produto_id, quantidade, preco_unitario) " + 
    "VALUES ($1, $2, $3, $4);";
    const res = await pool.query(sql, [idPedido, idItem, quantidade, preco]);
}
async function listarItensPedido(idPedido) {
    const pool = await db.connect();
    const sql = "SELECT pro.id, pro.nome, pro.preco, ite.quantidade FROM produtos pro JOIN itens_pedido ite ON pro.id=ite.produto_id " + 
    "JOIN pedidos ped ON ped.id=ite.pedido_id WHERE ped.id=$1;";
    const res = await pool.query(sql, [idPedido]);
    return res.rows;
}
async function listarItemPedido(idPedido, idItem) {
    const pool = await db.connect();
    const sql = "SELECT pro.id, pro.nome, pro.preco, ite.quantidade FROM produtos pro JOIN itens_pedido ite ON pro.id=ite.produto_id " + 
    "JOIN pedidos ped ON ped.id=ite.pedido_id WHERE ped.id=$1 AND pro.id=$2;";
    const res = await pool.query(sql, [idPedido, idItem]);
    return res.rows;
}
async function deletarItemPedido(idPedido, idItem) {
    const pool = await db.connect();
    const sql = "DELETE FROM itens_pedido WHERE produto_id=$1 AND pedido_id=$2;";
    const res = await pool.query(sql, [idItem, idPedido]);
}
async function atualizarQuantidadeItemPedido(idPedido, idItem, quantidade) {
    const pool = await db.connect();
    const sql = "UPDATE itens_pedido SET quantidade=$1 WHERE pedido_id=$2 AND produto_id=$3;";
    const res = await pool.query(sql, [quantidade, idPedido, idItem])
}

module.exports = {
    criarPedido,
    listarPedidos,
    listarPedido,
    atualizarPedido,
    adicionarItemPedido,
    listarItensPedido,
    listarItemPedido,
    deletarItemPedido,
    atualizarQuantidadeItemPedido
}