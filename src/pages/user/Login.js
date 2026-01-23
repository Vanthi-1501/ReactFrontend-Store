import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LOGIN } from '../../services/apiService';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const body = { email, password };
            const response = await LOGIN(body);

            if (response && response.token) {
                const userInfo = {
                    id: response.id,
                    email: response.email,
                    fullName: response.fullName,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    mobileNumber: response.mobileNumber,
                    address: response.addressLine || '',
                    city: response.city || '',
                    country: response.country || 'Vietnam'
                };

                login(response.token, userInfo);

                alert("Đăng nhập thành công!");
                navigate("/");
            } else {
                setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
            }
        } catch (err) {
            console.error("Login Error:", err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
            }
        }
    };

    return (
        <section className="section-content padding-y" style={{ minHeight: "84vh", background: "var(--bg-body)" }}>
            <div className="card mx-auto shadow-sm border-0" style={{ maxWidth: 380, marginTop: 100, borderRadius: "var(--radius-lg)" }}>
                <div className="card-body">
                    <h4 className="card-title mb-4 text-center font-weight-bold">Đăng nhập</h4>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                name="username"
                                className="form-control border-0 bg-light"
                                placeholder="Email"
                                type="email"
                                style={{ height: '45px' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="password"
                                className="form-control border-0 bg-light"
                                placeholder="Mật khẩu"
                                type="password"
                                style={{ height: '45px' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group d-flex justify-content-between align-items-center">
                            <label className="custom-control custom-checkbox mb-0">
                                <input type="checkbox" className="custom-control-input" defaultChecked />
                                <div className="custom-control-label text-muted"> Ghi nhớ </div>
                            </label>
                            <a href="#" className="text-primary small">Quên mật khẩu?</a>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block shadow-sm" style={{ height: '45px', borderRadius: 'var(--radius-md)' }}> Đăng nhập  </button>
                        </div>
                    </form>
                </div>
            </div>
            <p className="text-center mt-4 text-muted">Chưa có tài khoản? <Link to="/register" className="text-primary font-weight-bold">Đăng ký ngay</Link></p>
            <br /><br />
        </section>
    );
};

export default Login;
