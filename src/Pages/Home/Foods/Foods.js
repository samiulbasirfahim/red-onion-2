import React from "react"
import { NavLink, Outlet } from "react-router-dom"

const Foods = () => {
	return (
		<div>
			<div className="flex justify-center my-8">
				<NavLink
					style={({ isActive }) => {
						return isActive
							? { color: "red", borderBottom: "2px solid red" }
							: {}
					}}
					className="mx-6 text-2xl font-bold rounded-sm"
					to="/foods-breakfast"
				>
					Breakfast
				</NavLink>
				<NavLink
					style={({ isActive }) => {
						return isActive
							? { color: "red", borderBottom: "2px solid red" }
							: {}
					}}
					className="mx-6 text-2xl rounded-sm font-bold"
					to="/"
				>
					Lunch
				</NavLink>
				<NavLink
					style={({ isActive }) => {
						return isActive
							? { color: "red", borderBottom: "2px solid red" }
							: {}
					}}
					className="mx-6 text-2xl rounded-sm font-bold"
					to="/foods-dinner"
				>
					Dinner
				</NavLink>
			</div>
			<Outlet></Outlet>
		</div>
	)
}

export default Foods
