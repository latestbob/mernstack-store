import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


// routes here

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
})
app.use('/api/',productRouter);
app.use('/api/order/',orderRouter);

const mongodbURI = process.env.MONGO_URI;
mongoose.connect(mongodbURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});


export default app;





    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  