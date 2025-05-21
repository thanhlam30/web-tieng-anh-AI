import { message } from "antd";
import * as Yup from "yup";

export const bookValues = {
    initial: {
        name: "",
        image: ''
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Tên không được bỏ trống"),
        
    }),
};

