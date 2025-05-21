import React from "react";
import PropTypes from "prop-types";
import { Col, Row, List, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

TestPartList.propTypes = {
  books: PropTypes.array,
  numberPart: PropTypes.string,
};

TestPartList.defaultProps = {
  books: [],
  numberPart: "1",
};

function TestPartList({ books, numberPart }) {
  return (
    <div className="test-part-list">
      <Row gutter={[24, 24]}>
        {books.map((bookEle, index) => {
          const { name, exams } = bookEle;
          
          return (
            <Col xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }} key={index}>
              <List
                header={<Title level={5}>{name}</Title>}
                bordered
                dataSource={exams}
                renderItem={(item, index) => (
                  <List.Item>
                    <Link
                      to={`/parts/test/${item.slug}/${numberPart}`}
                      style={{ fontWeight: "bold" }}
                    >
                      {index + 1}. {`Part ${numberPart}`} - {item.name}
                    </Link>
                  </List.Item>
                )}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default TestPartList;
