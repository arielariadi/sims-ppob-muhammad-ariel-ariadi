import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
	userProfileThunk,
	userBalanceThunk,
	userServicesThunk,
	userBannersThunk,
} from '../features/home/homeThunks';
import { profilePhoto } from '../assets';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../components/ui/card';

import { toggleShowBalance } from '../features/home/showBalanceSlice';

import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function HomePage() {
	const showBalance = useSelector(
		(state: RootState) => state.showBalance.showBalance
	);

	const dispatch = useDispatch<AppDispatch>();
	const { profile, balance, services, banners, loading, error } = useSelector(
		(state: RootState) => state.home
	);

	useEffect(() => {
		dispatch(userProfileThunk());
		dispatch(userBalanceThunk());
		dispatch(userServicesThunk());
		dispatch(userBannersThunk());
	}, [dispatch]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="container mx-auto p-4">
				<div className="bg-white p-6 rounded-lg shadow-md mb-6">
					<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
						{/* Bagian Profil */}
						<div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
							<img
								src={profilePhoto}
								alt={profile?.first_name}
								className="w-24 h-24 rounded-full object-cover shadow-md"
							/>
							<h1 className="text-md text-gray-600 font-medium mt-3">
								Selamat datang,
							</h1>
							<h2 className="text-2xl font-bold">
								{profile?.first_name} {profile?.last_name}
							</h2>
						</div>

						{/* Bagian Saldo */}
						<div className="w-full md:w-1/2">
							<Card className="text-white bg-red-500 shadow-none border-none">
								<CardHeader>
									<CardTitle>Saldo Anda</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="font-bold text-2xl">
										Your balance: Rp{' '}
										{showBalance ? balance?.toLocaleString() : '*******'}
									</p>
								</CardContent>
								<CardFooter className="flex items-center">
									<p>Lihat saldo</p>
									<Button
										variant="ghost"
										onClick={() => dispatch(toggleShowBalance())}
										className="cursor-pointer hover:bg-transparent w-1">
										{showBalance ? (
											<EyeOff className="w-5 h-5" />
										) : (
											<Eye className="w-5 h-5" />
										)}
									</Button>
								</CardFooter>
							</Card>
						</div>
					</div>
				</div>

				{/* Services Section */}
				<div className="bg-white p-6 rounded-lg shadow-md mb-6">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-center gap-4">
						{services.map((service, index) => (
							<div
								key={index + 1}
								className="text-center mx-auto md:w-24 md:h-24">
								<img
									src={service.service_icon}
									alt={service.service_code}
									className="mx-auto h-10 w-10"
								/>
								<p className="mt-2 text-sm">{service.service_name}</p>
							</div>
						))}
					</div>
				</div>

				{/* Banner Section */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-bold mb-4">Temukan Promosi Menarik</h2>
					<div className="flex overflow-x-auto space-x-4">
						{banners.map((banner, index) => (
							<>
								<img
									key={index + 1}
									src={banner.banner_image}
									alt={banner.banner_name}
									className="h-40 rounded-lg"
								/>
							</>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
