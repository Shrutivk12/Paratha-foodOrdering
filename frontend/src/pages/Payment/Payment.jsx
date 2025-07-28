import React from 'react'
import './Payment.css'
import { assets } from '../../assets/assets'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import axios from 'axios';

const Payment = () => {
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const { id } = useParams();
    const [screenshot, setScreenshot] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!screenshot) return alert("Select screenshot");

        const formData = new FormData();
        formData.append("screenshot", screenshot);

        setLoading(true);
        try {
            const res = await axios.post(`${url}/order/${id}/payment`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (res.data.success) {
                alert("Screenshot uploaded!");
                navigate("/myorders");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to upload screenshot");
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className='payment'>
        <h2>Scan QR & Upload Screenshot</h2>
        <img src={assets.qrcode} alt="" />
        <form onSubmit={handleUpload} className='pay-form'>
            <div className="add-image-upload">
                <p>Upload Payment Screenshot</p>
                <label htmlFor="screenshot">
                    <img src={screenshot? URL.createObjectURL(screenshot): assets.upload_area} alt="" />
                </label>
                <input onChange={(e) => {setScreenshot(e.target.files[0])}} type="file" name="screenshot" id="screenshot" accept="image/*" hidden required />
            </div>
            <button type='submit' disabled={loading}>{loading? "Uploading..." : "Submit"}</button>
        </form>
    </div>
  )
}

export default Payment
