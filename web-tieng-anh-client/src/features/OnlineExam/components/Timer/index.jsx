import { FieldTimeOutlined, MenuFoldOutlined, SolutionOutlined } from '@ant-design/icons';
import { Affix, Button, Col, Drawer, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useWindowUnloadEffect from 'utils/useWindowUnloadEffect';
import { useDispatch } from 'react-redux';
import './style.scss';
import { setIsSubmit } from 'features/OnlineExam/onlineExamSlice';
import AnswerSheet from '../AnswerSheet';
Timer.propTypes = {
    page: PropTypes.string,
};
Timer.defaultProps = {
    page: '',
};


function Timer(props) {
    const { page } = props;
    const initialMinute = 120;
    const initialSeconds = 0;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [activeDrawer, setActiveDrawer] = useState(false);
    const dispatch = useDispatch();



    useEffect(() => {
        let timeTemp = localStorage.getItem('timeRemain');
        if (timeTemp != "undefined" && timeTemp != null) {

            let time = JSON.parse(timeTemp);

            setMinutes(time.minute);
            setSeconds(time.second);
        }
    }, [])

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }

        }, 1000);

        if (seconds === 0 && minutes === 0) {
            modal.warning(config);
        }
        return () => {
            clearInterval(myInterval);

        };
    });



    // modal timeout config
    const ReachableContext = React.createContext();
    const [modal, contextHolder] = Modal.useModal();

    const config = {
        title: 'TimeOut',
        content: (
            <>
                <ReachableContext.Consumer>{name => `${name} !`}</ReachableContext.Consumer>
            </>
        ),
        onOk() {
            history.push(`/exams/${testId}/result`);
            dispatch(setIsSubmit(true));
            localStorage.setItem('isSubmit', true);
        },
        onCancel() {
            history.push(`/exams/${testId}/result`);
            dispatch(setIsSubmit(true));
            localStorage.setItem('isSubmit', true);
        }
    };


    useWindowUnloadEffect(() => {
        let timeRemain = {
            minute: minutes,
            second: seconds,
        }
        localStorage.setItem('timeRemain', JSON.stringify(timeRemain));

    }, true);

    const history = useHistory();
    const param = useParams();
    const { testId } = param;

    const handleOnClick = () => {
        history.push(`/exams/${testId}/checkout`);
    }


    const handleOnClose = () => {
        setActiveDrawer(false);
    }

    const handleOnOpen = () => {
        setActiveDrawer(true);
    }

    return (

        <Affix offsetTop={0}>
            <div className='timer_wrapper'>
                <Row justify="center" align="middle" gutter={[]}>
                    <Drawer
                        title="Your answer sheet !"
                        width='80%'
                        onClose={handleOnClose}
                        visible={activeDrawer}
                    >
                        <AnswerSheet />
                    </Drawer>

                    {

                        page !== 'checkout' ?

                            <>
                                <Col xl={{ span: 0 }} lg={{ span: 0 }} md={{ span: 6 }} sm={{ span: 8 }} xs={{ span: 12 }}>

                                    <Button onClick={handleOnOpen} size='large' block>
                                        <MenuFoldOutlined /> Answer Sheet
                                    </Button>
                                </Col>

                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 6 }} sm={{ span: 8 }} xs={{ span: 12 }}>
                                    <div className='countdown_wrapper' >
                                        {minutes === 0 && seconds === 0
                                            ? <span className='countdown_timer timeout'>Time Out</span>
                                            : <span className='countdown_timer' > <FieldTimeOutlined style={{ fontSize: '3rem' }} /> {minutes > 10 ? minutes : `0${minutes}`}<span>m</span> {seconds < 10 ? `0${seconds}` : seconds}<span>s</span> </span>

                                        }
                                    </div>
                                </Col>

                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 6 }} sm={{ span: 8 }} xs={{ span: 0 }}>
                                    <Button onClick={handleOnClick} size='large' block>
                                        <SolutionOutlined /> <b>Checkout</b>
                                    </Button>
                                </Col>

                            </>
                            :
                            <Col >
                                <div >
                                    {minutes === 0 && seconds === 0
                                        ? <span className='countdown_timer timeout'>Time Out</span>
                                        : <span className='countdown_timer' > <FieldTimeOutlined style={{ fontSize: '3rem' }} /> {minutes > 10 ? minutes : `0${minutes}`}<span>m</span> {seconds < 10 ? `0${seconds}` : seconds}<span>s</span> </span>

                                    }
                                </div>
                            </Col>


                    }
                </Row>
            </div>

            <ReachableContext.Provider value="Go to result page ">

                {contextHolder}
            </ReachableContext.Provider>
        </Affix >






    )
}

export default Timer;