import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: false, max: 50 },
    last_name: { type: String, required: false, max: 50 },
    email: { type: String, required: true, max: 50 },
    age: { type: Number, required: true, max: 50 },
    password: { type: String, max: 50 },
});

const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;