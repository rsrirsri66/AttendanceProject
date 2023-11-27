import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
//import imrt_logo from './imarticusmoblogo.png';

const Login = () => {
  const [phone, setPhone] = useState('+91');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const handleClick=()=> navigate('/StudentTable');

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      }
    }, auth);
  }

  const handleSend = () => {
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  }

  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        let user = result.user;
        console.log(user);
        alert('User signed in successfully');
      }).catch((error) => {
        alert('User couldn\'t sign in (bad verification code?)');
      });
    }
  }
  const handleVerify = () => {
    let confirmationResult = window.confirmationResult;
    confirmationResult.confirm(otp).then((result) => {
      let user = result.user;
      console.log(user);
      alert('User signed in successfully');
    }).catch((error) => {
      alert('User couldn\'t sign in (bad verification code?)');
    });
  }
  const handleCombinedClick=()=>{
    handleVerify();
    handleClick();
  }
  return (
    <div className='app__container'>
      <div id='logo'>
        {/* <img src={imrt_logo} alt="imarticus_logo" /> */}
      </div>

      <div id='sign_in'>
        <h2>Sign in to your account</h2>
      </div>

      {hasFilled ? (
        <>

<TextField
          sx={{ width: '240px' }}
          variant='outlined'
          label='OTP'
          value={otp}
          onChange={verifyOtp}
        />
        <button
            onClick={handleCombinedClick}
            variant='contained'
            sx={{ width: '240px', marginTop: '20px' }}
          >
            {'Verify OTP'}
          </button>
        </>
        
      ) : (
        <>
          <div>{'Phone number'}</div>
          <TextField
            sx={{ width: '240px' }}
            variant='outlined'
            autoComplete='off'
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <button
            onClick={handleSend}
            variant='contained'
            sx={{ width: '240px', marginTop: '20px' }}
          >
            {'Get OTP'}
          </button>
        </>
      )}

      <div id="recaptcha"></div>
      <div id='new_user'>
        <p>Are you a new user? sign up</p>
      </div>
    </div>
  );
}

export default Login;