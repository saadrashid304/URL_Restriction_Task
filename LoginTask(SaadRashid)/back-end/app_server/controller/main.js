const User = require("../model/User");
const jwt = require("jsonwebtoken");

var sendJsonResponse = (res, status, content) => {
	res.statusCode = status;
	res.setHeader("Content-Type", "application/json");
	res.json(content);
};

module.exports.signin = (req, res) => {
	User.findOne({ email: req.body.email }).exec((err, user) => {
		if (!user) {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				phoneNo: req.body.phoneNo,
				address: req.body.address,
			});
			newUser.save((err2) => {
				if (err2) {
					sendJsonResponse(res, 400, err2);
					return;
				} else {
					const token = jwt.sign(
						{
							name: req.body.name,
							email: req.body.email,
							userId: req.body._id,
						},
						"user_signin_token",
						{
							expiresIn: "1d",
						}
					);
					sendJsonResponse(res, 200, {
						message: "Authorization Successful.",
						token: token,
					});
					return;
				}
			});
		} else {
			const query = { email: req.body.email };
			const newUser = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				phoneNo: req.body.phoneNo,
				address: req.body.address,
			};
			User.findOneAndUpdate(query, newUser, (err3, result) => {
				if (err3) {
					sendJsonResponse(res, 400, err3);
					return;
				} else {
					const token = jwt.sign(
						{
							name: req.body.name,
							email: req.body.email,
							userId: req.body._id,
						},
						"user_signin_token",
						{
							expiresIn: "1d",
						}
					);
					sendJsonResponse(res, 200, {
						message: "Authorization Successful.",
						token: token,
					});
					return;
				}
			});
		}
	});
}; 

module.exports.details = (req, res) => {
    User.findOne({ email: req.params.email }).exec((err, user) => {
		if (!user) {
			sendJsonResponse(res, 404, {
				message: "User Not Found",
			});
			return;
		} else if (err) {
			sendJsonResponse(res, 404, err);
			return;
		}
		sendJsonResponse(res, 200, user);
	});
};