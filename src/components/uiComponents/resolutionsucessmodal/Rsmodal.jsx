import React from 'react';
import styles from './rsmodal.module.scss';
import { useNavigate } from 'react-router-dom';

const RsModal = ({ isOpen, onClose, onAddAnother,onGoToDashboard }) => {
  const navigate = useNavigate();
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.successIllustration}>
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            {/* Confetti particles */}
            <circle cx="50" cy="40" r="4" fill="#F5C563" className={styles.confetti1} />
            <rect x="160" y="50" width="6" height="6" fill="#E89B6B" className={styles.confetti2} transform="rotate(45 163 53)" />
            <circle cx="40" cy="80" r="3" fill="#8FB89E" className={styles.confetti3} />
            <rect x="170" y="90" width="5" height="5" fill="#D4E5DC" className={styles.confetti4} transform="rotate(30 172.5 92.5)" />
            <circle cx="60" cy="120" r="4" fill="#F5C563" className={styles.confetti5} />
            <rect x="150" y="130" width="6" height="6" fill="#7FA990" className={styles.confetti6} transform="rotate(15 153 133)" />
            <circle cx="180" cy="70" r="3" fill="#E8B84D" className={styles.confetti7} />
            <rect x="45" y="60" width="5" height="5" fill="#8FB89E" className={styles.confetti8} transform="rotate(60 47.5 62.5)" />

            {/* Shadow */}
            <ellipse cx="100" cy="150" rx="50" ry="8" fill="#D4E5DC" opacity="0.4" />

            {/* Main success circle */}
            <circle cx="100" cy="100" r="50" fill="url(#successGradient)" className={styles.successCircle} />

            {/* Checkmark */}
            <path
              d="M75 100 L90 115 L125 80"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.checkmark}
            />

            <defs>
              <linearGradient id="successGradient" x1="100" y1="50" x2="100" y2="150">
                <stop offset="0%" stopColor="#8FB89E" />
                <stop offset="100%" stopColor="#7FA990" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2 className={styles.successTitle}>Resolution Created Successfully!</h2>
        <p className={styles.successMessage}>Your 30-day goal has been set. What's next?</p>

        <div className={styles.actionButtons}>
          <button className={styles.addAnotherButton} onClick={onAddAnother}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add Another Resolution
          </button>
          <button className={styles.dashboardButton} onClick={() => {
            onClose();  
            onGoToDashboard?.(); 
          }}>
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default RsModal;