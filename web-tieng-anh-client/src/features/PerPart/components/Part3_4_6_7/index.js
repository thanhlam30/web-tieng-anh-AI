import { Button, Divider, Image, Space } from "antd";
import { setChoiceOfPart3_4_6_7 } from "features/PerPart/perPartSlice";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionGroup from "../QuestionGroup";
import "./style.scss";

Part3_4_6_7.propTypes = {
  questionGroup: PropTypes.object,
  numberPart: PropTypes.number,
};

Part3_4_6_7.defaultProps = {
  questionGroup: {
    image: "",
    transcript: "",
    paragraph: "",
    questions: [],
  },
  numberPart: 1,
};

function Part3_4_6_7({ questionGroup, numberPart }) {
  const dispatch = useDispatch();
  const isChoice = useSelector((state) => state.perPart.isChoiceOfPart3_4_6_7);

  const { image, paragraph, transcript, questions } = questionGroup;

  const audioRef = useRef();

  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.load();
  }

  const handleAnswersSubmit = () => {
    dispatch(setChoiceOfPart3_4_6_7(true));
  };

  useEffect(() => {
    dispatch(setChoiceOfPart3_4_6_7(false));
  }, [questionGroup]);

  return (
    <div className="part-3-4-6-7">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {image && (
          <div className="part-3-4-6-7__image" style={{ textAlign: "center" }}>
            <Image src={image} width={400} height={300} />
          </div>
        )}
        <div className="part-3-4-6-7__paragraph">
          {numberPart === "3" || numberPart === "4" ? (
            <audio controls ref={audioRef} style={{ width: "100%" }}>
              <source src={paragraph} type="audio/mp3" />
            </audio>
          ) : (
            <div>{parse(paragraph)}</div>
          )}
        </div>

        {isChoice && transcript && (
          <div>
            <Divider orientation="left">Transcript</Divider>
            <div className="part-3-4-6__transcript">{parse(transcript)}</div>
          </div>
        )}
        <Divider orientation="left">Câu hỏi</Divider>
        <div className="part-3-4-6__questions">
          <QuestionGroup questions={questions} isChoice={isChoice} />
        </div>

        {!isChoice && (
          <div style={{ textAlign: "center" }}>
            <Button
              size="large"
              type="primary"
              ghost
              onClick={handleAnswersSubmit}
            >
              Kiểm tra
            </Button>
          </div>
        )}
      </Space>
    </div>
  );
}

export default Part3_4_6_7;
