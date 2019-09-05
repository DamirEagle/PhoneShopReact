import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList";
import { Switch, Route, Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart/Cart";
import Default from "./components/Default";
import Details from "./components/Details";
import Modal from "./components/Modal";

function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <ProductList></ProductList>;
          }}
        ></Route>
        <Route
          path="/details"
          render={() => {
            return <Details></Details>;
          }}
        ></Route>
        <Route path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal></Modal>
    </React.Fragment>
  );
}

export default App;
