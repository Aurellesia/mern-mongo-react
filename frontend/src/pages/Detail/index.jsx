import { Link } from "react-router-dom";
import "./index.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/v1/product/${id}`
      );
      try {
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{product._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{product.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>{product.stock}</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>
              <img
                className="product-image"
                src={product.image_url}
                alt="image_url"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
