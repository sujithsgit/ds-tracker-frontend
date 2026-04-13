import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.scss';
import AddResolution from '../../components/uiComponents/addResolution/AddResolution';
import LogoutConfirmModal from '../../components/uiComponents/Logoutconfirmmodal/Logoutconfirmmodal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../../store/actions';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dashboardData = useSelector(state => state?.dashboard?.data);
    const currentYear = 2024;
    const daysInMonth = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  
    useEffect(() => {
        const token = localStorage.getItem("token");

        // if (!token) {
        //     navigate("/login"); 
        //     return;
        // }

     
        if (!dashboardData) {
            dispatch(fetchDashboard({
                callback: {
                    success: (data) => {
                        if (data?.resolutionTitle) {
                            navigate("/dashboard");
                        }
                       
                    },
                    failure: (err) => console.log(err)
                }
            }));
        } else {
          
            if (dashboardData?.resolutionTitle) {
                navigate("/dashboard");
            }
        }
    }, []);

   
    const checkandallow = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsModalOpen(true); 
        } else {
            navigate("/login");
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    return (
        <div className={styles.dashboardApp}>
            <header className={styles.appHeader}>
                <div className={styles.appLogo}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" fill="#7FA990" />
                        <path d="M8 9L11 12L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className={styles.appName}>DS Traker</span>
                </div>
                <div className={styles.headerActions} onClick={() => setShowLogoutConfirm(true)}>
                    <button className={styles.btnText}>Logout</button>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.welcomeSection}>
                    {/* ✅ Real username */}
                    <h1 className={styles.welcomeTitle}>
                        Welcome, {dashboardData?.userName || 'User'} 👋
                    </h1>
                    <p className={styles.welcomeSubtitle}>
                        Let's start your first 30-day resolution.
                    </p>
                </div>

                <div className={styles.emptyStateCard}>
                    <div className={styles.emptyStateIllustration}>
                        <svg width="300" height="200" viewBox="0 0 300 200" fill="none">
                            <ellipse cx="110" cy="155" rx="25" ry="8" fill="#C4A57B" opacity="0.6" />
                            <path d="M90 140 L95 155 L125 155 L130 140 Z" fill="#D4A574" />
                            <rect x="96" y="145" width="28" height="3" fill="#B89566" />
                            <path d="M105 140 Q100 130 102 125 Q105 120 110 122" fill="#7FA990" />
                            <path d="M110 135 Q112 125 115 122 Q120 118 122 123" fill="#8FB89E" />
                            <ellipse cx="110" cy="145" rx="6" ry="8" fill="#6B8E7F" />
                            <rect x="160" y="75" width="120" height="100" rx="8" fill="white" />
                            <rect x="160" y="75" width="120" height="100" rx="8" fill="none" stroke="#7FA990" strokeWidth="4" />
                            <rect x="210" y="65" width="30" height="20" rx="10" fill="#8FB89E" />
                            <circle cx="190" cy="105" r="12" fill="#7FA990" />
                            <path d="M185 105 L188 108 L195 101" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="210" y="102" width="50" height="3" rx="1.5" fill="#E8F0EB" />
                            <rect x="210" y="110" width="40" height="3" rx="1.5" fill="#E8F0EB" />
                            <circle cx="190" cy="135" r="12" fill="#E8F0EB" />
                            <rect x="210" y="132" width="50" height="3" rx="1.5" fill="#E8F0EB" />
                            <circle cx="190" cy="160" r="12" fill="#E8F0EB" />
                            <rect x="210" y="157" width="50" height="3" rx="1.5" fill="#E8F0EB" />
                        </svg>
                    </div>

                    <p className={styles.emptyStateText}>
                        You haven't created any resolution yet.
                    </p>

                    {/* ✅ checkandallow function */}
                    <button className={styles.btnCreate} onClick={checkandallow}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                        Create Your First Resolution
                    </button>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <span className={styles.emoji}>🔥</span>
                            <span className={styles.statLabel}>Streak</span>
                        </div>
                        <div className={styles.statContents}>
                            <div className={styles.statValue}>0 days</div>
                            <div className={styles.statProgress}>
                                <div className={styles.progressBar} style={{ width: '0%' }}></div>
                            </div>
                            <p className={styles.statDescription}>Available after your first resolution</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#7FA990" strokeWidth="2" />
                                <path d="M8 12L11 15L16 9" stroke="#7FA990" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className={styles.statLabel}>Overall Progress</span>
                        </div>
                        <div className={styles.statContents}>
                            <div className={styles.statValue}>0%</div>
                            <div className={styles.statProgress}>
                                <div className={styles.progressBar} style={{ width: '0%' }}></div>
                            </div>
                            <p className={styles.statDescription}>Available after your first resolution</p>
                        </div>
                    </div>

                    <div className={`${styles.statCard} ${styles.calendarCard}`}>
                        <div className={styles.calendarHeader}>
                            <span className={styles.calendarYear}>{currentYear}</span>
                        </div>
                        <div className={styles.calendarGrid}>
                            {daysInMonth.map((day, index) => (
                                <div key={index} className={styles.calendarDayHeader}>{day}</div>
                            ))}
                            {[...Array(35)].map((_, index) => (
                                <div key={index} className={styles.calendarDay}></div>
                            ))}
                        </div>
                        <p className={styles.calendarDescription}>Calendar available after resolution</p>
                    </div>

                    <div className={`${styles.statCard} ${styles.daysCard}`}>
                        <div className={styles.statIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="5" width="18" height="16" rx="2" stroke="#7FA990" strokeWidth="2" />
                                <path d="M3 9H21M8 3V7M16 3V7" stroke="#7FA990" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span className={styles.statLabel}>Days Remaining</span>
                        </div>
                        <div className={`${styles.statValue} ${styles.daysValue}`}>—</div>
                    </div>
                </div>
            </main>

            <div className={styles.decorativeBg}>
                <svg className={`${styles.bgShape} ${styles.bgShape1}`} viewBox="0 0 200 200">
                    <path d="M0,100 Q50,50 100,100 T200,100 L200,200 L0,200 Z" fill="#E8F0EB" opacity="0.4" />
                </svg>
                <svg className={`${styles.bgShape} ${styles.bgShape2}`} viewBox="0 0 200 200">
                    <path d="M200,80 Q150,120 100,80 T0,80 L0,0 L200,0 Z" fill="#D4E5DC" opacity="0.3" />
                </svg>
            </div>

            <AddResolution
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                setIsModalOpen={setIsModalOpen}
            />

            <LogoutConfirmModal
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
};

export default Dashboard;