document.getElementById('post-button').addEventListener('click', postRoast);

function postRoast() {
  const roastInput = document.getElementById('roast-input').value;
  if (roastInput.length > 0) {
    const roastStrength = calculateRoastStrength(roastInput);
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <p>${roastInput}</p>
      <p>Roast Strength: ${roastStrength}</p>
    `;
    document.getElementById('posts').prepend(postElement);

    // Clear the input after posting
    document.getElementById('roast-input').value = '';
  }
}

function calculateRoastStrength(roast) {
  // Basic roast strength based on keywords (This can be enhanced)
  const insults = ['stupid', 'dumb', 'ugly', 'loser', 'idiot'];
  let strength = 0;
  insults.forEach(word => {
    if (roast.toLowerCase().includes(word)) {
      strength++;
    }
  });
  document.getElementById('meter-value').innerText = strength;
  return strength;
}
