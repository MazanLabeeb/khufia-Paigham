import { useState } from "react";
import "./form.styles.scss";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { AiOutlineWhatsApp } from 'react-icons/ai';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const Form = () => {
    const [phone, setPhone] = useState();

    const [fields, setFields] = useState({
        message: ""
    })

    const { message } = fields;

    const formHandler = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value })
    }

    const submitHandler = () => {
        if (!phone) return toast.error("براہ کرم درست فون نمبر لکھیں")
        if (!message) return toast.error("براہ کرم پیغام  لکھیں")


        let data = {
            'to': phone,
            'message': message
        };
        let config = {
            method: 'post',
            url: '/api/sendmessage',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios(config)
            .then(function () {
                toast.success('آپکا پیغام بھیج دیا گیا ہے۔');
                setFields({
                    message: ""
                })
            })
            .catch(function (error) {
                let getErrMsgFrmApi = error?.response?.data?.error;
                (getErrMsgFrmApi) ? toast.error(getErrMsgFrmApi) : toast.error("Ooops! Something went wrong.");
                process.env.MODE === "development" && console.log(error);
            });




    }

    return <>
        <Toaster />
        <div className="form-fields mt-2">
            <label htmlFor="to">وصول کنندہ کا واٹس سیپ نمبر</label>
            <PhoneInput
                placeholder="92 306 1234567"
                value={phone}
                country={"pk"}
                inputClass="input"
                dropdownClass="dropdown"
                inputStyle={{
                    width: "340px",
                    backgroundColor: "transparent",
                    color: "white"
                }}
                onChange={phone => setPhone(phone)}
            />
        </div>

        <div className="form-fields mt-2">
            <label htmlFor="message">پیغام</label>
            <textarea name="message" id="message" rows="5" onChange={formHandler} value={message} />
        </div>
        <div className="btn-container mt-2">
            <button className="btn-submit" onClick={submitHandler}>پیغام رخصت کریں <AiOutlineWhatsApp style={{
                fontSize: "32px",
                marginBottom: "-10px",
                marginLeft: "10px"
            }} /></button>
        </div>
    </>
}

export default Form;