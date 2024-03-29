import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReviewCard extends Component {
  render() {
    const { email, rating, text } = this.props;
    return (
      <div>
        <p data-testid="review-card-email">{ email }</p>
        <p data-testid="review-card-rating">{ rating }</p>
        <p data-testid="review-card-evaluation">{ text }</p>
      </div>
    );
  }
}

ReviewCard.propTypes = {
  email: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ReviewCard;
