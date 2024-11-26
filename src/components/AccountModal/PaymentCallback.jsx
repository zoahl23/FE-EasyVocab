import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios-customize';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { callFetchAccount } from '../../services/api';
import { doGetAccountAction } from '../../redux/account/accountSlice';

const PaymentCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const getAccount = async () => {
        if (
            window.location.pathname === '/login'
            || window.location.pathname === '/register'
        ) return;

        const res = await callFetchAccount();
        // console.log("fetch", res)
        if (res && res.data) {
            dispatch(doGetAccountAction(res.data))
            // console.log("fetch", res.data.user)
        }
    }

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                // Lấy query parameters từ URL
                const queryParams = new URLSearchParams(location.search);
                const callbackParams = Object.fromEntries(queryParams.entries());
                console.log()

                // Gửi request xác thực giao dịch đến BE
                const res = await axios.get("/api/payment/callback", {
                    params: callbackParams, // Gửi các query parameters này đến BE
                });

                if (res && res.data) {
                    message.success(`${res.message}!`);
                    getAccount();
                    navigate("/review"); // Điều hướng người dùng đến trang dashboard
                }
                else {
                    message.error(`${res.message}!`);
                    navigate("/review"); // Điều hướng người dùng đến trang dashboard
                }
            } catch (error) {
                message.error("Đã xảy ra lỗi trong quá trình xác thực thanh toán!");
                console.error(error);
                navigate("/payment/error");
            }
        };

        verifyPayment();
    }, [navigate]);

    return (
        navigate("/review")
    );
};

export default PaymentCallback;
