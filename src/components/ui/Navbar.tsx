import { NavLink } from 'react-router';
import { logo } from '../../assets';

export function Navbar() {
	return (
		<nav className="bg-white border-gray-200">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<NavLink
					to="/homepage"
					className="flex items-center space-x-3 rtl:space-x-reverse">
					<img src={logo} className="h-8" alt="SIMS PPOB Logo" />
					<span className="self-center text-2xl font-semibold whitespace-nowrap ">
						SIMS PPOB
					</span>
				</NavLink>
			</div>
		</nav>
	);
}
