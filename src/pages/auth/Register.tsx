import React, { useEffect } from "react";
import Form from "../../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { adminSignupHandler } from "../../actions/accountActions";
import { registrationValidationSchema, FormikConfigType, ISignUp } from "../../components/Form/FormikConfig";
import { Modal } from "react-bootstrap";
import { showToast } from "../../common/toast";

interface SignupModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const RegisterPage: React.FC<SignupModalProps> = ({ isModalOpen, closeModal }) => {
  const { loading, success, error } = useSelector(
    (state: RootState) => state.accountSignup)

    console.log(success)
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

  useEffect(() => {
    if (success) {
      closeModal();
      showToast.success("Signup successful!");
    } else if (error) {
      showToast.error("Signup failed. Please try again.");
    }
  }, [success, error]); 
  

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
