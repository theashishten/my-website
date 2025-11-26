// Interactive behaviors extracted from index.html
// 1. Dynamic Year
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Toast Notification Function
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.background = type === "error" ? "#ef4444" : "#111827";
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// 3. Filter Logic
const filterButtons = document.querySelectorAll(".filters__btn");
const projectCards = document.querySelectorAll(".project");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filterValue = btn.getAttribute("data-filter");

    filterButtons.forEach((b) =>
      b.classList.remove("filters__btn--active")
    );
    btn.classList.add("filters__btn--active");

    projectCards.forEach((card) => {
      const cardTag = card.getAttribute("data-tag");

      if (filterValue === "All" || filterValue === cardTag) {
        card.classList.remove("hidden");
        setTimeout(() => card.classList.remove("fade-out"), 50);
      } else {
        card.classList.add("fade-out");
        setTimeout(() => card.classList.add("hidden"), 300);
      }
    });
  });
});

// 4. Gemini API Integration
const apiKey = ""; // Added at runtime

async function generateCreativeCopy(type) {
  const input = document.getElementById("aiInput").value.trim();
  const loader = document.getElementById("aiLoader");
  const output = document.getElementById("aiOutput");

  // Check for input (except for 'ask_me' if user leaves blank we can use a default question, but safer to ask)
  if (!input) {
    showToast("Please enter a brand, topic, or question!", "error");
    return;
  }

  loader.classList.add("active");
  output.innerHTML = "";

  let promptText = "";

  if (type === "slogans") {
    promptText = `Generate 3 catchy, professional, and short marketing slogans for: "${input}". Format them as a bulleted list.`;
  } else if (type === "elevator") {
    promptText = `Write a compelling 2-sentence elevator pitch for a product or service named "${input}". Keep it punchy and value-driven.`;
  } else if (type === "social") {
    promptText = `Write a short, viral-style LinkedIn hook (max 280 chars) for the topic: "${input}". Use 2 emojis.`;
  } else if (type === "ask_me") {
    const context = `
      I am Ashish, a Full-Stack Digital Marketer & Creative Technologist with 10+ years of experience.
      My history:
      - 2025-Present: Design Director at WHQ.
      - 2020-2025: Senior Designer/Design Director at TangoSquared.
      - 2018-2020: MA Graphic Design at SUNY Oswego.
      - 2016-2018: Brand Designer at Various Clients.
      - 2014-2016: Graphic Designer at MOV Communication.
      - 2010-2014: Graphic Designer at AiO Studio.

      My Philosophies:
      - Design should be at the strategy table.
      - First impressions matter.
      - I get things done the right way.
      - I keep things easy for everyone.
      - I'm curious and love learning.
      - I'm all about typography.

      My Tools:
      - Design: Figma, Adobe CC, Spline, Protopie.
      - Code: HTML/CSS, JS, React, Tailwind.
      - Growth: GA4, SEMrush, Meta Ads, HubSpot.
      - Automation: n8n, Zapier, OpenAI API, Make.com.
      `;
    promptText = `You are an AI representation of Ashish. Use this context to answer the question: ${context}. \n\nUser Question: "${input}". \nAnswer in the first person (as Ashish). Keep it friendly, professional, and under 50 words.`;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [{ text: promptText }],
      },
    ],
  };

  try {
    const response = await fetchWithBackoff(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No creative spark found. Try again.";

    output.innerHTML = text
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  } catch (error) {
    console.error(error);
    showToast("AI is taking a nap. Try again later.", "error");
    output.innerHTML =
      '<div class="ai-placeholder">Error generating content.</div>';
  } finally {
    loader.classList.remove("active");
  }
}

async function fetchWithBackoff(url, options, retries = 3, delay = 1000) {
  try {
    const response = await fetch(url, options);
    if (!response.ok && retries > 0) {
      throw new Error(`Server error: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchWithBackoff(url, options, retries - 1, delay * 2);
  }
}
