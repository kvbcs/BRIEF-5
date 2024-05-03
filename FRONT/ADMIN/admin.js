let listing = document.querySelector(".listing");
let jwt = window.sessionStorage.getItem("jwt");
let role = window.sessionStorage.getItem("role");

function disconnectButton() {
	window.sessionStorage.clear(jwt, role);
	setTimeout(() => {
		window.location.href = "../INDEX/index.html";
	}, 1000);
}

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

async function updateListing(listing, id) {
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

async function updateSubmit(id) {
	console.log(id);

	let name = document.querySelector(".name");
	let image = document.querySelector(".image");
	let description = document.querySelector(".description");
	let category = document.querySelector(".category");
	let stock = document.querySelector(".stock");

	let updatedListing = {
		name: name,
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

function removeModal() {
	let adminModal = document.querySelector(".adminModal");
	let overlay = document.querySelector(".overlay");
	overlay.classList.add("visibility");
	adminModal.classList.add("visibility");
}
