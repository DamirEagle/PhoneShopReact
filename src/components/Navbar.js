import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";

export default class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-5">
        <Link to="/">
          <img src={logo} alt="" className="navbar-brand"></img>
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              Product
            </Link>
          </li>
        </ul>
        <Link to="/cart" className="ml-auto">
          <ButtonContainer>
            <i className="fas fa-cart-plus"></i> MyCart
          </ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--lightBlue);
  .nav-link {
    color: var(--whiteMain);
    text-transform: caplitalize;
  }
`;
