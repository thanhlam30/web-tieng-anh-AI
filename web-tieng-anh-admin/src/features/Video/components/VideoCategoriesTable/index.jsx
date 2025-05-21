import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Space } from 'antd';
import { useSelector } from 'react-redux';
import VideoCategoriesAction from '../VideoCategoriesAction';

VideoCategoriesTable.propTypes = {

};


const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',

    },
    {
        title: 'Tên danh mục',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, record) => <VideoCategoriesAction categoryId={record.key} />,
    },

];

function VideoCategoriesTable(props) {
    const { videoCategory } = useSelector((state) => state.video);
    const data = []
    if (videoCategory.length > 0) {
        videoCategory.forEach((element, index) => {
            let temp = {
                key: element.id,
                name: element.name,
                stt: index + 1
            };
            data.push(temp);
        })
    }
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={true}
            scroll={{ y: 420 }}
            style={{ height: '538px' }}
        />
    );
}

export default VideoCategoriesTable;