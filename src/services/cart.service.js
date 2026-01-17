const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Product = require("../models/product.model.js");

// Create a new cart
async function createCart(userId) {
   if (!userId) {
    throw new Error("UserId is required to create cart");
  }
  const cart = new Cart({ user: userId ,  cartItems: []});
  return await cart.save();
}

async function findUserCart(userId) {
  try {
    let cart = await Cart.findOne({ user: userId });

    // Create cart if not exists
    if (!cart) {
      cart = await createCart(userId);
    }

    const cartItems = await CartItem.find({ cart: cart._id })
      .populate("product");

    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.discount = totalPrice - totalDiscountedPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addCartItem(userId, reqData) {
  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await createCart(userId);
    }

    const product = await Product.findById(reqData.productId);
    if (!product) throw new Error("Product not found");

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
      sizes: reqData.sizes,
    });

    if (isPresent) {
      return "Item already in cart";
    }

    const quantity = 1;

    const price = Number(product.price);
    const discountedPrice = Number(product.discountedPrice || product.price);

    if (isNaN(price) || isNaN(discountedPrice)) {
      throw new Error("Invalid product price data");
    }

    const cartItem = new CartItem({
      product: product._id,
      cart: cart._id,
      quantity,          
      userId,
      price: price * quantity,          
      discountedPrice: discountedPrice * quantity, 
      sizes: reqData.sizes,            
    });

    const createdCartItem = await cartItem.save();
    cart.cartItems.push(createdCartItem._id);
    await cart.save();

    return "Item added to cart";
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createCart,
  findUserCart,
  addCartItem,
};
