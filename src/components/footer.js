import react from "react";
import styles from "../stylesheets/footer.css";
import logo from "../stylesheets/images/logow.svg";
import call from "../icons/call.svg";
import location from "../icons/location.svg";
import mail from "../icons/mail.svg";

import { Row, Col } from "antd";

import { FaFacebookF } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiTwitterFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";

function Footer() {
  return (
    <div>
      <div className="row footer-div">
        <div className="col-md-4 footer-lists">
          <img className="footer-logo" src={logo} />
          <p>
            <img src={call} /> Bangalore,Karnataka,INDIA
          </p>
          <p>
            <img src={location} /> +91 012341567890
          </p>
          <p>
            <img src={mail} /> connect@modcrw.com
          </p>
        </div>
        <div className="col-md-2 footer-lists">
          <h6> Browse by category</h6>
          <ul className="list">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Winners List</a>
            </li>
            <li>
              <a href="/">Contact Us</a>
            </li>
            <li>
              <a href="/">Cart</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Help</a>
            </li>
          </ul>
        </div>

        <div className="col-md-2 footer-lists">
          <h6 style={{ paddingLeft: "20px" }}> Resources</h6>
          <ul className="list">
            <li>
              <a href="/">Clothing</a>
            </li>
            <li>
              <a href="/">Accessories</a>
            </li>
            <li>
              <a href="/">Detailing</a>
            </li>
            <li>
              <a href="/">Car Parts</a>
            </li>
            <li>
              <a href="/">Clearance</a>
            </li>
            <li>
              <a href="/">Sweepstakes</a>
            </li>
          </ul>
        </div>
        <div className="col-md-2 footer-lists">
          <h6 style={{ paddingLeft: "25px" }}> Support</h6>
          <ul className="list">
            <li>
              <a href="/">Feedback</a>
            </li>
            <li>
              <a href="/">Browse Support</a>
            </li>
            <li>
              <a href="/">Detailing</a>
            </li>
            <li>
              <a href="/">Car Parts</a>
            </li>
            <li>
              <a href="/">Clearance</a>
            </li>
            <li>
              <a href="/">Sweepstakes</a>
            </li>
          </ul>
        </div>
        <div className="col-md-2 footer-lists">
          <h6> Connect @</h6>
          <FaFacebookF size={20} className="white-color" />
          <a style={{ color: "white" }} href="">
            {" "}
            Facebook
          </a>
          <br />
          <IoLogoWhatsapp size={20} className="white-color" />
          <a style={{ color: "white" }} href="">
            {" "}
            Whatsapp
          </a>
          <br />
          <RiTwitterFill size={20} className="white-color" />
          <a style={{ color: "white" }} href="">
            {" "}
            Twitter
          </a>
          <br />
          <RiInstagramFill size={20} className="white-color" />
          <a style={{ color: "white" }} href="">
            {" "}
            Instagram
          </a>
        </div>
      </div>
      <div className="second-footer">
        <p>Copywright @ 2021, Webure. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
