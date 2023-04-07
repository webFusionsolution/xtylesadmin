import "./product.css";
import Chart from "../../components/chart/Chart"
import { productData, sizeCheckbox } from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";


export default function Product() {
    const location = useLocation();
    const navigate = useNavigate();
    const productId = location.pathname.split("/")[2];
    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId))

    const handleEdit = () => {
        navigate('/editproduct/' + productId)
    }
    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="product">
                    <div className="productTitleContainer">
                        <h1 className="productTitle">Product</h1>
                        <Link to="/newproduct">
                            <button className="productAddButton">Create</button>
                        </Link>
                    </div>
                    <div className="productTop">
                        <div className="productTopLeft">
                            <Chart data={productData} dataKey="Sales" title="Sales Performance" />
                        </div>
                        <div className="productTopRight">
                            <div className="productInfoTop">
                                <div style={{
                                    backgroundImage: `url("${product.img}")`
                                }}>
                                </div>

                            </div>
                            <div className="productName">{product.title}</div>
                            <div className="productInfoBottom">
                                <div className="productInfoItem">
                                    <span className="productInfoKey">id:</span>
                                    <span className="productInfoValue">{product._id}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">sales:</span>
                                    <span className="productInfoValue">5123</span>
                                </div>

                                <div className="productInfoItem">
                                    <span className="productInfoKey">in stock:</span>
                                    <span className="productInfoValue">{product.inStock}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="productBottom">
                        <form className="productForm">
                            <div className="productFormLeft">
                                <label>Product Name</label>
                                <input type="text" placeholder={product.title} value={product.title} disabled />
                                <label>Product Description</label>
                                <input type="text" placeholder={product.desc} value={product.desc} disabled />
                                <label>MRP</label>
                                <input type="text" placeholder={product.price} value={product.mrp} disabled />
                                <label>Price</label>
                                <input type="text" placeholder={product.price} value={product.price} disabled />
                                <label>Size</label>
                                <label>In Stock</label>
                                <select name="inStock" id="idStock" value={product.inStock} disabled>
                                    <option >Yes</option>
                                    <option>No</option>
                                </select>
                                <button className="productButton" onClick={handleEdit}>Edit</button>
                            </div>
                            <div className="productFormRight">
                                <div className="productUpload">
                                    <div style={{
                                        backgroundImage: `url("${product.img}")`
                                    }}>
                                </div>
                                    <label htmlFor="file">
                                        <Publish />
                                    </label>
                                    <input type="file" id="file" style={{ display: "none" }} />
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
