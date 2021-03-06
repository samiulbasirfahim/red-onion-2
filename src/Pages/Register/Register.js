import React, { useState } from "react"
import SocialLogin from "../../Shared/Social-Login/SocialLogin"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import logo from "../../assets/logo/logo2.png"
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification,
	updateProfile,
} from "firebase/auth"
import auth from "../../firebase.init"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Register = () => {
	const notify = (text) => toast(text)
	const [showPass, setShowPass] = useState(false)
	const [showConfirmPass, setShowConfirmPass] = useState(false)
	const location = useLocation()
	const from = location.state?.from?.pathname || "/"
	const [user, setUser] = useState()
	const navigate = useNavigate()

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUser(user)
		} else {
			setUser(null)
		}
	})
	if (user) {
		navigate(from, { replace: true })
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const name = event.target.name.value
		const email = event.target.email.value
		const password = event.target.password.value
		const confirmPassword = event.target.confirmPassword.value
		if (password !== confirmPassword) {
			return notify('password mismatch')
		}
		createUserWithEmailAndPassword(auth, email, password)
			.then((user) => {
				sendEmailVerification(auth.currentUser)
					.then(() => alert("email verification send"))
					.catch((error) => console.log(error))
				updateProfile(auth.currentUser, {
					displayName: name,
				})
			})
			.catch((error) => notify(error.message))
	}

	return (
		<div>
			<ToastContainer />

			<div className="flex flex-col items-center min-h-[100vh]">
				<form
					className="flex flex-col w-[560px]"
					onSubmit={handleSubmit}
				>
					<img
						className="mt-16 mb-8 mx-auto"
						src={logo}
						width={"200px"}
						height={"200px"}
						alt=""
					/>
					<p className="text-center mb-6 text-4xl text-red-600">
						Register
					</p>
					<input
						className="w-full focus:outline-none bg-slate-100  mb-4 h-16 pl-2 rounded-lg"
						type="text"
						name="name"
						placeholder="Full name"
						id="name"
						required
					/>
					<input
						className="w-full focus:outline-none bg-slate-100  mb-4 h-16 pl-2 rounded-lg"
						type="email"
						name="email"
						placeholder="Email"
						id="email"
						required
					/>
					<p className="relative flex items-center mb-4">
						<input
							className="w-full block focus:outline-none bg-slate-100 h-16 pl-2 rounded-lg"
							type={!showPass ? "password" : "text"}
							placeholder="Password"
							name="password"
							id="password"
							required
						/>
						<span className="absolute right-5">
							{!showPass ? (
								<AiFillEyeInvisible
									size={"1.5em"}
									onClick={() => setShowPass(true)}
								/>
							) : (
								<AiFillEye
									size={"1.5em"}
									onClick={() => setShowPass(false)}
								/>
							)}
						</span>
					</p>
					<p className="relative flex items-center mb-4">
						<input
							className="w-full block focus:outline-none bg-slate-100 h-16 pl-2 rounded-lg"
							type={!showConfirmPass ? "password" : "text"}
							name="confirmPassword"
							id="conf-pass"
							placeholder="Confirm password"
						/>
						<span className="absolute right-5">
							{!showConfirmPass ? (
								<AiFillEyeInvisible
									size={"1.5em"}
									onClick={() => setShowConfirmPass(true)}
								/>
							) : (
								<AiFillEye
									size={"1.5em"}
									onClick={() => setShowConfirmPass(false)}
								/>
							)}
						</span>
					</p>
					<input
						className="cursor-pointer bg-red-600 rounded my-4 h-16 text-2xl text-white"
						type="submit"
						value="Register"
					/>
				</form>
				<Link className="text-red-600" to="/login">
					Already have an account?
				</Link>
				<div className="w-[560px]">
					<SocialLogin></SocialLogin>
				</div>
			</div>
		</div>
	)
}

export default Register
