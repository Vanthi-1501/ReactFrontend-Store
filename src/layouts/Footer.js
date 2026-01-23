import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="section-footer bg-secondary text-white">
            <div className="container">
                <section className="footer-top padding-y-lg">
                    <div className="row">
                        <aside className="col-md-4 col-12">
                            <article className="mr-md-4">
                                <h5 className="title">Liên hệ</h5>
                                <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi để được giải đáp mọi thắc mắc.</p>
                                <ul className="list-icon">
                                    <li> <i className="icon fa fa-map-marker"> </i>TP. Hồ Chí Minh, Việt Nam</li>
                                    <li> <i className="icon fa fa-envelope"> </i> info@alistyle.vn</li>
                                    <li> <i className="icon fa fa-phone"> </i> (800) 060-0730</li>
                                    <li> <i className="icon fa fa-clock"> </i>Thứ 2 - Thứ 7: 8:00 - 21:00</li>
                                </ul>
                            </article>
                        </aside>
                        <aside className="col-md col-6">
                            <h5 className="title">Thông tin</h5>
                            <ul className="list-unstyled">
                                <li> <Link to="#">Về chúng tôi</Link></li>
                                <li> <Link to="#">Tuyển dụng</Link></li>
                                <li> <Link to="#">Hệ thống cửa hàng</Link></li>
                                <li> <Link to="#">Điều khoản sử dụng</Link></li>
                                <li> <Link to="#">Sơ đồ trang</Link></li>
                            </ul>
                        </aside>
                        <aside className="col-md col-6">
                            <h5 className="title">Tài khoản</h5>
                            <ul className="list-unstyled">
                                <li> <Link to="#">Đăng nhập / Đăng ký</Link></li>
                                <li> <Link to="#">Chính sách hoàn tiền</Link></li>
                                <li> <Link to="#">Tình trạng đơn hàng</Link></li>
                                <li> <Link to="#">Thông tin giao hàng</Link></li>
                                <li> <Link to="#">Khiếu nại</Link></li>
                            </ul>
                        </aside>
                        <aside className="col-md-4 col-12">
                            <h5 className="title">Đăng ký nhận tin</h5>
                            <p>Nhận thông báo về các chương trình khuyến mãi và sản phẩm mới nhất.</p>

                            <form className="form-inline mb-3">
                                <input type="text" placeholder="Email của bạn" className="border-0 w-auto form-control" name="" />
                                <button className="btn ml-2 btn-warning"> Đăng ký</button>
                            </form>

                            <p className="text-white-50 mb-2">Kết nối với chúng tôi</p>
                            <div>
                                <Link to="#" className="btn btn-icon btn-outline-light"><i className="fab fa-facebook-f"></i></Link>
                                <Link to="#" className="btn btn-icon btn-outline-light"><i className="fab fa-twitter"></i></Link>
                                <Link to="#" className="btn btn-icon btn-outline-light"><i className="fab fa-instagram"></i></Link>
                                <Link to="#" className="btn btn-icon btn-outline-light"><i className="fab fa-youtube"></i></Link>
                            </div>

                        </aside>
                    </div>
                </section>

                <section className="footer-bottom text-center">
                    <p className="text-white">Chính sách bảo mật - Điều khoản sử dụng - Hướng dẫn mua hàng</p>
                    <p className="text-muted"> &copy; 2025 Alistyle, Bảo lưu mọi quyền </p>
                    <br />
                </section>
            </div>
        </footer>
    );
};

export default Footer;