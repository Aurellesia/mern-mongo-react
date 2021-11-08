import { Link } from "react-router-dom";
import "./index.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import useDebounce from "../../utils/useDebounce";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 0.3);

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

  const defineList = (filter) => {
    if (filter) {
      const searchResult = product.filter((item) =>
        item.name.toLowerCase().includes(filter)
      );
      return searchResult.length > 0 ? searchResult : ["Data tidak ditemukan!"];
    }
    return product;
  };

  const list = defineList(debouncedSearch);

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
          {list.includes("Data tidak ditemukan!")
            ? list.map((item, index) => {
                return (
                  <div style={{ textAlign: "center" }} key={index}>
                    {item}
                  </div>
                );
              })
            : list?.map((item, index) => {
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
