import mongoose from 'mongoose';

const crudCommand = 'add';

mongoose.connect("mongodb://localhost:27017/api001");

const db = mongoose.connection;

const userSchema = mongoose.Schema({
	name: String,
	user: String,
	email: String
});
const userModel = mongoose.model("userModel", userSchema, "users100");

if (crudCommand === 'add') {
	const user1 = new userModel({ name: "Christian Lamprecht", username: "chlamp", email: "chlamp@gmail.com" });

	user1.save(err => {
		if (err) {
			console.error(err);
		} else {

		}
		console.log('user inserted');
	});
}


mongoose.connection.close();