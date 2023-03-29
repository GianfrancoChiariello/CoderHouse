class ProductManager {
    constructor () {
        this.productos = [];
        this.id = 1;
    }

    addProduct (title,description,price,thumbnail,code,stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.error("Ingrese todos los campos")
        }

        if (this.productos.some((producto) => producto.code == code)) {
            return console.error("Ya existe ese producto")
        }

        this.productos.push({
            id: this.id++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        })

    }

    getProducts () {

        if (this.productos.length === 0) {
            return []
        } else {
            //return {"productos": this.productos}
            console.log("Productos", this.productos)
        }

    }

    getProductById (id) {

        if (!id || id <= 0) {
            return console.error("Debe ingresar un id valido")
        } 

        const producto = this.productos.find((productos) => productos.id == id)
        
        //producto ? {"producto" : producto} : console.error("No se encontro un producto con ese id")
        producto ? console.log("producto id:" + id, producto) : console.error("No se encontro un producto con ese id")
    }

}

const manager = new ProductManager()

//Crear

console.log("Se crea el producto")

manager.addProduct("Perro","animal",1000,"imagen","1112",4)

console.log("No crea el producto")

manager.addProduct("Perro","animal",1000,"imagen","1112",4)

console.log("Se crea el producto")

manager.addProduct("Gato","animal",1000,"imagen","1113",4)

console.log("Deberia retornar que se ingresen los campos")

manager.addProduct()



//Obtener


console.log("Deberia retornar los productos")

manager.getProducts()

console.log("Deberia retornar el producto 1")

manager.getProductById(1)

console.log("Deberia retornar el producto 2")

manager.getProductById(2)

console.log("Deberia retornar que no se encontro")
manager.getProductById(9)

console.log("Deberia retornar que se debe enviar un id valido")
manager.getProductById(-2)

