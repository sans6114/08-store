import {
  loginUser,
  logout,
  registerUser,
} from './auth';
import { getCart } from './cookies/get-cart-action';
import {
  deleteProductImage,
  getProductBySlug,
  getProductsByPage,
  postProductUpdated,
} from './products';

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
    deleteProductImage,
    //cart 
    getCart
  };