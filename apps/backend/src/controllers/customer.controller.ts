import { ApiResponse } from "@/util/api-response.js";
import { CustomerModel } from "@/models/customer.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertCustomerValidator } from "@hotel-management/validator/customer";
import {
  getCustomerIdParamValidator,
  getUpdateCustomerValidator,
} from "@hotel-management/validator/customer";
import HttpStatusCode from "@/util/http-status-codes.js";
import { AppError } from "@/util/app-error.js";
import { parseOrThrow } from "@/util/parse-or-throw.js";

export async function getCustomers(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(CustomerModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const customerModels = await apiFeatures.mongooseQuery;

  res.send(ApiResponse.ok(customerModels, "customers fetched successfully"));
}

export async function insertCustomer(req: Request, res: Response) {
  const validator = getInsertCustomerValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert customer failed",
    "/api/customers/insert",
  );

  await CustomerModel.insertOne({
    ...data,
  });

  res.send(ApiResponse.ok(data, "customer inserted successfully"));
}

export async function updateCustomer(req: Request, res: Response) {
  const path = "/api/customers/:id";
  const { id } = parseOrThrow(
    await getCustomerIdParamValidator().safeParseAsync(req.params),
    "update customer failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdateCustomerValidator().safeParseAsync(req.body),
    "update customer failed",
    path,
  );

  const customer = await CustomerModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );

  if (!customer) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "customer not found",
      path,
    });
  }

  res.send(ApiResponse.ok(customer, "customer updated successfully"));
}

export async function deleteCustomer(req: Request, res: Response) {
  const path = "/api/customers/:id";
  const { id } = parseOrThrow(
    await getCustomerIdParamValidator().safeParseAsync(req.params),
    "delete customer failed",
    path,
  );

  const customer = await CustomerModel.findByIdAndDelete(id);

  if (!customer) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "customer not found",
      path,
    });
  }

  res.send(ApiResponse.ok({ id }, "customer deleted successfully"));
}
