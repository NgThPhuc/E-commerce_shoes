import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";
import { toast } from "react-hot-toast";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const [orderDetails, setOrderDetails] = useState(null);
	const processedSessionId = useRef(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				setIsProcessing(true);
				const response = await axios.post("/payments/checkout-success", {
					sessionId,
				});
				
				if (response.data.success) {
					setOrderDetails(response.data);
					clearCart();
					toast.success('Đặt hàng thành công!');
				} else {
					throw new Error("Không thể xác nhận thanh toán");
				}
			} catch (error) {
				console.error("Error processing checkout:", error);
				const errorMessage = error.response?.data?.message || error.message || "Có lỗi xảy ra khi xử lý thanh toán";
				setError(errorMessage);
				toast.error(errorMessage);
				setTimeout(() => {
					navigate('/cart');
				}, 2000);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		
		if (sessionId && processedSessionId.current !== sessionId) {
			processedSessionId.current = sessionId;
			handleCheckoutSuccess(sessionId);
		} else if (!sessionId) {
			setIsProcessing(false);
			setError("Không tìm thấy mã giao dịch");
			toast.error("Không tìm thấy mã giao dịch");
			setTimeout(() => {
				navigate('/cart');
			}, 2000);
		}
	}, [clearCart, navigate]);

	if (isProcessing) return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-emerald-400 text-xl flex items-center gap-3">
				<svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
					<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				Đang xử lý đơn hàng...
			</div>
		</div>
	);

	if (error) return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-red-400 text-xl">Lỗi: {error}</div>
		</div>
	);

	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<CheckCircle className='text-emerald-400 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2'>
						Đặt hàng thành công!
					</h1>

					<p className='text-gray-300 text-center mb-2'>
						Cảm ơn bạn đã đặt hàng. Chúng tôi đang xử lý đơn hàng của bạn.
					</p>
					<p className='text-emerald-400 text-center text-sm mb-6'>
						Vui lòng kiểm tra email để xem chi tiết đơn hàng.
					</p>
					<div className='bg-gray-700 rounded-lg p-4 mb-6'>
						<div className='flex items-center justify-between mb-2'>
							<span className='text-sm text-gray-400'>Mã đơn hàng</span>
							<span className='text-sm font-semibold text-emerald-400'>
								#{orderDetails?.orderId || 'N/A'}
							</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-400'>Thời gian giao hàng dự kiến</span>
							<span className='text-sm font-semibold text-emerald-400'>3-5 ngày</span>
						</div>
					</div>

					<div className='space-y-4'>
						<button
							onClick={() => navigate('/')}
							className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center'
						>
							<HandHeart className='mr-2' size={18} />
							Cảm ơn bạn đã tin tưởng!
						</button>
						<Link
							to={"/"}
							className='w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center'
						>
							Tiếp tục mua sắm
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;
