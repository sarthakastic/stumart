import * as yup from 'yup'

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  selectedFile: yup.string().required('File is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  password: yup.string().required('Password is required').min(6),
  phoneNumber: yup
    .number()
    .typeError('Phone Number must be a number')
    .required('Phone Number is required'),
})

export const signInSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  phoneNumber: yup
    .number()
    .typeError('Phone Number must be a number')
    .positive()
    .required('Phone Number is required'),
})

export const addressSchema = yup.object().shape({
  hostel: yup.string().required('Hostel is required'),
  room: yup
    .number()
    .typeError('Room Number must be a number')
    .positive()
    .required('Room Number is required')
    .min(1)
    .max(150),

  floor: yup.string().required('Floor is required'),
})
