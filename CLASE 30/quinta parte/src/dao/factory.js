import config from "../config/config.env.js"
import connect from "../utils/mongoo.connect.js";

const persistence = config.persistence

export let Cart
export let productos

switch (persistence) {
    case "MONGODB":
        console.log("Trabajando con MongoDB")
        connect()
        const { default:  cartsMongo} = await import("./MongoDB/managers/cart.manager.js")
        const { default:  productsMongo} = await import("./MongoDB/managers/product.manager.js")
        Cart = cartsMongo
        productos = productsMongo
    break;

    case "FILESYSTEM":
        console.log("Trabajando con FileSystem")
        const { default:  cartsFyle} = await import("./FileSystem/managers/carritoManager.js")
        const { default:  productsFyle} = await import("./FileSystem/managers/productManager.js")
        Cart = cartsFyle
        productos = productsFyle
    break;
}