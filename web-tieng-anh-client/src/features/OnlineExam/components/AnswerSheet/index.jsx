import { ReadOutlined, SoundOutlined } from '@ant-design/icons';
import { Affix, Collapse } from 'antd';
import { titlEachPart } from 'constants/ToeicSheet';
import SubAnswer from 'features/OnlineExam/components/SubAnswer';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useLoadDataAfterRefresh from 'utils/useLoadDataAfterRefresh';
import useWindowUnloadEffect from 'utils/useWindowUnloadEffect';

AnswerSheet.propTypes = {

};

function AnswerSheet(props) {

    useLoadDataAfterRefresh();
    const [expandIconPosition, setExpandIconPosition] = useState('left');
    const { Panel } = Collapse;
    const { examSelected } = useSelector(state => state.exam);
    const [activeKey, setActiveKey] = useState(examSelected.toString());
    useEffect(() => {
        setActiveKey(examSelected.toString())
    }, [examSelected])







    const { answers } = useSelector(state => state.exam);
    const answers_part1 = answers.filter(answer => answer.stt <= 6);
    const answers_part2 = answers.filter(answer => answer.stt > 6 && answer.stt <= 31);
    const answers_part3 = answers.filter(answer => answer.stt > 31 && answer.stt <= 70);
    const answers_part4 = answers.filter(answer => answer.stt > 70 && answer.stt <= 100);
    const answers_part5 = answers.filter(answer => answer.stt > 100 && answer.stt <= 130);
    const answers_part6 = answers.filter(answer => answer.stt > 130 && answer.stt <= 146);
    const answers_part7 = answers.filter(answer => answer.stt > 146 && answer.stt <= 200);


    useWindowUnloadEffect(() => {
        localStorage.setItem('answers', JSON.stringify(answers));
    }, true);




    function handleChange(key) {
        setActiveKey(key);
    }


    return (
        <div>
            <Affix offsetTop={60} >
                <Collapse accordion activeKey={activeKey} onChange={handleChange} expandIconPosition={expandIconPosition} >

                    <Panel header="Part 1" key="1" extra={<SoundOutlined />}>
                        <SubAnswer title={titlEachPart.PART1} data={answers_part1} />
                    </Panel>
                    {/* className="notify" */}
                    <Panel header="Part 2" key="2" extra={<SoundOutlined />} >
                        <SubAnswer title={titlEachPart.PART2} data={answers_part2} />
                    </Panel>
                    <Panel header="Part 3" key="3" extra={<SoundOutlined />}  >
                        <SubAnswer title={titlEachPart.PART3} data={answers_part3} />
                    </Panel>
                    <Panel header="Part 4" key="4" extra={<SoundOutlined />}>
                        <SubAnswer title={titlEachPart.PART4} data={answers_part4} />
                    </Panel>
                    <Panel header="Part 5" key="5" extra={<ReadOutlined />}>
                        <SubAnswer title={titlEachPart.PART5} data={answers_part5} />
                    </Panel>
                    <Panel header="Part 6" key="6" extra={<ReadOutlined />}>
                        <SubAnswer title={titlEachPart.PART6} data={answers_part6} />
                    </Panel>
                    <Panel header="Part 7" key="7" extra={<ReadOutlined />}>
                        <SubAnswer title={titlEachPart.PART7} data={answers_part7} />
                    </Panel>

                </Collapse>
            </Affix>
        </div>
    );
}

export default AnswerSheet;