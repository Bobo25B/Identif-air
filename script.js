let data = [];
let filteredData = [];
let current = 0;

async function loadData() {
  try {
    const res = await fetch("data.json");
    data = await res.json();
    applyFilters();
  } catch (e) {
    console.error("Erreur chargement JSON :", e);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getSelectedCategories() {
  const checkboxes = document.querySelectorAll("#filters input:checked");
  return Array.from(checkboxes).map(cb => cb.value);
}

function applyFilters() {
  const selected = getSelectedCategories();

  // ✅ fallback si pas de category
  filteredData = data.filter(q => {
    if (!q.category) return true; // accepte si pas défini
    return selected.includes(q.category);
  });

  console.log("Filtré :", filteredData);

  if (filteredData.length === 0) {
    document.getElementById("result").innerText = "Aucune catégorie sélectionnée !";
    document.getElementById("planeImage").src = "";
    return;
  }

  shuffle(filteredData);
  current = 0;
  showQuestion();
}

function showQuestion() {
  if (filteredData.length === 0) return;

  let q = filteredData[current];

  let img = Array.isArray(q.images)
    ? q.images[Math.floor(Math.random() * q.images.length)]
    : q.images;

  document.getElementById("planeImage").src = img;
  document.getElementById("result").innerText = "";
}

function showAnswer() {
  let q = filteredData[current];
  document.getElementById("result").innerText = "Réponse : " + q.answer;
}

function nextQuestion() {
  current++;
  if (current >= filteredData.length) {
    shuffle(filteredData);
    current = 0;
  }
  showQuestion();
}

// ⚠️ IMPORTANT : attendre que le DOM soit chargé
window.onload = () => {
  document.getElementById("answerBtn").onclick = showAnswer;
  document.getElementById("nextBtn").onclick = nextQuestion;

  document.querySelectorAll("#filters input").forEach(cb => {
    cb.addEventListener("change", applyFilters);
  });

  loadData();
};
