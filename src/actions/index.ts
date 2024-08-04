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

export const server = {
    // actions
  
    // Auth
    loginUser,
    logout,
    registerUser,
    //products
    getProductsByPage,
    getProductBySlug,
    //cart 
    getCart
  };