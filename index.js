const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'host_bd',
  user: 'usuario_bd',
  port:"3306",
  password: 'clave_bd',
  database: 'nombre_bd',
});
let response;

exports.handler = (event, context) => {
    // Creación de nuevosproductos
    const insert = "INSERT INTO tb_product (name, type, price, cant, status) VALUES ('"+event.name+"', '"+event.type+"', '"+event.price+"', '"+event.cant+"', '"+event.status+"')";
    // Actualización de productos
    const update = "UPDATE tb_product set price = '"+event.price+"', cant = '"+event.cant+"'";
    // Ver los productos
    const select = "SELECT * FROM tb_product WHERE status = 1 ORDER BY name asc";
    // Eliminar producto
    const drop = "UPDATE tb_product set status = ('"+event.status+"')";

    try {
        // Log to view full Http request in Cloudwatch
        console.log(event);

        if (event.routeKey === 'GET /product') {
            con.query(select, (err, res) => {
                if (err) {
                throw err
                }
                response = {
                    'statusCode': 200,
                    'body': JSON.stringify({
                        message: res,
                    })
                }
            });
        } else if (event.routeKey === 'POST /product') {
            con.query(insert, (err, res) => {
                if (err) {
                throw err
                }
                response = {
                    'statusCode': 200,
                    'body': JSON.stringify({
                        message: res,
                    })
                }
            });
        } else if (event.routeKey === 'GET /product/{id}') {
            con.query(update, (err, res) => {
                if (err) {
                    throw err
                }
                response = {
                    'statusCode': 200,
                    'body': JSON.stringify({
                        message: res,
                    })
                }
            });
        }
        
    } catch (err) {
        console.log(err);
        return err;
    } 
  };