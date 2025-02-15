import { Routes, Route } from 'react-router';
import RegisterPage from './pages/RegisterPage';
import Loginpage from './pages/LoginPage';

function App() {
	return (
		<Routes>
			<Route index element={<RegisterPage />} />
			<Route path="/login" element={<Loginpage />} />
		</Routes>
	);
}

export default App;
