import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import "../css/editcss.css";
import Button from "react-bootstrap/Button";
///add datepicker
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as firebase from "firebase";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class EditAny extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_jobs: [],
      id_job: "",
      expenses: "",
      name: "",
      description: "",
      data_season: [],
      date_Edit: new Date(),
    };
  }
  componentDidMount = () => {
    // console.log("React.version", React.version);
    this.unsubscribe = firebase
      .firestore()
      .collection("jobs")
      .where("seasonId", "==", this.props.match.params.id)
      .where("del", "==", false)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            //on add data to firestore
            // console.log("Added", change.doc.id);
            this.setState((prevState) => ({
              data_jobs: [
                ...prevState.data_jobs,
                { id: change.doc.id, ...change.doc.data() },
              ],
            }));
          }
          if (change.type === "modified") {
            //onUpdate field data
            // console.log("Modified", change.doc.id);
            this.setState((prevState) => ({
              data_jobs: prevState.data_jobs.map((job) => {
                if (job.id === change.doc.id) {
                  return {
                    id: change.doc.id,
                    ...change.doc.data(),
                  };
                }
                return job;
              }),
            }));
          }
          if (change.type === "removed") {
            //onRemove document firestore
            // console.log("Removed", change.doc.id);
            this.setState((prevState) => ({
              data_jobs: prevState.data_jobs.filter(
                (job) => job.id !== change.doc.id
              ),
            }));
          }
        });
      });
    this.getDataSeason();
  };
  ///unsubscribe move screen
  componentWillUnmount() {
    this.unsubscribe();
  }
  ///handle click add jobs
  handleAddJob = () => {
    let _el = document.getElementById("tableAdd");
    if (_el.style.display === "block") {
      _el.style.display = "none";
    } else {
      _el.style.display = "block";
    }
  };
  //handle close form edit jobs
  handleClose = () => {
    let _elClose = document.getElementById("tableAdd");
    _elClose.style.display = "none";
  };
  //setState data value
  onHandleChaneVal = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    // console.log("e", e);
  };
  //handle add jobs
  onHandleAddJob = (e) => {
    let _data_edit = this.state;
    e.preventDefault();
    firebase.firestore().collection("jobs").add({
      description: _data_edit.description,
      name: _data_edit.name,
      seasonId: this.props.match.params.id,
      expenses: _data_edit.expenses,
      date: _data_edit.date_Edit.getTime(),
      del: false,
    });
    this.handleClose();
  };
  ///handle delete jobs
  onHandleDel = (e) => {
    firebase.firestore().collection("jobs").doc(e.id).update({ del: true });
    // console.log(e.id);
  };

  //datepicker
  handlePickerDate = (e, value) => {
    if (value === 0) {
      const _getDate = new Date(e);

      this.setState({
        date_job: _getDate.getTime(),
      });
    }
    if (value === 1) {
      const _getDate = new Date(e);
      this.setState({
        date_Edit: _getDate.getTime(),
      });
      console.log(this.state.date_Edit);
    }
  };

  //convert date
  _getDate = (e) => {
    return moment(typeof e === "object" ? e.seconds * 1000 : e).format(
      "DD/MM/YYYY"
    );
  };

  //get data season
  getDataSeason = () => {
    const idSeason = this.props.match.params.id;
    firebase
      .firestore()
      .collection("season")
      .doc(idSeason)
      .get()
      .then((result) => {
        if (result) {
          this.setState({
            data_season: result.data(),
          });
        }
      });
  };
  ///handle click edit jobs
  onHandleEdit = (e) => {
    this.setState({
      id_job: e.id,
      name: e.name,
      description: e.description,
      expenses: e.expenses,
      date_Edit: e.date,
    });
    console.log("1");

    let el = document.getElementById("form-edit");
    // if (el.style.display === "none") {
    el.style.display = "block";
    // }
  };
  handleClickMask = () => {
    let el = document.getElementById("form-edit");
    el.style.display = "none";
  };
  //close form edit
  onhandleCloseEdit = () => {
    let _close = document.getElementById("form-edit");
    _close.style.display = "none";
  };

  ///handle click submit edit
  onHandleSubmitEdit = (e) => {
    e.preventDefault();
    let _data = this.state;
    firebase.firestore().collection("jobs").doc(_data.id_job).update({
      name: _data.name,
      description: _data.description,
      date: _data.date_Edit,
      expenses: _data.expenses,
    });
    this.onhandleCloseEdit();
  };
  ///handle back to home
  onHandleBackHome = () => {
    return this.props.history.push(ROUTES.HOME);
  };
  render() {
    const { data_jobs } = this.state;

    return (
      <div className="editpage">
        <div className="bgr">
          <div className="topInfo">
            <h1>Thôn tin chi tiết mùa vụ</h1>
            <div className="table-season">
              <h5>
                Tên mùa vụ: {this.state.data_season.namePlan}
                &emsp;Loại Cây: {this.state.data_season.tree}
                &emsp;Diện tích: {this.state.data_season.area}
              </h5>
              <h5>
                Ngày Bắt Đầu: {this._getDate(this.state.data_season.dateStart)}
                &emsp; Ngày Kết thúc:{" "}
                {this._getDate(this.state.data_season.dateEnd)}
              </h5>
            </div>
          </div>
          <div className="addJobs" onClick={this.handleAddJob}>
            {/* <div className="plus">+</div> */}
            <i className="fas fa-plus-circle fa-1x"></i> &nbsp;
            <div>Thêm công việc</div>
          </div>
          <div className="back" onClick={this.onHandleBackHome}>
            <i className="fas fa-external-link-alt"></i>&nbsp;
            <div>Quay về</div>
          </div>

          <div className="table-jobs">
            <table>
              <thead>
                <tr>
                  <th>Tên công việc</th>
                  <th>Mô tả</th>
                  <th>Chi phí</th>
                  <th>Thời gian bắt đầu</th>
                  <th>Tiện ích</th>
                </tr>
              </thead>
              <tbody>
                {data_jobs &&
                  data_jobs.map((item) => (
                    <tr key={item.id}>
                      <td>&emsp;{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.expenses} VND</td>
                      <td>{this._getDate(item.date)}</td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => this.onHandleEdit(item)}
                        >
                          Sửa
                        </Button>
                        &emsp;
                        <Button
                          variant="danger"
                          onClick={() => this.onHandleDel(item)}
                        >
                          Xóa
                        </Button>
                        &emsp;
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div id="tableAdd">
            <div className="center">
              <div className="mask">
                <div className="close_table" onClick={this.handleClose}>
                  +
                </div>
                <div className="table">
                  <form className="season">
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <span>Tên công việc</span>
                        <input
                          type="text"
                          name="name"
                          className="name form-control form-control-user"
                          id="name"
                          // value={this.state.name}
                          placeholder="VD: Cho ăn"
                          onChange={this.onHandleChaneVal}
                          noValidate
                        />
                      </div>
                      <div className="col-sm-6">
                        <span>Mô tả</span>

                        <input
                          name="description"
                          type="text  "
                          className="description form-control form-control-user"
                          id="description"
                          // value={this.state.description}
                          placeholder="VD: cho cá ăn"
                          onChange={this.onHandleChaneVal}
                          noValidate
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <span>Chi phí</span>

                        <input
                          type="number"
                          name="expenses"
                          className="Expenses form-control form-control-user"
                          id="expenses"
                          // value={this.state.Expenses}
                          placeholder="VND"
                          noValidate
                          onChange={this.onHandleChaneVal}
                        />
                      </div>
                      <div className=" col-sm-6 mb-3 mb-sm-0 ">
                        <span>Ngày bắt đầu</span>

                        <DatePicker
                          className="date-job form-control form-control-user"
                          dateFormat="dd/MM/yyyy"
                          locale="vi"
                          selected={this.state.date_job}
                          onChange={(e) => this.handlePickerDate(e, 0)}
                        />
                      </div>
                    </div>

                    <button
                      onClick={this.onHandleAddJob}
                      type="submit"
                      className="buttom btn btn-primary btn-user btn-block"
                    >
                      Thêm
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div id="form-edit">
            <div className="mask-edit" onClick={this.handleClickMask}>
              <div className="table-edit">
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Tên công việc</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="VD: Tưới cây ..."
                        value={this.state.name}
                        onChange={this.onHandleChaneVal}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Mô tả công việc</Form.Label>
                      <Form.Control
                        type="text"
                        name="description"
                        placeholder="VD: Tưới Định kỳ ..."
                        value={this.state.description}
                        onChange={this.onHandleChaneVal}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Chi phí </Form.Label>
                      <Form.Control
                        type="number"
                        name="expenses"
                        placeholder="chi phí :VND"
                        value={this.state.expenses}
                        onChange={this.onHandleChaneVal}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Ngày làm </Form.Label>
                      <DatePicker
                        name="date_job"
                        className="date-job-edit form-control form-control-user"
                        dateFormat="dd/MM/yyyy"
                        locale="vi"
                        selected={this.state.date_Edit}
                        onChange={(e) => this.handlePickerDate(e, 1)}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Button
                    onClick={this.onHandleSubmitEdit}
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </div>
          <div className="delete"></div>
        </div>
      </div>
    );
  }
}
export default withRouter(EditAny);
