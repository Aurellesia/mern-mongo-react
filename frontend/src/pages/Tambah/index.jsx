import { useState } from "react";
import Input from "../../components/Input";
import "./index.scss";
import axios from "axios";
import { useHistory } from "react-router";

const Tambah = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    const productFormData = new FormData();
    productFormData.append("name", name);
    productFormData.append("price", price);
    productFormData.append("stock", stock);
    productFormData.append("status", status);
    productFormData.append("image", image, image.name);

    e.preventDefault();

    try {
      await axios({
        method: "post",
        url: `https://mern-one-backend.herokuapp.com/api/v1/product`,
        data: productFormData,
      });

      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
          />
          <Input
            onChange={(e) => setPrice(e.target.value)}
            value={price || ""}
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
          />
          <Input
            onChange={(e) => setStock(e.target.value)}
            value={stock || ""}
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
          />
          <Input
            checked={status}
            onChange={() => setStatus(!status)}
            name="status"
            type="checkbox"
            label="Active"
          />
          <Input
            type="file"
            label="Image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
