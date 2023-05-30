import express, { Request, Response } from "express";
const authRouter = express.Router();
 
authRouter.post('/', (req: Request, _res: Response) => {
 console.log(req.body)
});

export default authRouter;