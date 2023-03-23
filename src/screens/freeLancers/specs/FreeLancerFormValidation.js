import * as yup from 'yup'

export const getValidationSchema  = yup.object().shape({
    firstName: yup.string().required("Required"),
    familyName: yup.string().required("Required"),
    // email: yup.string().email().required("Required"),
    // phone: yup.string().required("Required"),
    halfDayRate: yup.number().min(1,"Required"),
    fullDayRate: yup.number().min(1,"Required"),
    // languageSupplement: yup.number().min(1,"Required"),
    // weekendHDRate: yup.number().min(1,"Required"),
    // weekendFDRate: yup.number().min(1,"Required"),
    type: yup.string().required("Required"),
    city: yup.string().required("Required"),
  });