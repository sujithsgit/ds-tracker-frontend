import React, { useState, useEffect } from 'react';
import styles from './addresolution.module.scss';
import RsModal from '../resolutionsucessmodal/Rsmodal';
import { createResolution, fetchDashboard } from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddResolution = ({ isOpen, onClose, setIsModalOpen, onSuccess }) => {
    const [resolution, setResolution] = useState('');
    const navigate = useNavigate();
    const [durationType, setDurationType] = useState('30days');
    const [customDuration, setCustomDuration] = useState('');
    const [customUnit, setCustomUnit] = useState('Start');
    const [customValue, setCustomValue] = useState('30');
    const [reminderEnabled, setReminderEnabled] = useState(true);
    const [reminderTime, setReminderTime] = useState('10:00');
    const [startDate, setStartDate] = useState('');
    const [motivation, setMotivation] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const dispatch = useDispatch();

    // Set default date to today when component mounts
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
        setStartDate(formattedDate);
    }, []);

    // Reset form to initial state
    const resetForm = () => {
        setResolution('');
        setDurationType('30days');
        setCustomDuration('');
        setCustomUnit('Start');
        setCustomValue('30');
        setReminderEnabled(true);
        setReminderTime('10:00');
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setStartDate(formattedDate);
        setMotivation('');
    };

    const handleSubmit = () => {
        console.log("form submitted");
        const payload = {
            resolution,
            durationType,
            customDuration,
            customUnit,
            customValue,
            reminderEnabled,
            reminderTime,
            startDate,
            motivation
        };

        dispatch(createResolution({
            payload,
            callback: {
                success: (data) => {
                    console.log("success", data);
                    dispatch(fetchDashboard());
                    setShowSuccess(true);
                    resetForm();
                    onSuccess?.();
                },
                failure: (err) => {
                    console.log("error", err);
                }
            }
        }));
    };

    const handleAddAnother = () => {
        setShowSuccess(false);
        onClose();
        setTimeout(() => {
            setIsModalOpen(true);
        }, 100);
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        onClose();
          onSuccess?.();
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.modalOverlay} onClick={handleClose}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>Create New Resolution</h2>
                        <button className={styles.closeButton} onClick={handleClose}>×</button>
                    </div>

                    <div className={styles.modalBody}>
                        {/* Resolution Input */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Resolution</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="e.g. Read every day 📚"
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                            />
                        </div>

                        {/* Duration */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Duration</label>
                            <div className={styles.durationOptions}>
                                <button
                                    className={`${styles.durationButton} ${durationType === '30days' ? styles.active : ''}`}
                                    onClick={() => setDurationType('30days')}
                                >
                                    30 Days
                                </button>
                                <button
                                    className={`${styles.durationButton} ${durationType === 'custom' ? styles.active : ''}`}
                                    onClick={() => setDurationType('custom')}
                                >
                                    Custom
                                    {durationType === 'custom' && (
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.checkIcon}>
                                            <path d="M4 8L7 11L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                                <span className={styles.orText}>or</span>
                                <select className={styles.customSelect} value={customUnit} onChange={(e) => setCustomUnit(e.target.value)}>
                                    <option>Start</option>
                                    <option>End</option>
                                </select>
                                <select className={styles.customSelect} value={customValue} onChange={(e) => setCustomValue(e.target.value)}>
                                    <option>30</option>
                                    <option>60</option>
                                    <option>90</option>
                                </select>
                            </div>
                        </div>

                        {/* Reminder */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Reminder</label>
                            <div className={styles.reminderRow}>
                                <label className={styles.toggleSwitch}>
                                    <input
                                        type="checkbox"
                                        checked={reminderEnabled}
                                        onChange={(e) => setReminderEnabled(e.target.checked)}
                                    />
                                    <span className={styles.slider}></span>
                                </label>
                                <input
                                    type="time"
                                    className={styles.timeInput}
                                    value={reminderTime}
                                    onChange={(e) => setReminderTime(e.target.value)}
                                    disabled={!reminderEnabled}
                                />
                                <label className={styles.iconButton} htmlFor="time-picker">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                        <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </label>
                            </div>
                        </div>

                        {/* Start Date */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Start Date</label>
                            <div className={styles.dateInputWrapper}>
                                <input
                                    type="date"
                                    className={styles.dateInput}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <label className={styles.iconButton} htmlFor="date-picker">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                        <path d="M3 8H17M7 2V6M13 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </label>
                            </div>
                        </div>

                        {/* Motivation */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Motivation</label>
                            <textarea
                                className={styles.textarea}
                                placeholder="Why do you want to achieve this resolution?"
                                value={motivation}
                                onChange={(e) => setMotivation(e.target.value)}
                                rows="4"
                            />
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <button className={styles.cancelButton} onClick={handleClose}>
                            Cancel
                        </button>
                        <button className={styles.createButton} onClick={handleSubmit}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 3V13M3 8H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Create Resolution
                        </button>
                    </div>
                </div>
            </div>

            <RsModal
                isOpen={showSuccess}
                onClose={handleSuccessClose}
                onAddAnother={handleAddAnother}
                onGoToDashboard={() => {        // ✅ add
                    setShowSuccess(false);
                    onClose();
                    navigate('/dashboard');
                }}
            />
        </>
    );
};

export default AddResolution;