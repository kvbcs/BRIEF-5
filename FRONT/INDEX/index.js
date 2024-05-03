console.log("allo");

let main = document.querySelector("main");
let listing = document.querySelector(".listing");
let disconnect = document.querySelector(".disconnect");
let login = document.querySelector(".login");
let register = document.querySelector(".register");
let hidden = document.querySelector(".hidden");
let jwt = window.sessionStorage.getItem("jwt");
let role = window.sessionStorage.getItem("role");
let body = document.querySelector("body");
let adminBtn = document.querySelector(".adminBtn");
let rentBtn = document.querySelector(".rentBtn");

if (role === "admin") {
	adminBtn.classList.remove("visibility");
}
async function getAllListings() {
	let apiCall = await fetch("http://localhost:4000/listing/all");
	let response = await apiCall.json();
	console.log(response);

	response.forEach((listing) => {
		main.innerHTML += `<div class="listing"> <img src="${listing.image}"/> <div class="listing-info"> <h2>${listing.name}</h2>  <div class="listing-p"><p>${listing.description}</p></div> <h2>Category : ${listing.category}</h2>  <div class="stock-rent"> <h2 class="stock">Stock : ${listing.stock}</h2>  <button class="rentBtn" onclick="handleRent()">Rent</button> </div> </div> </div>`;
	});
}

getAllListings();

if (jwt) {
	window.sessionStorage.getItem(jwt) === true && jwt.length > 20;
	disconnect.classList.remove("hidden");
	register.classList.add("hidden");
	login.classList.add("hidden");
}

function disconnectButton() {
	window.sessionStorage.clear(jwt);
	setTimeout(() => {
		window.location.reload();
	}, 1000);
}

function handleRent(role) {
	let modal = document.querySelector(".modal");
	let overlay = document.querySelector(".overlay");
	overlay.classList.remove("visibility");
	modal.classList.remove("visibility");

	// overlay.addEventListener("click", function () {
	// 	overlay.classList.add("visibility");
	// 	modal.classList.add("visibility");
	// });
}

function removeModal() {
	let modal = document.querySelector(".modal");
	let overlay = document.querySelector(".overlay");
	overlay.classList.add("visibility");
	modal.classList.add("visibility");
}

async function rentSubmit(id) {
	let modal = document.querySelector(".modal");
	let rent_start = document.querySelector(".rent_start").value;
	let rent_end = document.querySelector(".rent_end").value;
	let price = document.querySelector(".price").value;

	let rent = {
		rent_start: rent_start,
		rent_end: rent_end,
		price: price,
	};

	let request = {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(rent),
	};

	let apiRequest = fetch(
		`http://localhost:4000/rent/create/${id}/${id}`,
		request
	);
	let response = await apiRequest;
	if (response.status === 200) {
		console.log(response);
		// window.location.reload();
		let stock = document.querySelector(".stock");
		let stockValue = document.querySelector(".stock").value;
		for (let i = stockValue; i > 0; i--) {
			stock += stockValue[i];
			alert(i);
			console.log(i);
		}
	} else {
		alert("nope");
	}
	//TODO: fix le stock decrementation avec un update
}
