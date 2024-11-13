import React from "react";
import Form from "../../components/Form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { adminSignupHandler } from "../../actions/accountActions";
import { registrationValidationSchema, FormikConfigType, ISignUp } from "../../components/Form/FormikConfig";
import { Modal } from "react-bootstrap";

interface SignupModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const RegisterPage: React.FC<SignupModalProps> = ({ isModalOpen, closeModal }) => {
  const dispatch = useDispatch<AppDispatch>();

  const formikConfig: FormikConfigType = {
    initValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationValidationSchema,
    onSubmit: (values: ISignUp) => {
      const userData = {
        name: values.name!,
        email: values.email,
        password: values.password,
      };
      console.log(userData)
      dispatch(adminSignupHandler(userData));
    },
    buttonTitle: "Sign Up",
  };

  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex justify-center">
          <div className="w-[100%]">
            <Form formikConfig={formikConfig} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterPage;
