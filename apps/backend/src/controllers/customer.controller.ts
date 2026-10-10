import { ApiResponse } from "@/util/api-response.js";
import { CustomerModel } from "@/models/customer.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import {
  getCreateProfileValidator,
  getInsertCustomerValidator,
} from "@hotel-management/validator/customer";
import {
  getCustomerIdParamValidator,
  getUpdateCustomerValidator,
} from "@hotel-management/validator/customer";
import { parseOrThrow } from "@/util/parse-or-throw.js";
import * as customerService from "@/services/customer.service.js";

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
  await customerService.insertCustomer(data);
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

  const customer = await customerService.updateCustomer(id, data);

  res.send(ApiResponse.ok(customer, "customer updated successfully"));
}

export async function deleteCustomer(req: Request, res: Response) {
  const path = "/api/customers/:id";
  const { id } = parseOrThrow(
    await getCustomerIdParamValidator().safeParseAsync(req.params),
    "delete customer failed",
    path,
  );

  await customerService.deleteCustomerById(id);

  res.send(ApiResponse.ok({ id }, "customer deleted successfully"));
}

// for clients only to create profile
export async function createProfile(req: Request, res: Response) {
  const user = req.user;
  const validator = getCreateProfileValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "create profile failed",
    "/api/customers/create-profile",
  );

  await customerService.createProfile(user!.id, data);
  res.send(ApiResponse.ok(data, "profile created successfully"));
}
