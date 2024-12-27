import { Application } from 'express';
import mongoose from 'mongoose';

export const DBConnection = (app: Application, port: string | undefined) => {
  mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => {
      console.log('Connected to DB');
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((error) => console.log('failed to connect mongoDB', error));
};

export default DBConnection;
