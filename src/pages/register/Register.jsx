import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './register.module.scss';
import regImg from "../../assets/regImg.jpg";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { registerUser } from '../../store/actions';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

 
  const validateName = (value) => {
    if (!value.trim()) return 'Name is required';
    if (value.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Enter a valid email (e.g. name@gmail.com)';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const validateConfirmPassword = (value, password) => {
    if (!value) return 'Please confirm your password';
    if (value !== password) return 'Passwords do not match';
    return '';
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = '';
    if (name === 'name') error = validateName(value);
    if (name === 'email') error = validateEmail(value);
    if (name === 'password') {
      error = validatePassword(value);
      
      if (formData.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: validateConfirmPassword(formData.confirmPassword, value)
        }));
      }
    }
    if (name === 'confirmPassword') error = validateConfirmPassword(value, formData.password);

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = () => {
  
    const nameErr = validateName(formData.name);
    const emailErr = validateEmail(formData.email);
    const passwordErr = validatePassword(formData.password);
    const confirmErr = validateConfirmPassword(formData.confirmPassword, formData.password);

    setErrors({
      name: nameErr,
      email: emailErr,
      password: passwordErr,
      confirmPassword: confirmErr
    });

    if (nameErr || emailErr || passwordErr || confirmErr) return; 

    dispatch(
      registerUser({
        payload: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        callback: {
          success: (data) => {
            if (data.startsWith("OTP:")) {
              const otpCode = data.split(":")[1];
              alert(`Your OTP: ${otpCode}`);
              navigate("/otp", { state: { email: formData.email, otp: otpCode } });
            } else {
              alert(data);
            }
          },
          failure: () => {
            alert("Register failed");
          },
        },
      })
    );
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Left Side - Image */}
        <div className={styles.left}>
          <div className={styles.imageContent}>
            <div className={styles.gradientBg}>
              <div className={styles.dashboardPreview}>
                <img
                  src={regImg}
                  alt="Dashboard Preview"
                  className={styles.previewImage}
                />
                <div className={styles.overlayContent}>
                  <h2>Effortlessly manage your team and operations.</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={styles.right}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h1>Create an Account</h1>
              <p>Join now to streamline your experience from day one.</p>
            </div>

            <div className={styles.registerForm}>

              {/* Name */}
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your full name"
                  className={errors.name ? styles.inputError : ''}
                />
                {errors.name && <p className={styles.errorText}>⚠ {errors.name}</p>}
              </div>

              {/* Email */}
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your email (e.g. name@gmail.com)"
                  className={errors.email ? styles.inputError : ''}
                />
                {errors.email && <p className={styles.errorText}>⚠ {errors.email}</p>}
              </div>

              {/* Password */}
              <div className={styles.formGroup}>
                <label>Password</label>
                <div className={`${styles.passwordInput} ${errors.password ? styles.inputError : ''}`}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Minimum 6 characters"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className={styles.errorText}>⚠ {errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className={styles.formGroup}>
                <label>Confirm Password</label>
                <div className={`${styles.passwordInput} ${errors.confirmPassword ? styles.inputError : ''}`}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className={styles.errorText}>⚠ {errors.confirmPassword}</p>}
              </div>

              <button onClick={handleSubmit} className={styles.registerButton}>
                Register
              </button>

              <div className={styles.signinLink}>
                Already Have An Account?{' '}
                <span style={{ color: "#667EEA", cursor: "pointer" }} onClick={() => navigate("/login")}>
                  Sign In.
                </span>
              </div>
            </div>

            <div className={styles.footer}>
              <span>Copyright © 2025 Sellora Enterprises LTD.</span>
              <a href="#privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;