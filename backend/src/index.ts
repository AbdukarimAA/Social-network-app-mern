import express, {Request, Response} from "express";
import multer from "multer";
import bodyParser from "body-parser";
import {fileURLToPath} from "url";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
import path from "path";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.routes.js";
import {registration} from './controllers/auth.controller.js'
import {createPost} from "./controllers/post.controller.js";
import {auth} from "./middleware/verifyToken.js";
import User from "./models/user.js";
import Post from "./models/post.js";
import {users, posts} from "./data/index.js";

/* Config */
const __filename: string = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// app.use(express.static(path.resolve(__dirname, 'public', 'assets')));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json({limit: "30mb"}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
dotenv.config({ path: __dirname+'/.env' });

/* File Storage */
const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, "public/assets");
    },
    filename: function (req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage });

/* File Routes */
app.post('/auth/registration', upload.single('picture'), registration);
app.post("/posts", auth, upload.single("picture"), createPost);

/* Routes */
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use("/posts", postRoutes);

/* Mongoose Setup */
mongoose.set('strictQuery', false);
const PORT = process.env.PORT || 5001;
await mongoose.connect(process.env.MONGO as string)
    .then(() => {
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));

        // User.insertMany(users);
        // Post.insertMany(posts);

    }).catch((e: any) => console.log(`${e} didn't connect`)
);
