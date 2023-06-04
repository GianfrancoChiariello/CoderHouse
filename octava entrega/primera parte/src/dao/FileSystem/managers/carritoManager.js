import fs from 'fs'


export default class CarritoManager {

    constructor (path) {
        this.path = path
    }

    getCarts = async () => {

        try {
            if (fs.existsSync(this.path)) {
                const carritos = await fs.promises.readFile(this.path, 'utf-8')
                const data = JSON.parse(carritos)
                return data
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    createCart = async () => {

        try {
            const carritos = await this.getCarts()

            const carrito = {productos: []}

            if (carritos?.length === 0) {
                carrito.id = 1;
            } else {
                carrito.id = carritos[carritos.length - 1].id + 1;
            }

            carritos.push(carrito)

            await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, '\t'))

            return 'Creado correctamente'

        } catch (error) {
            return error
        }

    }

    getProductCart = async (id) => {

        try {


            if (!id) return console.log('Debe enviar un id')
            const carts = await this.getCarts()
            
            if (carts.length > 0) {

                const finded = carts.find(item => item.id === id)

                if (finded)  {
                    return finded
                } else {
                    return 'No se encontro un producto con ese id'
                }

            }


        } catch (error) {
            return error
        }

    }

    addProductCart = async (id,productos) => {

        if (!productos) return 'Debe enviar productos'

        try {
            const carritos = await this.getCarts()

            if (carritos.length > 0) {
                const findIndex = carritos.findIndex((item) => item.id === id)
                const findProduct = carritos[findIndex].productos.findIndex((item) => item.producto === productos.id)
    
    
                if (findProduct == -1) {
                    carritos[findIndex].productos.push({producto: productos.id, quantity: 1})
                } else {
                    carritos[findIndex].productos[findProduct].quantity = carritos[findIndex].productos[findProduct].quantity + 1
                }
                
    
                await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, '\t'))
    
                if (findProduct === -1) {
                    return `Se agrego correctamente el producto: ${productos.title}`
                } else {
                    return `Se aumento la cantidad del producto ${productos.title} a ${carritos[findIndex].productos[findProduct].quantity}`
                }
            }

        } catch (error) {
            return error
        }

    }

}