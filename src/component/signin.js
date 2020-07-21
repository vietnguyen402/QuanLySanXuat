import React, { Component } from "react";
import "../css/signin_css.css";
import "../css/sb-admin-2.min.css";
import { Link, withRouter } from "react-router-dom";
import * as firebase from "firebase";
import * as ROUTES from "../constants/routes";
class signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onHandlesubmit = (e) => {
    // console.log("new");
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then((e) => {
        console.log(e);
        return this.props.history.push(ROUTES.HOME);
      })
      .catch(function (e) {
        alert("sai: " + e);
      });
  };
  componentDidMount() {
    const user = firebase.auth().currentUser;
    if (user) {
      this.props.history.replace("/");
    }
  }

  render() {
    return (
      <div className="bg-gradient-primary">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Xin chào!</h1>
                        </div>
                        <form onSubmit={this.onHandlesubmit} className="user">
                          <div className="form-group">
                            <input
                              ref={this.myRefEmail}
                              type="email"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              name="username"
                              onChange={this.onHandleChange}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              ref={this.myRefPass}
                              type="password"
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              name="password"
                              onChange={this.onHandleChange}
                            />
                          </div>

                          <button
                            type="submit"
                            className="button btn btn-primary btn-user btn-block"
                            // classNameName="button"
                          >
                            Đăng nhập
                          </button>

                          <hr />
                        </form>

                        <div className="text-center">
                          {/* <a href="pwd-forget.js"> quen mk</a> */}
                          <Link to={ROUTES.PASSWORD_FORGET} className="small">
                            Quên mật khẩu?
                          </Link>
                        </div>
                        <div className="text-center">
                          <Link to={ROUTES.SIGN_UP} className="small">
                            Tạo tài khoản!
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(signin);
