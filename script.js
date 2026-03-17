let data = [];
let current = 0;

async function loadData() {
  const res = await fetch("data.json");
  data = await res.json();
  shuffle(data);
  showQuestion();
}

function nextQuestion() {

  current++;

  if (current >= data.length) {
    shuffle(data);
    current = 0;
  }

  showQuestion();
}
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
