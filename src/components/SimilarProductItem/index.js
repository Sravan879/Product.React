import React from 'react'

const SimilarProductItem = ({product}) => {
  return (
    <div className="similar-product">
      <img src={product.imageUrl} alt={`similar product ${product.title}`} />
      <p>{product.title}</p>
    </div>
  )
}

export default SimilarProductItem
