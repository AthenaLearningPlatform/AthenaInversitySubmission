// User data storage (initial users for testing)
const users = {
    'teacher1': { password: 'pass123', role: 'teacher' },
    'student1': { password: 'pass123', role: 'student' }
};

// Current logged-in user state
let currentUser = null;

// Registration Functionality
function register() {
    clearErrors();

    // Collecting form values
    const username = document.getElementById('reg_username').value.trim();
    const password = document.getElementById('reg_password').value.trim();
    const role = document.getElementById('reg_role').value;

    // Validations
    if (!username || !password || !role) {
        document.getElementById('registerError').textContent = 'All fields are required.';
        return;
    }
    if (users[username]) {
        document.getElementById('registerError').textContent = 'Username is already taken.';
        return;
    }

    // Registering new user
    users[username] = { password, role };
    document.getElementById('registerError').textContent = 'Registration successful! Please log in.';
    
    // Clear fields and switch to login form
    document.getElementById('reg_username').value = '';
    document.getElementById('reg_password').value = '';
    document.getElementById('reg_role').value = '';
    showLoginForm();
}

// Login Functionality
function login() {
    clearErrors();

    // Collecting form values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validations
    if (!username || !password) {
        document.getElementById('loginError').textContent = 'Please enter both username and password.';
        return;
    }
    if (!users[username] || users[username].password !== password) {
        document.getElementById('loginError').textContent = 'Invalid username or password.';
        return;
    }

    // Successful login
    currentUser = { username, role: users[username].role };

    // Redirect to appropriate dashboard
    if (currentUser.role === 'teacher') {
        initializeTeacherDashboard();
    } else if (currentUser.role === 'student') {
        initializeStudentDashboard();
    }

    // Hide login form after successful login
    document.getElementById('loginForm').classList.add('hidden');
}

// Logout Functionality
function logout() {
    currentUser = null;
    document.getElementById('teacherDashboard').classList.add('hidden');
    document.getElementById('studentDashboard').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    clearFields();
}

// Clear error messages on authentication forms
function clearErrors() {
    document.getElementById('loginError').textContent = '';
    document.getElementById('registerError').textContent = '';
}

// Clear input fields
function clearFields() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('reg_username').value = '';
    document.getElementById('reg_password').value = '';
}

// Show the registration form and hide the login form
function showRegisterForm() {
    clearErrors();
    clearFields();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

// Show the login form and hide the registration form
function showLoginForm() {
    clearErrors();
    clearFields();
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

// Setup Event Listeners for Authentication
function setupAuthEventListeners() {
    // Event listener for login button
    document.getElementById('loginButton').addEventListener('click', login);

    // Event listener for register button
    document.getElementById('registerButton').addEventListener('click', register);

    // Toggle links for switching between login and register forms
    document.getElementById('showRegister').addEventListener('click', showRegisterForm);
    document.getElementById('showLogin').addEventListener('click', showLoginForm);

    // Event listeners for logout buttons in both dashboards
    document.getElementById('logoutTeacher').addEventListener('click', logout);
    document.getElementById('logoutStudent').addEventListener('click', logout);
}

// Initialize authentication listeners on DOM content loaded
document.addEventListener('DOMContentLoaded', setupAuthEventListeners);
