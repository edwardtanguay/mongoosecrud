import mongoose from 'mongoose';

const crudCommand = 'delete';

mongoose.connect('mongodb://localhost:27017/appcrud', err => {
	if (err) {
		console.log('ERROR ON CONNECT');
	} else {
		console.log('connection open');

		const userSchema = mongoose.Schema({
			name: String,
			username: { type: String, required: true },
			email: String,
			age: Number
		});
		const UserModel = mongoose.model("User", userSchema);

		switch (crudCommand) {
			case 'create':
				const user = new UserModel({
					name: "Jon Ackers",
					username: 'ja',
					email: "ja@gmail.com",
					age: "56"
				});
				user.save(err => {
					if (err) {
						console.log('BAD CREATE');
					} else {
						console.log(`user inserted: ${user.name}`)
					}
					closeConnection();
				});
				break;
			case 'read':
				(async () => {
					const users = await UserModel.find({});
					users.forEach(user => console.log(user.name));
					closeConnection();
				})();
				break;
			case 'update':
				(async () => {
					await UserModel.findOneAndUpdate({ username: 'thename' }, { $set: { email: "CHANGED EMAIL" } });
					console.log('user changed');
					closeConnection();
				})();
				break;
			case 'delete':
				(async () => {
					await UserModel.deleteOne({ username: "thename" });
					console.log('user deleted');
					closeConnection();
				})();
				break;
			default:
				console.log(`BAD COMMAND: ${crudCommand}`);
				closeConnection();
				break;
		}
	}
});

function closeConnection() {
	mongoose.connection.close(err => {
		if (err) {
			console.log('ERROR ON CONNECTION CLOSE');
		} else {
			console.log('connection closed');
		}
	})
}
