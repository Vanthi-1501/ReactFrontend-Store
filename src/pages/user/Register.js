import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER } from '../../services/apiService';

const mobileRegex = /^[0-9]{10}$/;

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu nhập lại không khớp!");
            return;
        }

        if (!mobileRegex.test(formData.mobileNumber)) {
            setError("Số điện thoại không hợp lệ (phải có 10 số)");
            return;
        }

        try {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                mobileNumber: formData.mobileNumber
            };

            const response = await REGISTER(payload);

            if (response) {
                alert("Đăng ký thành công! Vui lòng cập nhật thêm thông tin trong trang cá nhân.");
                navigate("/login");
            }
        } catch (err) {
            console.error("Register Error:", err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Đăng ký thất bại. Vui lòng thử lại.");
            }
        }
    };

    return (
        <section className="section-content padding-y" style={{ background: "var(--bg-body)", paddingTop: '100px' }}>
            <div className="card mx-auto shadow-lg border-0" style={{ maxWidth: 600, marginTop: 40, borderRadius: "var(--radius-lg)" }}>
                <article className="card-body p-5">
                    <header className="mb-4 text-center">
                        <h4 className="card-title font-weight-bold">Đăng ký tài khoản</h4>
                        <small className="text-muted">Nhanh chóng và dễ dàng.</small>
                    </header>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col form-group">
                                <label className="font-weight-bold small">Họ</label>
                                <input
                                    name="lastName"
                                    type="text"
                                    className="form-control border-0 bg-light"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Nguyễn"
                                    required
                                    style={{ height: '45px' }}
                                />
                            </div>
                            <div className="col form-group">
                                <label className="font-weight-bold small">Tên</label>
                                <input
                                    name="firstName"
                                    type="text"
                                    className="form-control border-0 bg-light"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Văn A"
                                    required
                                    style={{ height: '45px' }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold small">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="form-control border-0 bg-light"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                required
                                style={{ height: '45px' }}
                            />
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold small">Số điện thoại</label>
                            <input
                                name="mobileNumber"
                                type="text"
                                className="form-control border-0 bg-light"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                placeholder="0123456789"
                                style={{ height: '45px' }}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="font-weight-bold small">Mật khẩu</label>
                                <input
                                    name="password"
                                    className="form-control border-0 bg-light"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    style={{ height: '45px' }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="font-weight-bold small">Nhập lại mật khẩu</label>
                                <input
                                    name="confirmPassword"
                                    className="form-control border-0 bg-light"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    style={{ height: '45px' }}
                                />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <button type="submit" className="btn btn-primary btn-block shadow-sm font-weight-bold" style={{ height: '50px', borderRadius: 'var(--radius-md)' }}>
                                Đăng ký ngay
                            </button>
                        </div>
                        <div className="form-group text-center">
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" defaultChecked />
                                <div className="custom-control-label small text-muted"> Tôi đồng ý với <Link to="#">điều khoản và điều kiện</Link> </div>
                            </label>
                        </div>
                    </form>
                </article>
            </div>
            <p className="text-center mt-4 text-muted">Đã có tài khoản? <Link to="/login" className="text-primary font-weight-bold">Đăng nhập</Link></p>
            <br /><br />
        </section>
    );
};

export default Register;
