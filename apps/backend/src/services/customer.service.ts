import { CustomerModel } from "@/models/customer.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertCustomerDTO,
  UpdateCustomerDTO,
} from "@hotel-management/validator";

export async function ensureCustomerExistById(id: string) {
  const customerFromDb = await CustomerModel.findById(id);
  if (!customerFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Customer with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return customerFromDb;
}

export async function ensureCustomerNotExistByTcKimlikNo(tcKimlikNo: string) {
  const customerFromDb = await CustomerModel.findOne({
    tcKimlikNo: tcKimlikNo,
  });
  if (customerFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Customer with TC Kimlik No ${tcKimlikNo} already exists`,
      isOperational: true,
    });
  }
}

export async function insertCustomer(dto: InsertCustomerDTO) {
  if (dto.tcKimlikNo) {
    await ensureCustomerNotExistByTcKimlikNo(dto.tcKimlikNo);
  }
  const customerFromDb = await CustomerModel.insertOne(dto);
  return customerFromDb;
}

export async function updateCustomer(id: string, dto: UpdateCustomerDTO) {
  await ensureCustomerExistById(id);

  const customer = await CustomerModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true },
  );

  if (!customer) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "customer not found",
    });
  }

  return customer;
}

export async function deleteCustomerById(id: string) {
  await ensureCustomerExistById(id);

  const customer = await CustomerModel.findByIdAndDelete(id);

  if (!customer) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "customer not found",
    });
  }

  return customer;
}
