import mongoose from 'mongoose';

const crudCommand = 'create';

const connectToMongo = async () => {
	await mongoose.connect("mongodb://localhost:27017/appcrud");
	return mongoose;
}

(async () => {
	await connectToMongo();
	console.log('connection open');

	const userSchema = mongoose.Schema({
		name: String,
		username: { type: String, required: true },
		email: String,
		age: Number
	});
	const userModel = mongoose.model("user", userSchema);

	switch (crudCommand) {
		case 'create':
			const user1 = new userModel({ name: "Thomas Albrecht", username: "talbrecht3", email: "talbrecht@gmail.com", age: 34 });

			user1.save(err => {
				if (err) console.log(err);
				else console.log('user inserted: ' + user1.name);
				closeConnection();
			});
			break;
		case 'read':
			const users = await userModel.find({});
			users.forEach(user => console.log(user.name));
			closeConnection();
			break;
		case 'update':
			await userModel.findOneAndUpdate({ username: "talbrecht3" }, { $set: { email: "newmail" } });
			console.log('user updated');
			closeConnection();
			break;
		case 'delete':
			await userModel.deleteOne({ username: "talbrecht2" });
			console.log('user deleted');
			closeConnection();
			break;
		default:
			console.log('BAD COMMAND: ' + crudCommand);
			closeConnection();
			break;
	}
})();

function closeConnection() {
	mongoose.connection.close(err => {
		if (err) console.log('ERROR ON CONNECTION CLOSE');
		else console.log('connection closed');
	});
}