/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { profilePhoto } from '../assets';
import {
	userBalanceThunk,
	userProfileThunk,
} from '../features/home/homeThunks';
import { ProfileSection } from '../components/ui/ProfileSection';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Keyboard } from 'lucide-react';
import { setAmount, resetTopUpState } from '../features/top-up/topUpSlice';
import { userTopUpThunk } from '../features/top-up/topUpThunks';

import Swal from 'sweetalert2';

export default function TopUpPage() {
	const dispatch = useDispatch<AppDispatch>();

	const { profile, balance, loading } = useSelector(
		(state: RootState) => state.home
	);

	const {
		amount,
		disabled,
		success,
		error: topUpError,
	} = useSelector((state: RootState) => state.topUp);

	useEffect(() => {
		dispatch(userProfileThunk());
		dispatch(userBalanceThunk());
	}, [dispatch]);

	const handleAmountClick = (value: number) => {
		dispatch(setAmount(value));
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value) || 0;
		dispatch(setAmount(value));
	};

	const handleTopUp = async () => {
		if (amount < 10000) {
			Swal.fire({
				title: 'Error!',
				text: 'Minimum nominal Top Up adalah Rp 10.000.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
			return; // Stop eksekusi jika nominal tidak valid
		}

		if (amount > 1000000) {
			Swal.fire({
				title: 'Error!',
				text: 'Maksimum nominal Top Up adalah Rp 1.000.000.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
			return; // Stop eksekusi jika nominal tidak valid
		}

		try {
			const result = await Swal.fire({
				title: 'Konfirmasi Top Up',
				text: `Anda yakin ingin melakukan top up sebesar Rp ${amount.toLocaleString()}?`,
				icon: 'question',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, Top Up!',
				cancelButtonText: 'Cancel',
			});

			if (result.isConfirmed) {
				await dispatch(userTopUpThunk({ top_up_amount: amount })).unwrap();
				await dispatch(userBalanceThunk());
				dispatch(resetTopUpState());

				Swal.fire({
					title: 'Success!',
					text: 'Top Up berhasil dilakukan',
					icon: 'success',
					confirmButtonText: 'OK',
				});
			}
		} catch (error: any) {
			Swal.fire({
				title: 'Error!',
				text:
					error.message ||
					'Terjadi kesalahan saat melakukan top up. Silakan coba lagi.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="container mx-auto p-4">
				<ProfileSection
					profilePhoto={profilePhoto}
					profile={profile}
					balance={balance}
				/>

				<div className="p-6 ">
					<div>
						<h1 className="text-xl">Silahkan masukan</h1>
						<p className="text-3xl font-bold">Nominal Top Up</p>
					</div>
				</div>

				<div className="p-6 flex flex-col md:flex-row gap-5">
					<div className="w-full md:w-3/5 space-y-4">
						<div className="relative">
							<span className="absolute inset-y-0 left-0 flex items-center pl-3">
								<Keyboard className="h-5 w-5 text-gray-400" />
							</span>

							<Input
								type="number"
								placeholder="Masukkan nominal Top Up"
								value={amount || ''}
								onChange={handleInputChange}
								className="pl-10"
							/>
						</div>
						<Button
							onClick={handleTopUp}
							disabled={disabled}
							className="w-full bg-red-600 cursor-pointer">
							Top Up
						</Button>
						{success && <p className="text-green-500 mt-2">{success}</p>}
						{topUpError && <p className="text-red-500 mt-2">{topUpError}</p>}
					</div>

					<div className="w-full md:w-2/5 space-y-2 grid grid-cols-1 md:grid-cols-3 gap-2">
						{[10000, 20000, 50000, 100000, 250000, 500000].map(value => (
							<Button
								key={value}
								variant="outline"
								onClick={() => handleAmountClick(value)}
								className="w-full">
								Rp{value.toLocaleString()}
							</Button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
