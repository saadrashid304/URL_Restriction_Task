import { Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";
import Dashboard from "./Components/Dashboard/Dashboard";

const App = () => {
	return (
		<div>
			<Routes>
				<Route exact path="/" element={<SignIn />} />
				<Route exact path="/dashboard" element={<Dashboard />} />
			</Routes>
		</div>
	);
};

export default App;
