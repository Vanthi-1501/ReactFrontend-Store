import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/apiService';
import { useCart } from '../../context/CartContext';

const ProductDetail = () => {
    const { productId } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("40");
    const sizes = ["38", "39", "40", "41", "42", "43"];

    useEffect(() => {
        if (!productId) return;
        setLoading(true);
        getProductById(productId)
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching product:", err);
                setLoading(false);
            });
    }, [productId]);

    const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/300");

    useEffect(() => {
        if (product && product.image) {
            if (product.image.startsWith('http')) {
                setImgSrc(product.image);
            } else {
                setImgSrc(`http://localhost:8080/api/public/products/image/${product.image}`);
            }
        } else {
            setImgSrc("https://via.placeholder.com/300");
        }
    }, [product]);

    if (loading) return <div className="container padding-y">Đang tải...</div>;
    if (!product) return <div className="container padding-y">Sản phẩm không tồn tại</div>;

    const name = product.productName || product.name || "Sản phẩm";
    const price = product.price || 0;
    const specialPrice = product.specialPrice;
    const currentPrice = specialPrice || price;
    const originalPrice = specialPrice ? price : null;

    const handleAddToCart = () => {
        const productToAdd = {
            productId: product.productId || product.id,
            name: name,
            price: currentPrice,
            image: product.image
        };
        addToCart(productToAdd, quantity, selectedSize);
    };

    return (
        <section className="section-content padding-y bg-white">
            <div className="container">
                <nav className="mb-4">
                    <ol className="breadcrumb text-white-50">
                        <li className="breadcrumb-item"><a href="/" className="text-muted">Trang Chủ</a></li>
                        <li className="breadcrumb-item"><a href="/category" className="text-muted">{product.category ? product.category.categoryName : 'Danh Mục'}</a></li>
                        <li className="breadcrumb-item active text-dark" aria-current="page">{name}</li>
                    </ol>
                </nav>

                <div className="row">
                    <aside className="col-md-7 mb-4 mb-md-0">
                        <article className="gallery-wrap">
                            <div className="img-big-wrap sticky-top" style={{ zIndex: 1, top: '20px' }}>
                                <div style={{
                                    padding: '40px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '20px',
                                    textAlign: 'center'
                                }}>
                                    <img
                                        src={imgSrc}
                                        alt={name}
                                        className="img-fluid drop-shadow"
                                        style={{
                                            maxWidth: '100%',
                                            transform: 'rotate(-10deg)',
                                            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                                            transition: 'transform 0.3s ease'
                                        }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'rotate(-10deg)'}
                                        onError={() => setImgSrc("https://placehold.co/500x500?text=No+Image")}
                                    />
                                </div>
                                <div className="thumbs-wrap mt-3 d-flex justify-content-center gap-2">
                                    {/* Mock thumbnails */}
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="item-thumb" style={{
                                            width: '80px',
                                            height: '80px',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '10px',
                                            padding: '10px',
                                            cursor: 'pointer'
                                        }}>
                                            <img src={imgSrc} className="img-fluid" alt="" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </aside>

                    <main className="col-md-5">
                        <article className="product-info-aside pl-md-4">
                            <span className="text-danger font-weight-bold text-uppercase small" style={{ letterSpacing: '1px' }}>Mới Phát Hành</span>
                            <h1 className="title mt-2 font-weight-bold display-5">{name}</h1>

                            <div className="rating-wrap my-3 d-flex align-items-center">
                                <ul className="rating-stars mr-2">
                                    <li style={{ width: '80%' }} className="stars-active">
                                        <i className="fa fa-star text-warning"></i> <i className="fa fa-star text-warning"></i>
                                        <i className="fa fa-star text-warning"></i> <i className="fa fa-star text-warning"></i>
                                        <i className="fa fa-star text-warning"></i>
                                    </li>
                                    <li>
                                        <i className="fa fa-star text-muted"></i> <i className="fa fa-star text-muted"></i>
                                        <i className="fa fa-star text-muted"></i> <i className="fa fa-star text-muted"></i>
                                        <i className="fa fa-star text-muted"></i>
                                    </li>
                                </ul>
                                <small className="text-muted">(120 đánh giá)</small>
                            </div>

                            <div className="mb-3">
                                <var className="price h3 font-weight-bold" style={{ fontSize: '2rem' }}>
                                    {currentPrice.toLocaleString()} ₫
                                </var>
                                {specialPrice && (
                                    <span className="text-muted ml-2 text-decoration-line-through">
                                        {price.toLocaleString()} ₫
                                    </span>
                                )}
                            </div>

                            <p className="mb-4 text-muted">
                                {product.description || "Mô tả sản phẩm đang được cập nhật."}
                            </p>

                            {/* Size Selection */}
                            <div className="form-group mb-4">
                                <label className="font-weight-bold">Chọn Size</label>
                                <div className="d-flex text-center mt-2 flex-wrap" style={{ gap: '10px' }}>
                                    {sizes.map(size => (
                                        <label
                                            key={size}
                                            className={`btn btn-outline-dark rounded-0 ${selectedSize === size ? 'active bg-dark text-white' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: selectedSize === size ? '2px solid black' : '1px solid #ddd',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {size}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <button className="btn btn-dark btn-block btn-lg rounded-0 py-3 shadow-lg" onClick={handleAddToCart}>
                                    Thêm vào giỏ — {currentPrice.toLocaleString()} ₫
                                </button>
                                <button className="btn btn-link btn-block text-dark mt-2">
                                    <i className="fa fa-heart mr-2"></i> Thêm vào yêu thích
                                </button>
                            </div>

                            <div className="product-meta mt-5 pt-4 border-top">
                                <h6 className="font-weight-bold mb-3 small text-uppercase">Chi Tiết Sản Phẩm</h6>
                                <ul className="list-unstyled small text-muted">
                                    <li className="mb-2"><i className="fa fa-check text-success mr-2"></i> Chất liệu da cao cấp và lưới thoáng khí</li>
                                    <li className="mb-2"><i className="fa fa-check text-success mr-2"></i> Đế giữa đệm bọt đàn hồi</li>
                                    <li className="mb-2"><i className="fa fa-check text-success mr-2"></i> Đế ngoài cao su bền bỉ, bám đường tốt</li>
                                    <li className="mb-2"><i className="fa fa-check text-success mr-2"></i> Nhập khẩu chính hãng</li>
                                </ul>
                            </div>

                        </article>
                    </main>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
