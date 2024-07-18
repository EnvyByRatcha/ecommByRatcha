import { useEffect, useState } from "react";
import BackOffice from "../../components/BackOffice";
import Modal from "../../components/Modal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";

function Product() {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        config.apiPath + "/product/getAllProduct",
        config.headers()
      );
      if (res.data.result !== undefined) {
        setProducts(res.data.result);
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = async () => {
    try {
      product.img = "";
      product.cost = parseInt(product.cost);
      product.price = parseInt(product.price);

      const res = await axios.post(
        config.apiPath + "/product/create",
        product,
        config.headers
      );

      if (res.data.message === "success") {
        Swal.fire({
          title: "เพิ่มสินค้าสำเร็จ",
          text: "เพิ่มสินค้า " + product.name + " แล้ว",
          icon: "success",
          timer: 2000,
        });
      }

      document.getElementById("modalProduct_btnClose").click();
      fetchData();
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const clearForm = () => {
    setProduct({
      name: "",
      cost: "",
      price: "",
    });
  };

  const handleRemove = async (item) => {
    try {
      const button = await Swal.fire({
        title: "ยืนยันลบสินค้า",
        text: "ต้องการลบสินค้า " + item.name + " ใช่หรือไม่?",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
      });

      if (button.isConfirmed) {
        const res = await axios.delete(
          config.apiPath + "/product/removeProduct/" + item.id,
          config.headers()
        );

        if (res.data.messge === "success") {
          Swal.fire({
            title: "ลบสินค้าสำเร็จ",
            text: "ลบสินค้า " + item.name + " แล้ว",
            icon: "success",
            timer: 2000,
          });
        }
        fetchData();
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  return (
    <BackOffice>
      <div>
        <h4>จัดการสินค้า</h4>
      </div>
      <button
        onClick={clearForm}
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#modalProduct"
      >
        <i className="fa fa-plus mr-2"></i>เพิ่มสินค้า
      </button>

      <table className="table table-bordered table-striped mt-2">
        <thead>
          <tr>
            <th>ชื่อสินค้า</th>
            <th className="text-right">ราคาต้นทุน</th>
            <th className="text-right">ราคาขาย</th>
            <th className="text-center">จัดการสินค้า</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="text-right">{item.cost}</td>
                <td className="text-right">{item.price}</td>
                <td className="text-center">
                  <button className="btn btn-primary mr-2">
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    onClick={(e) => handleRemove(item)}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>

      <Modal id="modalProduct" title="รายละเอียดสินค้า">
        <div>
          <div>ชื่อสินค้า</div>
          <input
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="form-control"
          />
        </div>

        <div className="mt-2">
          <div>ราคาต้นทุน</div>
          <input
            value={product.cost}
            onChange={(e) => setProduct({ ...product, cost: e.target.value })}
            className="form-control"
          />
        </div>

        <div className="mt-2">
          <div>ราคาขาย</div>
          <input
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="form-control"
          />
        </div>

        <div className="mt-2">
          <div>ภาพสินค้า</div>
          <input
            onChange={(e) => setProduct({ ...product, img: e.target.value })}
            type="file"
            id="inputGroupFile02"
            className="form-control"
          />
        </div>

        <div className="mt-5">
          <button onClick={handleAddProduct} className="btn btn-primary">
            <i className="fa fa-check"></i>เพื่มสินค้า
          </button>
        </div>
      </Modal>
    </BackOffice>
  );
}

export default Product;
