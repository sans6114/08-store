import {
  loginUser,
  logout,
  registerUser,
} from './auth';
import { getCart } from './cookies/get-cart-action';
import {
  getProductBySlug,
  getProductsByPage,
} from './products';
import { postProductUpdated } from './products/post-updated-product-action';

export const server = {
    // actions
  
    // Auth
    loginUser,
    logout,
    registerUser,
    //products
    getProductsByPage,
    getProductBySlug,
    postProductUpdated,
    //cart 
    getCart
  };