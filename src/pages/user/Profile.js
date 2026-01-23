import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import { updateProfile } from '../../services/apiService'; // Assuming this exists or using a generic PUT

const Profile = () => {
    const { user, login } = useAuth(); // login or a method to update user context
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: 'Vietnam'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Profile - User from context:", user);
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.mobileNumber || '',
                address: user.address || '',
                city: user.city || '',
                country: user.country || 'Vietnam'
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulate API call or use actual one
            // await updateProfile(user.id, formData);
            // Update local context
            // login({ ...user, ...formData }); 
            alert("Cập nhật thông tin thành công! (Demo)");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Có lỗi xảy ra.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section-content padding-y" style={{ minHeight: '80vh', paddingTop: '100px' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="row">
                    {/* Sidebar */}
                    <aside className="col-md-3 mb-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-0">
                                <nav className="list-group list-group-flush">
                                    <Link
                                        className="list-group-item list-group-item-action active border-0 d-flex align-items-center"
                                        to="/profile"
                                        style={{ padding: '15px 20px', fontWeight: '500' }}
                                    >
                                        <i className="fa fa-user mr-3"></i>
                                        Thông tin cá nhân
                                    </Link>
                                    <Link
                                        className="list-group-item list-group-item-action border-0 d-flex align-items-center"
                                        to="/profile-orders"
                                        style={{ padding: '15px 20px', fontWeight: '500' }}
                                    >
                                        <i className="fa fa-shopping-bag mr-3"></i>
                                        Đơn hàng
                                    </Link>
                                    <Link
                                        className="list-group-item list-group-item-action border-0 d-flex align-items-center"
                                        to="/listing"
                                        style={{ padding: '15px 20px', fontWeight: '500' }}
                                    >
                                        <i className="fa fa-shopping-cart mr-3"></i>
                                        Danh sách yêu thích
                                    </Link>
                                </nav>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="col-md-9">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white border-0 py-4">
                                <h4 className="mb-0 font-weight-bold">Thông Tin Cá Nhân</h4>
                                <small className="text-muted">Quản lý thông tin cá nhân của bạn</small>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {/* Form Fields */}
                                        <div className="col-md-8">
                                            <div className="form-row">
                                                <div className="col-md-6 form-group">
                                                    <label className="font-weight-bold small">Họ</label>
                                                    <input
                                                        name="firstName"
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        style={{ height: '45px' }}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="font-weight-bold small">Tên</label>
                                                    <input
                                                        name="lastName"
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
                                                        style={{ height: '45px' }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="font-weight-bold small">Email</label>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className="form-control bg-light"
                                                    value={formData.email}
                                                    readOnly
                                                    disabled
                                                    style={{ height: '45px' }}
                                                />
                                                <small className="text-muted">Email không thể thay đổi</small>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label className="font-weight-bold small">Số điện thoại</label>
                                                    <input
                                                        name="phone"
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="0123456789"
                                                        style={{ height: '45px' }}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="font-weight-bold small">Thành phố</label>
                                                    <input
                                                        name="city"
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                        placeholder="Hồ Chí Minh"
                                                        style={{ height: '45px' }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="font-weight-bold small">Địa chỉ</label>
                                                <input
                                                    name="address"
                                                    type="text"
                                                    className="form-control"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    placeholder="123 Đường ABC, Quận XYZ"
                                                    style={{ height: '45px' }}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="font-weight-bold small">Quốc gia</label>
                                                <select
                                                    name="country"
                                                    className="form-control"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                    style={{ height: '45px' }}
                                                >
                                                    <option value="Vietnam">Việt Nam</option>
                                                    <option value="United States">United States</option>
                                                    <option value="Japan">Japan</option>
                                                </select>
                                            </div>

                                            <button
                                                className="btn btn-primary btn-lg px-5 mt-3"
                                                disabled={loading}
                                                style={{ height: '50px', borderRadius: '8px' }}
                                            >
                                                {loading ? "Đang lưu..." : "Lưu thay đổi"}
                                            </button>
                                        </div>

                                        {/* Avatar */}
                                        <div className="col-md-4 text-center">
                                            <div className="mb-3">
                                                <img
                                                    src="https://placehold.co/200x200/e0e0e0/666?text=Avatar"
                                                    className="rounded-circle border shadow-sm"
                                                    alt="Avatar"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <button className="btn btn-outline-secondary btn-sm">
                                                <i className="fa fa-camera mr-2"></i>
                                                Đổi ảnh đại diện
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
};

export default Profile;
