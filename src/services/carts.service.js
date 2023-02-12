import {CartModel} from "../dao/models/cart.model.js"

export async function getCart(){
    try {
        const carts = await CartModel.find({ deletedAt: { $exists: false } }).populate("products")
        return carts
    }
    catch (error) { throw new Error(error.message) }
};

export async function getCartById(idCart){
    try {
        const cart = await CartModel.findById(idCart).populate("products")
        return cart
    }
    catch (error) { throw new Error(error.message) }
};

export async function addCart(data){
    try {
        const cart = await CartModel.create(data)
        return cart
    }
    catch (error) { throw new Error(error.message) }
};

export async function updateCart(idCart, data){
    try {
        console.log("data update cart services")
        console.log(data)
        const updateCart = await CartModel.findById(idCart)
        let productToPush = {
            product:data.product,
            quantity:data.quantity
        }
        console.log("productToPush: ", productToPush)
        updateCart.products.push(productToPush)
        console.log("update cart .products: ",updateCart.products)
        updateCart.save()
        
        return updateCart

    }
    catch (error) { throw new Error(error.message) }
};

export async function updateProductQ(idCart, pid, body){
    try {
        let productId = pid
        let newQuantity = body.quantity
        console.log(productId)
        console.log(newQuantity)
        const updateCart = await CartModel.findById(idCart)
        
        console.log(updateCart)
        updateCart.products.forEach( object =>{

            if(object.product._id == pid){
                console.log("PRODUCTO ENCONTRADO: ", object)
                let updateObjet = object
                updateObjet.quantity = newQuantity
                console.log(updateObjet.quantity)
                console.log(updateObjet)
                object = updateObjet
                updateCart.save()
            }
        } )



        return updateCart
    }
    catch (error) { throw new Error(error.message) }
};

export async function deleteAllProducts(idCart){
    try {
        const updateCart = await CartModel.findById(idCart)
        updateCart.products = []
        updateCart.save()
    }
    catch (error) { throw new Error(error.message) }
};

export async function deleteOneProduct(idCart, pid){
    try {
        const updateCart = await CartModel.findById(idCart)
        console.log("idCart: ", idCart)
        console.log("pid: ", pid)
        let updateProducts = []

        updateCart.products.forEach( object =>{
            if(object.product._id != pid){
                updateProducts.push(object.product)
            }

        })
        console.log("updateProducts: ", updateProducts)
        updateCart.products = updateProducts
        updateCart.save()

    }
    catch (error) { throw new Error(error.message) }
};


