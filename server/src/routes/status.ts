import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/status", async (req: Request, res: Response) => {
  res.status(200).send({ ok: true });
});

export { router as statusRouter };
