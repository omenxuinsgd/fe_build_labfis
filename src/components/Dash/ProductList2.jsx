import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment-timezone';

const ProductList2 = () => {
    const [products, setProducts] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = process.env.REACT_APP_API_URL;
  
    useEffect(() => {
      getProducts();
    }, []);
  
    const getProducts = async () => {
      const response = await axios.get(`${apiUrl}/products/list`);
      setProducts(response.data);
    };
  
    // const deleteProduct = async (productId) => {
    //   await axios.delete(`${apiUrl}/products/${productId}`);
    //   getProducts();
    // };

    // Fungsi untuk mengonversi waktu ke zona waktu Indonesia Barat (WIB)
    function convertToWIB(dateTimeString) {
        const newDate = moment(dateTimeString).tz('Asia/Jakarta');
        return newDate.format('YYYY-MM-DDTHH:mm');
    }
  
    return (
      <div>
        <h1 className="title is-size-6-mobile">Daftar Nama Peminjam Barang</h1>
        <h2 className="subtitle is-size-7-mobile">Detail Peminjaman Barang</h2>
        {/* <Link to="/products/add" className="button is-primary mb-2">
          Tambah Baru
        </Link> */}
        <div className="table-container">
        <table className="table is-striped is-fullwidth is-size-7-mobile">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Jumlah</th>
              <th>Peminjam</th>
              <th>Tgl. Peminjaman</th>
              <th>Tenggat Peminjaman</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.uuid}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.user.name} ({product.user.nim})</td>
                <td>{convertToWIB(product.tgl_pinjam)}</td>
                <td>{convertToWIB(product.tenggat)}</td>
                <td>{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
}

export default ProductList2