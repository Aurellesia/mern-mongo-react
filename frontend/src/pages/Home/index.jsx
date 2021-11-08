import { Link } from "react-router-dom";
import "./index.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://mern-one-backend.herokuapp.com/api/v1/product`
      );
      const result = await response.data;
      try {
        setProduct(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios({
        method: "delete",
        url: `https://mern-one-backend.herokuapp.com/api/v1/product/${id}`,
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = () => {
    try {
      const searchResult = product.filter((item) => item.name === search);
      if (searchResult.length === 0) {
        window.location.reload();
      } else {
        setProduct(searchResult);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input
          type="text"
          placeholder="Masukan kata kunci..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td className="text-right">{item.price}</td>
                <td className="text-center">
                  <Link
                    to={`/detail/${item._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/edit/${item._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>
                  <Link
                    onClick={() => deleteProduct(item._id)}
                    to="/"
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
