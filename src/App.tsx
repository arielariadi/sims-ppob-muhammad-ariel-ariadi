import { Routes, Route } from 'react-router';
import RegisterPage from './pages/RegisterPage';
import Loginpage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
	return (
		<Routes>
			<Route index element={<RegisterPage />} />
			<Route path="/login" element={<Loginpage />} />
			<Route path="/homepage" element={<HomePage />} />
		</Routes>
	);
}

export default App;
