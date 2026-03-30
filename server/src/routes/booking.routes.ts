import { Router } from "express";
import { cancleBooking, createBooking, getBooking, getUserBooking } from "../controllers/booking.controllers";
import { auth } from "../middleware/auth.middleware";
import { validateBooking } from "../middleware/booking.validation";

const router = Router();

// router.post("/booking/book", auth, validateBooking , bookTicket);
// router.get("/booking" , getAllBookings);
router.post("/booking" , createBooking);
router.get("/booking/:bookingId" , getBooking);
router.get("/booking " , getUserBooking);
router.delete("/booking/:bookingId" , cancleBooking);


export default router;