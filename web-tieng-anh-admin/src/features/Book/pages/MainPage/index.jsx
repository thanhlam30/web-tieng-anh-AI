import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Space } from 'antd';
import BookTable from 'features/Book/components/BookTable';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import BookAddForm from 'features/Book/components/BookAddForm';
import { setBookFormVisible, fetchBooks, setBookDefault } from '../../bookSlice';
MainPage.propTypes = {

};




function MainPage(props) {
    const { isBookFormVisible, books } = useSelector((state) => state.book);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBooks());
    }, [])

    const handleAddClick = () => {
        dispatch(setBookFormVisible(true));
        dispatch(setBookDefault());
    };

    return (
        <div id='book-main-page'>
            <Space direction="vertical" style={{ width: "100%" }}>

                <div className='book-category-button--add'>
                    <Button
                        type="primary"
                        onClick={handleAddClick}
                        icon={<PlusCircleOutlined />}
                        size='mediunm'
                    >
                        Thêm bộ đề mới
                    </Button>
                </div>

                <div className="book-category-table">
                    <BookTable />
                </div>

            </Space>

            {isBookFormVisible && <BookAddForm />}

        </div>
    );
}

export default MainPage;