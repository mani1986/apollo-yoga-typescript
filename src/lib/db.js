import mongoose from 'mongoose'

const hostname = process.env.MONGO_HOSTNAME ? process.env.MONGO_HOSTNAME : 'localhost';

mongoose.connect(`mongodb://${hostname}:27017/${process.env.MONGO_DBNAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then((data)=> {
  console.log('DB Connection set up')
}).catch((e) => {
  console.error(e)
});
