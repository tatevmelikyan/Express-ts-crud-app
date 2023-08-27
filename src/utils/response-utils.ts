import { Response } from "express";

export const sendResponse = (res: Response, status: number, data: any, errorMessage?: string) => {
    if (status >= 400) {
        const errorResponse = errorMessage ? { error: errorMessage } : { error: "An error occurred." };
        res.status(status).json(errorResponse);
    } else {
        res.status(status).json(data);
    }
}