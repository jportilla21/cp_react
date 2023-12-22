import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="name">
          <h4> Ferreteria de Todo Shop</h4>
        </div>
        <div className="city">
          <h6> Cali, Colombia </h6>
        </div>
      </footer>
    );
  }
}

export default Footer;
