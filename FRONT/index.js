console.log("allo");

let main = document.querySelector("main");
let listing = document.querySelector(".listing");

async function getAllListings() {
	let apiCall = await fetch("http://localhost:4000/listing/all");
	let response = await apiCall.json();
	console.log(response);

	response.forEach((listing) => {
		main.innerHTML += `<div class="listing"> <h2>${listing.name}</h2> <img src="${listing.image}"/> <p>${listing.description}</p> <h2>${listing.category}</h2>  <h3> Stock: ${listing.stock}</h3> <button>Rent</button> </div>`;
	});
}

getAllListings();
