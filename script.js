let data = [];
let current = 0;
let score = 0;
let answered = false;

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
  answered = false;

  let q = data[current];
  document.getElementById("planeImage").src = q.image;

  let choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach(choice => {
    let btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => checkAnswer(choice);
    choicesDiv.appendChild(btn);
  });

  document.getElementById("result").innerText = "";
}

function checkAnswer(choice) {
  if (answered) return;
  answered = true;

  let correct = data[current].answer;
  let result = document.getElementById("result");

  if (choice === correct) {
    result.innerText = "✅ Correct !";
    score++;
  } else {
    result.innerText = "❌ Faux ! Réponse: " + correct;
  }

  updateScore();
}

function nextQuestion() {
  current++;

  if (current >= data.length) {
    alert("Quiz terminé ! Score: " + score + "/" + data.length);
    current = 0;
    score = 0;
    shuffle(data);
  }

  showQuestion();
}

function updateScore() {
  document.getElementById("score").innerText =
    "Score: " + score + " / " + data.length;
}

document.getElementById("nextBtn").onclick = nextQuestion;

loadData();
