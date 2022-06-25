const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match:
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		},
		password: {
			type: String,
			required: true,
		},
		phoneNo: {
			type: String,
			required: true,
			match: /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/,
		},
		address: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
