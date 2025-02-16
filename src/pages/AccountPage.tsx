/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { userProfileThunk } from '../features/home/homeThunks';
import { userUpdateUserProfileThunk } from '../features/account/accountThunks';
import { logout } from '../features/auth/logoutSlice';
import { userUploadProfileImageThunk } from '../features/account/accountThunks';
import Swal from 'sweetalert2';
import { profilePhoto } from '../assets';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

import { AtSign, Pencil, User } from 'lucide-react';

const accountSchema = z.object({
	first_name: z.string().min(1, 'Nama depan harus diisi'),
	last_name: z.string().min(1, 'Nama belakang harus diisi'),
});

type AccountFormType = z.infer<typeof accountSchema>;

export default function AccountPage() {
	const dispatch = useDispatch<AppDispatch>();
	const { profile, loading } = useSelector((state: RootState) => state.home);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isEditing, setIsEditing] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		dispatch(userProfileThunk());
	}, [dispatch]);

	const form = useForm<AccountFormType>({
		resolver: zodResolver(accountSchema),
		defaultValues: {
			first_name: profile?.first_name || '',
			last_name: profile?.last_name || '',
		},
	});

	// Mengupdate nilai input ketika profil berhasil dimuat
	useEffect(() => {
		if (profile) {
			form.setValue('first_name', profile.first_name);
			form.setValue('last_name', profile.last_name);
		}
	}, [profile, form]);

	const handleUpdateProfile = async (data: AccountFormType) => {
		if (
			data.first_name === profile?.first_name &&
			data.last_name === profile?.last_name
		) {
			Swal.fire(
				'Tidak Ada Perubahan',
				'Silakan ubah data terlebih dahulu.',
				'info'
			);
			return;
		}

		try {
			await dispatch(userUpdateUserProfileThunk(data)).unwrap();
			Swal.fire('Berhasil', 'Data akun berhasil diperbarui.', 'success');
			dispatch(userProfileThunk());
			setIsEditing(false);
		} catch (error: any) {
			Swal.fire({
				icon: 'error',
				title: 'Gagal melakukan update profile!',
				text: error.message || 'Terjadi kesalahan pada server',
			});
		}
	};

	const handleImageChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];

		if (file) {
			const validTypes = ['image/jpeg', 'image/png'];
			if (!validTypes.includes(file.type)) {
				Swal.fire(
					'Format Tidak Didukung',
					'Hanya JPEG/PNG diperbolehkan.',
					'error'
				);
				return;
			}

			if (file.size > 100 * 1024) {
				Swal.fire('Ukuran Terlalu Besar', 'Maksimal 100 KB.', 'error');
				return;
			}

			setSelectedFile(file);

			await handleUploadImage(file);
		}
	};

	const handleUploadImage = async (file: File) => {
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);

		try {
			await dispatch(userUploadProfileImageThunk(formData)).unwrap();
			Swal.fire('Berhasil', 'Foto profil berhasil diperbarui.', 'success');
			dispatch(userProfileThunk());
		} catch (error: any) {
			Swal.fire(
				'Error',
				error.message || 'Terjadi kesalahan saat mengunggah gambar.',
				'error'
			);
		}
	};

	const handleEditPhotoClick = () => {
		fileInputRef.current?.click();
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		form.reset();
	};

	const handleLogout = () => {
		dispatch(logout());
		Swal.fire(
			'Logout Berhasil',
			'Anda telah keluar dari akun.',
			'success'
		).then(() => {
			window.location.href = '/login';
		});
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
			<div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg w-full text-center">
				<div className="relative w-32 h-32 mx-auto">
					<img
						src={profile?.profile_image || profilePhoto}
						alt="Profile"
						onError={e => (e.currentTarget.src = profilePhoto)}
						className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
					/>

					{/* Input file yang tersembunyi */}
					<input
						type="file"
						accept="image/jpeg, image/png"
						onChange={handleImageChange}
						ref={fileInputRef}
						className="hidden"
					/>

					<Button
						onClick={handleEditPhotoClick}
						variant="ghost"
						className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 cursor-pointer">
						<Pencil className="w-5 h-5 text-gray-600" />
					</Button>
				</div>

				<h1 className="text-3xl font-medium mt-2">
					{profile?.first_name} {profile?.last_name}
				</h1>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleUpdateProfile)}
						className="mt-6 text-left space-y-4">
						<div className="space-y-2">
							<FormLabel>Email</FormLabel>
							<div className="relative">
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<AtSign className="h-5 w-5 text-gray-400" />
								</span>

								<Input
									value={profile?.email || ''}
									disabled
									className="pl-10 bg-gray-100 cursor-not-allowed"
								/>
							</div>
						</div>
						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama Depan</FormLabel>
									<FormControl>
										<div className="relative">
											<span className="absolute inset-y-0 left-0 flex items-center pl-3">
												<User className="h-5 w-5 text-gray-400" />
											</span>

											<Input
												type="text"
												{...field}
												className="pl-10"
												disabled={!isEditing}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="last_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama Belakang</FormLabel>
									<FormControl>
										<div className="relative">
											<span className="absolute inset-y-0 left-0 flex items-center pl-3">
												<User className="h-5 w-5 text-gray-400" />{' '}
											</span>

											<Input
												type="text"
												{...field}
												className="pl-10"
												disabled={!isEditing}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{isEditing ? (
							<div className="flex flex-col gap-6">
								<Button
									type="submit"
									variant="outline"
									className="w-full text-red-600 cursor-pointer border border-red-600">
									Simpan
								</Button>
								<Button
									type="button"
									onClick={handleCancel}
									className="w-full bg-red-600 text-white cursor-pointer">
									Batalkan
								</Button>
							</div>
						) : (
							<Button
								type="button"
								variant="outline"
								onClick={handleEdit}
								className="w-full text-red-600 cursor-pointer border border-red-600">
								Edit Profile
							</Button>
						)}
					</form>
				</Form>

				{!isEditing && (
					<div className="mt-6">
						<Button
							onClick={handleLogout}
							className="w-full bg-red-500 text-white cursor-pointer">
							Logout
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
