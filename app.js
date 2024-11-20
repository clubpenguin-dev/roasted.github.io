// Initialize Firebase (Firebase config needs to be added here)
firebase.initializeApp(firebaseConfig);

// Elements
const postButton = document.getElementById('post-button');
const postInput = document.getElementById('post-input');
const meterValue = document.getElementById('meter-value');
const postsContainer = document.getElementById('posts-container');

// Firebase references
const postsRef = firebase.firestore().collection('posts');
const userRef = firebase.firestore().collection('users');

// Event listener for posting a roast
postButton.addEventListener('click', async () => {
  const roastText = postInput.value;
  if (roastText) {
    const roastStrength = calculateRoastStrength(roastText);
    const post = {
      text: roastText,
      strength: roastStrength,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    // Save post to Firebase
    await postsRef.add(post);

    // Clear input
    postInput.value = '';
  }
});

// Calculate the strength of the roast (this can be enhanced)
function calculateRoastStrength(roast) {
  const insults = ['stupid', 'dumb', 'ugly', 'loser', 'idiot'];
  let strength = 0;
  insults.forEach(word => {
    if (roast.toLowerCase().includes(word)) {
      strength++;
    }
  });
  meterValue.textContent = strength;
  return strength;
}

// Fetch posts from Firebase and display them
async function loadPosts() {
  const snapshot = await postsRef.orderBy('timestamp', 'desc').get();
  snapshot.forEach(doc => {
    const post = doc.data();
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <p>${post.text}</p>
      <p>Roast Strength: ${post.strength}</p>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Load posts on page load
loadPosts();
