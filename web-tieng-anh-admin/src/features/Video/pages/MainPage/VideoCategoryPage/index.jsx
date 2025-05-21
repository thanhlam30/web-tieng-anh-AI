import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoCategory, setCategoryFormVisible, setDefaultCategory } from 'features/Video/videoSlice';
import { Button, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import VideoCategoriesAddForm from 'features/Video/components/VideoCategoriesAddForm';
import VideoCategoriesTable from 'features/Video/components/VideoCategoriesTable';

VideoCategoryPage.propTypes = {

};

function VideoCategoryPage(props) {

    const { isCategoryFormVisible } = useSelector((state) => state.video)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchVideoCategory());
    }, []);

    const handleOnClick = () => {
        dispatch(setCategoryFormVisible(true));
        dispatch(setDefaultCategory());
    };
    return (

        <div className="video-category-page">
            <Space direction="vertical" style={{ width: "100%" }} size='large'>
                <div className='video-category-button--add'>
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        size='mediunm'
                        onClick={handleOnClick}
                    >
                        Thêm danh mục mới
                    </Button>
                </div>

                <div className="video-category-table">
                    <VideoCategoriesTable />
                </div>
            </Space>

            {isCategoryFormVisible && <VideoCategoriesAddForm />}
        </div>
    );
}

export default VideoCategoryPage;