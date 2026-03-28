import mongoose from 'mongoose';
const DB_PASSWORD = '';
const DB_USERNAME = '';
// const MONGOATLAS_URL: string = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.bbdjdbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const MONGOATLAS_URL: string = `mongodb+srv://devmart-api:${DB_PASSWORD}@cluster0.97mongr.mongodb.net/?appName=Cluster0`;

const DB_NAME: string = '';


export const dbConnection = async () => {
  try {
    await mongoose.connect(`${MONGOATLAS_URL}/${DB_NAME}`);
    console.log('[DB-STATUS] MongoDB is online');
  } catch (error) {
    console.error(error);
    throw new Error('[DB-ERROR] it is not possible to connect');
  }
};