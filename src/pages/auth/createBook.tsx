import React from "react";
import Form from "../../components/Form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
// import { adminSignupHandler } from "../../actions/accountActions";
import { bookValidationSchema, FormikConfigType, IBook } from "../../components/Form/FormikConfig";
import { Modal } from "react-bootstrap";
import { createBook } from "../../actions/bookActions";

interface CreateBookModalProps {
  isCreateModalOpen: boolean;
  closeCreateModal: () => void;
}

const CreateBook: React.FC<CreateBookModalProps> = ({ isCreateModalOpen, closeCreateModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const useToken = sessionStorage.getItem("authToken")
  const formikConfig: FormikConfigType = {
    initValues: {
      title: "",
      description: "",
      images: ""
    },
    validationSchema: bookValidationSchema,
    onSubmit: (values: IBook) => {
      const bookData = {
        title: values.title,
        description: values.description,
        images: values.images,
      };
      console.log(bookData)
      dispatch(createBook(bookData));
    },
    buttonTitle: "Book Up",
  };

  return (
    <Modal show={isCreateModalOpen} onHide={closeCreateModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex justify-center">
          <div className="w-[100%]">
            <Form formikConfig={formikConfig} fields={["title","description","images"]} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateBook;
