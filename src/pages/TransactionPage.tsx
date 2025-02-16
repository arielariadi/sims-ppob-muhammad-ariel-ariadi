/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
	userBalanceThunk,
	userServicesThunk,
	userTransactionThunk,
} from '../features/home/homeThunks';
import { Button } from '../components/ui/button';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { ProfileSection } from '../components/ui/ProfileSection';
import { profilePhoto } from '../assets';
import { Input } from '../components/ui/input';

import { Banknote } from 'lucide-react';

export default function TransactionPage() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { serviceCode } = useParams<{ serviceCode: string }>();

	const { profile, balance, services, transaction, loading } = useSelector(
		(state: RootState) => state.home
	);

	useEffect(() => {
		if (services.length === 0) {
			dispatch(userServicesThunk());
		}
		dispatch(userBalanceThunk());
	}, [dispatch, services.length]);

	const selectedService = services.find(
		service => service.service_code === serviceCode
	);

	if (!selectedService) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<h1 className="text-2xl font-bold text-red-500">
					Layanan tidak ditemukan!
				</h1>
			</div>
		);
	}

	const handlePayment = async () => {
		if (!serviceCode) return;

		if (
			balance === null ||
			balance.balance < (selectedService.service_tariff || 0)
		) {
			Swal.fire({
				title: 'Saldo Tidak Cukup!',
				text: 'Pastikan saldo Anda mencukupi untuk melakukan transaksi.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
			return;
		}

		try {
			const result = await Swal.fire({
				title: 'Konfirmasi Pembayaran',
				text: `Apakah Anda yakin ingin membayar Rp ${selectedService.service_tariff.toLocaleString()}?`,
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, Bayar!',
				cancelButtonText: 'Batal',
			});

			if (result.isConfirmed) {
				await dispatch(userTransactionThunk(serviceCode)).unwrap();

				Swal.fire({
					title: 'Transaksi Berhasil!',
					text: `Invoice: ${transaction?.invoice_number}`,
					icon: 'success',
					confirmButtonText: 'OK',
				}).then(() => {
					navigate('/homepage');
				});
			}
		} catch (error: any) {
			Swal.fire({
				title: 'Error!',
				text: error || 'Terjadi kesalahan saat transaksi',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div className="min-h-screen">
			<div className="container mx-auto p-4">
				<ProfileSection
					profilePhoto={profilePhoto}
					profile={profile}
					balance={balance}
				/>

				<div className="p-6">
					<div>
						<h1 className="text-xl">Pembayaran</h1>
						<div className="flex items-center mt-2">
							<img
								src={selectedService.service_icon}
								alt={selectedService.service_name}
								className="w-8 h-8 "
							/>
							<p className="text-md font-semibold">
								{selectedService.service_name}
							</p>
						</div>
					</div>
					<div className="mt-8">
						<div className="relative">
							<span className="absolute inset-y-0 left-0 flex items-center pl-3">
								<Banknote className="h-5 w-5 text-gray-400" />{' '}
							</span>

							<Input
								value={selectedService.service_tariff.toLocaleString()}
								className="pl-10"
							/>
						</div>
						<Button
							variant="outline"
							onClick={handlePayment}
							className="w-full bg-red-600 cursor-pointer text-white mt-4">
							Bayar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
