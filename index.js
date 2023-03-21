const chapterInput = document.getElementById("chapter-name");
const timeInput = document.getElementById("completion-time");
const subjectInput = document.getElementById("subject");
const submitBtn = document.querySelector('button[type="submit"]');

const print = (value) => {
  console.log(value);
};
submitBtn.onclick = (e) => {
  e.preventDefault();
  let chapterName = chapterInput.value;
  let time = Number(timeInput.value);
  let subject = subjectInput.value;
  if (chapterName == "" || time == "" || subject == "") {
    alert("Please fill the details of the chapter correctly");
  } else {
    let tasks = [];
    const chapter = {
      id: Date.now(),
      name: chapterName,
      time: time,
      subject: subject,
    };
    if (localStorage.getItem("tasks") == null) {
      tasks.push(chapter);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      tasks = localStorage.getItem("tasks");
      tasks = JSON.parse(tasks);
      tasks.push(chapter);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    populateTasks();
    chapterInput.value = null;
    subjectInput.value = null;
    timeInput.value = "";
  }
};
let tasksContainer = document.getElementById("tasks");
const populateTasks = () => {
  tasksContainer.innerHTML = "<h2>Chapters to be completed</h2>";
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks == null || storedTasks.length === 0) {
    tasksContainer.innerHTML += `
    <p style="margin-bottom:10px;padding:20px 10px;text-align:center;">Seems like your syllabus is completed</p>`;
  } else {
    let subjects = [];
    for (let i = 0; i < storedTasks.length; i++) {
      const chapter = storedTasks[i];
      if (subjects.includes(chapter.subject)) {
        continue;
      } else {
        subjects.unshift(chapter.subject);
      }
    }

    for (let i = 0; i < subjects.length; i++) {
      const subject = subjects[i];
      let chapters = storedTasks.filter((chapter) => {
        return chapter.subject == subject;
      });
      const subjectContainer = document.createElement(`section`);
      subjectContainer.classList.add("subject");
      subjectContainer.id = `${subject}`;
      subjectContainer.innerHTML = `<h3>${subject}</h3>`;
      let time = 0;
      for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i];
        time += chapter.time;
        subjectContainer.innerHTML += `<div id=${chapter.id} class="chapter">
                <p>${chapter.name}</p>
            <button onclick='storeCompleted(${storedTasks.indexOf(
              chapter
            )})' class="btn btn-primary">Mark Done</button>
          </div>`;
      }
      subjectContainer.innerHTML += `<div class="time">
            <h4>Total time</h4>
            <h4>${time}Hrs</h4>
            </div>`;
      tasksContainer.appendChild(subjectContainer);
    }
  }
};

const setReviseDate = (id) => {
  let chapters = JSON.parse(localStorage.getItem("completedTasks"));
  let chapter = chapters[id];
  chapter.revised += 1;
  print(chapter.revised);
  chapter.completedAt = Date.now();
  localStorage.setItem("completedTasks", JSON.stringify(chapters));
  populateCompleted();
};

const convertToDate = (milisec) => {
  let d = new Date(milisec).toLocaleDateString();
  return d;
};
const completedChaptersSection = document.querySelector(".completed .chapters");
const populateCompleted = () => {
  let chapters = JSON.parse(localStorage.getItem("completedTasks"));
  if (chapters === null || chapters.length === 0) {
    completedChaptersSection.parentElement.innerHTML = `<h2>Completed chapters</h2>
<p style="text-align:center;padding-bottom:20px;">You have not completed any chapter yet
`;
  } else {
    completedChaptersSection.innerHTML = "";
    for (let i = 0; i < chapters.length; i++) {
      let chapter = chapters[i];
      completedChaptersSection.innerHTML += `
      <div class="chapter">
      <p>${chapter.name + "(" + chapter.revised + ")"}</p>
      <p onclick=setReviseDate(${i})>${convertToDate(chapter.completedAt)}</p>
      </div>
      `;
    }
  }
};

const storeCompleted = (i) => {
  let storedTasks = localStorage.getItem("tasks");
  storedTasks = JSON.parse(storedTasks);
  let chapter = storedTasks[i];
  chapter.completedAt = Date.now();
  chapter.revised = 0;
  let completedTasks = [];
  if (localStorage.getItem("completedTasks") !== null) {
    completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
  }
  completedTasks.unshift(chapter);
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  storedTasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
  populateTasks();
  populateCompleted();
};
populateTasks();
populateCompleted();
