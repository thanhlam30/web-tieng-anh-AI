import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { message, Modal } from 'antd';
import ModalTitle from 'components/ModalTitle';
import { FastField, Form, Formik } from 'formik';
import { videoValues } from 'features/Video/initialAndValidateValues';
import InputField from 'customfield/InputField';
import { addCategoryVideo, setCategoryFormVisible, updateCategoryVideo } from 'features/Video/videoSlice';
import videoApi from 'api/videoApi';

VideoCategoriesAddForm.propTypes = {

};

function VideoCategoriesAddForm(props) {
    const [statusAction, setStatusAction] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { selectedCategoryVideo } = useSelector((state) => state.video);
    const formRef = useRef();
    const dispatch = useDispatch();


    const handleSubmitClick = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();

        }
    };

    const handleCancel = () => {
        dispatch(setCategoryFormVisible(false));
    };



    const handleSubmit = async (values, actions) => {
        const { id, name } = values;
        const category = { ...values };


        try {
            if (id) {
                await handleUpdate(category, actions);
            } else {
                await handleAddCategory(category, actions);

            }
        } catch (error) {
            console.log("loi");
        }
        setConfirmLoading(false)
        dispatch(setCategoryFormVisible(false));

    };


    const handleAddCategory = async (video, actions) => {
        setConfirmLoading(true);
        const serverResult = await videoApi.addCategoryVideo(video);

        if (serverResult.error) {
            actions.setErrors(serverResult.error);
            throw new Error();
        }

        message.success("Thêm thành công");
        dispatch(addCategoryVideo(serverResult));

        return serverResult.id;
    };


    const handleUpdate = async (video, actions) => {
        setConfirmLoading(true);
        const serverResult = await videoApi.updateCategoryVideo(video, video.id);
        if (serverResult.error) {
            actions.setErrors(serverResult.errors);
            throw new Error();
        }
        message.success("Cập nhật thành công");
        dispatch(updateCategoryVideo(serverResult));

    }


    return (
        <Modal
            title={<ModalTitle title={selectedCategoryVideo.id && 'Cập nhật'} />}
            visible={true}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            onOk={handleSubmitClick}

        >
            <Formik
                initialValues={selectedCategoryVideo}
                onSubmit={handleSubmit}
                innerRef={formRef}
                validationSchema={videoValues.validationSchema}
                enableReinitialize={true}
            >
                {(formikProps) => {
                    const { values, errors, touched, isSubmitting } = formikProps;
                    console.log({ values, errors, touched, isSubmitting });
                    return (
                        <Form>
                            <FastField
                                name='name'
                                component={InputField}
                                title="Tên Category"
                                titleCol={6}
                                inputCol={18}
                                isRequire={true}
                                placeholder='Ví dụ: Art and Culture'
                            />
                        </Form>
                    )
                }}

            </Formik>
        </Modal>
    );
}

export default VideoCategoriesAddForm;