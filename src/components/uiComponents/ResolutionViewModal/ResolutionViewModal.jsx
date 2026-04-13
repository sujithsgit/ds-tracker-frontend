import React from 'react';
import styles from './resolutionviewmodal.module.scss';

const ResolutionViewModal = ({ isOpen, onClose, resolutions }) => {
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
                                {/* ✅ Status badge மட்டும் */}
                                <span className={`${styles.badge} ${
                                    res.todayStatus === 'DONE' ? styles.doneBadge :
                                    res.todayStatus === 'SKIPPED' ? styles.skippedBadge :
                                    styles.pendingBadge
                                }`}>
                                    {res.todayStatus === 'DONE' ? '✅ Done' :
                                     res.todayStatus === 'SKIPPED' ? '⏭ Skipped' :
                                     '⏳ Pending'}
                                </span>
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResolutionViewModal;