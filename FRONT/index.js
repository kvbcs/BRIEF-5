console.log("allo");

let main = document.querySelector("main");
let listing = document.querySelector(".listing");
let disconnect = document.querySelector(".disconnect");
let login = document.querySelector(".login");
let register = document.querySelector(".register");
let hidden = document.querySelector(".hidden");
let jwt = window.sessionStorage.getItem("jwt");
let body = document.querySelector("body");

async function getAllListings() {
	let apiCall = await fetch("http://localhost:4000/listing/all");
	let response = await apiCall.json();
	console.log(response);

	response.forEach((listing) => {
		main.innerHTML += `<div class="listing"> <img src="${listing.image}"/> <div class="listing-info"> <h2>${listing.name}</h2>  <div class="listing-p"><p>${listing.description}</p></div> <h2>Category : ${listing.category}</h2>  <div class="stock-rent"> <h3> Stock: ${listing.stock}</h3>  <button class="rentBtn" onclick="handleRent()">Rent</button> </div> </div> </div>`;
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

function handleRent() {
	let modal = document.querySelector(".modal");
	let overlay = document.querySelector(".overlay");
	overlay.classList.remove("visibility");
	modal.classList.remove("visibility");
	overlay.addEventListener("click", function () {
		overlay.classList.add("visibility");
		modal.classList.add("visibility");
	});
}

function removeModal() {
	let modal = document.querySelector(".modal");
	let overlay = document.querySelector(".overlay");
	overlay.classList.add("visibility");
	modal.classList.add("visibility");
}
