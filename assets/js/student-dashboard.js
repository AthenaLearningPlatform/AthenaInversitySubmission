// Function to Initialize Student Dashboard
function initializeStudentDashboard() {
    // Display student dashboard and hide other sections
    document.getElementById('studentDashboard').classList.remove('hidden');
    document.getElementById('teacherDashboard').classList.add('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');

    // Load the default section, which is "View Assignments"
    loadStudentSection('viewAssignments');
}

// Load Specific Section of the Student Dashboard
function loadStudentSection(section) {
    // Clear all previous content
    document.getElementById('studentContent').innerHTML = '';

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

// Render "Your Assignments" Section for Students
function renderViewAssignmentsStudentSection() {
    const content = `
        <h3>Your Assignments</h3>
        <div id="assignmentsList"></div>
    `;
    document.getElementById('studentContent').innerHTML = content;

    // Load assignments from local storage
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];

    // If there are no assignments, show a friendly message
    if (assignments.length === 0) {
        document.getElementById('assignmentsList').innerHTML = "<p>No assignments available at the moment.</p>";
        return;
    }

    const assignmentsList = document.getElementById('assignmentsList');
    assignments.forEach(assignment => {
        const assignmentDiv = document.createElement('div');
        assignmentDiv.classList.add('assignment-card');
        assignmentDiv.innerHTML = `
            <h4>${assignment.name}</h4>
            <p>Subject: ${assignment.subject}</p>
            <p>Type: ${assignment.type}</p>
            <p>Due Date: ${assignment.dueDate}</p>
            ${assignment.type === 'project' ? `<button class="btn btn-secondary" onclick="startProject(${assignment.id})">Start Project</button>` : ''}
        `;
        assignmentsList.appendChild(assignmentDiv);
    });
}

// Function to Start a Project (Student's Interaction)
function startProject(assignmentId) {
    console.log(`Starting project with ID: ${assignmentId}`);
    // Save the current project ID for later reference
    window.currentAssignmentId = assignmentId;

    // Open the project topic input modal
    openModal('projectTopicModal');
}

// Handle Project Topic Modal Actions
function handleProjectTopicModal() {
    const projectTopicForm = document.getElementById('projectTopicForm');
    if (projectTopicForm) {
        projectTopicForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Collect the entered topic
            const topicInput = document.getElementById('projectTopicInput');
            if (topicInput && topicInput.value.trim() !== '') {
                const enteredTopic = topicInput.value.trim();
                console.log('Entered Topic:', enteredTopic); // Example: Log the entered topic

                // Generate prompts based on the entered topic and teacher-selected skills
                generatePromptsForTopicAndSkills(enteredTopic);

                // Close the topic input modal
                closeModal('projectTopicModal');
                // Open the project prompt modal to allow the user to choose a prompt
                openModal('projectPromptModal');
            }
        });
    }
}

// Function to Generate Prompts Based on Entered Topic and Teacher's Selected Skills
function generatePromptsForTopicAndSkills(topic) {
    const promptOptionsContainer = document.getElementById('promptOptionsContainer');
    if (promptOptionsContainer) {
        // Clear previous prompts
        promptOptionsContainer.innerHTML = '';

        // Retrieve the assignment using the current assignment ID
        const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
        const currentAssignment = assignments.find(assignment => assignment.id === window.currentAssignmentId);

        // Generate prompts using the selected skills and topic
        const generatedPrompts = [];
        selectedSkills.forEach(skill => {
            generatedPrompts.push(
                `Research and explain how ${skill} can impact the future development of ${topic}.`,
                `Write an essay analyzing the importance of ${skill} in understanding and addressing ${topic}.`,
                `Create a plan demonstrating the application of ${skill} to solve an issue related to ${topic}.`
            );
        });

        // Create prompt options dynamically
        generatedPrompts.slice(0, 3).forEach((prompt) => {
            const promptDiv = document.createElement('div');
            promptDiv.classList.add('prompt-option');
            promptDiv.textContent = prompt;
            promptOptionsContainer.appendChild(promptDiv);
        });

        // Re-initialize prompt selection listeners
        handleProjectPromptModal();
    }
}

