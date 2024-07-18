import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "../config";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const button = await Swal.fire({
        title: "ออกจากระบบ",
        text: "ยืนยันออกจากระบบ",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
      });

      if (button.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          config.apiPath + "/user/info",
          config.headers()
        );

        if (res.data.result !== undefined) {
          setUser(res.data.result);
        }
      } catch (e) {
        Swal.fire({
          title: "error",
          text: e.message,
          icon: "error",
        });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/home" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: 0.8 }}
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </Link>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="account_img"
              />
            </div>
            <div className="info">
              <Link to="#" className="d-block">
                {user.name}
              </Link>
            </div>
          </div>
          <div>
            <button
              onClick={handleSignOut}
              className="btn btn-danger w-100 mb-2"
            >
              ออกจากระบบ
            </button>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-header">เมนู</li>
              <li className="nav-item">
                <Link to="/product" className="nav-link">
                  <i className="nav-icon fa fa-cart-plus"></i>
                  <p>จัดการสินค้า</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="pages/gallery.html" className="nav-link">
                  <i className="nav-icon far fa-image"></i>
                  <p>Gallery</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="pages/kanban.html" className="nav-link">
                  <i className="nav-icon fas fa-columns"></i>
                  <p>Kanban Board</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
