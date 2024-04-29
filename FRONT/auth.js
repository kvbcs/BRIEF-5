console.log("test");

async function handleRegister() {
	let first_name = document.querySelector(".first_name").value;
	let last_name = document.querySelector(".last_name").value;
	let phone_number = document.querySelector(".phone_number").value;
	let address = document.querySelector(".address").value;
	let email = document.querySelector(".email").value;
	let password = document.querySelector(".password").value;

	let user = {
		first_name: first_name,
		last_name: last_name,
		phone_number: phone_number,
		address: address,
		email: email,
		password: password,
	};

	let request = {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(user),
	};

	let apiRequest = fetch("http://localhost:4000/user/register", request);
	let response = await apiRequest;
	console.log(response);
	if (response.status === 200) {
		console.log(user);
	} else {
		alert("Invalid credentials");
	}
}
//TODO: fix register, login marche tkt

async function handleLogin() {
	let email = document.querySelector(".email").value;
	let password = document.querySelector(".password").value;

	let user = {
		email: email,
		password: password,
	};

	let request = {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(user),
	};

	let apiRequest = fetch("http://localhost:4000/user/login", request);
	let response = await apiRequest;
	let data = await response.json();
	console.log(response);
	if (response.status === 200) {
		let jwt = data.jwt;
		window.localStorage.setItem("jwt", jwt);
		window.location.href = "./index.html";
	} else {
		alert("Invalid credentials");
	}
}
