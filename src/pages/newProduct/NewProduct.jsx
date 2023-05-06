import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct, updateProduct } from "../../Redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner";
import { useRef, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethod";

export default function NewProduct() {
  const fileType = useRef();
  const productName = useRef();
  const productDesc = useRef();
  const productCategories = useRef();
  const productPrice = useRef();
  const productMRP = useRef();
  const productIfFeature = useRef();
  const productColor = useRef();
  const productBrands = useRef();
  const [input, setInput] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [feature, setFeature] = useState(false);
  const [isFormHasError, setIsFormHasError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [isNewProductAdded, setNewProductAdded] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const isProductAddFail = useSelector((state) => state.product.error);
  const isFetching = useSelector((state) => state.product.isFetching);
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const pageUrl = location.pathname.split("/")[1];
  const [isEdit, setIsEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategoryInput, setNewCategoryInput] = useState(false);
  const [cateError, setCateError] = useState(false);
  const [cateSuccess, setCateSuccess] = useState(false);
  const [brands, setBrands] = useState([]);
  const [newImage, setNewImage] = useState(false);
  const [updatedImage, setUpdatedImage] = useState("");
  const [productBrand, setProductBrand] = useState('');

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId));
  const [productClone, setProductClone] = useState(product);


  const handleNewCategory = (e) => {
    e.preventDefault();
    setNewCategoryInput(true);
  }

  const handleCateAdd = (e) => {
    e.preventDefault();
    setCateError(false);
    setCateSuccess(false);
    const addCategory = async () => {
      try {
        if (productCategories.current.value === '') {
          setCateError(true);
          windowScrollTop();
          return;
        }
        const isCategoryAvail = categories.find(t => t.name.toLowerCase() === productCategories.current.value.toLowerCase());
        if (isCategoryAvail) {
          setCateError(true);
          windowScrollTop();
          return;
        }
        const res = await userRequest.post("categories", { category: productCategories.current.value });
        if (res.data) {
          setCateError(false);
          setCateSuccess(true);
          setCategories(prev => {
            return [...prev, res.data]
          });
          setNewCategoryInput(false);
          setTimeout(() => {
            setCateSuccess(false);
          }, 2000);
        }
      } catch (error) { }
    };
    addCategory();
  }

  useEffect(() => {
    if (pageUrl === 'editproduct') {
      setIsEdit(true);
      reloadEditData();
      setNewImage(false);
    } else {
      setIsEdit(false);
      setNewImage(true);
    }

  }, [categories]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await userRequest.get("categories/all");
        if (res.data) {
          setCategories(res.data);

        }
      } catch (error) { }
    };
   
    const getBrands = async () => {
      try {
        const res = await userRequest.get("brand/all");
        if (res.data) {
          setBrands(res.data);

        }
      } catch (error) { }
    };
    getCategories();
    getBrands();
  }, []);

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleBrandChange = (e) => {
    setProductBrand(e.target.value);
  }

  const handleFeature = (e) => {
    setFeature(e.target.checked)
  }

  const handleSize = (e) => {
    if (e.target.checked) {
      size.push(e.target.value)
      setSize(size);
    } else {
      const items = size.filter(t => t !== e.target.value);
      setSize(items);
    }
  };

  const handleCateSelect = (e) => {
    if (e.target.checked) {
      cat.push(e.target.value)
      setCat(cat);
    } else {
      const items = size.filter(t => t !== e.target.value);
      setCat(items);
    }
  }

  const handleUpdateImage = (e) => {
      e.preventDefault();
      setNewImage(true);
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const resetProductForm = () => {
    const checkboxs = document.querySelectorAll('.newProduct input[type=checkbox]');
    checkboxs.forEach(item => {
      item.checked = false;
    })
    fileType.current.value = "";
    // productCategories.current.checked = false;
    productDesc.current.value = "";
    productName.current.value = "";
    productPrice.current.value = "";
    productIfFeature.current.value = "";
    productColor.current.value = "";
    productMRP.current.value = "";
    productBrands.current.vale = "Select"
  }
  const toLowercase = (str) => {
    return str.toLowerCase();
  }
  const reloadEditData = () => {
    //productCategories.current.value = product.categories;
    if (categories.length) {
      const checkboxs = document.querySelectorAll('.newProduct input[type=checkbox]');
      checkboxs.forEach(item => {
        if (item.className.includes('categories')) {
          const isChecked = product.categories.includes(item.id);
          if (isChecked) {
            item.checked = true;
          }
        }
        if (item.name === "size") {
          const isChecked = product.size.includes(item.value);
          if (isChecked) {
            item.checked = true;
          }
        }

      })
    }
    productDesc.current.value = product.desc;
    productName.current.value = product.desc;
    productPrice.current.value = product.price;
    productMRP.current.value = product.mrp;
    productIfFeature.current.checked = product.feature ? true : false;
    productColor.current.value = product.color ? product.color.join(', ') : '';

  }


  const validateForm = () => {
    let error = false;
    const elem = document.querySelectorAll('.required');
    setIsFormHasError(false)
    elem.forEach(input => {
      if (input.value === '') {
        error = true;
        input.classList.add('error');
        setIsFormHasError(true);
        windowScrollTop();
      } else {
        input.classList.remove('error');
      }
    });

    if (productMRP.current.value < productPrice.current.value) {
      error = true;
      setPriceError(true);
      windowScrollTop();
    } else {
      setPriceError(false)
    }
    return error;
  }
  const handleMRPChange = () => {

  }
  const fileUploadProcess = (exstingImage) => {
      
    //we will upload file and call api
    if(!exstingImage) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
  
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpdatedImage(downloadURL)
            if (isEdit) {
              const cloneObj = updatedProductItems();
              cloneObj.img = downloadURL;
              updateProduct(productClone._id, cloneObj, dispatch);
            } else {
              const product = { ...input, img: downloadURL, categories: cat, feature: feature, color: color, size: size, brand: productBrand };
              addProduct(product, dispatch);
            }
  
            if (products && !isProductAddFail) {
              windowScrollTop();
              setNewProductAdded(true);
              if (!isEdit) {
                resetProductForm();
              } else {
                 setNewImage(false);
              }
              setTimeout(() => {
                setNewProductAdded(false);
              }, 3000);
            } else {
              //resetProductForm();
              setNewProductAdded(false)
            }
          });
        }
      );
    } else {
      const cloneObj = updatedProductItems();
      cloneObj.img = productClone.img;
      updateProduct(productClone._id, cloneObj, dispatch);
      if (products && !isProductAddFail) {
        windowScrollTop();
        setNewProductAdded(true);
        if (!isEdit) {
          resetProductForm();
        } else {
           setNewImage(false);
        }
        setTimeout(() => {
          setNewProductAdded(false);
        }, 3000);
      } else {
        //resetProductForm();
        setNewProductAdded(false)
      }
    }
    
  }
  const handleClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      windowScrollTop();
      return false;
    }
    if(!isEdit) {
       fileUploadProcess(false);
    } else if(isEdit && file) {
       fileUploadProcess(false);
    } else if(isEdit && !file){
      fileUploadProcess(true);
    }
   
  };
  const updatedProductItems = () => {
    const editedProduct = {};
    editedProduct.categories = productClone.categories.concat(cat);
    editedProduct.size = productClone.size.concat(size);
    editedProduct.color = productClone.color.concat(color);
    editedProduct.feature = feature;
    editedProduct.title = input.title ? input.title : productClone.title;
    editedProduct.desc = input.desc ? input.desc : productClone.desc;
    editedProduct.mrp = input.mrp ? Number(input.mrp) : productClone.mrp;
    editedProduct.price = input.price ? input.price : productClone.price;
    editedProduct.inStock = input.inStock ? input.inStock : productClone.inStock;
    return editedProduct;
  }
  const windowScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newProduct">
          <h1 className="addProductTitle">Add New Product</h1>
          {isNewProductAdded ? <p className="banner success"> Product added successfully!</p> : ''}
          {isFormHasError ? <p className="banner error"> Please fill all required fields</p> : ''}
          <form className="addProductForm">
            <div className="addProductItem">
              <label>Product Image</label>
              {newImage &&
                <input
                type="file"
                id="file"
                ref={fileType}
                className="required"
                onChange={(e) => setFile(e.target.files[0])}
                />
              }             
              {isEdit && !newImage &&
              <>
                <div className="edit-image" style={{
                    backgroundImage: `url("${productClone.img}")`
                  }}>
                  </div>
                  <button type="button" onClick={(e) => handleUpdateImage(e)}>Update Image</button>
              </>                
              }
            </div>

            <div className="addProductItem">
              <label>Title</label>
              <input
                name="title"
                type="text"
                ref={productName}
                className="required"
                placeholder="Women Tshirt"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input
                name="desc"
                type="text"
                className="required"
                placeholder="Description.."
                ref={productDesc}
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>MRP</label>
              <input
                name="mrp"
                type="number"
                className="required"
                placeholder="100"
                ref={productMRP}
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Sell Price</label>
              <input
                name="price"
                type="number"
                className="required"
                placeholder="100"
                ref={productPrice}
                onChange={handleChange}
              />
              {priceError ? <p className="error">Selling price should be less than the MRP </p> : ''}
            </div>
            <div className="addProductItem">
              <label>Catagories (Choose multiple categories)

                <div className="add-cate-btn">
                  <button onClick={(e) => handleNewCategory(e)}>Add New Category</button>
                </div>

              </label>
              {newCategoryInput &&
                <div className="add-cate-placeholder">
                  <input type="text" placeholder="jeans, skirt" className="required" ref={productCategories} />
                  <button onClick={(e) => handleCateAdd(e)}>Add</button>
                </div>
              }
              {cateError && <p className="error">Category fields should not be empty or duplicate! </p>}
              {cateSuccess && <p className="success">Category added successfully! </p>}
              <div className="categories_checkbox">
                {
                  categories.map((t, i) => {
                    return <label key={i}><input type="checkbox" className="categories" id={t.name} onChange={(e) => handleCateSelect(e)} name="categories" value={t.name} key={i} /> {t.name}</label>
                  })
                }
              </div>

            </div>
            <div className="addProductItem">
              <label>Brands</label>
                <select ref={productBrands} id="brand" onChange={(e) => handleBrandChange(e)}>
                  <option value="select">Select</option>
                    {brands.length && 
                        brands.map(item => {
                          return <option key={item._id} value={item.name}>{item.name}</option>
                        })
                    }
                </select>
              
            </div>

            <div className="addProductItem">
              <label>Color</label>
              <input type="text" placeholder="Red, white" className="required" ref={productColor} onChange={handleColor} />
            </div>

            <div className="addProductItem">
              <label>Size</label>
              <p>Clothes</p>
              <div className="checkbox-group">
                <div><input type="checkbox" name="size" onChange={handleSize} value="XS" /> XS</div>
                <div><input type="checkbox" name="size" onChange={handleSize} value="S" /> S</div>
                <div> <input type="checkbox" name="size" onChange={handleSize} value="M" /> M</div>
                <div> <input type="checkbox" name="size" onChange={handleSize} value="L" /> L</div>
                <div> <input type="checkbox" name="size" onChange={handleSize} value="XL" /> XL</div>
                <div> <input type="checkbox" name="size" onChange={handleSize} value="XXL" /> XXL</div>
              </div>
              <br></br>
              <p>Shoes</p>
              <div className="checkbox-group">
                <div><input type="checkbox" name="size" onChange={handleSize} value="5.5" /> 5.5</div>
                <div><input type="checkbox" name="size" onChange={handleSize} value="6" /> 6</div>
                <div> <input type="checkbox" name="size" onChange={handleSize} value="6.5" /> 6.5</div>
                <div> <input type="checkbox" name="size" onChange={handleSize} value="7" /> 7</div>
                <div> <input type="checkbox" name="size" onChange={handleSize} value="7.5" /> 7.5</div>
                <div> <input type="checkbox" name="size" onChange={handleSize} value="8" /> 8</div>
                <div> <input type="checkbox" name="size" onChange={handleSize} value="8.5" /> 8.5</div>
                <div> <input type="checkbox" name="size" onChange={handleSize} value="9" /> 9</div>
              </div>
            </div>

            <div className="addProductItem">
              <label>Stock</label>
              <select name="isStock" onChange={handleChange}>
                <option value="true"> Yes</option>
                <option value="false"> No </option>
              </select>
            </div>

            <div className="addProductItem">
              <br />
              <div><input type="checkbox" ref={productIfFeature} onChange={handleFeature} />  &nbsp; Feature product </div>
            </div>
            <div className="btn-bar">
              {!isEdit ?
                <button onClick={handleClick} className="addProductButton">
                  Create
                </button>
                :
                <button onClick={handleClick} className="addProductButton">
                  Update
                </button>
              }
            </div>
          </form>
          {isFetching ?
            <Spinner /> : ''
          }

        </div>
      </div>
    </>
  );
}
