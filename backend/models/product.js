const db = require('../util/database');

module.exports = class Grocery {
  constructor(consecutivo, name, type, price, cant, status) {
    this.consecutivo = consecutivo;
    this.name = name;
    this.type = type;
    this.price = price;
    this.cant = cant;
    this.status = status;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM tb_product WHERE status = 1 ORDER BY consecutive asc');
  }

  static post(name, type, price, cant, status) {
    return db.execute('INSERT INTO tb_product (name, type, price, cant, status) VALUES (?, ?, ?, ?, ?)', [name, type, price, cant, status]);
  }

  static update(name, type, price, cant, status, consecutive) {
    return db.execute('UPDATE tb_product SET name = ?, type = ?, price = ?, cant = ?, status = ? WHERE consecutive = ?', [name, type, price, cant, status, consecutive]);
  }

  static delete(consecutive) {
    return db.execute('DELETE FROM tb_product WHERE consecutive = ?', [consecutive]);
  }
};
