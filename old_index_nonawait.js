import mongoose from 'mongoose';

const crudCommand = 'add';

mongoose.connect("mongodb://localhost:27017/appcrud");
const db = mongoose.connection;

db.once("open", err => {
	if (err) console.log('ERROR ON CONNECTION OPEN');
	else console.log('connection open');

	const userSchema = mongoose.Schema({
		name: String,
		user: String,
		email: String
	});
	const userModel = mongoose.model("user", userSchema);

	switch (crudCommand) {
		case 'add':
			const user1 = new userModel({ name: "Timo Albrecht", username: "talbrecht", email: "talbrecht@gmail.com" });

			user1.save((err, doc) => {
				if (err) return console.log(err);
				console.log('user inserted: ' + user1.name);
				closeConnection();
			});
			break;
		default:
			console.log('BAD COMMAND: ' + crudCommand);
			closeConnection();
	}
});

function closeConnection() {
	mongoose.connection.close(err => {
		if (err) console.log('ERROR ON CONNECTION CLOSE');
		else console.log('connection closed');
	});
}