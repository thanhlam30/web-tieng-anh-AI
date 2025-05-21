import React from 'react';
import PropTypes from 'prop-types';
import { DeleteTwoTone, EditTwoTone, InfoCircleTwoTone } from '@ant-design/icons';
import { Menu, Dropdown, Button, Modal, Typography, message } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { unwrapResult } from '@reduxjs/toolkit';
import './style.scss';
import { deleteCategory, setCategoryFormVisible, setCategoryUpdate } from 'features/Video/videoSlice';
VideoCategoriesAction.propTypes = {
    categoryId: PropTypes.number,
};


VideoCategoriesAction.defaultProps = {
    categoryId: require,
}

function VideoCategoriesAction(props) {
    const { confirm, Text } = Modal;
    const { categoryId } = props;
    const { videoCategory } = useSelector((state) => state.video);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        const category = videoCategory.find(c => c.id === categoryId);
        dispatch(setCategoryUpdate(category));
        dispatch(setCategoryFormVisible(true));
    }

    const handleDelete = () => {
        confirm({

            content: "Bạn có chắc chắn xóa không ?",
            async onOk() {
                try {
                    unwrapResult(await dispatch(deleteCategory({ categoryId })));
                    message.success(`Xóa thành công`);
                } catch (error) {
                    message.error("Xóa thất bại");
                }
            }
        })
    }

    const menu = (
        <Menu>
            <Menu.Item onClick={handleUpdate} >
                <div className="menu-adjust--center">

                    <EditTwoTone twoToneColor='#ad8b00' />
                    <span className='menu-title'>
                        Sửa thông tin
                    </span>
                </div>
            </Menu.Item>

            <Menu.Divider />
            <Menu.Item onClick={handleDelete} >
                <div className="menu-adjust--center">

                    <DeleteTwoTone twoToneColor='#a8071a' />
                    <span className='menu-title'>Xóa</span>
                </div>
            </Menu.Item>
        </Menu>
    );


    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <Button type="primary" ghost>
                Thao tác
            </Button>
        </Dropdown>
    );
}

export default VideoCategoriesAction;