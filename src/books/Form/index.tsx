import React from "react";
import { useFormik } from "formik";
import { FormikConfigType} from "./FormikConfig";
import InputWithValidation from "../Inputs/InputsWithValidation";

interface FormProps {
  formikConfig: FormikConfigType ;
  fields?:Array<string>
}

const Form: React.FC<FormProps> = ({ formikConfig, fields=["Title", "Description", "Image"]}) => {

  const formik = useFormik({
    initialValues: formikConfig.initValues,
    validationSchema: formikConfig.validationSchema,
    onSubmit: (value)=>{
      alert(value)
    },  
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      {fields.map((field) => (
        <InputWithValidation
          key={field}
          id={field}
          type={field === "file"? "file" : "text"}
          placeholder={`Enter ${field}`}
          value={formik.values[field as keyof typeof formik.values] || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isFocused={field === "name"}
          message={
            formik.touched[field as keyof typeof formik.touched] &&
            formik.errors[field as keyof typeof formik.errors]
              ? formik.errors[field as keyof typeof formik.errors]
              : undefined
          }
          handleSubmit={formik.submitCount}
          isNewPassword={false}
        />
      ))}

      <button
        type="submit"
        className="h-10 px-6 text-sm font-medium text-white bg-[#3d6db5] rounded-md shadow-sm"
      >
        {formikConfig.buttonTitle}
      </button>
      
    </form>
  );
};

export default Form;
