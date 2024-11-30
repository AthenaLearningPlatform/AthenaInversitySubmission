// Entry point function to initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application components
    setupAuthEventListeners(); // Set up listeners for login, register, and logout
    initializeNavEventListeners(); // Set up navigation listeners for teacher and student dashboards

    // If a user is already logged in, redirect them to the appropriate dashboard
    if (currentUser) {
        if (currentUser.role === 'teacher') {
            initializeTeacherDashboard();
        } else {
            initializeStudentDashboard();
        }
    }
});

// Initialize Teacher Dashboard
function initializeTeacherDashboard() {
    // Show the teacher dashboard and hide all other elements
    document.getElementById('teacherDashboard').classList.remove('hidden');
    document.getElementById('studentDashboard').classList.add('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');

    // Load the default section, which is Create Assignment
    loadTeacherSection('createAssignment');
}

// Initialize Student Dashboard
function initializeStudentDashboard() {
    // Show the student dashboard and hide all other elements
    document.getElementById('studentDashboard').classList.remove('hidden');
    document.getElementById('teacherDashboard').classList.add('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');

    // Load the default section, which is Your Assignments
    loadStudentSection('viewAssignments');
}

// Function to Set Up Navigation Event Listeners for Teacher and Student Dashboards
function initializeNavEventListeners() {
    // Teacher Dashboard Navigation
    document.querySelectorAll('#teacherDashboard .nav-item').forEach(item => {
        item.addEventListener('click', (event) => {
            // Clear previous active nav item and set the current one to active
            document.querySelectorAll('#teacherDashboard .nav-item').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Load the selected section
            const section = item.getAttribute('data-section');
            loadTeacherSection(section);
        });
    });

    // Student Dashboard Navigation
    document.querySelectorAll('#studentDashboard .nav-item').forEach(item => {
        item.addEventListener('click', (event) => {
            // Clear previous active nav item and set the current one to active
            document.querySelectorAll('#studentDashboard .nav-item').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Load the selected section
            const section = item.getAttribute('data-section');
            loadStudentSection(section);
        });
    });
}

// Load Teacher Dashboard Section
function loadTeacherSection(section) {
    // Clear all previous content
    document.getElementById('teacherContent').innerHTML = '';

    // Clear all charts to prevent overlap
    clearAllCharts();

    // Render content based on the selected section
    switch (section) {
        case 'createAssignment':
            renderCreateAssignmentSection();
            break;
        case 'viewAssignments':
            renderViewAssignmentsSection();
            break;
        case 'studentSubmissions':
            renderStudentSubmissionsSection();
            break;
        case 'classAverages':
            renderClassAveragesSection();
            break;
        case 'inputExamResults':
            renderInputExamResultsSection();
            break;
        default:
            console.error('Invalid section for Teacher Dashboard');
    }
}

// Load Student Dashboard Section
function loadStudentSection(section) {
    // Clear all previous content
    document.getElementById('studentContent').innerHTML = '';

    // Clear all charts to prevent overlap
    clearAllCharts();

    // Render content based on the selected section
    switch (section) {
        case 'viewAssignments':
            renderViewAssignmentsStudentSection();
            break;
        case 'mySubmissions':
            renderMySubmissionsSection();
            break;
        case 'averageGrade':
            renderAverageGradeSection();
            break;
        case 'inputExamResults':
            renderInputExamResultsStudentSection();
            break;
        default:
            console.error('Invalid section for Student Dashboard');
    }
}

// Render Teacher Dashboard Sections
function renderCreateAssignmentSection() {
    const content = `
        <h3>Create Assignment</h3>
        <div class="form-group">
            <label for="assignmentType">Assignment Type</label>
            <select id="assignmentType">
                <option value="project">Project Assignment</option>
                <option value="quickfire">Quickfire Questions</option>
            </select>
        </div>
        <button class="btn" id="createAssignmentButton">Create Assignment</button>
    `;
    document.getElementById('teacherContent').innerHTML = content;

    document.getElementById('createAssignmentButton').addEventListener('click', () => {
        const assignmentType = document.getElementById('assignmentType').value;
        if (assignmentType === 'project') {
            openModal('projectTopicModal');
        } else if (assignmentType === 'quickfire') {
            openModal('quickfireModal');
        }
    });
}

function renderViewAssignmentsSection() {
    const content = `
        <h3>View Assignments</h3>
        <p>Here you can view all of the assignments that you have created.</p>
        <!-- Assignment list is dynamically generated -->
    `;
    document.getElementById('teacherContent').innerHTML = content;
}

function renderStudentSubmissionsSection() {
    const content = `
        <h3>Student Submissions</h3>
        <p>Here you can view all student submissions for your assignments and provide feedback.</p>
        <!-- Submissions list is dynamically generated -->
    `;
    document.getElementById('teacherContent').innerHTML = content;
}

function renderClassAveragesSection() {
    const content = `
        <h3>Class Averages</h3>
        <canvas id="classAverageChart" class="chart-container"></canvas>
    `;
    document.getElementById('teacherContent').innerHTML = content;

    // Example data for class average chart rendering
    const studentAverages = [
        { student: 'Student A', average: 85 },
        { student: 'Student B', average: 90 },
        { student: 'Student C', average: 78 },
    ];

    // Render the class average chart
    renderClassAverageChart(studentAverages);
}

function renderInputExamResultsSection() {
    const content = `
        <h3>Input Exam Results</h3>
        <p>Input the exam results for students to track their performance.</p>
        <!-- Exam input form goes here -->
    `;
    document.getElementById('teacherContent').innerHTML = content;
}

// Render Student Dashboard Sections
function renderViewAssignmentsStudentSection() {
    const content = `
        <h3>Your Assignments</h3>
        <p>Here you can view all of your assigned work.</p>
        <!-- Assignment list is dynamically generated -->
    `;
    document.getElementById('studentContent').innerHTML = content;
}

function renderMySubmissionsSection() {
    const content = `
        <h3>My Submissions</h3>
        <p>View the assignments you've submitted along with your grades and feedback.</p>
        <!-- Submissions list is dynamically generated -->
    `;
    document.getElementById('studentContent').innerHTML = content;
}

function renderAverageGradeSection() {
    const content = `
        <h3>Average Grade</h3>
        <canvas id="studentPerformanceChart" class="chart-container"></canvas>
    `;
    document.getElementById('studentContent').innerHTML = content;

    // Example data for student performance chart rendering
    const assignmentScores = [
        { assignment: 'Assignment 1', score: 88 },
        { assignment: 'Assignment 2', score: 92 },
        { assignment: 'Assignment 3', score: 75 },
    ];

    // Render the student performance chart
    renderStudentPerformanceChart(assignmentScores);
}

function renderInputExamResultsStudentSection() {
    const content = `
        <h3>Input Exam Results</h3>
        <p>Input your exam results for tracking.</p>
        <!-- Exam input form goes here -->
    `;
    document.getElementById('studentContent').innerHTML = content;
}
