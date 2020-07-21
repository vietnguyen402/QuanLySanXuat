import React, { Component } from "react";
///component
import GetDataSeason from "./getDataSeason";
///

import "../css/sb-admin-2.min.css";
import "../vendor/fontawesome-free/css/all.min.css";
import * as ROUTES from "../constants/routes";
import * as firebase from "firebase";
import { Link, withRouter } from "react-router-dom";
///add popup
import Popup from "reactjs-popup";
///add datepicker
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import VI from "date-fns/locale/vi";
import DatePicker, { registerLocale } from "react-datepicker";
registerLocale("vi", VI);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStart: new Date(),
      dateEnd: new Date(),
      namePlan: "",
      area: "",
      loaiCay: "",
      userName: "",
      season_data: "",
      totalSeason: 0,
      totalJobs: 0,
    };
  }

  componentDidMount = () => {
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const _getDataJS = JSON.stringify(Object(doc.data()));
          const _parseData = JSON.parse(_getDataJS);
          // console.log(_parseData);
          this.setState({
            userName: _parseData.firstName + " " + _parseData.lastName,
          });
        } else {
          return alert("Something went wrong! No Data Found.");
        }
      });
  };

  //set time datepicker
  handlePickerDate = (e, value) => {
    if (value === 0) {
      const _getDate = new Date(e);

      this.setState({
        dateStart: _getDate,
      });
    } else if (value === 1) {
      const _getDate = new Date(e);
      this.setState({
        dateEnd: _getDate,
      });
    }
  };

  ///set info
  onHandleChane = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  //change time
  _getDate = (e) => {
    return moment(typeof e === "object" ? e.seconds * 1000 : e).format(
      "DD/MM/YYYY"
    );
  };
  ///add
  onHandleSubmit = (e) => {
    e.preventDefault();
    const date_plan = this.state;
    const user = firebase.auth().currentUser;
    // console.log(user.uid);
    firebase
      .firestore()
      .collection("season")
      .add({
        ownerId: user.uid,
        namePlan: date_plan.namePlan,
        area: date_plan.area,
        tree: date_plan.loaiCay,
        dateStart: date_plan.dateStart.getTime(),
        dateEnd: date_plan.dateEnd.getTime(),
        del: false,
        status: true,
      })
      .then(() => {
        window.location.reload();
        alert("thêm thành công!");
      })
      .catch(function (err) {
        console.log("add err", err);
      });
  };

  ///logout
  onHandleLogout = (e) => {
    firebase.auth().signOut();
    window.location.replace(ROUTES.SIGN_IN);
  };
  ///tìm kiếm
  handleSearch = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };
  setTotalSeason = (totalSeason) => this.setState({ totalSeason });
  setTotalJobs = (totalJobs) => this.setState({ totalJobs });
  render() {
    return (
      <div id="page-top">
        <div id="wrapper">
          {/* <!-- End of Sidebar --> */}

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* <!-- Main Content --> */}
            <div id="content">
              {/* <!-- Topbar --> */}

              {/* <!-- End of Topbar -->

        <!-- Begin Page Content --> */}
              <div>
                {/* <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                  <nav className="topbar">
                    {/* <!-- Sidebar Toggle (Topbar) --> */}
                    <button
                      id="sidebarToggleTop"
                      className="btn btn-link d-md-none rounded-circle mr-3"
                    >
                      <i className="fa fa-bars"></i>
                    </button>

                    {/* <!-- Topbar Search --> */}

                    {/* <!-- Topbar Navbar --> */}
                    <ul className="navbar-nav ml-auto">
                      {/* <!-- Nav Item - User Information --> */}
                      <li className="nav-item dropdown no-arrow">
                        <Link
                          to={ROUTES.HOME}
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="userDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                            {this.state.userName}
                          </span>
                          <img
                            className="img-profile rounded-circle"
                            src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
                            alt="bugs"
                          />
                        </Link>
                        {/* <!-- Dropdown - User Information --> */}
                        <div
                          className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                          aria-labelledby="userDropdown"
                        >
                          <Link to={ROUTES.HOME} className="dropdown-item">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Hồ sơ
                          </Link>

                          <div className="dropdown-divider"></div>
                          <span
                            className="dropdown-item"
                            data-toggle="modal"
                            data-target="#logoutModal"
                          >
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Đăng xuất
                          </span>
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>

                {/* <!-- Content Row --> */}
                <div className="row container-fluid">
                  {/* <!-- Earnings (Monthly) Card Example --> */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div
                        className="card-body add-season"
                        style={{ width: "400px !important" }}
                      >
                        <Popup
                          trigger={
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <h2>Thêm mùa vụ</h2>
                              </div>
                              <div className="col-auto">
                                <i className="fas fa-calendar-plus fa-2x"></i>
                              </div>
                            </div>
                          }
                          position="right center"
                        >
                          <div>
                            <form
                              onSubmit={this.onHandleSubmit}
                              className="season"
                            >
                              <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                  <input
                                    type="text"
                                    name="namePlan"
                                    className="form-control form-control-user"
                                    id="exampleFNamePlan"
                                    placeholder="Tên mùa "
                                    onChange={this.onHandleChane}
                                    noValidate
                                  />
                                </div>
                                <div className="col-sm-6">
                                  <input
                                    name="area"
                                    type="number"
                                    className="form-control form-control-user"
                                    id="exampleArea"
                                    placeholder="Diện tich"
                                    onChange={this.onHandleChane}
                                    noValidate
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                  <input
                                    type="text"
                                    name="loaiCay"
                                    className="form-control form-control-user"
                                    id="exPhoneLoaiCay"
                                    placeholder="Loại cây trồng"
                                    noValidate
                                    onChange={this.onHandleChane}
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <div className="col-sm-12 mb-3 mb-sm-0">
                                  <span>Ngày bắt đầu</span>
                                  <DatePicker
                                    format="dd-MM-yyyy"
                                    locale="vi"
                                    selected={this.state.dateStart}
                                    onChange={(e) =>
                                      this.handlePickerDate(e, 0)
                                    }
                                  />
                                </div>
                                <div className="col-sm-12 mb-3 mb-sm-0">
                                  <span>Ngày kết thúc</span>
                                  <DatePicker
                                    format="dd-MM-yyyy"
                                    locale="vi"
                                    selected={this.state.dateEnd}
                                    onChange={(e) =>
                                      this.handlePickerDate(e, 1)
                                    }
                                  />
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="buttom btn btn-primary btn-user btn-block"
                              >
                                Thêm
                              </button>
                            </form>
                          </div>
                        </Popup>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Earnings (Monthly) Card Example --> */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                      <div className="card-body countExpenses">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                              <h5>Tổng chi phí hiện tại</h5>
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              $215,000
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Earnings (Monthly) Card Example --> */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                      <div className="card-body countSeason">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                              <h5>Tổng mùa vụ</h5>
                            </div>
                            <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                  <h5> {this.state.totalSeason}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Pending Requests Card Example --> */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                              <h5>Tổng số công việc của bạn</h5>
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {this.state.totalJobs}
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-comments fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row container-fluid">
                  <div
                    className="col-xl-12
                   col-lg-12"
                  >
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Danh sách mùa vụ
                        </h6>
                        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                          <div className="input-group">
                            <input
                              onKeyUp={this.handleSearch}
                              type="text"
                              id="myInput"
                              className="form-control bg-light border-0 small"
                              placeholder="Tìm kiếm ..."
                              aria-label="Search"
                              aria-describedby="basic-addon2"
                            />
                          </div>
                        </form>
                      </div>
                      <div className="card-body">
                        <GetDataSeason
                          setTotalSeason={this.setTotalSeason}
                          setTotalJobs={this.setTotalJobs}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>
                    DEV: VietNguyen <br />
                    <br /> Contact: vietnguyen2698@gmail.com
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </div>

        <Link
          to={ROUTES.HOME}
          className="scroll-to-top rounded"
          href="#page-top"
        >
          <i className="fas fa-angle-up"></i>
        </Link>

        {/* <!-- Logout Modal--> */}
        <div
          className="modal fade"
          id="logoutModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Bạn chắc chưa!
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Select "Logout" below if you are ready to end your current
                session. */}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={this.onHandleLogout}
                  className=" btn btn-primary"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Home);
