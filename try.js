import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/api001", {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

const db = mongoose.connection;

db.once("open", err => {
	if (err) console.log('Database connection failure');
	else console.log('Database opened');
	
	const userSchema = mongoose.Schema({
		name: String,
		user: String,
		email: String
	});
	const userModel = mongoose.model("model", userSchema, "users100");

	const user1 = new userModel({ name: "Jason Newbie33i43", username: "jasonnew", email: "jn@gmail.com" });

	user1.save((err, doc) => {
		if (err) return console.log(err);
		console.log('inserted');
		mongoose.connection.close();
	});
});