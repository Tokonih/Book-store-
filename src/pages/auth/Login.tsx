import React, { useEffect } from "react";
import Form from "../../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { adminLoginHandler } from "../../actions/accountActions";
import { loginValidationSchema, FormikConfigType, ILogin, } from "../../components/Form/FormikConfig";
import { Modal } from "react-bootstrap";

interface SignInModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const LoginPage: React.FC<SignInModalProps> = ({ isModalOpen, closeModal }) => {
  // const { loading, success, error } = useSelector(
  //   (state: RootState) => state.accountLogin
  // );

  // const dispatch = useDispatch<AppDispatch>();

  // const formikConfig: FormikConfigType = {
  //   initValues: {
  //     email: "",
  //     password: ""
  //   },
  //   validationSchema: loginValidationSchema,
  //   onSubmit: (values:ILogin) => {
  //     const userData = {
  //       email: values.email,
  //       password: values.password,
  //     };
  //     dispatch(adminLoginHandler(userData));
  //   },
  //   buttonTitle: "Sign In",
  // };

  const { loading, success, error } = useSelector(
    (state: RootState) => state.accountLogin
  );

  const dispatch = useDispatch<AppDispatch>();
  

  const formikConfig: FormikConfigType = {
    initValues: {
      email: "",
      password: ""
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values: ILogin) => {
      const userData = {
        email: values.email,
        password: values.password,
      };
      dispatch(adminLoginHandler(userData));
    },
    buttonTitle: "Sign In",
  };



  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex justify-center">
          <div className="w-[100%]">
            <Form formikConfig={formikConfig} fields={["email", "password"]} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginPage;
