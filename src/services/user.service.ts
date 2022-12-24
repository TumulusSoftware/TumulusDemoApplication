import { authHeader } from "@/_helpers/authHeader";
import { handleResponse } from "@/_helpers/handleResponse";
import { User } from "@/interfaces/user";

export function login(emailAsId: string, password: string) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ emailAsId, password }),
	};

	return fetch(`${process.env.VUE_APP_API_BASE_URL}/user/authenticate`, requestOptions)
		.then(handleResponse)
		.then((user) => {
			// login successful if there's a jwt token in the response
			if (user.token) {
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem("user", JSON.stringify(user));
			}

			return user;
		});
}

export function register(user: User) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	};

	return fetch(`${process.env.VUE_APP_API_BASE_URL}/user/register`, requestOptions)
		.then(handleResponse)
		.then((user) => {
			// login successful if there's a jwt token in the response
			if (user.token) {
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem("user", JSON.stringify(user));
			}

			return user;
		});
}

export function verify(veriCode: string) {
	// mode: "no-cors" as  RequestMode,
	const requestOptions = {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify({"veriCode": veriCode}),
	};
	return fetch(`${process.env.VUE_APP_API_BASE_URL}/user/verify`, requestOptions)
		.then(handleResponse)
		.then((user) => {
			// login successful if there's a jwt token in the response
			if (user.token) {
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem("user", JSON.stringify(user));
			}
			return user;
		});
}

export function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem("user");
}
 