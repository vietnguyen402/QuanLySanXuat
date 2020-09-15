import React, { Component } from "react";
import "../css/sb-admin-2.min.css";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import * as firebase from "firebase";
import "../css/signin_css.css";
///check email valid
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&*+/='?^_`{|}-~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

///check input valid
// const formValid = (formErrors) => {
//   let valid = true;
//   Object.values(formErrors).forEach((val) => {
//     val.length > 0 && (valid = false);
//   });
//   return valid;
// };
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      address: null,
      phoneNumber: null,
      rePassword: null,
      ///set input err
      formErrors: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        rePassword: "",
      },
    };
  }
  onHandleChane = (e) => {
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    ///check input
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 2 ? "Your first name less then 2 character" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 2 ? "Your last name less then 2 character" : "";
        break;
      case "email":
        formErrors.email =
          emailRegex.test(value) && value.length > 0
            ? ""
            : "invalid email address";
        break;
      case "password":
        formErrors.password = value.length < 8 ? "Password not valid" : "";
        break;
      case "rePassword":
        let pass = this.state.password;
        formErrors.rePassword =
          value !== pass ? "Repeat password not accept" : "";
        break;
      default:
        break;
    }
    this.setState({
      formErrors,
      [name]: value,
    });
  };
  onHandleSubmit = (e) => {
    e.preventDefault();
    alert("click signup");
    ///check valid
    // if (formValid(this.state.formErrors)) {
    //   console.log(`submiting  firstName: ${this.state.firstName}
    //   Email: ${this.state.email}Password: ${this.state.password}lastName: ${this.state.lastName}`);
    // } else {
    //   console.error("FORM VALID");
    // }

    firebase
      .auth()
      .signInWithPhoneNumber("+84368367110", "invisible")
      .then(() => {
        alert("check code");
      })
      .catch((error) => {
        alert(error.message);
      });
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(this.state.email, this.state.password)
    //   .then((result) => {
    //     if (result) {
    //       // alert("account: " + result);
    //       console.log(result);
    //       //add info to firestore
    //       const unSubscribeListener = firebase
    //         .auth()
    //         .onAuthStateChanged((user) => {
    //           if (user)
    //             firebase
    //               .firestore()
    //               .collection("users")
    //               .doc(user.uid)
    //               .set({
    //                 firstName: this.state.firstName,
    //                 lastName: this.state.lastName,
    //                 email: this.state.email,
    //                 address: this.state.address,
    //                 phoneNumber: this.state.phoneNumber,
    //               })
    //               .then(() => {
    //                 unSubscribeListener();
    //                 console.log("success: " + user.uid);
    //                 alert("Đăng ký thành công ");
    //                 window.location.replace(ROUTES.SIGN_IN);
    //               })
    //               .catch(console.warn);
    //         });
    //     } else {
    //       console.log("0000Oop" + result);
    //     }
    //   })
    //   .catch(function (e) {
    //     alert("Oop " + e.message);
    //   });
  };
  render() {
    const { formErrors } = this.state;
    return (
      <div className="bg-gradient-primary">
        <div className="container">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Đăng Ký Tài Khoản!
                      </h1>
                    </div>
                    <form onSubmit={this.onHandleSubmit} className="user">
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            name="firstName"
                            className="form-control form-control-user"
                            id="exampleFirstName"
                            placeholder="First Name"
                            onChange={this.onHandleChane}
                            autoComplete="disable"
                            noValidate
                          />
                          {formErrors.firstName.length > 0 && (
                            <span className="errorMessage">
                              {formErrors.firstName}
                            </span>
                          )}
                        </div>
                        <div className="col-sm-6">
                          <input
                            name="lastName"
                            type="text"
                            className="form-control form-control-user"
                            id="exampleLastName"
                            placeholder="Last Name"
                            onChange={this.onHandleChane}
                            autoComplete="disable"
                            noValidate
                          />
                          {formErrors.lastName.length > 0 && (
                            <span className="errorMessage">
                              {formErrors.lastName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            name="phoneNumber"
                            className="form-control form-control-user"
                            id="exPhoneNumber"
                            autoComplete="disable"
                            placeholder="Phone Number"
                            noValidate
                            onChange={this.onHandleChane}
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            name="address"
                            type="text"
                            className="form-control form-control-user"
                            id="exAddress"
                            placeholder="Address"
                            noValidate
                            autoComplete="disable"
                            onChange={this.onHandleChane}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          name="email"
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          placeholder="Email Address"
                          noValidate
                          onChange={this.onHandleChane}
                        />
                        {formErrors.email.length > 0 && (
                          <span className="errorMessage">
                            {formErrors.email}
                          </span>
                        )}
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            name="password"
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            noValidate
                            onChange={this.onHandleChane}
                          />
                          {formErrors.password.length > 0 && (
                            <span className="errorMessage">
                              {formErrors.password}
                            </span>
                          )}
                        </div>
                        <div className="col-sm-6">
                          <input
                            name="rePassword"
                            type="password"
                            className="form-control form-control-user"
                            id="exampleRepeatPassword"
                            placeholder="Repeat Password"
                            noValidate
                            onChange={this.onHandleChane}
                          />
                          {formErrors.rePassword.length > 0 && (
                            <span className="errorMessage">
                              {formErrors.rePassword}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="buttom btn btn-primary btn-user btn-block"
                      >
                        Đăng Ký
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link to={ROUTES.PASSWORD_FORGET} className="small">
                        Quên Mật khẩu?
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link to={ROUTES.SIGN_IN} className="small">
                        Đã có tài khoản? Đăng nhập!
                      </Link>
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
export default SignUp;
