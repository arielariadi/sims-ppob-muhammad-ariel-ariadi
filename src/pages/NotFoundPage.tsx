import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

export default function NotFoundPage() {
	const [userToken, setUserToken] = useState<string | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('userToken');
		setUserToken(token);
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center">
			<h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
			<p className="text-gray-600 mt-2">
				Oops! Halaman yang Anda cari tidak ditemukan.
			</p>

			<NavLink
				to={userToken ? '/homepage' : '/'}
				className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
				{userToken ? 'Kembali ke Homepage' : 'Kembali ke Registrasi'}
			</NavLink>
		</div>
	);
}
