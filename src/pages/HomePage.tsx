import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { profilePhoto } from '../assets';
import {
	userBalanceThunk,
	userBannersThunk,
	userProfileThunk,
	userServicesThunk,
} from '../features/home/homeThunks';

import { ProfileSection } from '../components/ui/ProfileSection';

export default function HomePage() {
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
				<ProfileSection
					profilePhoto={profilePhoto}
					profile={profile}
					balance={balance}
				/>

				{/* Services Section */}
				<div className="bg-white p-6 rounded-lg shadow-md mb-6">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-center gap-4">
						{services.map(service => (
							<div
								key={service.service_code}
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
						{banners.map(banner => (
							<>
								<img
									key={banner.banner_name}
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
