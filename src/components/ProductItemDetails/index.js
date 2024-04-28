import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import Loader from 'react-loader-spinner'

class ProductItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: {},
      isLoading: true,
      failure: false,
      quantity: 1,
    };
  }

  componentDidMount() {
    this.fetchProductDetails();
  }

  fetchProductDetails = async () => {
    const { match } = this.props;
    const productId = match.params.id;
    const apiUrl = `https://api.example.com/productDetails/${productId}`;
    const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

    try {
      const response = await fetch(apiUrl, options);

      if (response.ok) {
        const productDetails = await response.json();
        this.setState({ productDetails, isLoading: false, failure: false });
      } else {
        this.setState({ isLoading: false, failure: true });
      }
    } catch (error) {
      this.setState({ isLoading: false, failure: true });
    }
  };

  handlePlusClick = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  handleMinusClick = () => {
    this.setState((prevState) => ({
      quantity: Math.max(prevState.quantity - 1, 1),
    }));
  };

  render() {
    const { productDetails, isLoading, failure, quantity } = this.state;

    return (
      <div>
        {isLoading && <div data-testid="loader">
          <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
        </div>}
        {failure && (
          <div>
            <h1>Product Not Found</h1>
            <Link to="/products">
              <button>Continue Shopping</button>
            </Link>
          </div>
        )}
        {!isLoading && !failure && (
          <div>
            <img src={productDetails.imageUrl} alt="product" />
            <h1>{productDetails.title}</h1>
            <p>{productDetails.price}</p>
            <p>{productDetails.rating}</p>
            <p>{productDetails.total_reviews}</p>
            <p>{productDetails.description}</p>
            <p>{productDetails.availability}</p>
            <p>{productDetails.brand}</p>
            <button data-testid="plus" onClick={this.handlePlusClick}>
              <BsPlusSquare />
            </button>
            <p>{quantity}</p>
            <button data-testid="minus" onClick={this.handleMinusClick}>
              <BsDashSquare />
            </button>
            <button>ADD TO CART</button>
          </div>
        )}
      </div>
    )
  }
}

export default ProductItemDetails;
