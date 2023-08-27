interface IUser {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  status: boolean;
  creationTimestamp: number;
  modificationTimestamp: number;
}

type IUserPayload = Pick<IUser, "name" | "age" | "gender">;
type IUpdateUserPayload = Partial<IUserPayload>;

interface IValidationResult {
  error?: Error;
}

export { IUser, IUserPayload, IUpdateUserPayload, IValidationResult };
