import { useEffect, useRef, useState } from "react";
import BackOffice from "../../components/BackOffice";
import Modal from "../../components/Modal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";

function Product() {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [img, setImg] = useState({});
  const refImg = useRef();
  const refExcel = useRef();
  const [fileExcel, setFileExcel] = useState({});

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
      product.img = await handleUpload();
      product.cost = parseInt(product.cost);
      product.price = parseInt(product.price);

      let res;
      if (product.id === undefined) {
        res = await axios.post(
          config.apiPath + "/product/createProduct",
          product,
          config.headers
        );

        if (res.data.message === "success") {
          Swal.fire({
            title: "เพิ่มสินค้า",
            text: "เพิ่มสินค้า " + product.name + " แล้ว",
            icon: "success",
            timer: 2000,
          });
        }
      } else {
        res = await axios.put(
          config.apiPath + "/product/updateProduct",
          product,
          config.headers
        );

        if (res.data.message === "success") {
          Swal.fire({
            title: "แก้ไขเพิ่มสินค้า",
            text: "แก้ไขสินค้า " + product.name + " แล้ว",
            icon: "success",
            timer: 2000,
          });
        }
      }

      document.getElementById("modalProduct_btnClose").click();
      fetchData();
      setProduct({ ...product, id: undefined });
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

    setImg(null);
    refImg.current.value = "";
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

  const selectedFile = (inputFile) => {
    if (inputFile !== undefined) {
      if (inputFile.length > 0) {
        setImg(inputFile[0]);
      }
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("img", img);

      const res = await axios.post(
        config.apiPath + "/product/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.data.newName != undefined) {
        return res.data.newName;
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });

      return "";
    }
  };

  const showImg = (item) => {
    if (item.img !== undefined && item.img !== "") {
      return (
        <img
          alt=""
          className="img-thumbnail"
          src={config.apiPath + "/uploads/" + item.img}
          width="150"
          height="150"
        />
      );
    }
  };

  const selectedFileExcel = (fileInput) => {
    if (fileInput !== undefined) {
      if (fileInput.length > 0) {
        setFileExcel(fileInput[0]);
      }
    }
  };

  const handleUploadExcel = async () => {
    try {
      const formData = new FormData();
      formData.append("fileExcel", fileExcel);

      const res = await axios.post(
        config.apiPath + "/product/uploadFromExcel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.data.message === "success") {
        Swal.fire({
          title: "อัปโหลดไฟล์",
          text: "อัปโหลดไฟล์แล้ว",
          icon: "success",
          itmer: 2000,
        });

        fetchData();
        document.getElementById("modalExcel_btnClose").click();
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const clearFormExcel = () => {
    refExcel.current.value = "";
    setFileExcel(null);
  };

  return (
    <BackOffice>
      <div>
        <h4>จัดการสินค้า</h4>
      </div>
      <button
        onClick={clearForm}
        className="btn btn-primary mr-2"
        data-toggle="modal"
        data-target="#modalProduct"
      >
        <i className="fa fa-plus mr-2"></i>เพิ่มสินค้า
      </button>
      <button
        onClick={clearFormExcel}
        className="btn btn-success"
        data-toggle="modal"
        data-target="#modalExcel"
      >
        <i className="fa fa-arrow-down mr-2"></i>Import from Excel
      </button>

      <table className="table table-bordered table-striped mt-2">
        <thead>
          <tr>
            <th width="150px">ภาพสินค้า</th>
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
                <td>{showImg(item)}</td>
                <td>{item.name}</td>
                <td className="text-right">{item.cost}</td>
                <td className="text-right">{item.price}</td>
                <td className="text-center">
                  <button
                    data-toggle="modal"
                    data-target="#modalProduct"
                    onClick={(e) => setProduct(item)}
                    className="btn btn-primary mr-2"
                  >
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
            value={product.name === undefined ? "" : product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="form-control"
          />
        </div>

        <div className="mt-2">
          <div>ราคาต้นทุน</div>
          <input
            value={product.cost === undefined ? "" : product.cost}
            onChange={(e) => setProduct({ ...product, cost: e.target.value })}
            className="form-control"
          />
        </div>

        <div className="mt-2">
          <div>ราคาขาย</div>
          <input
            value={product.price === undefined ? "" : product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="form-control"
          />
        </div>

        <div className="mt-2">
          <div>ภาพสินค้า</div>
          <input
            onChange={(e) => selectedFile(e.target.files)}
            ref={refImg}
            type="file"
            id="inputGroupFile02"
            className="form-control"
          />
        </div>

        <div className="mt-2">
          <div>{showImg(product)}</div>
        </div>

        <div className="mt-5">
          <button onClick={handleAddProduct} className="btn btn-primary">
            <i className="fa fa-check mr-2"></i>
            {product.id === undefined ? "เพื่มสินค้า" : "แก้ไขสินค้า"}
          </button>
        </div>
      </Modal>

      <Modal id="modalExcel" title="เลือกไฟล์อัพโหลด">
        <div>เลือกไฟล์</div>
        <input
          ref={refExcel}
          onChange={(e) => selectedFileExcel(e.target.files)}
          className="form-control"
          type="file"
        />
        <button onClick={handleUploadExcel} className="btn btn-primary mt-5">
          <i className="fa fa-check mr-2"></i>บันทึก
        </button>
      </Modal>
    </BackOffice>
  );
}

export default Product;
