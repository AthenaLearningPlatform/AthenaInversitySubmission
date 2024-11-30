// Function to Initialize Teacher Dashboard
function initializeTeacherDashboard() {
    // Display teacher dashboard and hide other sections
    document.getElementById('teacherDashboard').classList.remove('hidden');
    document.getElementById('studentDashboard').classList.add('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');

    // Load the default section, which is "Create Assignment"
    loadTeacherSection('createAssignment');
}

// Load Specific Section of the Teacher Dashboard
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

// Render "Create Assignment" Section for Teachers
function renderCreateAssignmentSection() {
    const skills = ['Critical Thinking', 'Creative Writing', 'Research', 'Public Speaking', 'Problem Solving']; // Skills list

    const content = `
        <h3>Create Assignment</h3>
        <div class="form-group">
            <label for="assignmentName">Assignment Name</label>
            <input type="text" id="assignmentName" placeholder="Enter assignment name" required>
        </div>
        <div class="form-group">
            <label for="assignmentSubject">Subject</label>
            <input type="text" id="assignmentSubject" placeholder="Enter subject" required>
        </div>
        <div class="form-group">
            <label for="assignmentType">Assignment Type</label>
            <select id="assignmentType">
                <option value="project">Project Assignment</option>
                <option value="quickfire">Quickfire Questions</option>
            </select>
        </div>
        <div id="skillsSelection" class="form-group">
            <label>Select Skills for Project</label>
            <div id="skillsList">
                ${skills.map(skill => `<span class="badge" id="${skill}" onclick="toggleSkill('${skill}')">${skill}</span>`).join('')}
            </div>
        </div>
        <button class="btn" id="createAssignmentButton">Create Assignment</button>
    `;
    document.getElementById('teacherContent').innerHTML = content;

    // Show or hide skill selection based on assignment type
    document.getElementById('assignmentType').addEventListener('change', (event) => {
        if (event.target.value === 'project') {
            document.getElementById('skillsSelection').classList.remove('hidden');
        } else {
            document.getElementById('skillsSelection').classList.add('hidden');
        }
    });

    // Set up event listener for create assignment button
    document.getElementById('createAssignmentButton').addEventListener('click', () => {
        const assignmentName = document.getElementById('assignmentName').value.trim();
        const assignmentSubject = document.getElementById('assignmentSubject').value.trim();
        const assignmentType = document.getElementById('assignmentType').value;

        // Collect selected skills
        const selectedSkills = [];
        document.querySelectorAll('#skillsList .badge.selected').forEach(badge => {
            selectedSkills.push(badge.textContent);
        });

        // Validate assignment inputs
        if (!assignmentName || !assignmentSubject) {
            alert('Please fill in the assignment name and subject.');
            return;
        }

        if (assignmentType === 'project' && selectedSkills.length === 0) {
            alert('Please select at least one skill for the project.');
            return;
        }

        // Store the assignment details
        const assignment = {
            id: Date.now(), // Use timestamp as unique identifier
            name: assignmentName,
            subject: assignmentSubject,
            type: assignmentType,
            skills: selectedSkills,
            dueDate: '2024-12-31' // Example due date, ideally set dynamically
        };

        // Save the assignment to local storage (or send to server)
        let assignments = JSON.parse(localStorage.getItem('assignments')) || [];
        assignments.push(assignment);
        localStorage.setItem('assignments', JSON.stringify(assignments));

        alert(`Assignment "${assignmentName}" created successfully.`);

        // Update both teacher and student dashboards
        loadTeacherSection('viewAssignments');
    });
}

// Utility function to toggle skill selection
function toggleSkill(skillId) {
    const skillElement = document.getElementById(skillId);
    if (skillElement.classList.contains('selected')) {
        skillElement.classList.remove('selected');
    } else {
        skillElement.classList.add('selected');
    }
}

// Render "View Assignments" Section for Teachers
function renderViewAssignmentsSection() {
    const content = `
        <h3>View Assignments</h3>
        <div id="assignmentsList"></div>
    `;
    document.getElementById('teacherContent').innerHTML = content;

    // Load assignments from local storage
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];

    const assignmentsList = document.getElementById('assignmentsList');
    assignments.forEach(assignment => {
        const assignmentDiv = document.createElement('div');
        assignmentDiv.classList.add('assignment-card');
        assignmentDiv.innerHTML = `
            <h4>${assignment.name}</h4>
            <p>Subject: ${assignment.subject}</p>
            <p>Type: ${assignment.type}</p>
            <p>Due Date: ${assignment.dueDate}</p>
        `;
        assignmentsList.appendChild(assignmentDiv);
    });
}

// Render "Student Submissions" Section for Teachers
function renderStudentSubmissionsSection() {
    const content = `
        <h3>Student Submissions</h3>
        <div id="submissionsList"></div>
    `;
    document.getElementById('teacherContent').innerHTML = content;

    // Load submissions from local storage
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];

    const submissionsList = document.getElementById('submissionsList');
    submissions.forEach(submission => {
        const assignment = getAssignmentById(submission.assignmentId);
        if (assignment) {
            const submissionDiv = document.createElement('div');
            submissionDiv.classList.add('submission-card');
            submissionDiv.innerHTML = `
                <h4>${assignment.name} - Submitted by Student</h4>
                <p>Prompt: ${submission.prompt}</p>
                <p>Status: <span class="${getStatusClass(submission.status)}">${submission.status}</span></p>
                <p>Submission Date: ${submission.date}</p>
                <button class="btn btn-secondary" onclick="gradeSubmission('${submission.assignmentId}')">Grade Submission</button>
            `;
            submissionsList.appendChild(submissionDiv);
        }
    });
}

// Helper function to get assignment by ID
function getAssignmentById(assignmentId) {
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    return assignments.find(assignment => assignment.id === assignmentId);
}

// Function to Grade a Submission
function gradeSubmission(assignmentId) {
    console.log(`Grading submission for assignment ID: ${assignmentId}`);
    // You can add logic here to mark assignments as graded
    alert('Submission graded successfully! (Functionality to be implemented)');
}

// Render "Class Averages" Section for Teachers
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
        { student: 'Student C', average: 78 }
    ];

    // Render the class average chart using Chart.js
    renderClassAverageChart(studentAverages);
}

// Render "Input Exam Results" Section for Teachers
function renderInputExamResultsSection() {
    const content = `
        <h3>Input Exam Results</h3>
        <form id="examResultsForm">
            <div class="form-group">
                <label for="examStudent">Student Name</label>
                <input type="text" id="examStudent" placeholder="Enter student name" required>
            </div>
            <div class="form-group">
                <label for="examSubject">Subject</label>
                <input type="text" id="examSubject" placeholder="Enter subject name" required>
            </div>
            <div class="form-group">
                <label for="examScore">Score (%)</label>
                <input type="number" id="examScore" placeholder="Enter score" required>
            </div>
            <button type="submit" class="btn">Submit Results</button>
        </form>
    `;
    document.getElementById('teacherContent').innerHTML = content;

    // Set up event listener for form submission
    document.getElementById('examResultsForm').addEventListener('submit', (event) => {
        event.preventDefault();

        // Collect form data
        const student = document.getElementById('examStudent').value.trim();
        const subject = document.getElementById('examSubject').value.trim();
        const score = document.getElementById('examScore').value.trim();

        if (student && subject && score) {
            console.log(`Exam Results Submitted for ${student}: ${subject}, Score: ${score}%`);
            alert('Exam results submitted successfully!');
            // Clear form fields after submission
            document.getElementById('examResultsForm').reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Utility Function to Get Status Class for Submission Status
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
