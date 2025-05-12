const clientId = '26793'; 
const redirectUri = 'https://anilist.co/api/v2/oauth/pin'; 

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById("login-btn");
    if (loginButton) {
        loginButton.addEventListener("click", () => {
            const authUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}`;
            window.location.href = authUrl;
        });
    }

    const hash = window.location.hash;
    if (hash.includes('access_token')) {
        const token = new URLSearchParams(hash.substring(1)).get('access_token');
        localStorage.setItem('anilist_token', token);
        alert("Logged in successfully!");
    }
});

async function saveRecommendation(recommendation) {
  try {
    const response = await fetch('http://localhost:3001/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recommendation)
    });

    const result = await response.json();
    console.log("Saved recommendation:", result);
  } catch (err) {
    console.error("Error saving recommendation:", err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("recommendation-form");
  const status = document.getElementById("status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const animeTitle = document.getElementById("anime-title").value.trim();
      const score = parseFloat(document.getElementById("score").value.trim());

      if (!username || !animeTitle || isNaN(score)) {
        status.textContent = "Please fill in all fields correctly.";
        return;
      }

      status.textContent = "Sending...";

      await saveRecommendation({
        username,
        anime_title: animeTitle,
        score
      });

      status.textContent = "✅ Recommendation saved!";
      form.reset();
    });
  }
});