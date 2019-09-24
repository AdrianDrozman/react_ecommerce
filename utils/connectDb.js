import mongoose from 'mongoose';
const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log('Using existing connection');
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_SRV, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('DB Connected');
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
}

export default connectDb;
