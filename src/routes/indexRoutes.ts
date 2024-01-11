import express from "express";
import userRouter from "./userRoutes";
import searchHotelRouter from "./searchHotelsRoutes";
import hotelDetailsRouter from "./hotelDetailsRoutes";
import destinationRouter from "./destinationRoutes";
import hotelReviewRouter from "./hotelReviewRoutes";
import reviewRouter from "./reviewRoutes";
import reservationRouter from "./reservationRoutes";
import accommodationRouter from "./accommodationRoutes";

const router = express.Router();

router.use(userRouter);
router.use(searchHotelRouter);
router.use(hotelDetailsRouter);
router.use(destinationRouter);
router.use(hotelReviewRouter);
router.use(reviewRouter);
router.use(reservationRouter);
router.use(accommodationRouter);

export default router;
