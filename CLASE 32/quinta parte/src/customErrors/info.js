export const generateProductErrorInfo = (product) => {
    return `Product already exists: ${product.producto} - ${product.categoria} - ${product.precio} - ${product.stock}`
}

export const productNotFoundError = (id) => {
    return `Product not found: ${id}`
}