// Handle Project Prompt Modal Actions for Prompt Selection
function handleProjectPromptModal() {
    const submitPromptButton = document.getElementById('submitProjectPrompt');
    if (submitPromptButton) {
        submitPromptButton.addEventListener('click', () => {
            const selectedPrompt = document.querySelector('.prompt-option.selected');
            if (selectedPrompt) {
                console.log('Selected Prompt:', selectedPrompt.textContent);

                // Save the selected prompt (this could also be submitted to the server or local storage)
                const submission = {
                    assignmentId: window.currentAssignmentId,
                    prompt: selectedPrompt.textContent,
                    status: 'Submitted',
                    date: new Date().toLocaleDateString()
                };
                
                let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
                submissions.push(submission);
                localStorage.setItem('submissions', JSON.stringify(submissions));

                // Alert success
                alert('Project submission successful!');

                // Close the modal after selection
                closeModal('projectPromptModal');
            } else {
                alert('Please select a prompt to continue.');
            }
        });
    }

    // Allow selecting a prompt
    const promptOptions = document.querySelectorAll('.prompt-option');
    promptOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Deselect all prompts first
            promptOptions.forEach(opt => opt.classList.remove('selected'));
            // Select the clicked prompt
            option.classList.add('selected');
            // Enable the submit button
            submitPromptButton.disabled = false;
        });
    });
}

