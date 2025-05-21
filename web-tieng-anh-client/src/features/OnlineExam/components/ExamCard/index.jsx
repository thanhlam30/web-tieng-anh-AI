import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Row, Col, Slider } from 'antd';
ExamCard.propTypes = {
    listTest: PropTypes.array,
    onClick: PropTypes.func,

};

ExamCard.defaultProps = {
    listTest: [],
    onClick: null,

}



function ExamCard(props) {
    const { listTest, onClick } = props;

    function handleClick(test) {
        if (onClick) {
            onClick(test);
        }
    }
    return (
        <>
            {listTest.map((test, index) => (
                <Col xl={{ span: 6 }} lg={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }} key={index}>
                    <div className="exam_card" onClick={() => handleClick(test)}>
                        <div className="exam_card_count">
                            <span>{index + 1}</span>
                        </div>
                        <div className="exam_card_subject">
                            <div className="exam_card_subject--name">{test.name}</div>

                        </div>
                    </div>
                </Col>
            ))}
        </>

    );
}

export default ExamCard;