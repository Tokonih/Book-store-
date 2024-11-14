import React, { useEffect } from "react";
import Form from "../../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
// import { adminSignupHandler } from "../../actions/accountActions";
import {
  bookValidationSchema,
  FormikConfigType,
  IBook,
} from "../../components/Form/FormikConfig";
import { Modal } from "react-bootstrap";
import { createBook, getAllBooks, resetCreateBookState } from "../../actions/bookActions";
import { showToast } from "../../common/toast";

interface CreateBookModalProps {
  isCreateModalOpen: boolean;
  closeCreateModal: () => void;
}

const CreateBook: React.FC<CreateBookModalProps> = ({
  isCreateModalOpen,
  closeCreateModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const useToken = sessionStorage.getItem("authToken");
  const { success } = useSelector((state: RootState) => state.createBookReducer);

  useEffect(() => {
    if (success) {
      closeCreateModal();
      showToast.success("Book Created")
      dispatch(resetCreateBookState());
      dispatch(getAllBooks() as any);
    }
  }, [success, closeCreateModal, dispatch]);
  const formikConfig: FormikConfigType = {
    initValues: {
      title: "",
      description: "",
      images: "",
    },
    validationSchema: bookValidationSchema,
    onSubmit: (values: IBook) => {
      const bookData = {
        title: values.title,
        description: values.description,
        images: values.images,
      };

      dispatch(createBook(bookData));
    },
    buttonTitle: "Create Book",
  };

  return (
    <Modal show={isCreateModalOpen} onHide={closeCreateModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex justify-center">
          <div className="w-[100%]">
            <Form
              formikConfig={formikConfig}
              fields={["title", "description", "images"]}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateBook;
