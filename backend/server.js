import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import quizRoutes from './routes/quizRoutes.js'
import adminRoute from './routes/adminRoute.js'
import userRoute from './routes/userRoute.js'
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/admin',adminRoute);
app.use('/api/users',userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