// Render "My Submissions" Section for Students
function renderMySubmissionsSection() {
    const content = `
        <h3>My Submissions</h3>
        <div id="submissionsList"></div>
    `;
    document.getElementById('studentContent').innerHTML = content;

    // Load submissions from local storage
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];

    const submissionsList = document.getElementById('submissionsList');
    submissions.forEach(submission => {
        const assignment = getAssignmentById(submission.assignmentId);
        if (assignment) {
            const submissionDiv = document.createElement('div');
            submissionDiv.classList.add('submission-card');
            submissionDiv.innerHTML = `
                <h4>${assignment.name}</h4>
                <p>Prompt: ${submission.prompt}</p>
                <p>Status: <span class="${getStatusClass(submission.status)}">${submission.status}</span></p>
                <p>Submission Date: ${submission.date}</p>
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

// Render "Average Grade" Section for Students
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
        { assignment: 'Assignment 3', score: 75 }
    ];

    // Render the student performance chart using Chart.js
    renderStudentPerformanceChart(assignmentScores);
}

// Render "Input Exam Results" Section for Students
function renderInputExamResultsStudentSection() {
    const content = `
        <h3>Input Exam Results</h3>
        <form id="examResultsForm">
            <div class="form-group">
                <label for="examSubject">Subject</label>
                <input type="text" id="examSubject" placeholder="Enter subject name" required>
            </div>
            <div class="form-group">
                <label for="examTitle">Exam Title</label>
                <input type="text" id="examTitle" placeholder="Enter exam title" required>
            </div>
            <div class="form-group">
                <label for="examScore">Score (%)</label>
                <input type="number" id="examScore" placeholder="Enter score" required>
            </div>
            <button type="submit" class="btn">Submit Results</button>
        </form>
    `;
    document.getElementById('studentContent').innerHTML = content;

    // Set up event listener for form submission
    document.getElementById('examResultsForm').addEventListener('submit', (event) => {
        event.preventDefault();

        // Collect form data
        const subject = document.getElementById('examSubject').value.trim();
        const title = document.getElementById('examTitle').value.trim();
        const score = document.getElementById('examScore').value.trim();

        if (subject && title && score) {
            console.log(`Exam Results Submitted: ${subject}, ${title}, ${score}%`);
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

// Function to open the project topic modal
function openProjectTopicModal(assignmentId) {
    const modal = document.getElementById('projectTopicModal');
    const projectTopicForm = document.getElementById('projectTopicForm');
    const projectTopicInput = document.getElementById('projectTopicInput');
    const generatePromptBtn = document.getElementById('generatePromptBtn');

    projectTopicInput.value = ''; // Clear previous input
    generatePromptBtn.disabled = true; // Disable the button initially

    // Show the modal
    modal.style.display = 'flex';

    // Enable the "Generate Prompts" button when text is entered in the input field
    projectTopicInput.addEventListener('input', function () {
        if (projectTopicInput.value.trim() !== '') {
            generatePromptBtn.disabled = false; // Enable the button if input is not empty
        } else {
            generatePromptBtn.disabled = true; // Keep it disabled if input is empty
        }
    });

    // Handle form submission manually
    projectTopicForm.onsubmit = function (event) {
        event.preventDefault(); // Prevent the form from submitting and reloading the page

        const topic = projectTopicInput.value.trim();
        if (!topic) {
            alert('Please enter a topic.');
            return;
        }

        // Generate the prompt options based on the entered topic
        const promptOptions = generatePromptOptions(topic);

        // Open the modal to display the generated prompts
        openProjectPromptModal(assignmentId, topic, promptOptions);

        // Close the "Enter Topic" modal
        modal.style.display = 'none';
    };
}

// Function to generate prompt options based on the entered topic
function generatePromptOptions(topic) {
    // Example prompt generation logic based on the entered topic
    return [
        `Analyze the impact of ${topic} on global politics.`,
        `Discuss the historical evolution of ${topic} and its effects.`,
        `Evaluate the ethical considerations surrounding ${topic}.`
    ];
}

// Function to open the project prompt modal with generated options
function openProjectPromptModal(assignmentId, topic, promptOptions) {
    const modal = document.getElementById('projectPromptModal');
    const promptOptionsContainer = document.getElementById('promptOptionsContainer');
    const submitPromptButton = document.getElementById('submitProjectPrompt');

    // Generate radio buttons for each prompt option
    promptOptionsContainer.innerHTML = promptOptions.map((prompt, idx) => `
        <div class="form-group">
            <input type="radio" id="prompt${idx}" name="prompt" value="${prompt}">
            <label for="prompt${idx}">${prompt}</label>
        </div>
    `).join('');

    // Enable the submit button when a radio button is selected
    promptOptionsContainer.querySelectorAll('input[name="prompt"]').forEach(radio => {
        radio.addEventListener('change', () => {
            submitPromptButton.disabled = false; // Enable button when a prompt is selected
        });
    });

    submitPromptButton.onclick = function () {
        const selectedRadio = promptOptionsContainer.querySelector('input[name="prompt"]:checked');
        if (selectedRadio) {
            const chosenPrompt = selectedRadio.value;
            const projectIdeas = generateProjectIdeas(chosenPrompt);  // Generate project ideas based on the selected prompt
            displayProjectIdeas(projectIdeas);  // Display the project ideas to the student
            modal.style.display = 'none'; // Close the modal
        } else {
            alert('Please select a prompt.');
        }
    };

    modal.style.display = 'flex'; // Show the modal
}

// Function to generate project ideas based on the selected prompt
function generateProjectIdeas(prompt) {
    // Example project ideas based on selected prompt
    const projectIdeas = {
        "Analyze the impact of climate change on global politics": [
            "Write a research paper on how climate change affects migration patterns.",
            "Create a presentation on the role of international organizations in addressing climate change.",
            "Develop a policy proposal for reducing carbon emissions in developing countries."
        ],
        "Discuss the historical evolution of climate change and its effects": [
            "Create a timeline of major events related to climate change and its effects.",
            "Write an essay on how climate change has influenced world politics over the last century.",
            "Research the role of early climate scientists and their contributions to climate change awareness."
        ],
        "Evaluate the ethical considerations surrounding climate change": [
            "Debate the ethics of geoengineering as a solution to climate change.",
            "Research the ethical implications of climate change on indigenous communities.",
            "Write a paper on the responsibilities of developed nations in combating climate change."
        ]
    };

    // Return the corresponding project ideas for the selected prompt
    return projectIdeas[prompt] || [];  // Default to an empty array if no match is found
}

// Function to display the project ideas
function displayProjectIdeas(projectIdeas) {
    const projectIdeasContainer = document.getElementById('projectIdeasContainer');
    
    if (projectIdeas.length === 0) {
        projectIdeasContainer.innerHTML = '<p>No project ideas available for the selected prompt.</p>';
        return;
    }

    projectIdeasContainer.innerHTML = projectIdeas.map((idea, idx) => `
        <div class="project-idea">
            <p><strong>Project Idea ${idx + 1}:</strong> ${idea}</p>
        </div>
    `).join('');
}
