import mongoose from 'mongoose';

const crudCommand = 'add';

mongoose.connect("mongodb://localhost:27017/appcrud");
const db = mongoose.connection;

db.once("open", err => {
	if (err) console.log('ERROR ON CONNECTION OPEN');
	else console.log('connection open');

	const userSchema = mongoose.Schema({
		name: String,
		username: String,
		email: String
	});
	const userModel = mongoose.model("user", userSchema);

	switch (crudCommand) {
		case 'create':
			console.log('TODO: CREATE');
			closeConnection();
			break;
		case 'read':
			console.log('TODO: READ');
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