import React from 'react';
import styles from './AllResolutionsModal.module.scss';

const AllResolutionsModal = ({ isOpen, onClose, resolutions, onCheckIn }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>All Resolutions</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>

                <div className={styles.list}>
                    {resolutions?.map((res, index) => (
                        <div key={res.id} className={styles.resolutionItem}>
                            <div className={styles.resolutionTop}>
                                <span className={styles.index}>#{index + 1}</span>
                                <h3 className={styles.title}>{res.title}</h3>
                            </div>

                            <div className={styles.resolutionStats}>
                                <span>🔥 {res.streak} streak</span>
                                <span>✅ {res.daysCompleted}/{res.durationDays} days</span>
                                <span>⏳ {res.daysRemaining} remaining</span>
                            </div>

                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${(res.daysCompleted / res.durationDays) * 100}%` }}
                                />
                            </div>

                            {/* ✅ Done/Skip buttons */}
                            <div className={styles.checkInRow}>
                                {res.todayStatus === 'DONE' ? (
                                    <button className={styles.doneBadge} disabled>
                                        ✅ Done Today
                                    </button>
                                ) : res.todayStatus === 'SKIPPED' ? (
                                    <button className={styles.skippedBadge} disabled>
                                        ⏭ Skipped Today
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className={styles.btnDone}
                                            onClick={() => onCheckIn?.(res.id, 'DONE')}
                                        >
                                            Mark Done
                                        </button>
                                        <button
                                            className={styles.btnSkip}
                                            onClick={() => onCheckIn?.(res.id, 'SKIPPED')}
                                        >
                                            Skip
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllResolutionsModal;