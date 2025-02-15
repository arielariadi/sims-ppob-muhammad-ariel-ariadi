import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { NavLink, Outlet } from 'react-router';

export default function ProtectedRoute() {
	const { userInfo } = useSelector((state: RootState) => state.login);

	if (!userInfo) {
		return (
			<div className="flex flex-col justify-center items-center min-h-screen">
				<h1 className="text-4xl font-bold text-red-500">Unauthorized :(</h1>
				<p className="text-gray-600 mt-2">
					Oops! Kamu harus login terlebih dahulu!
				</p>

				<NavLink
					to="/login"
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
					Login Sekarang
				</NavLink>
			</div>
		);
	}

	return <Outlet />;
}
