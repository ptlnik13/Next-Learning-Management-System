import mongoose from 'mongoose';

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export async function dbConnect() {

    try {
        return await mongoose.connect(String(process.env.MONGODB_CONNECTION_STRING));
    } catch (error) {
        console.log(error.message);
    }
}
