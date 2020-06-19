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
          localStorage.setItem("data_user", JSON.stringify(doc.data()));
          const _getDataJS = JSON.stringify(Object(doc.data()));
          const _parseData = JSON.parse(_getDataJS);
          console.log(_parseData);
          this.setState({
            userName: _parseData.firstName + " " + _parseData.lastName,
          });
        } else {
          return alert("Something went wrong! No Data Found.");
        }
      })
      .catch(function (err) {
        // console.log(err);
      });
    // firebase
    //   .firestore()
    //   .collection("season")
    //   .where("ownerId", "==", user.uid)
    //   .get()
    //   .then((docs) => {
    //     docs.forEach((doc) => {
    //       const _season = JSON.stringify(Object(doc.data()));
    //       const _parseSeason = JSON.parse(_season);
    //       this.setState({ season_data: _parseSeason });
    //     });
    //   });
    // firebase
    //   .firestore()
    //   .collection("jobs")
    //   .where("seasonId", "==", "8TBEY8Ls3oe1NpREqXLn")
    //   .get()
    //   .then((docs) => {
    //     docs.forEach((doc) => {});
    //   });
    console.log("dateEnd", this.state.dateEnd);
  };

  //set time datepicker
  handlePickerDate = (e, value) => {
    if (value === 0) {
      const _getDate = new Date(e);
      this.setState({
        dateStart: _getDate.getTime(),
      });
    } else if (value === 1) {
      const _getDate = new Date(e);
      this.setState({
        dateEnd: _getDate.getTime(),
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
        dateStart: date_plan.dateStart,
        dateEnd: date_plan.dateEnd,
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
  onHandleLogout = (e) => {
    firebase.auth().signOut();
    window.location.replace(ROUTES.SIGN_IN);
  };
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
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* <!-- Sidebar Toggle (Topbar) --> */}
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                >
                  <i className="fa fa-bars"></i>
                </button>

                {/* <!-- Topbar Search --> */}
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>

                {/* <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">
                  {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <Link
                      to={ROUTES.HOME}
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="searchDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-search fa-fw"></i>
                    </Link>
                    {/* <!-- Dropdown - Messages --> */}
                    <div
                      className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                      aria-labelledby="searchDropdown"
                    >
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>

                  {/* <!-- Nav Item - Messages --> */}
                  <li className="nav-item dropdown no-arrow mx-1">
                    <Link
                      to={ROUTES.HOME}
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="messagesDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-envelope fa-fw"></i>
                      {/* <!-- Counter - Messages --> */}
                      <span className="badge badge-danger badge-counter">
                        7
                      </span>
                    </Link>
                    {/* <!-- Dropdown - Messages --> */}
                    <div
                      className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="messagesDropdown"
                    >
                      <h6 className="dropdown-header">Message Center</h6>
                      <Link
                        to={ROUTES.HOME}
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src="https://source.unsplash.com/fn_BT9fwg_E/60x60"
                            alt="bugs"
                          />
                          <div className="status-indicator bg-success"></div>
                        </div>
                        <div className="font-weight-bold">
                          <div className="text-truncate">
                            Hi there! I am wondering if you can help me with a
                            problem I've been having.
                          </div>
                          <div className="small text-gray-500">
                            Emily Fowler · 58m
                          </div>
                        </div>
                      </Link>
                      <Link
                        to={ROUTES.HOME}
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src="https://source.unsplash.com/AU4VPcFN4LE/60x60"
                            alt="bugs"
                          />
                          <div className="status-indicator"></div>
                        </div>
                        <div>
                          <div className="text-truncate">
                            I have the photos that you ordered last month, how
                            would you like them sent to you?
                          </div>
                          <div className="small text-gray-500">
                            Jae Chun · 1d
                          </div>
                        </div>
                      </Link>
                      <Link
                        to={ROUTES.HOME}
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src="https://source.unsplash.com/CS2uCrpNzJY/60x60"
                            alt="bugs"
                          />
                          <div className="status-indicator bg-warning"></div>
                        </div>
                        <div>
                          <div className="text-truncate">
                            Last month's report looks great, I am very happy
                            with the progress so far, keep up the good work!
                          </div>
                          <div className="small text-gray-500">
                            Morgan Alvarez · 2d
                          </div>
                        </div>
                      </Link>
                      <Link
                        to={ROUTES.HOME}
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                            alt="bugs"
                          />
                          <div className="status-indicator bg-success"></div>
                        </div>
                        <div>
                          <div className="text-truncate">
                            Am I a good boy? The reason I ask is because someone
                            told me that people say this to all dogs, even if
                            they aren't good...
                          </div>
                          <div className="small text-gray-500">
                            Chicken the Dog · 2w
                          </div>
                        </div>
                      </Link>
                      <Link
                        to={ROUTES.HOME}
                        className="dropdown-item text-center small text-gray-500"
                        href="#"
                      >
                        Read More Messages
                      </Link>
                    </div>
                  </li>

                  <div className="topbar-divider d-none d-sm-block"></div>

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
                        Profile
                      </Link>
                      <Link to={ROUTES.HOME} className="dropdown-item">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Settings
                      </Link>
                      <Link to={ROUTES.HOME} className="dropdown-item">
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                        Activity Log
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link
                        className="dropdown-item"
                        data-toggle="modal"
                        data-target="#logoutModal"
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                      </Link>
                    </div>
                  </li>
                </ul>
              </nav>
              {/* <!-- End of Topbar -->

    <!-- Begin Page Content --> */}
              <div className="container-fluid">
                {/* <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>

                {/* <!-- Content Row --> */}
                <div className="row">
                  {/* <!-- Earnings (Monthly) Card Example --> */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div
                        className="card-body"
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
                                    // required="Caanf"

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
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                              Earnings (Annual)
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
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                              Tasks
                            </div>
                            <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                  50%
                                </div>
                              </div>
                              <div className="col">
                                <div className="progress progress-sm mr-2">
                                  new
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
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
                              Pending Requests
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              18
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

                {/* <!-- Content Row --> */}

                <div className="row">
                  {/* <!-- Area Chart --> */}
                  <div className="col-xl-8 col-lg-7">
                    <div className="card shadow mb-4">
                      {/* <!-- Card Header - Dropdown --> */}
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Danh sách mùa vụ
                        </h6>
                      </div>
                      {/* <!-- Card Body --> */}
                      <div className="card-body">
                        <div className="chart-area ">
                          <GetDataSeason />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Pie Chart --> */}
                  <div className="col-xl-4 col-lg-5">
                    <div className="card shadow mb-4">
                      {/* <!-- Card Header - Dropdown --> */}
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Revenue Sources
                        </h6>
                        <div className="dropdown no-arrow">
                          <Link
                            to={ROUTES.HOME}
                            className="dropdown-toggle"
                            href="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                          </Link>
                          <div
                            className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink"
                          >
                            <div className="dropdown-header">
                              Dropdown Header:
                            </div>
                            <Link
                              to={ROUTES.HOME}
                              className="dropdown-item"
                              href="#"
                            >
                              Action
                            </Link>
                            <Link
                              to={ROUTES.HOME}
                              className="dropdown-item"
                              href="#"
                            >
                              Another action
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link
                              to={ROUTES.HOME}
                              className="dropdown-item"
                              href="#"
                            >
                              Something else here
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Card Body --> */}
                      <div className="card-body">
                        <div className="chart-pie pt-4 pb-2">
                          <canvas id="myPieChart"></canvas>
                        </div>
                        <div className="mt-4 text-center small">
                          <span className="mr-2">
                            <i className="fas fa-circle text-primary"></i>{" "}
                            Direct
                          </span>
                          <span className="mr-2">
                            <i className="fas fa-circle text-success"></i>{" "}
                            Social
                          </span>
                          <span className="mr-2">
                            <i className="fas fa-circle text-info"></i> Referral
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Content Row --> */}
              </div>
              {/* <!-- /.container-fluid --> */}
            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2020</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}
          </div>
          {/* <!-- End of Content Wrapper --> */}
        </div>
        {/* <!-- End of Page Wrapper --> */}

        {/* <!-- Scroll to Top Button--> */}
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
          tabindex="-1"
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
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={this.onHandleLogout}
                  className=" btn btn-primary"
                >
                  Logout
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
