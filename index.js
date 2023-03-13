const chapterInput = document.getElementById('chapter-name')
const timeInput = document.getElementById('completion-time')
const subjectInput = document.getElementById('subject')
const submitBtn = document.querySelector('button[type="submit"]')

const print = (value) => {
    console.log(value)
}
submitBtn.onclick = (e) => {
    e.preventDefault()
    let chapterName = chapterInput.value
    let time = Number(timeInput.value)
    let subject = subjectInput.value
    if (chapterName == '' || time == '' || subject == '') {
        alert("Please fill the details of the chapter correctly")
    } else {
        let tasks = []
        const chapter = {
            name: chapterName,
            time: time,
            subject: subject
        }
        if (localStorage.getItem('tasks') == null) {
            tasks.unshift(chapter)
            localStorage.setItem('tasks', JSON.stringify(tasks))
        } else {
            tasks = localStorage.getItem('tasks')
            tasks = JSON.parse(tasks)
            tasks.unshift(chapter)
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
        populateTasks()

    }
}
let tasksContainer = document.getElementById('tasks')
const populateTasks = () => {
    tasksContainer.innerHTML = ''
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if (storedTasks == null) {
        tasksContainer.innerHTML += `<p style="margin-bottom:10px;padding:20px 10px;text-align:center;">No chapters to display</p>`
    } else {
        let subjects = []
        for (let i = 0; i < storedTasks.length; i++) {
            const chapter = storedTasks[i];
            if (subjects.includes(chapter.subject)) {
                continue
            } else {
                subjects.unshift(chapter.subject)
            }
        }

        for (let i = 0; i < subjects.length; i++) {
            const subject = subjects[i];
            let chapters = storedTasks.filter((chapter) => {
                return chapter.subject == subject
            })
            const subjectContainer = document.createElement(`section`);
            subjectContainer.classList.add('subject')
            subjectContainer.id = `${subject}`
            subjectContainer.innerHTML = `<h3>${subject}</h3>`
            let time = 0;
            for (let i = 0; i < chapters.length; i++) {
                const chapter = chapters[i];
                time += chapter.time;
                subjectContainer.innerHTML += `<div class="chapter">
                <p>${chapter.name}</p>
            <button onclick='populateCompleted(this)' class="btn btn-primary">Mark Done</button>
          </div>`
            }
            subjectContainer.innerHTML += `<div class="time">
            <h4>Total time</h4>
            <h4>${time}Hrs</h4>
            </div>`
            tasksContainer.appendChild(subjectContainer)
        }
    }
}

populateTasks()





const populateCompleted=(arg)=>{
print(arg)
}