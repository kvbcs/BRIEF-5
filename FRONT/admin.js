console.log("ca marche");
let main = document.querySelector("main");
let listing = document.querySelector(".listing");
let section = document.querySelector("section");
let jwt = window.sessionStorage.getItem("jwt");
let role = window.sessionStorage.getItem("role");

function disconnectButton() {
	window.sessionStorage.clear(jwt, role);
	setTimeout(() => {
		window.location.href = "./index.html";
	}, 1000);
}

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
		window.location.reload();
	}
}

async function getAllListings() {
	let apiCall = await fetch("http://localhost:4000/listing/all");
	let response = await apiCall.json();
	console.log(response);

	response.forEach((element) => {
		section.innerHTML += `
		<div class="listing">  
			<img src="${element.image}"/> 
			<div class="listing-info">
			<div class="admin-buttons">
				<p>ID : ${element.equipement_id}</p> 
					<h2>${element.name}</h2> 
			</div>
						<div class="listing-p">
							<p>${element.description}</p> 
						</div>
							<h2>Category : ${element.category}</h2>  
						<div class="admin-buttons">
							<h2> Stock: ${element.stock}</h2> 
							<button class="updateBtn" onclick="updateListing(${element.equipement_id})">Update</button> 
							<button class="deleteBtn" onclick="deleteListing(${element.equipement_id})">Delete</button> 
						</div>
			</div>
		</div>`;

		// let btn2 = document.querySelector(
		// 	`.updateBtn-${element.equipement_id}`
		// );
		// btn2.addEventListener("click", function () {
		// 	updateListing(element.equipement_id, listing);
		// });
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

async function updateListing(listing) {
	let name = document.querySelector(".name");
	let image = document.querySelector(".image");
	let description = document.querySelector(".description");
	let category = document.querySelector(".category");
	let stock = document.querySelector(".stock");

	name.value = listing.name;
	image.value = listing.image;
	description.value = listing.description;
	category.value = listing.category;
	stock.value = listing.stock;

	let adminModal = document.querySelector(".adminModal");
	let overlay = document.querySelector(".overlay");
	overlay.classList.remove("visibility");
	adminModal.classList.remove("visibility");
}

function removeModal() {
	let adminModal = document.querySelector(".adminModal");
	let overlay = document.querySelector(".overlay");
	overlay.classList.add("visibility");
	adminModal.classList.add("visibility");
}

async function updateSubmit(equipement_id) {
	console.log(equipement_id);
	let name = document.querySelector("#name");
	let image = document.querySelector("#image");
	let description = document.querySelector("#description");
	let category = document.querySelector("#category");
	let stock = document.querySelector("#stock");

	let updatedListing = {
		name: name.value,
		image: image,
		description: description,
		category: category,
		stock: stock,
	};

	let request = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(updatedListing),
	};
	let id = equipement_id.id;
	let apiRequest = fetch(
		`http://localhost:4000/listing/update/${id}`,
		request
	);
	let response = await apiRequest;
	let result = await response.json();
	console.log(result);
	if (response.status === 200) {
		console.log(response);
		alert("Update success");
		// window.location.reload();
	} else {
		alert("Update failed");
	}
}
