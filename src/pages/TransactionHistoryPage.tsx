import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { profilePhoto } from '../assets';
import {
	userBalanceThunk,
	userProfileThunk,
} from '../features/home/homeThunks';

import { ProfileSection } from '../components/ui/ProfileSection';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../components/ui/card';
import { userTransactionHistoryThunk } from '../features/transaction-history/transactionHistoryThunks';
import { Button } from '../components/ui/button';
import { increaseOffset } from '../features/transaction-history/transactionHistorySlice';

export default function TransactionHistoryPage() {
	const dispatch = useDispatch<AppDispatch>();
	const { profile, balance, loading, error } = useSelector(
		(state: RootState) => state.home
	);

	const { transactionHistory, offset, limit } = useSelector(
		(state: RootState) => state.transactionHistory
	);

	useEffect(() => {
		dispatch(userProfileThunk());
		dispatch(userBalanceThunk());
		dispatch(userTransactionHistoryThunk({ offset: 0, limit: 5 }));
	}, [dispatch, limit]);

	const handleShowMore = () => {
		dispatch(increaseOffset());
		dispatch(userTransactionHistoryThunk({ offset: offset + limit, limit })); // Fetch data berikutnya
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="min-h-screen">
			<div className="container mx-auto p-4">
				<ProfileSection
					profilePhoto={profilePhoto}
					profile={profile}
					balance={balance}
				/>

				<div className="p-6">
					<h2 className="text-xl font-semibold mb-4">Semua Transaksi</h2>

					{transactionHistory.map(transaction => (
						<Card key={transaction.invoice_number} className="mb-4">
							<CardHeader className="flex flex-row justify-between pb-0">
								<CardTitle
									className={`text-2xl ${
										transaction.transaction_type === 'TOPUP'
											? 'text-green-500'
											: 'text-red-500'
									}`}>
									{transaction.transaction_type === 'TOPUP'
										? `+ Rp.${transaction.total_amount.toLocaleString()}`
										: `- Rp.${transaction.total_amount.toLocaleString()}`}
								</CardTitle>
								<CardDescription>{transaction.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-400">
									{new Date(transaction.created_on).toLocaleDateString(
										'id-ID',
										{
											day: '2-digit',
											month: 'long',
											year: 'numeric',
										}
									)}{' '}
									{new Date(transaction.created_on).toLocaleTimeString(
										'id-ID',
										{
											hour: '2-digit',
											minute: '2-digit',
											hour12: false,
										}
									)}{' '}
									WIB
								</p>
							</CardContent>
						</Card>
					))}

					<Button
						variant="ghost"
						onClick={handleShowMore}
						className="w-full text-red-600 mt-4 cursor-pointer text-md">
						Show more
					</Button>
				</div>
			</div>
		</div>
	);
}
