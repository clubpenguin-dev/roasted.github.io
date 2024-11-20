// Firebase authentication setup (make sure your Firebase config is added)
firebase.initializeApp(firebaseConfig);

// Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const logoutButton = document.getElementById('logout-button');
const postButton = document.getElementById('post-button');
const postInput = document.getElementById('post-input');
const postsContainer = document.getElementById('posts-container');
const userNameDisplay = document.getElementById('user-name-display');

// Authentication: User Sign Up
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log('User signed up:', userCredential.user);
    // Redirect to feed or homepage
    window.location.href = 'feed.html'; // Assuming feed.html is your main post page
  } catch (error) {
    alert(error.message);
  }
});

// Authentication: User Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log('User logged in:', userCredential.user);
    // Redirect to feed or homepage
    window.location.href = 'feed.html';
  } catch (error) {
    alert(error.message);
  }
});

// Authentication: User Logout
logoutButton.addEventListener('click', async () => {
  try {
    await firebase.auth().signOut();
    console.log('User logged out');
    window.location.href = 'login.html'; // Assuming login.html is your login page
  } catch (error) {
    alert(error.message);
  }
});

// Firebase Auth State Change Listener (to handle page redirects if not logged in)
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('User is logged in:', user);
    // Show user info and posts if logged in
    userNameDisplay.textContent = user.displayName || user.email;
    loadPosts();
  } else {
    console.log('No user is logged in');
    // Redirect to login if not logged in
    window.location.href = 'login.html';
  }
});
