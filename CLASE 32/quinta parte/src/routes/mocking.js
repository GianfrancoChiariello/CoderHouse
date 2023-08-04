import {Router} from 'express'
import {
    faker
} from '@faker-js/faker'

const router = Router()

faker.location = 'es'

const generateProducts = () => {
    return {
        producto: faker.commerce.productName(),
        categoria: faker.commerce.department(),
        precio: faker.commerce.price(),
        stock: faker.random.numeric(1),
        id: faker.database.mongodbObjectId()
    }
}


router.get('/generateProducts', (req, res) => {
    let products = []
    for (let i = 0; i < 100; i++) {
        products.push(generateProducts())
    }
    res.json({
        status: 200,
        data: products
    })
})


export default router;