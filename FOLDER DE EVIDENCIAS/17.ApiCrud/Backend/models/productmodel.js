import sql from "../database/db.js";
class Product {
    constructor (productor){
    this.category_id = productor.category_id;  
    this.name = productor.name;
    this.price = productor.price;
    this.stock = productor.stock;
    }
    //vamos a crear un nuevo producto
    static create (newProduct, result)
    { if(newProduct.category_id && newProduct.name && newProduct.id) { 
        sql.query ("INSERT INTO products VALUES (?,?,?,?)", 
            newProduct(newProduct.category_id, newProduct.name, newProduct.price, newProduct.stock),
            (err, res) => {
                if (err) {
                    console.log("Error al crear el producto: " + err);
                    result (err, null);
                    return;
                } 
                console.log("Producto creado exitosamente: ", {id: res.insertId, ...newProduct});
                result (null, {id: res.insertId, ...newProduct});
            }
        );
    } else {
        sql.query ("INSERT INTO products (category_id, name, price, stock) VALUES (?,?,?,?)", [newProduct.category_id, newProduct.name, newProduct.price, newProduct.stock], (err, res) => {
            if (err) {
                console.log("Error al crear el producto con el nombre $(newProduct.name) " + err);
                result (err, null);
                return;
            }else {
                console.log("Producto creado exitosamente: ", {id: res.insertId, ...newProduct});
                result (null, {id: res.insertId, ...newProduct});
            }       
        }); 
    }
    }
}

export default Product;



  
