let data = [];
let filteredData = [];
let current = 0;

// Charger les données
async function loadData() {
  try {
    const res = await fetch("data.json");
    data = await res.json();
    console.log("Données chargées :", data);
    applyFilters();
  } catch (e) {
    console.error("Erreur chargement JSON :", e);
  }
}

// Mélange du tableau
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Récupère les catégories cochées
function getSelectedCategories() {
  const checkboxes = document.querySelectorAll("#filters input:checked");
  return Array.from(checkboxes).map(cb => cb.value);
}

// Applique le filtre
function applyFilters() {
  const selected = getSelectedCategories();

  filteredData = data.filter(q => selected.includes(q.category));

  if (filteredData.length === 0) {
    document.getElementById("result").innerText = "Pas de questions pour ces catégories.";
    document.getElementById("planeImage").src = "";
    return;
  }

  shuffle(filteredData);
  current = 0;
  showQuestion();
}

// Affiche la question courante
function showQuestion() {
  if (filteredData.length === 0) return;

  const q = filteredData[current];
  const img = Array.isArray(q.images)
    ? q.images[Math.floor(Math.random() * q.images.length)]
    : q.images;

  document.getElementById("planeImage").src = img;
  document.getElementById("result").innerText = "";
}

// Affiche la réponse
function showAnswer() {
  if (filteredData.length === 0) return;
  const q = filteredData[current];
  document.getElementById("result").innerText = "Réponse : " + q.answer;
}

// Question suivante
function nextQuestion() {
  if (filteredData.length === 0) return;
  current++;
  if (current >= filteredData.length) {
    shuffle(filteredData);
    current = 0;
  }
  showQuestion();
}

// ⚠️ Attendre que le DOM soit chargé
window.onload = () => {
  document.getElementById("answerBtn").onclick = showAnswer;
  document.getElementById("nextBtn").onclick = nextQuestion;

  document.querySelectorAll("#filters input").forEach(cb => {
    cb.addEventListener("change", applyFilters);
  });

  loadData();
};
