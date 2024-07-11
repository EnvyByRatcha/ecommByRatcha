import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import config from "../../config";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const res = await axios.post(config.apiPath + "/user/signIn", user);

      if (res.data.token !== undefined) {
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      }
    } catch (e) {
      if (e.response.status === 401) {
        Swal.fire({
          title: "Sign",
          text: "username or password invalid",
          icon: "warning",
        });
      } else {
        Swal.fire({
          title: "error",
          text: e.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <b>Comm</b>LAB
          </a>
        </div>

        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">เข้าสู่ระบบ</p>

            <div>
              <div className="input-group mb-3">
                <input
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  type="email"
                  className="form-control"
                  placeholder="Username"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>

                <div className="col-4">
                  <button
                    onClick={handleSignIn}
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>

            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2"></i> Sign in using
                Google+
              </a>
            </div>

            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p className="mb-0">
              <a href="register.html" className="text-center">
                Register a new membership
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
