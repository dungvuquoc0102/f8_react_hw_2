import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default HomeLayout;
