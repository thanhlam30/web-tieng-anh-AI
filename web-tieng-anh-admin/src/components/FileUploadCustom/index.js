import React, { useState } from "react";
import PropTypes from "prop-types";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import commonFuc from "utils/commonFuc";

const FileUploadCustom = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await commonFuc.getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = (info) => {
    setFileList(info.fileList);
  };

  const handleAction = (file) => {
    console.log("file: ", file);
    const formData = new FormData();
    formData.append("file", file);
    axios.post(
      "http://localhost:8081/upload1",
      {
        name: "fileName1.png",
        file: "dsdsa",
      },
      {
        headers: {},
        params: {
          file: formData,
        },
      }
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action={handleAction}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default FileUploadCustom;
