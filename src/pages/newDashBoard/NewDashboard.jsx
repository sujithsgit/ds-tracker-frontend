import React, { useEffect, useState } from 'react';
import styles from './newDashboard.module.scss';
import { useNavigate } from 'react-router-dom';
import AddResolution from '../../components/uiComponents/addResolution/AddResolution';
import LogoutConfirmModal from '../../components/uiComponents/Logoutconfirmmodal/Logoutconfirmmodal';
import LogoutSuccessModal from '../../components/uiComponents/Logoutsuccessmodal/Logoutsuccessmodal';
import { useDispatch } from 'react-redux';
import { checkIn, fetchDashboard } from '../../store/actions';
import AllResolutionsModal from '../../components/uiComponents/AllResolutionsModal/AllResolutionsModal';
import ResolutionViewModal from '../../components/uiComponents/ResolutionViewModal/ResolutionViewModal';

const NewDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showAllResolutions, setShowAllResolutions] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showResolutionView, setShowResolutionView] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/");
      return;
    }

    setLoading(true);
    loadDashboard();
    dispatch(fetchDashboard({
      callback: {
        success: (data) => {
          console.log("Dashboard data:", data);
          console.log("Resolutions array:", data?.resolutions);
          setDashboardData(data);
          setLoading(false);
        },
        failure: (err) => {
          console.log("Dashboard error:", err);
          setLoading(false);
        }
      }
    }));
  }, [navigate, dispatch]);


  const loadDashboard = () => {
    dispatch(fetchDashboard({
      callback: {
        success: (data) => {
          setDashboardData(data);
          setLoading(false);
        },
        failure: (err) => {
          console.log("Dashboard error:", err);
          setLoading(false);
        }
      }
    }));
  };




  const handleDateClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // ✅ Fix: local date string, toISOString() வேண்டாம்
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const calendarLog = dashboardData?.calendarLogs?.find(l => l.date === dateStr);
    if (calendarLog) {
      setSelectedDate({ date: dateStr, ...calendarLog });
      setShowDateModal(true);
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getMonthYearDisplay = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("refreshToken");
    setShowLogoutConfirm(false);
    setShowLogoutSuccess(true);
    setTimeout(() => { navigate("/login"); }, 1000);
  };

  const getCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const calendarDays = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({ date: daysInPrevMonth - i, status: 'inactive', isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
  
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

      let status = 'upcoming';

      if (dashboardData?.calendarLogs) {
        const log = dashboardData.calendarLogs.find(l => l.date === dateStr);
        if (log) {
          if (log.status === 'DONE') status = 'completed';
          else if (log.status === 'SKIPPED') status = 'missed';
          else if (log.status === 'PARTIAL') status = 'partial';
          else status = 'upcoming';
        }
      }

      calendarDays.push({ date: i, status, isCurrentMonth: true });
    }

    const remainingCells = 35 - calendarDays.length;
    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push({ date: i, status: 'inactive', isCurrentMonth: false });
    }

    return calendarDays;
  };



  const getCalendarDayClass = (status, isCurrentMonth) => {
    if (!isCurrentMonth || status === 'inactive') return styles.calendarDayInactive;
    if (status === 'completed') return styles.calendarDayCompleted;
    if (status === 'missed') return styles.calendarDayMissed;
    if (status === 'partial') return styles.calendarDayPartial; 
    if (status === 'upcoming') return styles.calendarDayUpcoming;
    return styles.calendarDayInactive;
  };

  const calendarDays = getCalendarData();


  const progressPercent = dashboardData
    ? (dashboardData.daysCompleted / dashboardData.durationDays) * 100
    : 0;

 
  if (loading) {
    return (
      <div className={styles.dashboardApp}>
        <p style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</p>
      </div>
    );
  }


 
  const handleCheckIn = (resolutionId, status) => {
    dispatch(checkIn({
      payload: {
        resolutionId: resolutionId, 
        status: status
      },
      callback: {
        success: () => {
          console.log("Check-in success!");
          loadDashboard(); 
        },
        failure: (err) => {
          console.log("Check-in error:", err);
        }
      }
    }));
  };

  return (
    <div className={styles.dashboardApp}>
      <header className={styles.appHeader}>
        <div className={styles.appLogo}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" fill="#7FA990" />
            <path d="M8 9L11 12L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={styles.appName}>Ds Traker</span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnText} onClick={() => setShowLogoutConfirm(true)}>Logout</button>
          <button className={styles.btnIcon} onClick={() => setShowLogoutConfirm(true)}>×</button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.welcomeSection}>

          <h1 className={styles.welcomeTitle}>
            Welcome, {dashboardData?.userName || 'User'} 👋
          </h1>
          <p className={styles.welcomeSubtitle}>Stay consistent to build your habit 🔥</p>
        </div>

        <div className={styles.contentGrid}>
       
          <div className={styles.leftColumn}>

        
            <div className={styles.resolutionCard}>
              <h2 className={styles.cardTitle}>Current Resolution</h2>
              <hr />
              {dashboardData?.resolutionTitle ? (
                <div className={styles.resolutionContent}>
              
                  <h3 className={styles.resolutionTitle}>{dashboardData.resolutionTitle}</h3>
                  <div className={styles.resolutionActions}>
                  
                    <div className={styles.daysProgress}>{dashboardData.durationDays} Days</div>
                    <button className={styles.btnAddResolution} onClick={() => setIsModalOpen(true)}>
                      + Add Resolution
                    </button>

                    <button className={styles.btnCheck}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10L8 13L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                 
                  <p className={styles.daysFraction}>
                    {dashboardData.daysCompleted} / {dashboardData.durationDays} Days
                  </p>
                  <button
                    className={styles.btnViewAll}
                    onClick={() => setShowResolutionView(true)} 
                  >
                    More
                  </button>
                </div>
              ) : (
                
                <div className={styles.emptyResolution}>
                  <p>No resolution yet!</p>
                  <button className={styles.btnAddResolution} onClick={() => setIsModalOpen(true)}>
                    + Create Resolution
                  </button>
                </div>
              )}
            </div>

            {/* Check-In Card */}
            {/* Check-In Card */}
            {/* Check-In Card */}
            <div className={styles.checkInCard}>
              <h2 className={styles.cardTitle}>Check-In for Today</h2>

              {dashboardData?.resolutions?.length > 0 ? (
                <>
                
                  {dashboardData.resolutions.slice(0, 3).map((res) => (
                    <div key={res.id} className={styles.checkInItem}>
                      <div className={styles.checkInContent}>
                        <div className={styles.checkInInfo}>
                          <div className={styles.taskLabel}>{res.title}</div>
                          <div className={styles.dayLabel}>
                            {res.daysCompleted}/{res.durationDays} days
                          </div>
                        </div>
                        <div className={styles.checkInActions}>
                          {res.todayStatus === 'DONE' ? (
                            <button className={styles.btnDoneDisabled} disabled>
                              ✅ Done
                            </button>
                          ) : res.todayStatus === 'SKIPPED' ? (
                            <button className={styles.btnSkipDisabled} disabled>
                              ⏭ Skipped
                            </button>
                          ) : (
                            <>
                              <button
                                className={styles.btnMarkDone}
                                onClick={() => handleCheckIn(res.id, 'DONE')}
                              >
                                Done
                              </button>
                              <button
                                className={styles.btnSkip}
                                onClick={() => handleCheckIn(res.id, 'SKIPPED')}
                              >
                                Skip
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <hr className={styles.divider} />
                    </div>
                  ))}

                
                  {dashboardData.resolutions.length > 3 && (
                    <button
                      className={styles.btnViewAllCheckin}
                      onClick={() => setShowAllResolutions(true)}
                    >
                      +{dashboardData.resolutions.length - 3} more → View All
                    </button>
                  )}
                </>
              ) : (
                <p className={styles.noResolution}>No resolutions yet!</p>
              )}
            </div>

            {/* Overall Progress Card */}
            <div className={styles.overallProgressCard}>
              <h2 className={styles.cardTitle}>Overall Progress</h2>
              <div className={styles.progressBarContainer}>
                <div className={styles.progressBarFull}>
               
                  <div className={styles.progressBarFilled} style={{ width: `${progressPercent}%` }}></div>
                </div>
                <div className={styles.progressLegend}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot}></span>
                  
                    <span>{dashboardData?.daysCompleted || 0} days completed</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot}></span>
                    <span>{dashboardData?.daysRemaining || 0} days remaining</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>

            {/* Calendar Card */}
            <div className={styles.calendarCard}>
              <div className={styles.calendarHeader}>
                <button className={styles.calendarNav} onClick={previousMonth}>◁</button>
                <span className={styles.calendarMonth}>{getMonthYearDisplay()}</span>
                <button className={styles.calendarNav} onClick={nextMonth}>▷</button>
              </div>
              <div className={styles.calendarGrid}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                  <div key={d} className={styles.calendarDayHeader}>{d}</div>
                ))}
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`${styles.calendarDay} ${getCalendarDayClass(day.status, day.isCurrentMonth)}`}
                    onClick={() => handleDateClick(day.date, day.isCurrentMonth)} 
                    style={{ cursor: day.isCurrentMonth ? 'pointer' : 'default' }}
                  >
                    {day.date}
                  </div>
                ))}
              </div>
              <div className={styles.calendarLegend}>
                <div className={styles.legendItem}>
                  <span className={styles.completedLegend}></span>
                  <span>Completed</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.partialLegend}></span>
                  <span>Partial</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.missedLegend}></span>
                  <span>Missed</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.upcomingLegend}></span>
                  <span>Upcoming</span>
                </div>
              </div>
            </div>

            {/* Streak Card */}
            <div className={styles.streakCard}>
              <div className={styles.streakHeader}>
                <span className={styles.streakIcon}>🔥</span>
                <h3 className={styles.streakTitle}>Streak</h3>
              </div>
              <div className={styles.streakContent}>
                <div className={styles.streakFlame}>🔥</div>
                <div className={styles.streakInfo}>
                  {/* ✅ Real streak */}
                  <div className={styles.streakDays}>{dashboardData?.streak || 0} days</div>
                  <div className={styles.streakBest}>Best: {dashboardData?.bestStreak || 0} days</div>
                </div>
              </div>
              <div className={styles.streakProgress}>
                <div className={styles.streakProgressBar} style={{ width: `${progressPercent}%` }}></div>
              </div>
              <p className={styles.streakDescription}>
                {dashboardData?.daysCompleted || 0} of {dashboardData?.durationDays || 30} days completed
              </p>
            </div>

            {/* Days Remaining Card */}
            <div className={styles.daysRemainingCard}>
              <div className={styles.daysRemainingHeader}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="16" rx="2" stroke="#7FA990" strokeWidth="2" fill="none" />
                  <path d="M3 9H21M8 3V7M16 3V7" stroke="#7FA990" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <h3 className={styles.daysRemainingTitle}>Days Remaining</h3>
              </div>
              {/* ✅ Real days remaining */}
              <div className={styles.daysRemainingValue}>{dashboardData?.daysRemaining || 0}</div>
              <div className={styles.daysRemainingProgress}>
                <div className={styles.daysRemainingProgressBar} style={{ width: `${progressPercent}%` }}></div>
              </div>
              <p className={styles.daysRemainingDescription}>
                {dashboardData?.daysCompleted || 0} of {dashboardData?.durationDays || 30} Days completed
              </p>
            </div>
          </div>
        </div>

        {/* Quote Card */}
        <div className={styles.quoteCard}>
          <span className={styles.quoteIcon}>✨</span>
          <p className={styles.quoteText}>"Consistency beats motivation."</p>
          <p className={styles.quoteAuthor}>— Quote</p>
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

      {showDateModal && selectedDate && (
        <div className={styles.dateModalOverlay} onClick={() => setShowDateModal(false)}>
          <div className={styles.dateModal} onClick={e => e.stopPropagation()}>
            <div className={styles.dateModalHeader}>
              <h3>{selectedDate.date}</h3>
              <button onClick={() => setShowDateModal(false)}>×</button>
            </div>
            <div className={styles.dateModalList}>
              {selectedDate.resolutions?.map((res, i) => (
                <div key={i} className={styles.dateModalItem}>
                  <span className={styles.dateModalTitle}>{res.title}</span>
                  <span className={`${styles.dateModalStatus} ${res.status === 'DONE' ? styles.done :
                    res.status === 'SKIPPED' ? styles.skipped :
                      styles.pending
                    }`}>
                    {res.status === 'DONE' ? '✅ Done' :
                      res.status === 'SKIPPED' ? '⏭ Skipped' :
                        '⏳ Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AddResolution
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setIsModalOpen={setIsModalOpen}
          onSuccess={() => loadDashboard()}
      />

      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />

      <LogoutSuccessModal
        isOpen={showLogoutSuccess}
        onClose={() => { setShowLogoutSuccess(false); navigate("/"); }}
      />
      <AllResolutionsModal
        isOpen={showAllResolutions}
        onClose={() => setShowAllResolutions(false)}
        resolutions={dashboardData?.resolutions}
        onSuccess={loadDashboard}
        onCheckIn={(resolutionId, status) => { 
          handleCheckIn(resolutionId, status);
        }}
      />

      <ResolutionViewModal
        isOpen={showResolutionView}
        onClose={() => setShowResolutionView(false)}
        resolutions={dashboardData?.resolutions}
      />
    </div>



  );
};

export default NewDashboard;