
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ModalTitle from "components/ModalTitle";
import { FastField, Form, Formik } from "formik";
import InputField from "customfield/InputField";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, message, Space } from 'antd';
import { setBookFormVisible, addBook, fetchBooks } from 'features/Book/bookSlice';
import ImageField from 'customfield/ImageField';
import { bookValues } from 'features/Book/initialAndValidateValues';
import bookApi from 'api/bookApi';

BookAddForm.propTypes = {

};

function BookAddForm(props) {

    const [confirmLoading, setConfirmLoading] = useState(false);
    const { isBookFormVisible, selectedBook } = useSelector((state) => state.book)
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(setBookFormVisible(false));
    };


    const handleSubmit = async (values, actions) => {
        setConfirmLoading(true);
        const { id, image } = values;
        const book = { ...values };

        delete book.image;

        let bookIdWasSave = id;

        try {
            if (id) {
                await handleUpdate(book, actions);
            } else {
                bookIdWasSave = await handleAddBook(book, actions);

            }
            if (image && typeof image === "object") {
                await bookApi.updateBookImage(bookIdWasSave, image);

            }

        } catch (error) {
            console.log("loi");
        };
        setConfirmLoading(false);
        message.success("Thao tác thành công");
        dispatch(setBookFormVisible(false));
        dispatch(fetchBooks());



    };

    const handleAddBook = async (book, actions) => {
        const serverResult = await bookApi.addBook(book);

        if (serverResult.error) {
            actions.setErrors(serverResult.error);
            throw new Error();
        }

        // dispatch(addBook(serverResult));
        return serverResult.id;
    };


    const handleUpdate = async (book, actions) => {
        const serverResult = await bookApi.updateBook(book.id, book);

        if (serverResult.error) {
            actions.setErrors(serverResult.errors);
            throw new Error();
        }
        // message.success("Cập nhật thành công");

        // dispatch(setCategoryFormVisible(false));
    }



    const formRef = useRef();

    const handleSubmitClick = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();

        }
    }

    return (
        <Modal
            title={<ModalTitle title={selectedBook.id && 'Cập nhật'} />}
            visible={true}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            onOk={handleSubmitClick}
            width={800}
        >

            <Formik
                initialValues={selectedBook}
                validationSchema={bookValues.validationSchema}
                innerRef={formRef}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >

                {(formikProps) => {
                    const { values, errors, touched, isSubmitting } = formikProps;
                    console.log({ values, errors, touched, isSubmitting });
                    return (
                        <Form>
                            <Space size="large" direction="vertical" style={{ width: "100%" }}>
                                <FastField
                                    name='name'
                                    component={InputField}
                                    title="Tên bộ đề"
                                    titleCol={6}
                                    inputCol={18}
                                    isRequire={true}
                                    placeholder='Ví dụ: ETS 2021'
                                />

                                <FastField
                                    name="image"
                                    component={ImageField}
                                    title="Ảnh"
                                    titleCol={6}
                                    inputCol={18}
                                    heightPreview={200}
                                    widthPreview={500}
                                />
                            </Space>

                        </Form>
                    )
                }}
            </Formik>

        </Modal>
    );
}

export default BookAddForm;