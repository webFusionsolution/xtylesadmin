import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../Redux/apiCalls";
import Modal from "../../components/popup/modal";
import { useState } from "react";

export default function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_id, setId] = useState(0);
  const dispatch = useDispatch();
  //display all items from api to ui !
  const products = useSelector((state) => state.product.products)
  useEffect(() => {
    setTimeout(() => {
      getProducts(dispatch)
    }, 100);


  }, [dispatch]);

  const handleCancelEvent = () => {
    setId(0);
    setIsModalOpen(false)
  }
  const handleDeleteEvent = () => {
    deleteProduct(_id, dispatch);
    setIsModalOpen(false);
  }

  const handleDelete = (id) => {
      setId(id);
      setIsModalOpen(true);
       
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "inStock", headerName: "Stock", width: 220,
      renderCell: (params) => {
        return (
          <>
            {params.row.inStock ? 'Yes' : 'No'}
          </>
        );
      },
    },
    {
      field: "feature", headerName: "Feature Product", width: 220,
      renderCell: (params) => {
        return (
          <>
            {params.row.feature ? 'Yes' : 'No'}
          </>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="productList">
        <button className="add-product-btn"><Link to={'/newProduct'}>Add New Product</Link></button>
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
        {isModalOpen ?  <Modal handleCancelEvent={handleCancelEvent} handleDeleteEvent={handleDeleteEvent} /> : ''}
       
      </div>
    </>
  );
}
