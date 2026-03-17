let data = [];
let current = 0;

async function loadData() {
  const res = await fetch("data.json");
  data = await res.json();
  shuffle(data);
  showQuestion();
}

// Mélange du tableau
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Affiche la question courante
function showQuestion() {
  let q = data[current];

  // Choisit une image aléatoire parmi celles disponibles
  let img;
  if (Array.isArray(q.images)) {
    img = q.images[Math.floor(Math.random() * q.images.length)];
  } else {
    img = q.images;
  }

  document.getElementById("planeImage").src = img;
  document.getElementById("result").innerText = "";
}

// Affiche la réponse
function showAnswer() {
  let q = data[current];
  document.getElementById("result").innerText = "Réponse : " + q.answer;
}

// Passe à la question suivante (boucle infinie, mélange aléatoire)
function nextQuestion() {
  current++;
  if (current >= data.length) {
    shuffle(data);
    current = 0;
  }
  showQuestion();
}

// Lien avec les boutons
document.getElementById("answerBtn").onclick = showAnswer;
document.getElementById("nextBtn").onclick = nextQuestion;

// Charger les données au démarrage
loadData();
