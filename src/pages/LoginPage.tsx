/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { loginUserThunk } from '../features/auth/authThunks';
import { NavLink, useNavigate } from 'react-router';
import { z } from 'zod';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../components/ui/form';
import { AtSign, Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { Input } from '../components/ui/input';

import { toggleShowPassword } from '../features/auth/showPasswordSlice.ts';
import { Button } from '../components/ui/button.tsx';
import { zodResolver } from '@hookform/resolvers/zod';

import { authImage, logo } from '../assets/index.ts';

const loginFormSchema = z.object({
	email: z
		.string({ message: 'Email wajib diisi!' })
		.email({ message: 'Format email tidak tepat!' })
		.toLowerCase(),
	password: z
		.string({ message: 'Password wajib diisi!' })
		.min(8, { message: 'Password minimal harus memiliki 8 karakter!' }),
});

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export default function Loginpage() {
	const { loading, error, success } = useSelector(
		(state: RootState) => state.login
	);

	const showPassword = useSelector(
		(state: RootState) => state.showPassword.showPassword
	);

	const dispatch = useDispatch<AppDispatch>();

	const form = useForm<LoginFormSchemaType>({
		resolver: zodResolver(loginFormSchema),
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (success) {
			Swal.fire({
				icon: 'success',
				title: 'Login Berhasil!',
				text: success,
				confirmButtonText: 'OK',
			}).then(() => {
				navigate('/homepage');
			});
		}

		if (error) {
			form.setValue('email', '');
			form.setValue('password', '');

			Swal.fire({
				icon: 'error',
				title: 'Login Gagal',
				text: error,
				confirmButtonText: 'OK',
			});
		}
	}, [success, error, navigate, form]);

	const handleUserLogin = (values: LoginFormSchemaType) => {
		const data = {
			email: values.email,
			password: values.password,
		};

		try {
			dispatch(loginUserThunk(data));
		} catch (error: any) {
			Swal.fire({
				icon: 'error',
				title: 'Gagal melakukan login!',
				text: error.message || 'Terjadi kesalahan pada server',
			});
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
			<div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden h-[600px]">
				<div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
					<div className="flex items-center justify-center">
						<img src={logo} alt="Logo" className="w-7 h-7 mr-2" />{' '}
						<h1 className="text-xl font-medium text-gray-900">SIMS PPOB</h1>
					</div>

					<h2 className="text-center text-2xl font-medium w-[18rem] mx-auto m-5">
						Masuk atau buat akun untuk memulai
					</h2>

					<FormProvider {...form}>
						<form onSubmit={form.handleSubmit(handleUserLogin)}>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="mb-4">
										<FormControl>
											<div className="relative">
												<span className="absolute inset-y-0 left-0 flex items-center pl-3">
													<AtSign className="h-5 w-5 text-gray-400" />{' '}
												</span>

												<Input
													type="email"
													{...field}
													placeholder="masukkan email anda"
													className="pl-10"
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="mb-4">
										<FormControl>
											<div className="relative">
												<span className="absolute inset-y-0 left-0 flex items-center pl-3">
													<LockKeyhole className="h-5 w-5 text-gray-400" />{' '}
												</span>

												<Input
													type={showPassword ? 'text' : 'password'}
													{...field}
													placeholder="buat password"
													className="pl-10"
												/>
												<Button
													variant="ghost"
													onClick={() => dispatch(toggleShowPassword())}
													className="absolute inset-y-0 right-0 px-3 cursor-pointer">
													{showPassword ? (
														<EyeOff className="h-5 w-5" />
													) : (
														<Eye className="h-5 w-5" />
													)}
												</Button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								disabled={loading}
								className="w-full mt-5 bg-red-600 cursor-pointer">
								{loading ? 'Sedang Login...' : 'Login'}
							</Button>
						</form>
					</FormProvider>

					<p className="text-center mt-5">
						Belum punya akun? registrasi{' '}
						<NavLink to="/" className="text-red-700">
							di sini
						</NavLink>
					</p>
				</div>

				{/* Bagian Gambar (Kanan) */}
				<div className="hidden md:block md:w-1/2 h-full">
					<img
						src={authImage}
						alt="Illustrasi Login"
						className="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>
	);
}
