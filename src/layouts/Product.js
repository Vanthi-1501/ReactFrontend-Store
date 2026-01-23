import React from 'react';
import ProductItem from '../pages/product/ProductItem';

const ProductSection = ({ products = [] }) => {
    // Use API data only
    const displayProducts = products;

    return (
        <div className="row py-4">
            {displayProducts.map((product, index) => (
                <ProductItem key={product.productId || product.id || index} product={product} />
            ))}
        </div>
    );
};

export default ProductSection;
