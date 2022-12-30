import React, { useState, useContext, useEffect } from "react";
import LeftScreen from "../Components/LeftScreen";
import OTPInput, { ResendOTP } from "otp-input-react";
import "../Styles/Otp.css";
import axios from "axios";
import { Config } from "../Config/Config";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { MyContext } from "../context";

function Otp() {
  const { setAdminID } = useContext(MyContext);
  const [OTP, setOTP] = useState("");
  const Navigate = useNavigate();

  const submitOTP = async () => {
    try {
      if (OTP.length == 6) {
        const values = {
          otp: OTP,
        };
        const data = await axios.post(`${Config.api}/user/verifyotp`, values);
        toast.success(data.data.message);
        setAdminID(data.data.userId);
        localStorage.setItem("id", data.data.userId);
        Navigate("/newpassword");
      } else {
        toast.error("Plese enter otp");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="head-home">
      <LeftScreen headline={"It’s you!"} paragraph={" Verifying the OTP"} />
      <div className="Right">
        <div className="form-head">
          <form>
            <div className="label-input-head">
              <label htmlFor="email" className="login-label ml-1">
                OTP
              </label>
              <div className="otp-head">
                <OTPInput
                  id="otp-input"
                  value={OTP}
                  onChange={setOTP}
                  autoFocus
                  OTPLength={6}
                  otpType="any"
                  disabled={false}
                  secure
                />
              </div>

              {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}
            </div>

            <div>
              <button
                className="login-btn"
                type="button"
                onClick={() => submitOTP()}
              >
                VERIFY
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Otp;
