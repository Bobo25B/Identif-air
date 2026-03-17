let data = [];
let current = 0;

async function loadData() {
  const res = await fetch("data.json");
  data = await res.json();
  shuffle(data);
  showQuestion();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showQuestion() {
  let q = data[current];

  document.getElementById("planeImage").src = q.images;
  document.getElementById("result").innerText = "";
}

function showAnswer() {
  let q = data[current];
  document.getElementById("result").innerText = "Réponse : " + q.answer;
}

function nextQuestion() {
  current++;

  if (current >= data.length) {
    alert("Toutes les images ont été vues !");
    current = 0;
    shuffle(data);
  }

  showQuestion();
}

document.getElementById("answerBtn").onclick = showAnswer;
document.getElementById("nextBtn").onclick = nextQuestion;

loadData();
