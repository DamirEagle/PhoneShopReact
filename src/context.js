import React from "react";
import { storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();

class ProductProvider extends React.Component {
  state = {
    product: [],
    detailProduct: detailProduct,
    cart: [],
    modalProduct: detailProduct,
    modalOpen: false,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount = () => {
    this.setProducts();
  };

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { product: tempProducts };
    });
  };

  getItem = id => {
    return this.state.product.find(item => item.id === id);
  };

  handleDetails = id => {
    const product = this.getItem(id);
    this.setState({ detailProduct: product });
  };

  addToCart = id => {
    let tempProducts = [...this.state.product];
    let index = tempProducts.indexOf(this.getItem(id));
    let product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return {
        modalProduct: product,
        modalOpen: true
      };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    let index = tempCart.indexOf(selectedProduct);

    let product = tempCart[index];
    product.count++;
    product.total = product.count * product.price;
    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    let index = tempCart.indexOf(selectedProduct);

    let product = tempCart[index];
    product.count--;
    if (product.count === 0) this.removeItem(id);
    else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  removeItem = id => {
    let tempProducts = [...this.state.product];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.total = 0;
    removedProduct.count = 0;
    this.setState(() => {
      return {
        product: [...tempProducts],
        cart: [...tempCart]
      };
    }, this.addTotals());
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let SubTotal = 0;
    this.state.cart.map(item => (SubTotal += item.total));
    let tempTax = SubTotal * 0.1;
    let tax = parseFloat(tempTax.toFixed(2));
    let total = SubTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: SubTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetails: this.handleDetails,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
