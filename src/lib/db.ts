import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const hostname = process.env.MONGO_HOSTNAME ? process.env.MONGO_HOSTNAME : 'localhost';
const dbname = process.env.MONGO_DBNAME ? process.env.MONGO_DBNAME : 'project';

mongoose.set('useFindAndModify', true);

class db {
  static async connect () {
    console.log('Setting up mongodb connection...')
    return await mongoose.connect(`mongodb://${hostname}:27017/${dbname}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }).then((data)=> {
      console.log('DB Connection set up')
      return data
    }).catch((e) => {
      console.error(e)
      return e
    });
  }
}

export default db