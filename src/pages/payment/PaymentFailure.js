import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailure = () => {
    return (
        <section className="section-content min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card border-0 shadow-lg rounded-lg overflow-hidden animate-fade-up">
                            <div className="card-header bg-danger text-white text-center py-4 border-0">
                                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white text-danger shadow-sm mb-3" style={{ width: '80px', height: '80px' }}>
                                    <i className="fa fa-times" style={{ fontSize: '40px' }}></i>
                                </div>
                                <h3 className="font-weight-bold mb-0">Thanh toán thất bại</h3>
                            </div>
                            <div className="card-body p-5 text-center bg-white">
                                <p className="text-muted mb-4 lead">
                                    Giao dịch không thành công.<br />
                                    Vui lòng kiểm tra lại thông tin thanh toán hoặc thử lại sau.
                                </p>

                                <div className="d-grid gap-3">
                                    <Link to="/checkout" className="btn btn-danger btn-block btn-lg rounded-pill shadow-hover w-100 mb-3">
                                        <i className="fa fa-undo mr-2"></i> Thử lại
                                    </Link>
                                    <Link to="/cart" className="btn btn-outline-dark btn-block btn-lg rounded-pill w-100">
                                        Về giỏ hàng
                                    </Link>
                                </div>
                            </div>
                            <div className="card-footer bg-light text-center py-3 border-0">
                                <small className="text-muted">Hoặc liên hệ hotline 1900 xxxx để được hỗ trợ.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentFailure;
