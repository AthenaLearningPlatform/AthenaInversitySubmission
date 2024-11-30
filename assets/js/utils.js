// Utility Function to Clear Error Messages on Authentication Forms
function clearErrors() {
    document.getElementById('loginError').textContent = '';
    document.getElementById('registerError').textContent = '';
}

// Utility Function to Clear Input Fields in Forms
function clearFields() {
    // Login form fields
    if (document.getElementById('username')) {
        document.getElementById('username').value = '';
    }
    if (document.getElementById('password')) {
        document.getElementById('password').value = '';
    }

    // Registration form fields
    if (document.getElementById('reg_username')) {
        document.getElementById('reg_username').value = '';
    }
    if (document.getElementById('reg_password')) {
        document.getElementById('reg_password').value = '';
    }
    if (document.getElementById('reg_role')) {
        document.getElementById('reg_role').value = '';
    }
}

// Utility Function to Toggle Badge Selection
function toggleSkill(skill) {
    const skillElement = document.getElementById(skill);
    if (skillElement) {
        if (skillElement.classList.contains('selected')) {
            skillElement.classList.remove('selected');
        } else {
            skillElement.classList.add('selected');
        }
    }
}

// Utility Function to Get Letter Grade Based on Score
function getGradeLetter(score) {
    if (score >= 90) {
        return 'A';
    } else if (score >= 80) {
        return 'B';
    } else if (score >= 70) {
        return 'C';
    } else if (score >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

// Utility Function to Render Submission Status with Appropriate Class
function getStatusClass(status) {
    switch (status) {
        case 'Submitted':
            return 'status-submitted';
        case 'Pending':
            return 'status-pending';
        case 'Graded':
            return 'status-graded';
        default:
            return '';
    }
}

// Utility Function to Clear All Chart Instances
function clearAllCharts() {
    if (window.classAverageChartInstance) {
        window.classAverageChartInstance.destroy();
    }
    if (window.studentPerformanceChartInstance) {
        window.studentPerformanceChartInstance.destroy();
    }
    if (window.examResultsChartInstance) {
        window.examResultsChartInstance.destroy();
    }
}

// Utility Function to Create an Element with Given Attributes and Content
function createElement(tag, attributes, content) {
    const element = document.createElement(tag);
    if (attributes) {
        for (let key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                element.setAttribute(key, attributes[key]);
            }
        }
    }
    if (content) {
        element.innerHTML = content;
    }
    return element;
}

// Utility Function to Show an Alert Message
function showAlert(message, type = 'info') {
    const alertBox = createElement('div', { class: `alert alert-${type}` }, message);
    document.body.appendChild(alertBox);

    // Automatically remove the alert after 3 seconds
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}
