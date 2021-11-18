import mongoose from 'mongoose';

const crudCommand = 'addx';

mongoose.connect("mongodb://localhost:27017/api001", {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

const db = mongoose.connection;

db.once("open", err => {
	if (err) console.log('ERROR ON CONNECTION OPEN');
	else console.log('connection open');

	const userSchema = mongoose.Schema({
		name: String,
		user: String,
		email: String
	});
	const userModel = mongoose.model("userModel", userSchema, "users100");

	switch (crudCommand) {
		case 'add':
			const user1 = new userModel({ name: "Jason Newbie777", username: "jasonnew", email: "jn@gmail.com" });

			user1.save((err, doc) => {
				if (err) return console.log(err);
				console.log('user inserted: ' + user1.name);
				closeConnection();
			});
			break;
		default:
			console.log('bad comment: ' + crudCommand);
			closeConnection();
	}
});

function closeConnection() {
	mongoose.connection.close(err => {
		if (err) console.log('ERROR ON DATABASE CLOSE');
		else console.log('database closed');
	});
}