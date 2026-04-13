import React from 'react';
import styles from './logoutsuccess.module.scss';

const LogoutSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.successIllustration}>
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
            {/* Confetti particles */}
            <circle cx="40" cy="35" r="3" fill="#F5C563" className={styles.confetti1} />
            <rect x="120" y="40" width="5" height="5" fill="#E89B6B" className={styles.confetti2} transform="rotate(45 122.5 42.5)" />
            <circle cx="35" cy="70" r="2.5" fill="#8FB89E" className={styles.confetti3} />
            <rect x="125" y="75" width="4" height="4" fill="#D4E5DC" className={styles.confetti4} transform="rotate(30 127 77)" />
            <circle cx="50" cy="100" r="3" fill="#F5C563" className={styles.confetti5} />
            <rect x="110" y="105" width="5" height="5" fill="#7FA990" className={styles.confetti6} transform="rotate(15 112.5 107.5)" />
            <circle cx="130" cy="60" r="2.5" fill="#E8B84D" className={styles.confetti7} />
            <rect x="45" y="55" width="4" height="4" fill="#8FB89E" className={styles.confetti8} transform="rotate(60 47 57)" />
            
            {/* Shadow */}
            <ellipse cx="80" cy="125" rx="40" ry="6" fill="#D4E5DC" opacity="0.4" />
            
            {/* Success circle with gradient */}
            <circle cx="80" cy="80" r="40" fill="url(#successGradient)" className={styles.successCircle} />
            
            {/* Checkmark */}
            <path 
              d="M60 80 L72 92 L100 64" 
              stroke="white" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={styles.checkmark}
            />
            
            <defs>
              <linearGradient id="successGradient" x1="80" y1="40" x2="80" y2="120">
                <stop offset="0%" stopColor="#8FB89E" />
                <stop offset="100%" stopColor="#7FA990" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2 className={styles.successTitle}>You've been logged out.</h2>
        <p className={styles.successMessage}>See you soon!</p>

        <button className={styles.okButton} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default LogoutSuccessModal;