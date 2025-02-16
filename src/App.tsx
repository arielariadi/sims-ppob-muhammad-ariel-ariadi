import { Routes, Route } from 'react-router';
import RegisterPage from './pages/RegisterPage';
import Loginpage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './routing/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import TopUpPage from './pages/TopUpPage';
import TransactionPage from './pages/TransactionPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import AccountPage from './pages/AccountPage';

function App() {
	return (
		<Routes>
			<Route index element={<RegisterPage />} />
			<Route path="/login" element={<Loginpage />} />

			<Route element={<ProtectedRoute />}>
				<Route path="/homepage" element={<HomePage />} />
				<Route path="/pembayaran/:serviceCode" element={<TransactionPage />} />
				<Route
					path="/transaction-history"
					element={<TransactionHistoryPage />}
				/>
				<Route path="/topup" element={<TopUpPage />} />
				<Route path="/akun" element={<AccountPage />} />
			</Route>

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
