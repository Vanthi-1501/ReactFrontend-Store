import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const PaymentSuccess = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        // Ensure cart is cleared when landing on success page
        clearCart();
        localStorage.removeItem("cartItems");
        console.log("Cart cleared on PaymentSuccess mount");
    }, []);

    return (
        <section className="section-content min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card border-0 shadow-lg rounded-lg overflow-hidden animate-fade-up">
                            <div className="card-header bg-success text-white text-center py-4 border-0">
                                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white text-success shadow-sm mb-3" style={{ width: '80px', height: '80px' }}>
                                    <i className="fa fa-check" style={{ fontSize: '40px' }}></i>
                                </div>
                                <h3 className="font-weight-bold mb-0">Thanh toán thành công!</h3>
                            </div>
                            <div className="card-body p-5 text-center bg-white">
                                <p className="text-muted mb-4 lead">
                                    Cảm ơn bạn đã mua hàng tại <strong>thivan.</strong><br />
                                    Đơn hàng của bạn đã được tiếp nhận và đang xử lý.
                                </p>

                                <div className="d-grid gap-3">
                                    <Link to="/" className="btn btn-dark btn-block btn-lg rounded-pill shadow-hover w-100 mb-3">
                                        <i className="fa fa-shopping-bag mr-2"></i> Tiếp tục mua sắm
                                    </Link>
                                    <Link to="/profile-orders" className="btn btn-outline-dark btn-block btn-lg rounded-pill w-100">
                                        Xem đơn hàng
                                    </Link>
                                </div>
                            </div>
                            <div className="card-footer bg-light text-center py-3 border-0">
                                <small className="text-muted">Mã đơn hàng sẽ được gửi qua email của bạn.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentSuccess;
