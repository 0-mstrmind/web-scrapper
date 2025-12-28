import type { RequestHandler } from "express";

const asyncHandler = (func: RequestHandler): RequestHandler => 
  async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
};

export default asyncHandler;
