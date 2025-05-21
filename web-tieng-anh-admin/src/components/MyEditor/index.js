import { Button } from "antd";
import PropTypes from "prop-types";
import ImageUploader from "quill-image-uploader";
import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";

Quill.register("modules/imageUploader", ImageUploader);

MyEditor.propTypes = {
  content: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

MyEditor.defaultProps = {
  content: "",
  placeholder: "",
  onChange: null,
};

function MyEditor({ content, placeholder, onChange }) {
  let quillObj;

  const handleChange = (content) => {
    if (!onChange) return;

    onChange(content);
  };

  return (
    <div>
      <ReactQuill
        ref={(el) => {
          quillObj = el;
        }}
        value={content}
        modules={{
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],

              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],

              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["link", "image"],
              ["clean"],
            ],
          },
          imageUploader: {
            upload: (file) => {
              return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append("image", file);

                fetch(
                  "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
                  {
                    method: "POST",
                    body: formData,
                  }
                )
                  .then((response) => response.json())
                  .then((result) => {
                    console.log(result);
                    resolve(result.data.url);
                  })
                  .catch((error) => {
                    reject("Upload failed");
                    console.error("Error:", error);
                  });
              });
            },
          },
        }}
        placeholder={placeholder}
        onChange={(content, delta, source, editor) =>
          handleChange(content, delta, source, editor)
        }
        id="editor"
      />
    </div>
  );
}

export default MyEditor;
