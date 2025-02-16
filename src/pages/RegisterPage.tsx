/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { registerUserThunk } from '../features/auth/authThunks';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';

import Swal from 'sweetalert2';

import { NavLink } from 'react-router';

import { AtSign, LockKeyhole, User, Eye, EyeOff } from 'lucide-react';
import { authImage, logo } from '../assets/index.ts';
import {
	toggleShowConfirmPassword,
	toggleShowPassword,
} from '../features/auth/showPasswordSlice.ts';

const registerFormSchema = z
	.object({
		email: z
			.string({ message: 'Email wajib diisi!' })
			.email({ message: 'Format email tidak tepat!' })
			.toLowerCase(),
		firstName: z
			.string({ message: 'Nama depan wajib diisi!' })
			.min(3, { message: 'Nama depan minimal harus memiliki 3 karakter!' }),
		lastName: z
			.string({ message: 'Nama belakang wajib diisi!' })
			.min(3, { message: 'Nama belakang minimal harus memiliki 3 karakter!' }),
		password: z
			.string({ message: 'Password wajib diisi!' })
			.min(8, { message: 'Password minimal harus memiliki 8 karakter!' }),
		confirmPassword: z.string({ message: 'Konfirmasi password wajib diisi!' }),
	})
	.superRefine((arg, ctx) => {
		if (arg.password !== arg.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				path: ['confirmPassword'],
				message: 'Password tidak sama!',
			});
		}
	});

type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
	const { loading, error, success } = useSelector(
		(state: RootState) => state.registration
	);

	const showPassword = useSelector(
		(state: RootState) => state.showPassword.showPassword
	);

	const showConfirmPassword = useSelector(
		(state: RootState) => state.showPassword.showConfirmPassword
	);

	const dispatch = useDispatch<AppDispatch>();

	const form = useForm<RegisterFormSchemaType>({
		resolver: zodResolver(registerFormSchema),
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (success) {
			Swal.fire({
				icon: 'success',
				title: 'Registrasi Berhasil!',
				text: success,
				confirmButtonText: 'OK',
			}).then(() => {
				navigate('/login');
			});
		}

		if (error) {
			form.setValue('email', '');
			form.setValue('firstName', '');
			form.setValue('lastName', '');
			form.setValue('password', '');
			form.setValue('confirmPassword', '');

			Swal.fire({
				icon: 'error',
				title: 'Registrasi Gagal',
				text: error,
				confirmButtonText: 'OK',
			});
		}
	}, [success, error, navigate, form]);

	const handleUserRegister = (values: RegisterFormSchemaType) => {
		const data = {
			email: values.email,
			first_name: values.firstName,
			last_name: values.lastName,
			password: values.password,
		};

		try {
			dispatch(registerUserThunk(data));
		} catch (error: any) {
			Swal.fire({
				icon: 'error',
				title: 'Gagal melakukan registrasi!',
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

					<h2 className="text-center text-2xl font-medium w-[20rem] mx-auto m-5">
						Lengkapi data untuk membuat akun
					</h2>

					<FormProvider {...form}>
						<form onSubmit={form.handleSubmit(handleUserRegister)}>
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
								name="firstName"
								render={({ field }) => (
									<FormItem className="mb-4">
										<FormControl>
											<div className="relative">
												<span className="absolute inset-y-0 left-0 flex items-center pl-3">
													<User className="h-5 w-5 text-gray-400" />{' '}
												</span>

												<Input
													type="text"
													{...field}
													placeholder="nama depan"
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
								name="lastName"
								render={({ field }) => (
									<FormItem className="mb-4">
										<FormControl>
											<div className="relative">
												<span className="absolute inset-y-0 left-0 flex items-center pl-3">
													<User className="h-5 w-5 text-gray-400" />{' '}
												</span>

												<Input
													type="text"
													{...field}
													placeholder="nama belakang"
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
													type="button"
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

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem className="mb-6">
										<FormControl>
											<div className="relative">
												<span className="absolute inset-y-0 left-0 flex items-center pl-3">
													<LockKeyhole className="h-5 w-5 text-gray-400" />{' '}
												</span>

												<Input
													type={showConfirmPassword ? 'text' : 'password'}
													{...field}
													placeholder="konfirmasi password"
													className="pl-10"
												/>
												<Button
													variant="ghost"
													type="button"
													onClick={() => dispatch(toggleShowConfirmPassword())}
													className="absolute inset-y-0 right-0 px-3 cursor-pointer">
													{showConfirmPassword ? (
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
								{loading ? 'Registering...' : 'Register'}
							</Button>
						</form>
					</FormProvider>

					<p className="text-center mt-5">
						Sudah punya akun? login{' '}
						<NavLink to="/login" role="button" className="text-red-700">
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
