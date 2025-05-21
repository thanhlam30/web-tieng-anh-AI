import { ExclamationCircleOutlined, HighlightOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tabs } from 'antd';
import BlockLevel from 'components/BlockLevel';
import { dataSelectLevel } from 'constants/dataSelectLevel';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AudioCustom from '../AudioCustom';
import { setSubActive, setSeekTo, setIsPlay, setSttInSub } from 'features/Video/videoSlice';
import './style.scss';


VideoInfo.propTypes = {
    videoWords: PropTypes.array,
    categoryName: PropTypes.string,
    name: PropTypes.string,
    level: PropTypes.number,
    description: PropTypes.string,
    slugCategory: PropTypes.string,
    onSeek: PropTypes.func,
};

VideoInfo.defaultProps = {
    videoWords: [],
    categoryName: '',
    name: '',
    level: 0,
    description: '',
    slugCategory: '',
    onSeek: null,
}
const URL = 'https://toeicexamstore.xyz/upload/audiotoeic/part1875.mp3';






function getLevelTitle(level) {
    if (level) {
        const temp = dataSelectLevel.find(element => element.levelValue === level);
        return temp.levelName;
    }
}


function VideoInfo(props) {
    const dispatch = useDispatch();
    const { TabPane } = Tabs;
    const { videoWords, categoryName, name, level, description, slugCategory, onSeek } = props;
    const { transcript } = useSelector((state) => state.video);
    const data = [];
    let audio;


    const columns = [
        {
            title: `Total: ${videoWords.length}`,
            dataIndex: 'total',
            key: 'total',
            render: (object) => (
                <div className='cell_sound'>{object.audio}&nbsp;&nbsp;{object.keyword}</div>
            )
        },
        {
            title: 'Frequency',
            dataIndex: 'frequency',
            key: 'frequency',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.frequency - b.frequency,
        },
        {
            title: 'Word root',
            key: 'wordroot',
            dataIndex: 'wordroot',
        },
        {
            title: '',
            key: 'play',
            align: 'center',


            render: (text, record, index) => (
                <div>
                    <Button
                        type="primary"
                        shape="round"
                        icon={<PlayCircleOutlined />}
                        size='small'
                        onClick={() => handleWordClick(text, record, index)}
                    >
                        Play
                    </Button>
                </div >
            )
        },
    ];

    const handleAudioClick = (url) => {

        // da co audio
        if (audio)
            audio.pause();

        audio = new Audio(url);
        audio.load();
        audio.play();
    };

    videoWords.map((element, index) => {

        data.push({
            key: element.id,

            total: {
                audio: <AudioCustom
                    onClick={handleAudioClick}
                    url={element.sound} id={element.id} />, keyword: element.name
            },
            frequency: element.frequency,
            wordroot: element.origin,

        })

    });

    const handleWordClick = (text, record, index) => {
        const temp = text.total.keyword;
        let regex = `${temp}`;
        let reExp = new RegExp(regex, "i");

        const tempScript = transcript.find(x => {
            if (reExp.exec(x.content) !== null) {
                return x;
            }

        })

        if (tempScript) {
            dispatch(setSubActive(tempScript.id));
            dispatch(setSttInSub(tempScript.stt));
            dispatch(setIsPlay(true));

            if (onSeek) {
                onSeek(Math.trunc(tempScript.start / 1000))
            }
        }


    }


    return (
        <div className="info_wrapper">

            <Tabs defaultActiveKey="1" size="large" >
                <TabPane
                    tab={
                        <span>
                            <ExclamationCircleOutlined />
                            Video Infomation
                        </span>
                    }
                    key="1"
                >
                    <Space direction="vertical">
                        <div className="info_name">
                            {name}
                        </div>
                        <div className="info_level-and-subject">
                            <BlockLevel level={level.toString()} width="40" height="40" fontsize='1.8rem' />
                            <div className='info_level-and-subject--upSize'>
                                &nbsp; {getLevelTitle(level)} | <Link to={"/videos/" + slugCategory}>{categoryName}</Link>
                            </div>
                        </div>
                        <div className="info_description">

                            {description}
                        </div>
                    </Space>

                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <HighlightOutlined />
                            Vocabulary
                        </span>
                    }
                    key="2"
                >
                    <Table pagination={false} scroll={{ y: 400 }} columns={columns} dataSource={data} />
                </TabPane>
            </Tabs>,
        </div>
    );
}

export default VideoInfo;