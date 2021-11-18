import mongoose from 'mongoose';

const crudCommand = 'create';



mongoose.connect("mongodb://localhost:27017/appcrud");
const db = mongoose.connection;


db.once("open", err => {
	if (err) console.log('ERROR ON CONNECTION OPEN');
	else console.log('connection open');

	const userSchema = mongoose.Schema({
		name: String,
		username: { type: String, required: true },
		email: String,
		age: Number
	});
	const userModel = mongoose.model("user", userSchema);

	switch (crudCommand) {
		case 'create':
			const user1 = new userModel({ name: "Thomas Albrecht", username: "talbrecht", email: "talbrecht@gmail.com", age: 34 });

			user1.save(err => {
				if (err) console.log(err);
				else console.log('user inserted: ' + user1.name);
				closeConnection();
			});
			break;
		case 'read':
			(async () => {
				const users = new userModel();
				const all = await userModel.find({});
				console.log(all);
			})();


			// users.find({}, (err, docs) => {
			// 	console.log(docs);
			// })
			closeConnection();
			break;
		case 'update':
			console.log('TODO: UPDATE');
			closeConnection();
			break;
		case 'delete':
			console.log('TODO: DELETE');
			closeConnection();
			break;
		default:
			console.log('BAD COMMAND: ' + crudCommand);
			closeConnection();
			break;
	}
});

function closeConnection() {
	mongoose.connection.close(err => {
		if (err) console.log('ERROR ON CONNECTION CLOSE');
		else console.log('connection closed');
	});
}