import { differenceInCalendarDays, startOfDay } from "date-fns";
import { AppError } from "../lib/app-error";
import HttpStatusCode from "../lib/http-status-code";
import { CreateCustomerBody, UpdateCustomerBody } from "../lib/validators";
import { Customer } from "../models/customer";
import { Reservation } from "../models/reservation";
import { User } from "../models/user";

async function createCustomer({
  _id,
  customerData,
}: {
  _id: string;
  customerData: CreateCustomerBody;
}) {
  const userFromDb = await User.findById(_id);
  if (!userFromDb) {
    throw new AppError({
      message: `User with id ${_id} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  const customerFromDb = await Customer.findOne({ user: _id });
  if (customerFromDb) {
    throw new AppError({
      message: `Customer with email : ${userFromDb.email}, username : ${userFromDb.username} already exists`,
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  const customer = new Customer({ ...customerData, user: userFromDb._id });
  await customer.save();

  return customer;
}

async function deleteCustomerById(customerId: string) {
  const deletedCustomer = await Customer.findByIdAndDelete(customerId);

  return deletedCustomer;
}

async function ensureCustomerExistById(customerId: string) {
  const customer = await Customer.findById(customerId);

  if (!customer) {
    throw new AppError({
      message: `Customer with id ${customerId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return customer;
}

async function ensureCustomerExistByUserId(userId: string) {
  const customer = await Customer.findOne({ user: userId });
  if (!customer) {
    throw new AppError({
      message: `Customer with user id ${userId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return customer;
}

async function ensureCustomerNotExistByUserId(userId: string) {
  const customer = await Customer.findOne({ user: userId });
  if (customer) {
    throw new AppError({
      message: `Customer with user id ${userId} already exists`,
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }
}

async function updateCustomerById(
  customerId: string,
  customerData: UpdateCustomerBody,
) {
  const updatedCustomer = await Customer.findByIdAndUpdate(
    customerId,
    { $set: customerData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedCustomer) {
    throw new AppError({
      message: `Customer with id ${customerId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return updatedCustomer;
}

async function cancelBooking(reservationId: string) {
  const reservation = await Reservation.findById(reservationId);
  if (!reservation) {
    throw new AppError({
      message: `Reservation does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  if (reservation.status === "CANCELLED") {
    throw new AppError({
      message: "Reservation is already cancelled",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  const today = startOfDay(new Date());
  const checkIn = startOfDay(reservation.checkInDate);

  const daysUntilCheckIn = differenceInCalendarDays(checkIn, today);

  if (daysUntilCheckIn <= 2) {
    throw new AppError({
      message:
        "Reservation cannot be cancelled within the last 2 days before check-in",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  reservation.status = "CANCELLED";
  await reservation.save();
  return reservation;
}

export {
  createCustomer,
  deleteCustomerById,
  ensureCustomerExistById,
  updateCustomerById,
  ensureCustomerExistByUserId,
  ensureCustomerNotExistByUserId,
  cancelBooking,
};
