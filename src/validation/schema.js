import * as Yup from 'yup';

export const REQUIRED_FIELD = 'This field is Required.';
const PASSWORD_FIELD = 'Password must be at least 8 charaters';

export const loginSchema = Yup.object({
  email        : Yup.string()
                      .required(REQUIRED_FIELD),
  password        : Yup.string()
                      .min(8, PASSWORD_FIELD)
                      .required(REQUIRED_FIELD),
});

export const forgotPasswordSchema = Yup.object({
  email        : Yup.string()
                      .email()
                      .required(REQUIRED_FIELD),
});

export const activateAccountSchema = Yup.object({
  studentNumber   : Yup.string()
                      .required(REQUIRED_FIELD),
  email           : Yup.string()
                      .email()
                      .required(REQUIRED_FIELD),
});

export const createPasswordSchema = Yup.object({
  password     : Yup.string()
                      .min(8, PASSWORD_FIELD)
                      .required(REQUIRED_FIELD)
                      .matches(/\d/, 'Password must contain at least 1 number')
                      .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
                      .matches(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Password must contain at least 1 special character'),
  confirmPassword : Yup.string()
                        .required(REQUIRED_FIELD)
                       .oneOf([Yup.ref('password')], 'New and confirm password must match'),
});

export const settingsSchema = Yup.object({
  firstName: Yup.string()
                      .required(REQUIRED_FIELD),
  lastName: Yup.string()
                      .required(REQUIRED_FIELD),
  email: Yup.string()
                      .email()
                      .required(REQUIRED_FIELD),
  password: Yup.string()
                      .min(8, PASSWORD_FIELD)
                      .required(REQUIRED_FIELD),
 confirmPassword: Yup.string()
                       .required(REQUIRED_FIELD)
                      .oneOf([Yup.ref('password')], 'New and confirm password must match'),
});

export const profileSchema = Yup.object({
  studentNumber: Yup.string()
                      .required(REQUIRED_FIELD),
  firstName: Yup.string()
                      .required(REQUIRED_FIELD),
  lastName: Yup.string()
                      .required(REQUIRED_FIELD),
  email: Yup.string()
                      .email()
                      .required(REQUIRED_FIELD),
  quotes: Yup.string()
                      .required(REQUIRED_FIELD),
});

export const alumniSchema = Yup.object({
  studentNumber: Yup.string()
                      .required(REQUIRED_FIELD),
  firstName: Yup.string()
                      .required(REQUIRED_FIELD),
  lastName: Yup.string()
                      .required(REQUIRED_FIELD),
  quotes: Yup.string()
                      .required(REQUIRED_FIELD),
});

export const personnelSchema = Yup.object({
  fullName: Yup.string()
                      .required(REQUIRED_FIELD),
  prefix: Yup.string()
                      .required(REQUIRED_FIELD),
  department: Yup.string()
                      .required(REQUIRED_FIELD),
  position: Yup.string()
                      .required(REQUIRED_FIELD)
});

export const eventSchema = Yup.object({
  eventPersonnelList: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required('Value is required'),
      Message: Yup.string().required('Value is required'),
    })
  )
});

export const programSchema = Yup.object({
  name: Yup.string()
                      .required(REQUIRED_FIELD)
});
