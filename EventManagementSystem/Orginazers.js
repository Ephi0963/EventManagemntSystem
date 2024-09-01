const users = [
   
    { username: 'organizer', password: 'orgpass', role: 'organizer' },// this is for a test  it will be implented at the backend
   
];

function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('uname').value;
    const password = document.getElementById('psw').value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert(`Welcome, ${user.role}!`); // You can customize messages based on roles
        document.getElementById('id01').style.display='none'; // Close modal
        handleRole(user.role); // Redirect based on role
    } else {
        alert('Invalid username or password.'); // Error message for incorrect credentials
    }
}

function handleRole(role) {
    // Based on user role, redirect or show specific content
   
     if (role === 'organizer') {
        // Redirect to organizer page
        window.location.href = '/create.html';
    } 
}