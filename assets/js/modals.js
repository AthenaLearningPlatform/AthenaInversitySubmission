// Function to Open a Modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling when modal is open
    }
}

// Function to Close a Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling when modal is closed
    }
}

// Function to Set Up Event Listeners for Close Buttons
function setupModalCloseListeners() {
    // Attach close event to all modal close buttons
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });

    // Attach event listener to close modal if clicked outside of modal content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

// Function to Handle Modal Actions for Quickfire Questions
function handleQuickfireModal() {
    const quickfireForm = document.getElementById('quickfireForm');
    if (quickfireForm) {
        quickfireForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Collect quickfire answers
            const answers = [];
            const questionsContainer = document.getElementById('questionsContainer');
            if (questionsContainer) {
                const inputs = questionsContainer.querySelectorAll('input[type="text"]');
                inputs.forEach((input, index) => {
                    answers.push({ question: `Question ${index + 1}`, answer: input.value });
                });
            }

            // Example: Log the answers (can be modified to save data)
            console.log('Quickfire Answers:', answers);

            // Close the modal after submission
            closeModal('quickfireModal');
        });
    }
}

// Function to Handle Modal Actions for Project Prompt Selection
function handleProjectPromptModal() {
    const submitPromptButton = document.getElementById('submitProjectPrompt');
    if (submitPromptButton) {
        submitPromptButton.addEventListener('click', () => {
            const selectedPrompt = document.querySelector('.prompt-option.selected');
            if (selectedPrompt) {
                console.log('Selected Prompt:', selectedPrompt.textContent); // Example: Log selected prompt

                // Close the modal after prompt selection
                closeModal('projectPromptModal');
                alert('You have selected the following prompt: ' + selectedPrompt.textContent);
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

// Function to Handle Modal Actions for Project Topic Input
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

        // Generate a larger variety of prompts using the selected skills and topic
        const generatedPrompts = [];
        selectedSkills.forEach(skill => {
            generatedPrompts.push(
                `Research and explain how can impact the future development of ${topic}.`,
                `Write an essay analyzing the importance of in understanding and addressing ${topic}.`,
                `Create a plan or model demonstrating the application of to solve an issue related to ${topic}.`,
                `Discuss historical instances where played a critical role in solving issues related to ${topic}.`,
                `Make a case study using to propose an innovative solution to a current problem involving ${topic}.`,
                `Prepare a presentation highlighting the relevance of in modern-day discussions of ${topic}.`,
                `Critically assess how a focus on might change the way we think about ${topic}.`,
                `Write a narrative exploring how could transform in the next decade.`,
                `Compose a debate speech advocating the importance of in improving our knowledge of ${topic}.`,
                `Develop a project proposal that integrates into efforts aimed at tackling challenges related to ${topic}.`
            );
        });

        // Select three random prompts from the generated list
        const selectedPrompts = [];
        while (selectedPrompts.length < 3) {
            const randomIndex = Math.floor(Math.random() * generatedPrompts.length);
            if (!selectedPrompts.includes(generatedPrompts[randomIndex])) {
                selectedPrompts.push(generatedPrompts[randomIndex]);
            }
        }

        // Create prompt options dynamically
        selectedPrompts.forEach((prompt, index) => {
            const promptDiv = document.createElement('div');
            promptDiv.classList.add('prompt-option');
            promptDiv.textContent = prompt;
            promptOptionsContainer.appendChild(promptDiv);
        });

        // Re-initialize prompt selection listeners
        handleProjectPromptModal();
    }
}

// Initialize Modal Event Listeners on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    setupModalCloseListeners(); // Set up close button event listeners
    handleQuickfireModal(); // Set up quickfire questions modal functionality
    handleProjectPromptModal(); // Set up project prompt selection modal functionality
    handleProjectTopicModal(); // Set up project topic input modal functionality
});
