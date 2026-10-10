import { CustomerModel } from "@/models/customer.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertCustomerDTO,
  UpdateCustomerDTO,
} from "@hotel-management/validator";
import * as userService from "@service/user.service.js";
import mongoose from "mongoose";

export async function ensureCustomerExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const customerFromDb = await CustomerModel.findById(id).session(
    session ?? null,
  );
  if (!customerFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Customer with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return customerFromDb;
}

export async function ensureCustomerNotExistByTcKimlikNo(
  tcKimlikNo: string,
  session?: mongoose.ClientSession,
) {
  const customerFromDb = await CustomerModel.findOne({
    tcKimlikNo: tcKimlikNo,
  }).session(session ?? null);
  if (customerFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Customer with TC Kimlik No ${tcKimlikNo} already exists`,
      isOperational: true,
    });
  }
}

export async function insertCustomer(
  dto: InsertCustomerDTO,
  session?: mongoose.ClientSession,
) {
  if (dto.tcKimlikNo) {
    await ensureCustomerNotExistByTcKimlikNo(dto.tcKimlikNo, session);
  }
  const customerFromDb = await CustomerModel.insertOne(dto, { session });

  if (!customerFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: "Failed to insert customer",
      isOperational: true,
    });
  }

  return customerFromDb;
}

export async function updateCustomer(
  id: string,
  dto: UpdateCustomerDTO,
  session?: mongoose.ClientSession,
) {
  await ensureCustomerExistById(id, session);

  const customer = await CustomerModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true, session },
  );

  if (!customer) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "customer not found",
    });
  }

  return customer;
}

export async function deleteCustomerById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensureCustomerExistById(id, session);

  const customer = await CustomerModel.findByIdAndDelete(id, { session });

  if (!customer) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "customer not found",
    });
  }

  return customer;
}

export async function createProfile(userId: string, dto: InsertCustomerDTO) {
  const userFromDb = await userService.ensureUserIsActiveById(userId);
  if (userFromDb.customer) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `User with id ${userId} already has a customer profile`,
      isOperational: true,
    });
  }

  // crate transection
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const customerFromDb = await insertCustomer(dto, session);
      await userService.updateUser(
        userId,
        {
          customer: customerFromDb.id,
        },
        session,
      );
    });
  } finally {
    await session.endSession();
  }
}
