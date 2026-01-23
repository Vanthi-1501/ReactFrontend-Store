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

    const [paymentMethod, setPaymentMethod] = useState("COD"); // COD | VNPAY
    const [loading, setLoading] = useState(false);
    const [shippingAddress, setShippingAddress] = useState("");

    // ✅ build order payload
    const orderPayload = useMemo(() => {
        const customerName =
            user?.fullName || `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

        return {
            userId: user?.id || 0,
            customerName,
            email: user?.email || "",
            phone: user?.mobileNumber || "",
            address: shippingAddress || user?.address || "Địa chỉ mặc định",
            totalAmount: cartTotal,
            note: "Thanh toan don hang",
            paymentMethod,
            items: cartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            })),
        };
    }, [user, cartItems, cartTotal, paymentMethod, shippingAddress]);

    // ✅ VNPay return handler: verify + update DB, rồi mới clearCart/navigate
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");

        if (!vnp_ResponseCode) return;

        setLoading(true);

        (async () => {
            try {
                if (vnp_ResponseCode === '00') {
                    // Success case
                    console.log("VNPay Payment Success (Client Check)");

                    // Call backend to verify and update order status
                    // const params = Object.fromEntries(urlParams);
                    // await confirmVnpayReturn(params);

                    clearCart();
                    localStorage.removeItem("cartItems"); // Double check to ensure it's gone
                    navigate("/payment-success", { replace: true });
                } else {
                    // Failed case
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
                    alert(`Không lấy được mã đơn hàng. Response: ${JSON.stringify(savedOrder)}`);
                    return;
                }

                const NODE_SERVER = "http://localhost:4000";
                const returnUrl = `${window.location.origin}/checkout`;

                const response = await axios.get(`${NODE_SERVER}/payment`, {
                    params: {
                        amount: cartTotal,
                        orderInfo: `Thanh toan don hang ${orderId}`,
                        returnUrl,
                        txnRef: orderId,
                    },
                });

                const payUrl = response?.data?.url;
                if (!payUrl) {
                    alert("Lỗi lấy link VNPay. Vui lòng thử lại.");
                    return;
                }

                window.location.href = payUrl;
                return;
            }

            const savedOrder = await createOrder({
                ...orderPayload,
                paymentMethod: "COD",
            });

            if (savedOrder?.id || savedOrder?.orderId) {
                clearCart();
                localStorage.removeItem("cartItems");
                navigate("/payment-success", { replace: true });
            } else {
                alert(`Tạo đơn thất bại. Response: ${JSON.stringify(savedOrder)}`);
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            const status = error?.response?.status;
            const data = error?.response?.data;

            if (status === 409) {
                alert(`Sản phẩm đã hết hàng: ${data.message || "Vui lòng kiểm tra lại giỏ hàng."}`);
                return;
            }
            if (status === 401) {
                alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục.");
                navigate("/login");
                return;
            }
            navigate("/payment-failure");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section-content padding-y bg-white" style={{ minHeight: '90vh', position: 'relative' }}>
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    zIndex: 999,
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className="spinner-border text-dark" role="status">
                        <span className="sr-only">Đang xử lý...</span>
                    </div>
                </div>
            )}
            <div className="container">
                <h4 className="card-title mb-4 font-weight-bold text-uppercase" style={{ letterSpacing: '1px' }}>Thanh Toán</h4>
                <div className="row">
                    {/* LEFT */}
                    <div className="col-lg-7 mb-4">
                        <div className="card border-0 mb-4 bg-light">
                            <div className="card-body p-4">
                                <h5 className="card-title mb-4 font-weight-bold">Thông Tin Giao Hàng</h5>
                                <form onSubmit={handleCheckout}>
                                    <div className="form-row">
                                        <div className="col-md-6 form-group">
                                            <label className="text-muted small text-uppercase mb-1">Họ Tên</label>
                                            <input
                                                type="text"
                                                className="form-control rounded-0 border-0"
                                                value={user?.fullName || ""}
                                                readOnly
                                                placeholder="Khách lẻ"
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label className="text-muted small text-uppercase mb-1">Số Điện Thoại</label>
                                            <input
                                                type="text"
                                                className="form-control rounded-0 border-0"
                                                value={user?.mobileNumber || ""}
                                                readOnly
                                                placeholder="Chưa cung cấp"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="text-muted small text-uppercase mb-1">Email</label>
                                        <input
                                            type="email"
                                            className="form-control rounded-0 border-0"
                                            value={user?.email || ""}
                                            readOnly
                                            placeholder="chua_co_email@example.com"
                                        />
                                    </div>

                                    <div className="form-group mb-0">
                                        <label className="text-muted small text-uppercase mb-1">Địa Chỉ Giao Hàng</label>
                                        <textarea
                                            className="form-control rounded-0 border-0"
                                            rows="3"
                                            placeholder="Nhập địa chỉ giao hàng chi tiết..."
                                            value={shippingAddress}
                                            onChange={(e) => setShippingAddress(e.target.value)}
                                            style={{ resize: 'none' }}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="card border-0 bg-light">
                            <div className="card-body p-4">
                                <h5 className="card-title mb-4 font-weight-bold">Phương Thức Thanh Toán</h5>
                                <div className="form-group">
                                    <label className={`custom-control custom-radio border p-3 rounded-0 bg-white mb-2 d-flex align-items-center justify-content-between cursor-pointer ${paymentMethod === "COD" ? 'border-dark' : 'border-light'}`}>
                                        <div>
                                            <input
                                                type="radio"
                                                name="paymentDetails"
                                                className="custom-control-input"
                                                checked={paymentMethod === "COD"}
                                                onChange={() => setPaymentMethod("COD")}
                                            />
                                            <span className="custom-control-label font-weight-bold ml-2">Thanh toán khi nhận hàng (COD)</span>
                                        </div>
                                        <i className="fa fa-money text-muted"></i>
                                    </label>

                                    <label className={`custom-control custom-radio border p-3 rounded-0 bg-white d-flex align-items-center justify-content-between cursor-pointer ${paymentMethod === "VNPAY" ? 'border-primary' : 'border-light'}`}>
                                        <div>
                                            <input
                                                type="radio"
                                                name="paymentDetails"
                                                className="custom-control-input"
                                                checked={paymentMethod === "VNPAY"}
                                                onChange={() => setPaymentMethod("VNPAY")}
                                            />
                                            <span className="custom-control-label font-weight-bold ml-2">Ví điện tử VNPay</span>
                                        </div>
                                        <img src="https://vnpay.vn/assets/images/logo-icon/logo-primary.svg" height="20" alt="VNPay" />
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="col-lg-5">
                        <div className="card border-0 bg-light sticky-top" style={{ top: '20px' }}>
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
                                                    onError={(e) => { e.target.src = 'https://placehold.co/50/f0f0f0/666?text=No+Image'; }}
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
                                    <dd className="text-right text-success">Miễn phí</dd>
                                </dl>

                                <hr />

                                <dl className="dlist-align mb-4">
                                    <dt className="h5 font-weight-bold">Tổng Cộng</dt>
                                    <dd className="text-right h4 font-weight-bold">
                                        {cartTotal.toLocaleString()} ₫
                                    </dd>
                                </dl>

                                <button
                                    type="button"
                                    className="btn btn-dark btn-block btn-lg rounded-0 py-3"
                                    onClick={handleCheckout}
                                    disabled={loading}
                                >
                                    {loading ? "Đang xử lý..." : `Thanh toán ${cartTotal.toLocaleString()} ₫`}
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
