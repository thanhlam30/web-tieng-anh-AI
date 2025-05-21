import React from 'react';
import PropTypes from 'prop-types';
import BookAction from '../BookAction';
import { useSelector } from 'react-redux';
import { Table, Tag, Space, Image } from 'antd';
import { errorImage } from 'constants/defaultImage';
BookTable.propTypes = {

};



const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',

    },
    {
        title: 'Tên bộ đề ',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Hình ảnh ',
        dataIndex: 'image',
        key: 'image',
        render: (text, record) =>
            <Image
                width={120}
                src={text ? text : errorImage}
                height={80}
                fallback={errorImage}
                style={{ objectFit: 'cover', backgroundPosition: 'center center' }}


            />
        // <img className="book_img" src={text} alt='hình ảnh' />
    },
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, record) => <BookAction bookId={record.key} />,
    },

];

function BookTable(props) {
    const { books } = useSelector((state) => state.book);
    console.log(books);
    const data = []
    if (books.length > 0) {
        books.forEach((element, index) => {
            let temp = {
                key: element.id,
                name: element.name,
                image: element.image,
                stt: index + 1
            };
            data.push(temp);
        })
    }
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ y: 420 }}
            style={{ height: '490px' }}
        />
    );
}

export default BookTable;