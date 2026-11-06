const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

const questions = [
  { q: "A video of a famous person makes a shocking claim. What should you do first?", a: ["Forward it before it gets deleted", "Pause and look for the original source", "Trust it if the video looks clear"], correct: 1, why: "Correct. Pause first, then find the original source and check whether reliable independent sources confirm it." },
  { q: "An AI detector says a video is fake. Is that final proof?", a: ["Yes, detectors are always correct", "No, detector results can be wrong", "Only if the video is short"], correct: 1, why: "Correct. Detection tools can make mistakes. Treat their output as one clue and verify the source and context." },
  { q: "A message says you must share it immediately or something terrible will happen. What is a warning sign?", a: ["It creates urgency and fear", "It has punctuation", "It was sent in the morning"], correct: 0, why: "Correct. Emotional pressure and urgency are common tactics used to encourage careless sharing." },
  { q: "What is the best way to check a viral news claim?", a: ["Read only the comments", "Check multiple reliable, independent sources", "Trust the post with the most likes"], correct: 1, why: "Correct. Compare credible independent sources and look for primary or official information." },
  { q: "You cannot verify an image or video. What is the responsible choice?", a: ["Share it with a warning that it is true", "Edit the caption to make it stronger", "Do not share it as fact"], correct: 2, why: "Correct. If you cannot verify it, avoid spreading it as fact. You can keep investigating or report harmful content." }
];
let current = 0, score = 0, answered = false;
const questionText = document.getElementById("questionText");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
function renderQuestion() {
  answered = false;
  const item = questions[current];
  document.getElementById("questionCount").textContent = `QUESTION ${current + 1} / ${questions.length}`;
  document.getElementById("progressBar").style.width = `${((current + 1) / questions.length) * 100}%`;
  questionText.textContent = item.q;
  answers.innerHTML = "";
  feedback.textContent = "";
  nextButton.disabled = true;
  nextButton.textContent = current === questions.length - 1 ? "See my result →" : "Next question →";
  item.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(index));
    answers.appendChild(button);
  });
}
function chooseAnswer(index) {
  if (answered) return;
  answered = true;
  const item = questions[current];
  [...answers.children].forEach((button, i) => {
    button.disabled = true;
    if (i === item.correct) button.classList.add("correct");
    else if (i === index) button.classList.add("wrong");
  });
  if (index === item.correct) score++;
  feedback.textContent = (index === item.correct ? "✓ " : "Not quite. ") + item.why;
  nextButton.disabled = false;
}
nextButton.addEventListener("click", () => {
  if (!answered) return;
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    const percent = Math.round((score / questions.length) * 100);
    document.getElementById("quizCard").innerHTML = `<div class="section-kicker">QUIZ COMPLETE</div><h3 style="font:700 28px 'Space Grotesk';margin:22px 0 8px">You scored ${score} / ${questions.length}</h3><p style="color:#77758a;font-size:13px;line-height:1.7">${percent >= 80 ? "Great work! Keep using these verification habits whenever you see surprising content." : "Good effort. Review the five verification steps and try again to strengthen your media-literacy habits."}</p><button class="btn btn-primary" id="retryButton">Try again ↻</button>`;
    document.getElementById("retryButton").addEventListener("click", () => { current = 0; score = 0; renderQuestion(); });
  }
});
renderQuestion();