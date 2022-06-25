import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
	const [details, setDetails] = useState({});
	const navigate = useNavigate();
	const checkUser = localStorage.getItem("token");

	const getData = () => {
		if (checkUser !== null) {
			const data = jwt_decode(checkUser);
			const url = `http://localhost:3000/users/dashboard/${data?.email}`;
			console.log(url);
			axios
				.get(url)
				.then((res) => setDetails(res.data))
				.catch((err) => {
					const obj = JSON.parse(JSON.stringify(err));
					if (obj.status === 404) {
						toast.error("Something went wrong. Please try later.");
					}
				});
		}
	};

	useEffect(() => {
		if (checkUser !== null) {
			getData();
		} else {
			navigate("/");
		}
	}, [checkUser]);

	return (
		<div className="dashboard_container">
			<div className="dashboard_form">
				<div className="dashboard_inputfield">
					<h1 className="dashboard_title">Dashboard</h1>
				</div>
				<div className="dashboard_inputfield">
					<label className="dashboard_label">Name</label>
					<p className="dashboard_values">{details.name}</p>
				</div>
				<div className="dashboard_inputfield">
					<label className="dashboard_label">Email</label>
					<p className="dashboard_values">{details.email}</p>
				</div>
				<div className="dashboard_inputfield">
					<label className="dashboard_label">Password</label>
					<p className="dashboard_values">{details.password}</p>
				</div>
				<div className="dashboard_inputfield">
					<label className="dashboard_label">Phone Number</label>
					<p className="dashboard_values">{details.phoneNo}</p>
				</div>
				<div className="dashboard_inputfield">
					<label className="dashboard_label">Address</label>
					<p className="dashboard_values">{details.address}</p>
				</div>
				<div className="dashboard_inputfield dashboard_btn">
					<NavLink exact to="/">
						<button
							className="dashboard_inBtn"
							onClick={() => localStorage.removeItem("token")}
						>
							Logout
						</button>
					</NavLink>
				</div>
			</div>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				className="notify"
				style={{ width: "50rem" }}
			/>
		</div>
	);
};

export default Dashboard;
