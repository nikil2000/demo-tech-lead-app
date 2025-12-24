// ===================================
// ADMIN DASHBOARD - JAVASCRIPT
// SLT Telecom Platform
// ===================================

// === SCREEN NAVIGATION ===
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// === ADMIN LOGIN ===
function adminLogin(event) {
    event.preventDefault();

    const username = event.target.querySelector('input[type="text"]').value;
    const password = event.target.querySelector('input[type="password"]').value;

    if (username && password) {
        const button = event.target.querySelector('.btn-primary');
        button.innerHTML = '<span>Signing In...</span>';
        button.style.opacity = '0.7';

        setTimeout(() => {
            showScreen('adminDashboardScreen');
            button.innerHTML = '<span>Sign In</span><div class="btn-shine"></div>';
            button.style.opacity = '1';
            showNotification('Welcome to Admin Dashboard!', 'success');
        }, 1500);
    }

    return false;
}

// === SECTION NAVIGATION ===
function showSection(sectionName) {
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.nav-link').classList.add('active');

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const sectionMap = {
        'overview': 'overviewSection',
        'jobs': 'jobsSection',
        'approval': 'approvalSection',
        'partners': 'partnersSection',
        'reports': 'reportsSection'
    };

    const targetSection = document.getElementById(sectionMap[sectionName]);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update header
    const titles = {
        'overview': {
            title: 'Dashboard Overview',
            subtitle: 'Monitor and manage all tech-lead partner activities'
        },
        'jobs': {
            title: 'Job Management',
            subtitle: 'Create, assign, and track all jobs'
        },
        'approval': {
            title: 'Pending Approvals',
            subtitle: 'Review and approve completed jobs'
        },
        'partners': {
            title: 'Partner Management',
            subtitle: 'Manage tech-lead partner profiles and performance'
        },
        'reports': {
            title: 'Reports & Analytics',
            subtitle: 'View performance metrics and generate reports'
        }
    };

    const titleInfo = titles[sectionName];
    document.getElementById('sectionTitle').textContent = titleInfo.title;
    document.getElementById('sectionSubtitle').textContent = titleInfo.subtitle;
}

// === JOB APPROVAL ===
function approveJob(jobId) {
    const button = event.target.closest('.btn-approve');
    const card = event.target.closest('.approval-card');

    button.innerHTML = '<span>Approving...</span>';
    button.style.opacity = '0.7';

    setTimeout(() => {
        showNotification(`Job #JOB-2024-00${jobId} approved successfully!`, 'success');

        // Animate card removal
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0';

        setTimeout(() => {
            card.remove();

            // Update pending count
            const badge = document.querySelector('.nav-link .badge');
            if (badge) {
                const currentCount = parseInt(badge.textContent);
                badge.textContent = Math.max(0, currentCount - 1);
            }

            // Update stats
            updateAdminStats();
        }, 300);
    }, 1000);
}

function rejectJob(jobId) {
    const button = event.target.closest('.btn-reject');

    button.innerHTML = '<span>Opening rejection form...</span>';
    button.style.opacity = '0.7';

    setTimeout(() => {
        showNotification(`Rejection form opened for Job #JOB-2024-00${jobId}`, 'info');
        button.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Reject
        `;
        button.style.opacity = '1';
        // In real app, would open modal with rejection reason form
    }, 500);
}

// === CREATE JOB MODAL ===
function showCreateJobModal() {
    showNotification('Job creation form - Coming soon in full version', 'info');
    // In real app, would open modal with job creation form
}

// === STATS UPDATE ===
function updateAdminStats() {
    // Simulate stats update
    const completedStat = document.querySelector('.stat-green .stat-value-admin');
    if (completedStat) {
        const currentValue = parseInt(completedStat.textContent);
        animateValue(completedStat, currentValue + 1);
    }
}

function animateValue(element, newValue) {
    const currentValue = parseInt(element.textContent);
    const duration = 500;
    const steps = 20;
    const stepValue = (newValue - currentValue) / steps;
    let current = currentValue;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current += stepValue;
        element.textContent = Math.round(current);

        if (step >= steps) {
            element.textContent = newValue;
            clearInterval(timer);
        }
    }, duration / steps);
}

// === LOGOUT ===
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        showNotification('Logging out...', 'info');
        setTimeout(() => {
            showScreen('adminLoginScreen');
        }, 1000);
    }
}

// === NOTIFICATIONS ===
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${type === 'success' ? '<polyline points="20 6 9 17 4 12"></polyline>' :
            type === 'error' ? '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>' :
                '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
            </svg>
            <span>${message}</span>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 80px;
            right: 20px;
            background: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out, slideOutRight 0.3s ease-in 2.7s;
            max-width: 400px;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-success {
            border-left: 4px solid #10B981;
        }
        
        .notification-success svg {
            color: #10B981;
        }
        
        .notification-error {
            border-left: 4px solid #EF4444;
        }
        
        .notification-error svg {
            color: #EF4444;
        }
        
        .notification-info {
            border-left: 4px solid #3B82F6;
        }
        
        .notification-info svg {
            color: #3B82F6;
        }
        
        .notification span {
            font-size: 0.9rem;
            color: #1F2937;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;

    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// === INITIALIZE ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin Dashboard initialized');

    // Add smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';

    // Animate stats cards on load
    const statCards = document.querySelectorAll('.stat-card-admin');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.opacity = '1';
        }, 100 * index);
    });

    // Animate activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach((item, index) => {
        item.style.opacity = '0';
        setTimeout(() => {
            item.style.opacity = '1';
        }, 100 * index);
    });
});

// === PROTOTYPE HELPERS ===
function simulateAdminData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                stats: {
                    totalJobs: 156,
                    pending: 5,
                    completed: 124,
                    activePartners: 42
                },
                recentActivity: [
                    { type: 'approval', job: 'JOB-2024-045', time: '5 minutes ago' },
                    { type: 'created', job: 'JOB-2024-046', time: '15 minutes ago' },
                    { type: 'issue', job: 'JOB-2024-042', time: '1 hour ago' }
                ]
            });
        }, 500);
    });
}

// Export functions
window.adminLogin = adminLogin;
window.showSection = showSection;
window.approveJob = approveJob;
window.rejectJob = rejectJob;
window.showCreateJobModal = showCreateJobModal;
window.logout = logout;
