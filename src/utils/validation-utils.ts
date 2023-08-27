import { IValidationResult, IUserPayload, IUpdateUserPayload } from "../types.js";

export const validateUserPayload = (userPayload: IUserPayload): IValidationResult => {
  const { name, age, gender } = userPayload;

  const result: IValidationResult = {};

  if (!name || !age || !gender) {
    result.error = new Error("Missing inputs.");
  } else {
    if (age <= 0 || typeof age !== "number") {
      result.error = new Error("Invalid age.");
    } else if (gender !== "female" && gender !== "male") {
      result.error = new Error("Invalid gender.");
    }
  }
  return result;
};

export const validateUpdateUserPayload = (payload: IUpdateUserPayload): IValidationResult => {
    const {name, age, gender} = payload

  if (name !== undefined && (typeof name !== "string" || name.length === 0)) {
    return {error: new Error("Invalid name.")};
  }
  if (age !== undefined && (typeof age !== "number" || age <= 0)) {
    return {error: new Error("Invalid age.")};
  }
  if(gender !== undefined && (gender !== 'female' && gender !== 'male')) {
    return {error: new Error("Invalid gender.")};
  }
  return {};
};
