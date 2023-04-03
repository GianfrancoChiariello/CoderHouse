//Realizar una clase de nombre "ProductManager"
// Funciones: 
// Agregar
// Consultar
// Modificar
// Eliminar


// La clase debe contar con una variable this.path la cual debe recibir la ruta a trabajar.


// Debe guardar objetos en el siguiente formato 

// Id automatico
// title
// descripcion
// precio
// url imagen
// codigo
// stock



// Metodos a incluir:

// addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id auto ++ y guardarlo en el array (json) en el archivo. 
// getProductById el cual debe recibir un Id, y tras leer el archivo devolverlo en formato objeto.
// updateProduct el cual debe recibir el id del producto a actualizar y tambien el campo a actualizar, puede ser el objeto completo o solo un campo
// deleteProduct el cual debe recibir un id para eliminar el producto que coincida con el mismo.




//Ayuda para mi:

// Metodos que tiene 'file System de manera nativa'.
// fs.promises.writeFile('nombre y ruta', 'contenido') ----> Este crear el archivo
// fs.promises.readFile("ruta",'utf-0') ----> Este lee el archivo
// fs.promises.appendFile('nombre y ruta', 'contenido') -----> Este modifica el archivo 
// fs.promises.unlink('ruta') -----> Este elimina el archivo


//Para utilizar json vamos a usar mucho esto; JSON.stringify() y JSON. parse()

//Al guardar un json se debe hacer asi:
//JSON.stringify(objeto, null, '/t')

//Y para leer lo que nos retorna es asi:
//JSON.parse(json que pasa a objeto)



//Importamos la libreria fs (File System de node.JS)
const fs = require('fs')


//Path usado en el ejemplo: './productos.json'

class ProductManager {
    constructor (path) {
        this.path = path
    }

    getProducts = async () => {

        try {
            if (fs.existsSync(this.path)) {
                const productos = await fs.promises.readFile(this.path, 'utf-8')
                const data = JSON.parse(productos)
                return data
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }

    }

    addProduct = async (producto) => {

        try {
            if (!producto.stock || !producto.code || !producto.imgUrl || !producto.precio || !producto.descripcion || !producto.title) return 'Ingrese todos los campos'
            const productos = await this.getProducts()

            if (productos?.length === 0) {
                producto.id = 1;
            } else {
                producto.id = productos[productos.length - 1].id + 1;
            }

            productos.push(producto)
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'))

            return 'Se agrego el producto correctamente'

        } catch (error) {
            console.log(error)
        }
    }

    getProductById = async (id) => {

        try {
            if (!id) return console.log('Debe enviar un id')
            const productos = await this.getProducts()
            
            if (productos.length > 0) {

                const finded = productos.find(item => item.id === id)

                if (finded)  {
                    return finded
                } else {
                    return 'No se encontro un producto con ese id'
                }

            }

        } catch (error) {
            console.log(error)
        }

    }

    deleteProduct = async (id) => {

        try {
            if (!id) return console.log('Debe enviar un id')
            const productos = await this.getProducts()

            if (productos.length > 0) {

                const producto = productos.findIndex(item => item.id === id)

                if (producto !== -1) {
                    productos.splice(producto,1)

                    await fs.promises.writeFile(this.path, JSON.stringify(productos,null,'\t'))

                    return 'Se elimino correctamente'
                } else {
                    return 'No se encontro producto con ese ID'
                }
           
            }


        } catch (error) {
            console.log(error)
        }

    }

    updateProduct = async (id, campos) => {

        try {
            if (!id) return 'Debe ingresar un ID'

            const productos = await this.getProducts()

            if (productos.length > 0) {
                const findIndex = productos.findIndex((item) => item.id === id)

                if (findIndex !== -1) {
                    const producto = productos[findIndex]
                    productos[findIndex] = {...producto, ...campos}
                    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'))

                    return 'Se actualizo el producto correctamente'
                } else {
                    return 'No se encontro el producto con ese ID'
                }
            }


        } catch (error) {
            console.log(error)
        }

    }


}

const start = new ProductManager('./productos.json')


const test = async () => {
    const obj = {
        title: 'camiseta',
        descripcion: 'example',
        precio: 123,
        imgUrl: 'example',
        code: 1321323,
        stock: 1
    }
    
    const addProduct = await start.addProduct(obj)
    //console.log(addProduct)
    
    const productos = await start.getProducts()
    //console.log(productos)

    
    const productById = await start.getProductById(1)
    //console.log(productById)
    

    const deleteProduct = await start.deleteProduct(5)
    //console.log(deleteProduct)

    
    const updateProduct = await start.updateProduct(2, {title: 'zapatilla', precio: 665})
    //console.log(updateProduct)
    
}


test()




