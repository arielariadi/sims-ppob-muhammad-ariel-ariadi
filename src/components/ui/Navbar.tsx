import { NavLink } from 'react-router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { logo } from '../../assets';

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="bg-white border-b border-gray-200 shadow-md">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<NavLink to="/homepage" className="flex items-center space-x-3">
					<img src={logo} className="h-8" alt="SIMS PPOB Logo" />
					<span className="text-2xl font-semibold">SIMS PPOB</span>
				</NavLink>

				{/* Menu untuk desktop */}
				<div className="hidden md:flex space-x-6">
					<NavLink
						to="/topup"
						className={({ isActive }) =>
							`text-lg font-medium px-3 py-2 rounded-md transition-colors ${
								isActive ? 'text-red-600' : 'text-gray-700 hover:text-blue-500'
							}`
						}>
						Top Up
					</NavLink>
					<NavLink
						to="/transaction-history"
						className={({ isActive }) =>
							`text-lg font-medium px-3 py-2 rounded-md transition-colors ${
								isActive ? 'text-red-600' : 'text-gray-700 hover:text-blue-500'
							}`
						}>
						Transaction
					</NavLink>
					<NavLink
						to="/akun"
						className={({ isActive }) =>
							`text-lg font-medium px-3 py-2 rounded-md transition-colors ${
								isActive ? 'text-red-600' : 'text-gray-700 hover:text-blue-500'
							}`
						}>
						Akun
					</NavLink>
				</div>

				{/* Button untuk membuka menu di mobile */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none">
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{isOpen && (
				<div className="md:hidden space-y-2 p-4 border-t border-gray-200">
					<NavLink
						to="/topup"
						className={({ isActive }) =>
							`block text-lg font-medium px-3 py-2 rounded-md ${
								isActive ? 'text-red-600' : 'text-gray-700 hover:text-blue-500'
							}`
						}>
						Top Up
					</NavLink>
					<NavLink
						to="/transaction"
						className={({ isActive }) =>
							`block text-lg font-medium px-3 py-2 rounded-md ${
								isActive ? 'text-red-600' : 'text-gray-700 hover:text-blue-500'
							}`
						}>
						Transaction
					</NavLink>
					<NavLink
						to="/akun"
						className={({ isActive }) =>
							`block text-lg font-medium px-3 py-2 rounded-md ${
								isActive ? 'text-red-600' : 'text-gray-700 hover:text-blue-500'
							}`
						}>
						Akun
					</NavLink>
				</div>
			)}
		</nav>
	);
}
