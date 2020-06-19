import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "../css/editcss.css";
import Button from "react-bootstrap/Button";
class EditAny extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    // const idSeason = this.getId();
  };
  render() {
    return (
      <div className="container">
        <div className="topInfo">
          day là phàn
          <Button variant="primary">Primary</Button>
        </div>
        <div className="table-add"></div>
        <div className="table-edit"></div>
        <div className="delete"></div>

        <h1>Register</h1>
      </div>
    );
  }
}
export default EditAny;
