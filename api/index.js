import express from 'express';
import cors from 'cors';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import likeRoutes from './routes/likes.js';
import relationshipRoutes from './routes/relationships.js';

dotenv.config();

const app = express();

//middlewares
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

//   next();
// });

app.use(
  cors({
    preflightContinue: true,
    credentials: true,
    origin: ['https://thdat-social-app.netlify.app', 'http://localhost:3000']
  })
);

app.use(express.json());

app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/relationships', relationshipRoutes);

app.listen(8800, () => {
  console.log('API working!');
});
