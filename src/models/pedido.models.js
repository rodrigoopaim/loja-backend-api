const db = require("../database");

async function adicionarItemPedido(idPedido, idItem, quantidade, preco) {
    const pool = await db.connect();
    const sql = "INSERT INTO itens_pedido(pedido_id, produto_id, quantidade, preco_unitario) " + 
    "VALUES ($1, $2, $3, $4);";
    const res = await pool.query(sql, [idPedido, idItem, quantidade, preco]);
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

module.exports = {
    adicionarItemPedido,
    listarPedidos,
    listarPedido
}