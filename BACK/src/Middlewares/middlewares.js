let validator = require("validator");

const verifyUser = async (req, res, next) => {
	const first_name = req.body.first_name;
	const last_name = req.body.last_name;
	const address = req.body.address;
	const email = req.body.email;
	const phone_number = req.body.phone_number;

	if (!validator.isAlpha(first_name)) {
		return res.json({ Error: "Your first name must contain letters" });
	}
	if (!validator.isAlpha(last_name)) {
		return res.json({ Error: "Your last name must contain letters" });
	}

	if (!validator.isAlphanumeric(address)) {
		return res.json({
			Error: "Your address must contain letters and numbers",
		});
	}

	if (!validator.isEmail(email)) {
		return res.json({
			Error: "Your email must follow this example : name@mail.com",
		});
	}
	if (!validator.isNumeric(phone_number)) {
		return res.json({
			Error: "Your phone number must contain numbers",
		});
	}
	req.first_name = first_name;
	req.last_name = last_name;
	req.address = address;
	req.email = email;

	next();
};

module.exports = { verifyUser };
