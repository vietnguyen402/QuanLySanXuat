import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import * as firebase from "firebase";
class PwdForget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  //set value
  onHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  onHandleSubmit = (e) => {
    e.preventDefault();
    ///call firebase reset password
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function () {
        alert("Check your email to reset password ");
        console.log("success");
      })
      .catch(function (error) {
        if (error) {
          alert("Email not found");
        }
        console.log("opp" + error.code);
      });
  };
  render() {
    return (
      <div className="bg-gradient-primary">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-2">
                            Forgot Your Password?
                          </h1>
                          <p className="mb-4">
                            We get it, stuff happens. Just enter your email
                            address below and we'll send you a link to reset
                            your password!
                          </p>
                        </div>
                        <form onSubmit={this.onHandleSubmit} className="user">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              name="email"
                              onChange={this.onHandleChange}
                            />
                          </div>
                          <button
                            type="submit"
                            className="button btn btn-primary btn-user btn-block"
                          >
                            Reset Password
                          </button>
                        </form>
                        <hr />
                        <div className="text-center">
                          <Link to={ROUTES.SIGN_UP} className="small">
                            Create an Account!
                          </Link>
                        </div>
                        <div className="text-center">
                          <Link to={ROUTES.SIGN_IN} className="small">
                            Already have an account? Login!
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
export default PwdForget;
