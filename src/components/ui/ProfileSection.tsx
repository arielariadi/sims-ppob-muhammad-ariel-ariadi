import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { toggleShowBalance } from '../../features/home/showBalanceSlice';
import { UserBalanceType, UserProfileType } from '../../features/home/Types';

type ProfileSectionProps = {
	profilePhoto: string;
	profile: UserProfileType | null;
	balance: UserBalanceType | null;
};

export function ProfileSection({
	profilePhoto,
	profile,
	balance,
}: ProfileSectionProps) {
	const showBalance = useSelector(
		(state: RootState) => state.showBalance.showBalance
	);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className="p-6 rounded-lg mb-6">
			<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
				<div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
					<img
						src={profilePhoto}
						alt={profile?.first_name}
						className="w-24 h-24 rounded-full object-cover shadow-md"
					/>
					<h1 className="text-xl text-gray-600 font-medium mt-3">
						Selamat datang,
					</h1>
					<h2 className="text-3xl font-bold">
						{profile?.first_name} {profile?.last_name}
					</h2>
				</div>

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
							{showBalance ? <p>Tutup saldo</p> : <p>Lihat saldo</p>}
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
	);
}
