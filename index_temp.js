const chapterInput = document.getElementById("chapter-name");
const timeInput = document.getElementById("completion-time");
const subjectInput = document.getElementById("subject");
const submitBtn = document.querySelector('button[type="submit"]');

const print = (value) => {
  console.log(value);
};

submitBtn.onclick = (e) => {
  const chapter = {
    id: Date.now(),
    name: chapterInput.value,
    time: timeInput.value,
    subject: subjectInput.value,
  };
};
