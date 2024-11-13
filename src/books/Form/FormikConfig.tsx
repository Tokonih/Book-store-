import * as yup from "yup";

// Define form values interface with optional fields
interface Credential {
  email?: string;
  password?: string;
}

export interface ISignUp extends Credential {
  name?: string | undefined;
  confirmPassword?: string | undefined;
}
export interface ILogin extends Credential {}

export interface IBook {
  title?: string;
  descp?: string;
  image?: string;
}


// Updated FormikConfigType with onSubmit function
export type FormikConfigType = {
  initValues: ISignUp | ILogin  | IBook;
  validationSchema: yup.ObjectSchema<ISignUp | ILogin | IBook>;
  onSubmit: (values: any) => void;
  buttonTitle: string;
};

// Registration validation schema (requires all fields)
export const registrationValidationSchema: yup.ObjectSchema<ISignUp> =
  yup.object({
    name: yup
      .string()
      .min(3, "Must be 3 characters or more")
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup
      .string()
      .min(8, "Password must be 8 characters or longer!")
      .required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

// Login validation schema (requires only email and password)
export const loginValidationSchema: yup.ObjectSchema<ILogin> = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters or longer!")
    .required("Required"),
});

// Login validation schema (requires only email and password)
export const bookValidationSchema: yup.ObjectSchema<IBook> = yup.object({
  title: yup.string().required("Required"),
  descp: yup.string().required("Required"),
  image: yup.string().required("Required"),
});
