import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../../store/actions';
import styles from "./otppage.module.scss";

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = location.state?.email || '';
  const otp = location.state?.otp || '';

  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer === 0) { setCanResend(true); return; }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0)
      inputRefs.current[index - 1].focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = ['', '', '', '', '', ''];
    pasted.forEach((char, i) => { if (/\d/.test(char)) newOtp[i] = char; });
    setOtpValues(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)].focus();
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    setOtpValues(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0].focus();
    navigate('/register');
  };

  const handleVerify = () => {
    const enteredOtp = otpValues.join('');
    if (enteredOtp.length < 6) { setError('Please enter all 6 digits'); return; }
    if (enteredOtp !== otp) { setError('Invalid OTP. Please try again.'); setSuccess(''); return; }

    dispatch(verifyOtp({
      payload: { email, otp: enteredOtp },
      callback: {
        success: () => {
          setSuccess('OTP verified! Redirecting...');
          setError('');
          setTimeout(() => navigate('/login'), 1500);
        },
        failure: () => { setError('Verification failed. Try again.'); setSuccess(''); },
      },
    }));
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>

        {/* Shield Icon */}
        <div className={styles.iconWrap}>
          <div className={styles.iconCircle}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3a8f5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/>
              <rect x="9" y="8" width="6" height="7" rx="1" stroke="#3a8f5f" strokeWidth="1.6"/>
              <circle cx="12" cy="11" r="1.2" fill="#3a8f5f"/>
              <line x1="12" y1="12.2" x2="12" y2="14" stroke="#3a8f5f" strokeWidth="1.4"/>
            </svg>
          </div>
          <div className={styles.checkBadge}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="6" fill="#3a8f5f"/>
              <path d="M3 6l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h1 className={styles.title}>Verify OTP</h1>
        <p className={styles.subtitle}>Enter the 6-digit code sent to</p>
        <p className={styles.emailText}>{email}</p>

        {error && <div className={styles.errorMsg}>{error}</div>}
        {success && <div className={styles.successMsg}>{success}</div>}

        {/* OTP Boxes */}
        <div className={styles.otpBoxes} onPaste={handlePaste}>
          {otpValues.map((val, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`${styles.otpInput} ${val ? styles.filled : ''} ${index === otpValues.findIndex(v => v === '') ? styles.active : ''}`}
            />
          ))}
        </div>

        {/* Resend */}
        <div className={styles.resendRow}>
          Didn't receive the code?{' '}
          <span
            className={canResend ? styles.resendActive : styles.resendDisabled}
            onClick={handleResend}
          >
            Resend OTP {!canResend && `(00:${pad(timer)})`}
          </span>
        </div>

        <button className={styles.verifyButton} onClick={handleVerify}>
          Verify
        </button>

        <button className={styles.cancelButton} onClick={() => navigate('/register')}>
          Cancel
        </button>

      </div>
    </div>
  );
};

export default Otp;