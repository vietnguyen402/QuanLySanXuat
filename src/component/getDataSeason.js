import React, { Component } from "react";
import "../css/cssGetSeason.css";
import * as firebase from "firebase";
import * as ROUTES from "../constants/routes";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; //import css confirm
import moment from "moment";

///add datepicker
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

class getDataSeason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: "",
      namePlan: "",
      area: "",
      loaiCay: "",
      dateStart: new Date(),
      dateEnd: new Date(),
    };
  }
  componentDidMount = () => {
    // this.props.setTotalJobs(99999);
    const user = firebase.auth().currentUser;
    this.unsubscribe = firebase
      .firestore()
      .collection("season")
      .where("ownerId", "==", user.uid)
      .where("del", "==", false)
      .onSnapshot((snapshot) => {
        this.props.setTotalSeason(snapshot.size); ///count row data
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            ///change state add
            // console.log("added", change.doc.id);
            this.setState((prevState) => ({
              data: [
                ...prevState.data,
                { id: change.doc.id, ...change.doc.data() },
              ],
            }));
          }
          if (change.type === "modified") {
            ///change state update
            // console.log("Modified", change.doc.id);
            this.setState((prevState) => ({
              data: prevState.data.map((season) => {
                if (season.id === change.doc.id) {
                  return { id: change.doc.id, ...change.doc.data() };
                }
                return season;
              }),
            }));
          }
          if (change.type === "removed") {
            ///change state delete
            // console.log("Removed", change.doc.id);
            this.setState((prevState) => ({
              data: prevState.data.filter(
                (season) => season.id !== change.doc.id
              ),
            }));
          }
        });
      });
  };

  //cancel subcribe change data
  componentWillUnmount = () => {
    this.unsubscribe();
  };

  ///convet date
  _getDate = (e) => {
    // let el = document.getElementById("item-season");

    // let date_curr = new Date().getTime();
    // if (date_curr > e) {
    //   el.classList.add("change");
    // } else {
    //   el.classList.add("nochange");
    // }
    return moment(typeof e === "object" ? e.seconds * 1000 : e).format(
      "DD/MM/YYYY"
    );
  };
  ///open component add jobs and send parameter ID season
  onHandleAdd = (e) => {
    return this.props.history.push(ROUTES.EDITANY_V + e);
  };

  //set state val input
  onHandleChane = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  //delete season
  onHandleDel = (e) => {
    confirmAlert({
      ///open popup confirm del season
      title: "Xác nhận xóa",
      message: "Bạn có muốn xóa:" + e.namePlan,
      buttons: [
        {
          label: "CÓ",
          onClick: () => {
            firebase.firestore().collection("season").doc(e.id).update({
              del: true,
            });
          },
        },
        {
          label: "Không",
        },
      ],
    });
  };
  ///open form edit season
  onHandleEdit = (e) => {
    this.setState({
      namePlan: e.namePlan,
      area: e.area,
      loaiCay: e.tree,
      id: e.id,
      dateStart: e.dateStart,
      dateEnd: e.dateEnd,
    });
    // console.log("sua");
    let el = document.getElementById("edit");
    el.style.display = "block";
  };
  ///set date edit
  handlePickerDate = (e, value) => {
    if (value === 0) {
      let _getDate = new Date(e);
      this.setState({
        dateStart: _getDate.getTime(),
      });
    }
    if (value === 1) {
      let _getDate = new Date(e);
      this.setState({
        dateEnd: _getDate.getTime(),
      });
    }
  };
  ///Close form edit season
  onHandleClose = () => {
    let close = document.getElementById("edit");
    close.style.display = "none";
  };
  //handle button update season
  onHandleUpdateSeason = (e) => {
    e.preventDefault();
    firebase.firestore().collection("season").doc(this.state.id).update({
      namePlan: this.state.namePlan,
      area: this.state.area,
      tree: this.state.loaiCay,
      dateStart: this.state.dateStart,
      dateEnd: this.state.dateEnd,
    });
    this.onHandleClose();
  };
  render() {
    const { data } = this.state;

    console.log(data);
    return (
      <div>
        {data.length === 0 && (
          <h3 style={{ textAlign: "center" }}>
            Xin chào!<br></br> Bạn Hãy tạo cho mình các mùa vụ nhé!
          </h3>
        )}
        <table id="myTable" className="season_table">
          <thead>
            <tr>
              <th> Tên mùa vụ</th>
              <th>Diện tích / số lượng</th>
              <th>Cây trồng / vât nuôi</th>

              <th>thời gian bắt đầu</th>
              <th>Ngày Kết thúc</th>

              <th>Tiện ích</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, key) => (
                <tr key={key} id="item-season">
                  <td>{item.namePlan}</td>
                  <td>{item.area}</td>
                  <td>{item.tree}</td>
                  <td>{this._getDate(item.dateStart)}</td>
                  <td>{this._getDate(item.dateEnd)}</td>

                  <td>
                    <i
                      className="fas fa-user-cog"
                      onClick={() => this.onHandleAdd(item.id)}
                    ></i>
                    &emsp;
                    <Button
                      variant="warning"
                      onClick={() => this.onHandleEdit(item)}
                    >
                      Sửa
                    </Button>
                    <div id="edit">
                      <div className="editInfo">
                        <div className="close" onClick={this.onHandleClose}>
                          +
                        </div>
                        <br />
                        <br />
                        <form
                          onSubmit={this.onHandleUpdateSeason}
                          className="season"
                        >
                          <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                              <label>Tên mùa vụ</label>
                              <input
                                type="text"
                                name="namePlan"
                                className="name form-control form-control-user"
                                id="exampleFNamePlan"
                                value={this.state.namePlan}
                                placeholder="Tên mùa vụ"
                                onChange={this.onHandleChane}
                                noValidate
                              />
                            </div>
                            <div className="col-sm-6">
                              <label>Diện tích / số lượng</label>

                              <input
                                name="area"
                                type="number"
                                className="area form-control form-control-user"
                                id="exampleArea"
                                value={this.state.area}
                                placeholder="Diện tich"
                                onChange={this.onHandleChane}
                                noValidate
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                              <label>Cây trồng vật nuôi</label>

                              <input
                                type="text"
                                name="loaiCay"
                                className="loaiCay form-control form-control-user"
                                id="exPhoneLoaiCay"
                                value={this.state.loaiCay}
                                placeholder="Loại cây trồng"
                                noValidate
                                onChange={this.onHandleChane}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                              <span>Ngày bắt đầu </span>
                              <DatePicker
                                className="form-control form-control-user"
                                dateFormat="dd/MM/yyyy"
                                locale="vi"
                                selected={this.state.dateStart}
                                onChange={(e) => this.handlePickerDate(e, 0)}
                              />
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0">
                              <span>Ngày kết thúc </span>
                              <DatePicker
                                className="form-control form-control-user"
                                dateFormat="dd/MM/yyyy"
                                locale="vi"
                                selected={this.state.dateEnd}
                                onChange={(e) => this.handlePickerDate(e, 1)}
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="buttom btn btn-primary btn-user btn-block"
                          >
                            Sửa
                          </button>
                        </form>
                      </div>
                    </div>
                    &emsp;
                    <Button
                      variant="danger"
                      onClick={() => this.onHandleDel(item)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(getDataSeason);
