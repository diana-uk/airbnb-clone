import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    console.log('result: ', result)
    if (!result.success) {
        const details = result.error.issues.map((issue) => issue.message);
        return res.status(400).json({ error: "Invalid ouput", details })
    }
    req.body = result.data;
    next()


}