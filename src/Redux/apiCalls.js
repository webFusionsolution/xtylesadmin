import { publicRequest, userRequest } from "../requestMethod";
import {
  AddProductFailure,
  AddProductStart,
  AddProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";

import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
//GET
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    if (res.data) {
      dispatch(getProductSuccess(res.data));
    }
  } catch (err) {
    dispatch(getProductFailure());
  }
};
//DELETE
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // it will delete the product if we click
    const res = await userRequest.delete(`/products/${id}`);
    if (res.data) {
      dispatch(deleteProductSuccess(id));
    }
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};
//UPDATE
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // it will delete the product if we click
    const res = await userRequest.update(`/products/${id}`);
    if (res.data) {
      dispatch(updateProductSuccess({ id: id, product: product }));
    }
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

//ADD PRODUCT
export const addProduct = async (product, dispatch) => {
  dispatch(AddProductStart());
  try {
    // it will Add product
    const res = await userRequest.post(`/products`, product);
    if (res.data) {
      dispatch(AddProductSuccess(res.data));
    }
  } catch (err) {
    dispatch(AddProductFailure());
  }
};
