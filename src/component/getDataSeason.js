import React, { Component } from "react";
import "../css/cssGetSeason.css";
import * as firebase from "firebase";
import * as ROUTES from "../constants/routes";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; //import css confirm
///add popup
import Popup from "reactjs-popup";
class getDataSeason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: "",
      namePlan: "",
      area: "",
      loaiCay: "",
    };
  }
  componentDidMount = () => {
    const user = firebase.auth().currentUser;
    const _getDta = firebase
      .firestore()
      .collection("season")
      .where("ownerId", "==", user.uid)
      .get()
      .then((season) => {
        season.forEach((items) => {
          const _data = this.state.data;
          if (items.data().del === false) {
            _data.push({ id: items.id, ...items.data() });
            //   _data.push(items);
            // console.log("alooo", _data);

            this.setState({
              data: _data,
            });
            // console.log("item delete false");
          } else {
            // console.log("item delete true");
          }
        });
      });
  };
  _getDate = (e) => {
    let _date = new Date(e);
    let _getY = _date.getFullYear();
    let _getM = _date.getMonth() + 1;
    let _getD = _date.getDay();
    let _datetime = _getY + "/" + _getM + "/" + _getD;
    return _datetime;
  };
  onHandleAdd = (e) => {
    return this.props.history.push(ROUTES.EDITANY);
  };
  onHandleChane = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  //delete mùa vụ
  onHandleDel = (e) => {
    confirmAlert({
      title: "Xác nhận xóa",
      message: "Bạn có muốn xóa:" + e.namePlan,
      buttons: [
        {
          label: "CÓ",
          onClick: () => {
            firebase
              .firestore()
              .collection("season")
              .doc(e.id)
              .update({
                del: true,
              })

              .then(window.location.reload());
          },
        },
        {
          label: "Không",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };
  ///hiển thị form chỉnh sửa
  onHandleEdit = (e) => {
    this.setState({
      namePlan: e.namePlan,
      area: e.area,
      loaiCay: e.tree,
      id: e.id,
    });
    let el = document.getElementById("edit");
    if (el.style.display === "none") {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
    // _namePlan.value = e.namePlan;
  };

  ///đóng phần chỉnh sửa
  onHandleClose = () => {
    let close = document.getElementById("edit");
    close.style.display = "none";
  };
  onHandleUpdateSeason = (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("season")
      .doc(this.state.id)
      .update({
        namePlan: this.state.namePlan,
        area: this.state.area,
        tree: this.state.loaiCay,
      })
      .then(window.location.reload());
  };
  render() {
    const { data } = this.state;
    return (
      <table className="season_table">
        <thead>
          <tr>
            <th> Tên mùa vụ</th>
            <th>Diện tích</th>
            <th> Loại cây</th>

            <th>thời gian bắt đầu</th>
            <th>Ngày Kết thúc</th>

            <th>Tiện ích</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, key) => (
              <tr key={key}>
                <td>{item.namePlan}</td>
                <td>{item.area}</td>
                <td>{item.tree}</td>
                <td>{this._getDate(item.dateStart)}</td>
                <td>{this._getDate(item.dateEnd)}</td>

                <td>
                  <i
                    className="fas fa-user-cog"
                    onClick={() => this.onHandleAdd(item)}
                  ></i>
                  &emsp;
                  {/* <Button
                    variant="primary"
                    onClick={() => this.onHandleAdd(item)}
                  >
                    Thêm
                  </Button>
                  &emsp; */}
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
                      <form
                        onSubmit={this.onHandleUpdateSeason}
                        className="season"
                      >
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input
                              type="text"
                              name="namePlan"
                              className="name form-control form-control-user"
                              id="exampleFNamePlan"
                              value={this.state.namePlan}
                              placeholder="Tên mùa vụ"
                              onChange={this.onHandleChane}
                              // required="Caanf"

                              noValidate
                            />
                          </div>
                          <div className="col-sm-6">
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
                          <div className="col-sm-12 mb-3 mb-sm-0">
                            <span>Ngày bắt đầu</span>
                            {/* <DatePicker
                              format="dd-MM-yyyy"
                              locale="vi"
                              selected={this.state.dateStart}
                              onChange={(e) => this.handlePickerDate(e, 0)}
                            /> */}
                          </div>
                          <div className="col-sm-12 mb-3 mb-sm-0">
                            <span>Ngày kết thúc</span>
                            {/* <DatePicker
                              format="dd-MM-yyyy"
                              locale="vi"
                              selected={this.state.dateEnd}
                              onChange={(e) => this.handlePickerDate(e, 1)}
                            /> */}
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
                  {/* <Popup
                    trigger={
                      <Button
                        variant="warning"
                        onClick={() => this.onHandleEdit(item)}
                      >
                        Sửa
                      </Button>
                    }
                    position="right center"
                  >
                    <div>
                      <h3>Chỉnh sửa thông tin mùa vụ</h3>
                      <label>
                        Tên mùa vụ:
                        <input type="text" name="name" />
                      </label>
                      <input type="submit" value="Submit" />
                      {item.namePlan}
                    </div>
                  </Popup> */}
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
    );
  }
}

export default withRouter(getDataSeason);
