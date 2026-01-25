import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { confirmVnpayReturn, createOrder } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { user } = useAuth();
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(false);

    // Address State
    const [addressType, setAddressType] = useState('default'); // 'default' | 'new'
    const [shippingFee, setShippingFee] = useState(0);

    // Address Data for Dropdowns
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
    const [selectedDistrictCode, setSelectedDistrictCode] = useState("");
    const [selectedWardCode, setSelectedWardCode] = useState("");

    const [newAddress, setNewAddress] = useState({
        province: '',
        district: '',
        ward: '',
        specific: ''
    });

    // Fetch Provinces on Mount
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get("https://provinces.open-api.vn/api/?depth=1");
                setProvinces(response.data);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        };
        fetchProvinces();
    }, []);

    // Handle Province Change -> Fetch Districts
    const handleProvinceChange = async (e) => {
        const code = e.target.value;
        const province = provinces.find(p => p.code == code);

        setSelectedProvinceCode(code);
        setNewAddress(prev => ({ ...prev, province: province ? province.name : '', district: '', ward: '' }));
        setSelectedDistrictCode("");
        setSelectedWardCode("");
        setDistricts([]);
        setWards([]);

        if (code) {
            try {
                const response = await axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
                setDistricts(response.data.districts);
            } catch (error) {
                console.error("Error fetching districts:", error);
            }
        }
    };

    // Handle District Change -> Fetch Wards
    const handleDistrictChange = async (e) => {
        const code = e.target.value;
        const district = districts.find(d => d.code == code);

        setSelectedDistrictCode(code);
        setNewAddress(prev => ({ ...prev, district: district ? district.name : '', ward: '' }));
        setSelectedWardCode("");
        setWards([]);

        if (code) {
            try {
                const response = await axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
                setWards(response.data.wards);
            } catch (error) {
                console.error("Error fetching wards:", error);
            }
        }
    };

    // Handle Ward Change
    const handleWardChange = (e) => {
        const code = e.target.value;
        const ward = wards.find(w => w.code == code);
        setSelectedWardCode(code);
        setNewAddress(prev => ({ ...prev, ward: ward ? ward.name : '' }));
    };

    // Calculate Shipping Fee
    useEffect(() => {
        let fee = 0;
        if (addressType === 'default') {
            // Try to guess fee from default address string
            const addr = user?.addressLine || (user?.address && typeof user.address === 'string' ? user.address : "") || "";
            if (addr.includes("Hà Nội")) fee = 20000;
            else if (addr.includes("Hồ Chí Minh")) fee = 25000;
            else if (addr.includes("Đà Nẵng")) fee = 30000;
            else if (addr.includes("Hải Phòng")) fee = 25000;
            else if (addr.includes("Cần Thơ")) fee = 30000;
            else fee = 30000; // Default Standard
        } else {
            // New Address
            const prov = newAddress.province;
            if (prov) {
                if (prov.includes('Hà Nội')) fee = 20000;
                else if (prov.includes('Hồ Chí Minh')) fee = 25000;
                else if (prov.includes('Đà Nẵng') || prov.includes('Hải Phòng') || prov.includes('Cần Thơ')) fee = 30000;
                else if (['Cao Bằng', 'Lạng Sơn', 'Hà Giang', 'Lào Cai', 'Lai Châu', 'Điện Biên', 'Sơn La'].some(p => prov.includes(p))) fee = 50000; // Xa
                else fee = 35000; // Các tỉnh khác
            } else {
                fee = 0;
            }
        }
        setShippingFee(fee);
    }, [addressType, newAddress.province, user]);

    const finalTotal = cartTotal + shippingFee;

    // ✅ build order payload
    const orderPayload = useMemo(() => {
        const customerName = user?.fullName || `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

        let finalAddress = "";
        if (addressType === 'default') {
            finalAddress = user?.addressLine || (user?.address && typeof user.address === 'string' ? user.address : "Địa chỉ mặc định");
        } else {
            finalAddress = `${newAddress.specific}, ${newAddress.ward}, ${newAddress.district}, ${newAddress.province}`;
        }

        return {
            userId: user?.id || 0,
            customerName,
            email: user?.email || "",
            phone: user?.mobileNumber || "",
            address: finalAddress,
            totalAmount: finalTotal, // Include Shipping in Order Total
            note: "Thanh toan don hang",
            paymentMethod,
            items: cartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            })),
        };
    }, [user, cartItems, finalTotal, paymentMethod, addressType, newAddress]);

    // ✅ VNPay return handler
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");

        if (!vnp_ResponseCode) return;

        setLoading(true);

        (async () => {
            try {
                if (vnp_ResponseCode === '00') {
                    console.log("VNPay Payment Success");
                    clearCart();
                    localStorage.removeItem("cartItems");
                    navigate("/payment-success", { replace: true });
                } else {
                    console.warn("VNPay Payment Failed code:", vnp_ResponseCode);
                    navigate("/payment-failure", { replace: true });
                }
            } catch (err) {
                console.error("VNPay local processing error:", err);
                navigate("/payment-failure", { replace: true });
            } finally {
                setLoading(false);
            }
        })();
    }, [clearCart, navigate]);

    const handleCheckout = async (e) => {
        e?.preventDefault();

        if (!user) {
            alert("Vui lòng đăng nhập để thanh toán!");
            navigate("/login");
            return;
        }

        if (addressType === 'new' && (!newAddress.province || !newAddress.district || !newAddress.ward || !newAddress.specific)) {
            alert("Vui lòng nhập đầy đủ địa chỉ giao hàng!");
            return;
        }

        if (!cartItems || cartItems.length === 0) {
            alert("Giỏ hàng trống!");
            return;
        }

        try {
            setLoading(true);

            if (paymentMethod === "VNPAY") {
                const savedOrder = await createOrder({
                    ...orderPayload,
                    paymentMethod: "VNPAY",
                });

                const orderId = savedOrder?.id || savedOrder?.orderId;
                if (!orderId) {
                    alert(`Không lấy được mã đơn hàng.`);
                    return;
                }

                const NODE_SERVER = "http://localhost:4000";
                const returnUrl = `${window.location.origin}/checkout`;

                const response = await axios.get(`${NODE_SERVER}/payment`, {
                    params: {
                        amount: finalTotal,
                        orderInfo: `Thanh toan don hang ${orderId}`,
                        returnUrl,
                        txnRef: orderId,
                    },
                });

                const payUrl = response?.data?.url;
                if (!payUrl) {
                    alert("Lỗi lấy link VNPay.");
                    return;
                }
                window.location.href = payUrl;
                return;
            }

            // COD
            const savedOrder = await createOrder({
                ...orderPayload,
                paymentMethod: "COD",
            });

            if (savedOrder?.id || savedOrder?.orderId) {
                clearCart();
                localStorage.removeItem("cartItems");
                navigate("/payment-success", { replace: true });
            } else {
                alert(`Tạo đơn thất bại.`);
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            navigate("/payment-failure");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section-content padding-y bg-white" style={{ minHeight: '90vh', position: 'relative' }}>
            {loading && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(255,255,255,0.8)', zIndex: 999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div className="spinner-border text-dark" role="status">
                        <span className="sr-only">Đang xử lý...</span>
                    </div>
                </div>
            )}
            <div className="container">
                <h4 className="card-title mb-4 font-weight-bold text-uppercase">Thanh Toán</h4>
                <div className="row">
                    {/* LEFT - Shipping Info */}
                    <div className="col-lg-7 mb-4">
                        <div className="card border-0 mb-4 bg-light shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="card-title mb-4 font-weight-bold">Thông Tin Giao Hàng</h5>

                                {/* User Info (Read Only) */}
                                <div className="form-row">
                                    <div className="col-md-6 form-group">
                                        <label className="text-muted small text-uppercase">Họ Tên</label>
                                        <input type="text" className="form-control rounded-0 border-0" value={user?.fullName || user?.firstName || ""} readOnly />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="text-muted small text-uppercase">SĐT</label>
                                        <input type="text" className="form-control rounded-0 border-0" value={user?.mobileNumber || ""} readOnly />
                                    </div>
                                </div>

                                {/* Address Selection */}
                                <label className="text-muted small text-uppercase mb-2">Chọn địa chỉ giao hàng:</label>

                                <div className="form-group">
                                    <div className="custom-control custom-radio mb-2">
                                        <input
                                            type="radio" id="addrDefault" name="addressType"
                                            className="custom-control-input"
                                            checked={addressType === 'default'}
                                            onChange={() => setAddressType('default')}
                                        />
                                        <label className="custom-control-label" htmlFor="addrDefault">
                                            Địa chỉ mặc định: <strong>{user?.addressLine || (user?.address && typeof user.address === 'object' ? `${user.address.street}, ${user.address.city}` : user?.address) || "Chưa cập nhật"}</strong>
                                        </label>
                                    </div>

                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio" id="addrNew" name="addressType"
                                            className="custom-control-input"
                                            checked={addressType === 'new'}
                                            onChange={() => setAddressType('new')}
                                        />
                                        <label className="custom-control-label" htmlFor="addrNew">
                                            Giao đến địa chỉ khác
                                        </label>
                                    </div>
                                </div>

                                {/* New Address Form */}
                                {addressType === 'new' && (
                                    <div className="bg-white p-3 rounded border">
                                        <div className="form-group">
                                            <label>Tỉnh / Thành phố <span className="text-danger">*</span></label>
                                            <select
                                                className="form-control"
                                                value={selectedProvinceCode}
                                                onChange={handleProvinceChange}
                                            >
                                                <option value="">-- Chọn Tỉnh/Thành --</option>
                                                {provinces.map(p => (
                                                    <option key={p.code} value={p.code}>{p.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6 form-group">
                                                <label>Quận / Huyện <span className="text-danger">*</span></label>
                                                <select
                                                    className="form-control"
                                                    value={selectedDistrictCode}
                                                    onChange={handleDistrictChange}
                                                    disabled={!selectedProvinceCode}
                                                >
                                                    <option value="">-- Chọn Quận/Huyện --</option>
                                                    {districts.map(d => (
                                                        <option key={d.code} value={d.code}>{d.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Phường / Xã <span className="text-danger">*</span></label>
                                                <select
                                                    className="form-control"
                                                    value={selectedWardCode}
                                                    onChange={handleWardChange}
                                                    disabled={!selectedDistrictCode}
                                                >
                                                    <option value="">-- Chọn Phường/Xã --</option>
                                                    {wards.map(w => (
                                                        <option key={w.code} value={w.code}>{w.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Địa chỉ cụ thể <span className="text-danger">*</span></label>
                                            <input
                                                type="text" className="form-control" placeholder="Số nhà, tên đường..."
                                                value={newAddress.specific}
                                                onChange={(e) => setNewAddress({ ...newAddress, specific: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="card border-0 bg-light shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="card-title mb-4 font-weight-bold">Phương Thức Thanh Toán</h5>
                                <div className="form-group">
                                    <label className={`custom-control custom-radio border p-3 rounded bg-white mb-2 d-flex align-items-center justify-content-between cursor-pointer ${paymentMethod === "COD" ? 'border-primary' : ''}`}>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type="radio" name="paymentDetails" className="custom-control-input"
                                                checked={paymentMethod === "COD"}
                                                onChange={() => setPaymentMethod("COD")}
                                            />
                                            <span className="custom-control-label font-weight-bold ml-3">Thanh toán khi nhận hàng (COD)</span>
                                        </div>
                                        <i className="fa fa-money text-muted fa-lg"></i>
                                    </label>

                                    <label className={`custom-control custom-radio border p-3 rounded bg-white d-flex align-items-center justify-content-between cursor-pointer ${paymentMethod === "VNPAY" ? 'border-primary' : ''}`}>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type="radio" name="paymentDetails" className="custom-control-input"
                                                checked={paymentMethod === "VNPAY"}
                                                onChange={() => setPaymentMethod("VNPAY")}
                                            />
                                            <span className="custom-control-label font-weight-bold ml-3">Ví điện tử VNPay</span>
                                        </div>
                                        <img src="https://vnpay.vn/assets/images/logo-icon/logo-primary.svg" height="24" alt="VNPay" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT - Order Summary */}
                    <div className="col-lg-5">
                        <div className="card border-0 bg-light shadow-sm sticky-top" style={{ top: '20px' }}>
                            <div className="card-body p-4">
                                <h5 className="card-title mb-4 font-weight-bold border-bottom pb-3">Tóm Tắt Đơn Hàng</h5>
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center">
                                            <div className="position-relative mr-3">
                                                <span className="badge badge-secondary rounded-circle position-absolute" style={{ top: '-5px', right: '-5px', fontSize: '10px' }}>{item.quantity}</span>
                                                <img
                                                    src={item.image && item.image.startsWith('http') ? item.image : `http://localhost:8080/api/public/products/image/${item.image}`}
                                                    alt=""
                                                    style={{ width: '50px', height: '50px', objectFit: 'contain', background: '#fff' }}
                                                />
                                            </div>
                                            <div>
                                                <small className="font-weight-bold d-block text-truncate" style={{ maxWidth: '150px' }}>{item.name}</small>
                                                <small className="text-muted">Size: {item.size}</small>
                                            </div>
                                        </div>
                                        <span className="text-muted small">{(item.price * item.quantity).toLocaleString()}₫</span>
                                    </div>
                                ))}
                                <hr />
                                <dl className="dlist-align mb-2">
                                    <dt className="text-muted">Tạm tính</dt>
                                    <dd className="text-right">{cartTotal.toLocaleString()} ₫</dd>
                                </dl>
                                <dl className="dlist-align mb-2">
                                    <dt className="text-muted">Vận Chuyển</dt>
                                    <dd className="text-right text-dark">
                                        {shippingFee === 0 ? "Chưa tính / Miễn phí" : `+ ${shippingFee.toLocaleString()} ₫`}
                                    </dd>
                                </dl>
                                <hr />
                                <dl className="dlist-align mb-4">
                                    <dt className="h5 font-weight-bold">Tổng Cộng</dt>
                                    <dd className="text-right h4 font-weight-bold text-primary">
                                        {finalTotal.toLocaleString()} ₫
                                    </dd>
                                </dl>

                                <button
                                    type="button"
                                    className="btn btn-dark btn-block btn-lg rounded shadow-sm py-3 font-weight-bold"
                                    onClick={handleCheckout}
                                    disabled={loading}
                                >
                                    {loading ? "Đang xử lý..." : `THANH TOÁN • ${finalTotal.toLocaleString()} ₫`}
                                </button>
                                <p className="text-muted text-center mt-3 small">
                                    <i className="fa fa-lock mr-1"></i> Thanh Toán Bảo Mật SSL
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
