import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";
import { useState } from "react";

const CartPage = () => {
	const { cart } = useCartStore();
	const [shippingAddress, setShippingAddress] = useState({
		fullName: "",
		phoneNumber: "",
		address: "",
		city: "",
		state: "",
		postalCode: "",
		country: "Việt Nam"
	});

	const handleShippingAddressChange = (e) => {
		const { name, value } = e.target;
		setShippingAddress(prev => ({
			...prev,
			[name]: value
		}));
	};

	return (
		<div className='py-8 md:py-16'>
			<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
				<div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
					<motion.div
						className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className='space-y-6'>
								{cart.map((item) => (
									<CartItem key={item._id} item={item} />
								))}
							</div>
						)}
						{cart.length > 0 && <PeopleAlsoBought />}
					</motion.div>

					{cart.length > 0 && (
						<motion.div
							className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<ShippingAddressForm 
								shippingAddress={shippingAddress}
								onChange={handleShippingAddressChange}
							/>
							<OrderSummary shippingAddress={shippingAddress} />
							<GiftCouponCard />
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};

const ShippingAddressForm = ({ shippingAddress, onChange }) => {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<h2 className="text-lg font-semibold mb-4 text-gray-800">Thông tin giao hàng</h2>
			<div className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Họ và tên
						</label>
						<input
							type="text"
							name="fullName"
							value={shippingAddress.fullName}
							onChange={onChange}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Số điện thoại
						</label>
						<input
							type="tel"
							name="phoneNumber"
							value={shippingAddress.phoneNumber}
							onChange={onChange}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
							required
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Địa chỉ
					</label>
					<input
						type="text"
						name="address"
						value={shippingAddress.address}
						onChange={onChange}
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
						required
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Thành phố
						</label>
						<input
							type="text"
							name="city"
							value={shippingAddress.city}
							onChange={onChange}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Quận/Huyện
						</label>
						<input
							type="text"
							name="state"
							value={shippingAddress.state}
							onChange={onChange}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Mã bưu điện
						</label>
						<input
							type="text"
							name="postalCode"
							value={shippingAddress.postalCode}
							onChange={onChange}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
							required
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className='flex flex-col items-center justify-center space-y-4 py-16'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<ShoppingCart className='h-24 w-24 text-gray-300' />
		<h3 className='text-2xl font-semibold '>Your cart is empty</h3>
		<p className='text-gray-400'>Looks like you {"haven't"} added anything to your cart yet.</p>
		<Link
			className='mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600'
			to='/'
		>
			Start Shopping
		</Link>
	</motion.div>
);
