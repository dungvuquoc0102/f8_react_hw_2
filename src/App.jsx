import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeLayout from "./layouts/HomeLayout";
import TodoPage from "./pages/TodoPage";

function App() {
	const [count, setCount] = useState(0);

	return (
		<Routes>
			<Route path="/" element={<HomeLayout />}>
				<Route index element={<TodoPage />} />
			</Route>
		</Routes>
	);
}

export default App;
