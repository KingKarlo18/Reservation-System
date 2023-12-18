import express from "express";
import userRouter from "./userRoutes";
import searchHotelRouter from "./searchHotelsRoutes";
import hotelDetailsRouter from "./hotelDetailsRoutes";
import destinationRouter from "./destinationRoutes";
import hotelReviewRouter from "./hotelReviewRoutes";

const router = express.Router();

router.use(userRouter);
router.use(searchHotelRouter);
router.use(hotelDetailsRouter);
router.use(destinationRouter);
router.use(hotelReviewRouter);

export default router;
