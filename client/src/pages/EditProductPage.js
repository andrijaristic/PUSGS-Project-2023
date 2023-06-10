import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEditProduct,
  getProductByIdAction,
  getProductImageAction,
} from "../store/productsSlice";
import EditProductForm from "../components/EditProduct/EditProductForm";
import { useParams } from "react-router-dom";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.productId || "";
  const product = useSelector((state) => state.products.editProduct);
  const image = useSelector((state) => state.products.productImages)[0];

  useEffect(() => {
    dispatch(clearEditProduct());
  }, [dispatch]);

  useEffect(() => {
    const execute = async () => {
      await dispatch(getProductByIdAction(id));
      dispatch(getProductImageAction(id));
    };

    execute();
  }, [dispatch, id]);

  return <EditProductForm product={product} image={image} />;
};

export default EditProductPage;
