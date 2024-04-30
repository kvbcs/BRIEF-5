console.log("ca marche");
let main = document.querySelector("main");
let listing = document.querySelector(".listing");

async function createListing() {
	let name = document.querySelector(".name").value;
	let image = document.querySelector(".image").value;
	let description = document.querySelector(".description").value;
	let category = document.querySelector(".category").value;
	let stock = document.querySelector(".stock").value;

	let listing = {
		name: name,
		image: image,
		description: description,
		category: category,
		stock: stock,
	};

	let request = {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(listing),
	};

	let apiRequest = fetch("http://localhost:4000/listing/create", request);
	let response = await apiRequest;
	console.log(response);
	if (response.status === 200) {
		console.log(response);
		window.location.href = "./index.html";
	}
}

async function getAllListings() {
	let apiCall = await fetch("http://localhost:4000/listing/all");
	let response = await apiCall.json();
	console.log(response);

	response.forEach((listing) => {
		main.innerHTML += `<div class="listing"> <p>ID : ${listing.equipement_id}</p> <h2>${listing.name}</h2> <img src="${listing.image}"/> <div class="listing-p"><p>${listing.description}</p></div> <h2>Category : ${listing.category}</h2>  <h3> Stock: ${listing.stock}</h3> <button class="updateBtn" onclick="updateListing(${listing.equipement_id})">Update</button> <button class="deleteBtn" onclick="deleteListing(${listing.equipement_id})">Delete</button> </div>`;
	});
}

getAllListings();

async function deleteListing(id) {
	console.log(id);
	let request = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	};

	let apiRequest = fetch(
		`http://localhost:4000/listing/delete/${id}`,
		request
	);
	let response = await apiRequest;
	console.log(response);
	if (response.status === 200) {
		console.log(response);
		alert("Deletion success");
		window.location.reload();
	} else {
		alert("Deletion failed");
	}
}

async function updateListing(id) {
	let form = document.querySelector(".form");
	console.log(id);
	let request = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	};

	let apiRequest = fetch(
		`http://localhost:4000/listing/update/${id}`,
		request
	);
	let response = await apiRequest;
	console.log(response);
	if (response.status === 200) {
		console.log(response);
		alert("Update success");
		window.location.reload();
	} else {
		alert("Update failed");
	}
}
