const db = require("../database");

async function listarPedidos() {
    const pool = await db.connect();
    const sql = "SELECT * FROM pedidos;";
    const res = await pool.query(sql);
    return res.rows;
}
async function listarProdutosPedido(id) {
    const pool = await db.connect();
    const sql = "SELECT * FROM itens_pedido WHERE id=$1;";
    const res = await pool.query(sql, [id]);
    return res.rows;
}

module.exports = {
    listarPedidos,
    listarProdutosPedido
}