import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [address, setAddress] = useState("");
	const checkUser = localStorage.getItem("token");
	const navigate = useNavigate();

	useEffect(() => {
		if (checkUser !== null) {
			navigate("/dashboard");
		}
	}, [checkUser]);

	const nameChangeHandler = (event) => {
		setName(event.target.value);
	};

	const emailChangeHandler = (event) => {
		setEmail(event.target.value);
	};

	const passwordChangeHandler = (event) => {
		setPassword(event.target.value);
	};

	const phoneNoChangeHandler = (event) => {
		setPhoneNo(event.target.value);
	};

	const addressChangeHandler = (event) => {
		setAddress(event.target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (
			name !== "" &&
			email !== "" &&
			password !== "" &&
			phoneNo !== "" &&
			address !== ""
		) {
			const url = "http://localhost:3000/users/signin";
			const userData = {
				name: name,
				email: email,
				password: password,
				phoneNo: phoneNo,
				address: address,
			};
			axios
				.post(url, userData)
				.then((res) => {
					if (res.status === 200) {
						localStorage.setItem("token", res.data.token);
						navigate("/dashboard");
						toast.success("Login Successfully");
					}
				})
				.catch((err) => {
					let obj = JSON.parse(JSON.stringify(err));
					if (obj.status === 400) {
						toast.error("Something Went Wrong. Please Try Later.");
					}
				});
		} else {
			toast.error("Please Fill all the Input Fields First.");
		}
	};

	return (
		<div className="signin_container">
			<div className="signin_form">
				<div className="signin_inputfield">
					<h1 className="signin_title">Sign In</h1>
				</div>
				<form onSubmit={submitHandler}>
					<div className="signin_inputfield">
						<label className="signin_label">Name</label>
						<input
							type="text"
							placeholder="Enter Name"
							name="name"
							className="signin_input"
							onChange={nameChangeHandler}
							value={name}
						/>
					</div>
					<div className="signin_inputfield">
						<label className="signin_label">Email</label>
						<input
							type="email"
							placeholder="Enter Email"
							name="email"
							className="signin_input"
							onChange={emailChangeHandler}
							value={email}
						/>
					</div>
					<div className="signin_inputfield">
						<label className="signin_label">Password</label>
						<input
							type="password"
							minLength={8}
							placeholder="Enter Password"
							name="password"
							className="signin_input"
							onChange={passwordChangeHandler}
							value={password}
						/>
					</div>
					<div className="signin_inputfield">
						<label className="signin_label">Phone Number</label>
						<input
							type="tel"
							placeholder="e.g. 03331234567"
							name="phoneNo"
							className="signin_input"
							pattern="((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})"
							onChange={phoneNoChangeHandler}
							value={phoneNo}
						/>
					</div>
					<div className="signin_inputfield">
						<label className="signin_label">Address</label>
						<input
							type="text"
							placeholder="Enter Address"
							name="address"
							className="signin_input"
							onChange={addressChangeHandler}
							value={address}
						/>
					</div>
					<div className="signin_inputfield signin_btn">
						<button type="submit" className="signin_inBtn">
							Sign In
						</button>
					</div>
				</form>
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

export default SignIn;
