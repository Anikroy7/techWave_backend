import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

app.use(express.json());

// app.use(cors({
//     origin: 'http://localhost:5173', 

// }));

//Routes

app.use(
    cors({
        credentials: true,
    }),
)

app.use("/api/", router);


app.get('/', (req: Request, res: Response) => {
    res.json({ message: "application run successfully!!" });
});



//Global middleware
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
