console.log("allo");

let main = document.querySelector("main");
let listing = document.querySelector(".listing");
let disconnect = document.querySelector(".disconnect");
let login = document.querySelector(".login");
let register = document.querySelector(".register");
let hidden = document.querySelector(".hidden");
let jwt = window.sessionStorage.getItem("jwt");

async function getAllListings() {
	let apiCall = await fetch("http://localhost:4000/listing/all");
	let response = await apiCall.json();
	console.log(response);

	response.forEach((listing) => {
		main.innerHTML += `<div class="listing"> <h2>${listing.name}</h2> <img src="${listing.image}"/> <div class="listing-p"><p>${listing.description}</p></div> <h2>${listing.category}</h2>  <h3> Stock: ${listing.stock}</h3> <button>Rent</button> </div>`;
	});
}

getAllListings();

if (jwt) {
	window.sessionStorage.getItem(jwt) === true && jwt.length > 20;
	disconnect.classList.remove("hidden");
	register.classList.add("hidden");
	login.classList.add("hidden");
}

async function disconnectButton() {
	window.sessionStorage.clear(jwt);
	setTimeout(() => {
		window.location.reload();
	}, 1000);
}
