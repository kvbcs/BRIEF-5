let aside = document.querySelector("aside");

async function createListing() {
	let name = document.querySelector("#name").value;
	let image = document.querySelector("#image").value;
	let description = document.querySelector("#description").value;
	let category = document.querySelector("#category").value;
	let stock = document.querySelector("#stock").value;

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
		aside.innerHTML += `
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
