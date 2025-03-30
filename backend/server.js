import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB} from './lib/db.js';
import authRouter from './routes/auth.route.js';
import productRouter from './routes/product.route.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows us to parse json data from the body of the request
app.use(cookieParser()); // allows us to parse cookies from the request

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
    connectDB();
});