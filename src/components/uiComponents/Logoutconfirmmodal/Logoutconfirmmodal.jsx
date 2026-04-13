import React from 'react';
import styles from './logoutconfirmmodal.module.scss';

const LogoutConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.iconContainer}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {/* Door frame */}
            <rect x="45" y="35" width="50" height="70" rx="4" fill="#E8F0EB" stroke="#7FA990" strokeWidth="2"/>
            
            {/* Door */}
            <rect x="52" y="42" width="36" height="56" rx="3" fill="#FFFFFF" stroke="#7FA990" strokeWidth="2"/>
            
            {/* Door handle */}
            <circle cx="72" cy="70" r="3" fill="#7FA990"/>
            
            {/* Arrow */}
            <path 
              d="M20 70 L35 70 M30 65 L35 70 L30 75" 
              stroke="#7FA990" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={styles.arrow}
            />
            
            {/* Decorative elements */}
            <circle cx="25" cy="50" r="2" fill="#D4E5DC" opacity="0.6"/>
            <circle cx="95" cy="55" r="2" fill="#D4E5DC" opacity="0.6"/>
            <circle cx="30" cy="85" r="2" fill="#D4E5DC" opacity="0.6"/>
          </svg>
        </div>

        <h2 className={styles.title}>Log Out?</h2>
        <p className={styles.message}>Are you sure you want to log out of your account?</p>

        <div className={styles.actionButtons}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.logoutButton} onClick={onConfirm}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;