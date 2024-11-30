// Test Case 1: Check if input is being captured correctly
function testInputCapture() {
    const projectTopicInput = document.getElementById('projectTopicInput');
    projectTopicInput.value = 'Climate Change'; // Simulate entering a topic
    console.log('Test 1 - Input Capture:');
    console.log('Input topic:', projectTopicInput.value);  // Expected output: 'Climate Change'
}

// Test Case 2: Check if the "Generate Prompts" button is being enabled
function testGeneratePromptsButton() {
    const projectTopicInput = document.getElementById('projectTopicInput');
    const generatePromptBtn = document.getElementById('generatePromptBtn');
    
    // Initially, the button should be disabled
    console.log('Test 2 - Button Disabled Initially:');
    console.log('Button disabled?', generatePromptBtn.disabled);  // Expected output: true

    // Simulate typing in the input
    projectTopicInput.value = 'Climate Change';
    projectTopicInput.dispatchEvent(new Event('input'));  // Trigger input event
    console.log('Button disabled after input (should be false):');
    console.log('Button disabled?', generatePromptBtn.disabled);  // Expected output: false
}

// Test Case 3: Check if prompts are generated correctly based on topic
function testGeneratePrompts() {
    const topic = 'Climate Change';
    const prompts = generatePromptOptions(topic);  // Function that generates prompts
    console.log('Test 3 - Generate Prompts:');
    console.log('Generated prompts for topic:', topic);
    console.log(prompts);  // Expected output: Array of prompts related to 'Climate Change'
}

// Test Case 4: Check if prompt is being selected and passed correctly
function testSelectPrompt() {
    const prompts = [
        "Analyze the impact of Climate Change on global politics.",
        "Discuss the historical evolution of Climate Change and its effects.",
        "Evaluate the ethical considerations surrounding Climate Change."
    ];
    
    // Simulate selecting a prompt
    const selectedPrompt = prompts[0];
    console.log('Test 4 - Prompt Selection:');
    console.log('Selected prompt:', selectedPrompt);  // Expected output: "Analyze the impact of Climate Change on global politics."
}

// Test Case 5: Check if the button enables when a prompt is selected
function testSubmitButtonEnablement() {
    const submitPromptButton = document.getElementById('submitProjectPrompt');
    const promptOptionsContainer = document.getElementById('promptOptionsContainer');
    
    // Simulate selecting a prompt
    const radioButton = promptOptionsContainer.querySelector('input[name="prompt"]');
    radioButton.checked = true;
    
    console.log('Test 5 - Submit Button Enablement:');
    console.log('Submit button enabled?', !submitPromptButton.disabled);  // Expected output: true (button should be enabled)
}

// Test Case 6: Check if project ideas are generated correctly
function testGenerateProjectIdeas() {
    const selectedPrompt = "Analyze the impact of Climate Change on global politics.";  // Selected prompt
    const projectIdeas = generateProjectIdeas(selectedPrompt);  // Generate project ideas for the selected prompt
    console.log('Test 6 - Generate Project Ideas:');
    console.log('Generated project ideas for selected prompt:', selectedPrompt);
    console.log(projectIdeas);  // Expected output: Array of 3 project ideas related to the selected prompt
}

// Test Case 7: Check if project ideas are displayed correctly in the modal
function testDisplayProjectIdeas() {
    const projectIdeas = [
        "Write a research paper on how climate change affects migration patterns.",
        "Create a presentation on the role of international organizations in addressing climate change.",
        "Develop a policy proposal for reducing carbon emissions in developing countries."
    ];
    
    // Simulate displaying the project ideas
    const projectIdeasContainer = document.getElementById('projectIdeasContainer');
    projectIdeasContainer.innerHTML = projectIdeas.map((idea, idx) => `
        <div class="project-idea">
            <p><strong>Project Idea ${idx + 1}:</strong> ${idea}</p>
        </div>
    `).join('');
    
    console.log('Test 7 - Display Project Ideas:');
    console.log('Project ideas displayed in container:');
    console.log(projectIdeasContainer.innerHTML);  // Expected output: The three project ideas in HTML format
}

// Test Case 8: Check if the modal closes correctly when clicking the close button
function testModalClose() {
    const projectTopicModal = document.getElementById('projectTopicModal');
    const closeButton = document.getElementById('closeProjectTopicModal');
    
    // Open the modal
    projectTopicModal.style.display = 'flex';
    console.log('Test 8 - Modal Opened:');
    console.log('Modal display style (should be "flex"):', projectTopicModal.style.display);  // Expected output: 'flex'
    
    // Simulate closing the modal
    closeButton.click();  // Trigger the close button click event
    console.log('Modal closed. Modal display style (should be "none"):', projectTopicModal.style.display);  // Expected output: 'none'
}

// Test Case 9: Check if the prompt options are being populated in the modal
function testPromptOptionsPopulation() {
    const prompts = [
        "Analyze the impact of Climate Change on global politics.",
        "Discuss the historical evolution of Climate Change and its effects.",
        "Evaluate the ethical considerations surrounding Climate Change."
    ];
    
    const promptOptionsContainer = document.getElementById('promptOptionsContainer');
    promptOptionsContainer.innerHTML = prompts.map((prompt, idx) => `
        <div class="form-group">
            <input type="radio" id="prompt${idx}" name="prompt" value="${prompt}">
            <label for="prompt${idx}">${prompt}</label>
        </div>
    `).join('');
    
    console.log('Test 9 - Prompt Options Population:');
    console.log('Prompt options populated in container:', promptOptionsContainer.innerHTML);  // Expected output: 3 radio buttons with prompts
}

// Run all the tests to verify the functionality
function runTests() {
    testInputCapture();
    testGeneratePromptsButton();
    testGeneratePrompts();
    testSelectPrompt();
    testSubmitButtonEnablement();
    testGenerateProjectIdeas();
    testDisplayProjectIdeas();
    testModalClose();
    testPromptOptionsPopulation();
}

// Run the tests
runTests();
