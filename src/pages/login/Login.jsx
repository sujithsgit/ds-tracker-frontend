import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authUser, fetchDashboard } from '../../store/actions';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // ✅ Validation errors
  const [errors, setErrors] = useState({ email: '', password: '' });

  // ✅ Validate email format
  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Enter a valid email (e.g. name@gmail.com)';
    return '';
  };

  // ✅ Validate password
  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  // ✅ Real-time validation on change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors(prev => ({ ...prev, password: validatePassword(value) }));
  };

  const handleSubmit = () => {
    // ✅ Validate before submit
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setErrors({ email: emailErr, password: passwordErr });

    if (emailErr || passwordErr) return; // ✅ Stop if errors

    const payload = {
      username: email,
      password: password
    };

    dispatch(authUser({
      payload: payload,
      callback: {
        success: (data) => {
          localStorage.setItem('token', data.token);
          dispatch(fetchDashboard({
            callback: {
              success: (dashboardData) => {
                if (dashboardData?.resolutionTitle) {
                  console.log(dashboardData, "dashboardData");
                  navigate('/dashboard');
                } else {
                  navigate('/');
                  console.log(dashboardData, "dashboardData");
                }
              },
              failure: () => {
                navigate('/dashboard');
              }
            }
          }));
        },
        error: (e) => {
          console.log(e);
          // ✅ Wrong credentials error
          setErrors(prev => ({ ...prev, email: 'Invalid email or password' }));
        }
      }
    }));
  };

  // ✅ Enter key support
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className={styles.adminLogin}>
      <div className={styles.loginContainer}>
        <div className={styles.formPanel}>
          <div className={styles.formWrapper}>
            <div className={styles.formCard}>
              {/* Header */}
              <div className={styles.formHeader}>
                <div className={styles.headerIcon}>
                  <Shield className={styles.icon} />
                </div>
                <h2>Welcome Back</h2>
                <p>Enter your credentials to access the WebSite</p>
              </div>

              {/* Login Form */}
              <div className={styles.formContent}>

                {/* Email Input */}
                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <div className={`${styles.inputWrapper} ${errors.email ? styles.inputError : ''}`}>
                    <div className={styles.inputIcon}>
                      <Mail className={styles.icon} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter your email (e.g. name@gmail.com)"
                      className={styles.formInput}
                    />
                  </div>
                  {/* ✅ Error message */}
                  {errors.email && (
                    <p className={styles.errorText}>⚠ {errors.email}</p>
                  )}
                </div>

                {/* Password Input */}
                <div className={styles.formGroup}>
                  <label>Password</label>
                  <div className={`${styles.inputWrapper} ${errors.password ? styles.inputError : ''}`}>
                    <div className={styles.inputIcon}>
                      <Lock className={styles.icon} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter your password"
                      className={`${styles.formInput} ${styles.passwordInput}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={styles.togglePassword}
                    >
                      {showPassword ? <EyeOff className={styles.icon} /> : <Eye className={styles.icon} />}
                    </button>
                  </div>
                  {/* ✅ Error message */}
                  {errors.password && (
                    <p className={styles.errorText}>⚠ {errors.password}</p>
                  )}
                </div>

                {/* Login Button */}
                <button onClick={handleSubmit} className={styles.loginButton}>
                  Login
                </button>

              </div>

              {/* Footer */}
              <div className={styles.formFooter}>
                <p>
                  New here? <button className={styles.supportLink} onClick={() => navigate("/register")}>Create Account</button>
                </p>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className={styles.mobileFooter}>
              <p>© 2026 Resolution Tracker Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;