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

module.exports = {
    criarPedido,
    listarPedidos,
    listarPedido,
    atualizarPedido,
    adicionarItemPedido
}