const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: "css",          // Set the mode to CSS
    theme: "monokai",     // Optional: Use the Monokai theme
    lineNumbers: true,    // Enable line numbers
    matchBrackets: true,  // Enable bracket matching
    indentUnit: 2,        // Set indentation level to 2 spaces
    tabSize: 2            // Set the tab size to 2 spaces
});

editor.setSize(null, 400);

const genCss = document.querySelector("#generatedCss");
const smile = document.getElementById('smile');
const render = document.querySelector("#render");
const solution = document.getElementById('solution');

let activeValidation = null;
let freezeSmile = false;

function generateStyle() {
    genCss.innerHTML = editor.getValue();
}

function setSmile(imagePath){
    if(!freezeSmile){
        smile.src = 'reaction/' + imagePath;
    } 
}

smile.addEventListener('mouseover', function () {
    setSmile('shaking_face.png')    
});

smile.addEventListener('mouseout', function () {
    setSmile('slightly_smiling_face.png')     
});

smile.addEventListener('click', function () {
    smile.src = 'reaction/expressionless_face.png';
    freezeSmile = !freezeSmile;
});

function validate() {
    generateStyle();

    const isCorrect = activeValidation();
    if (isCorrect) {
        setSmile('grinning_face_with_big_eyes.png');
        render.className = 'correct';

    } else {
        setSmile('confused_face.png');
        render.className = 'wrong';
    }
}


document.getElementById('solve').addEventListener('click', function () {
    editor.setValue(solution.innerText);
    generateStyle();    
    setSmile('unamused_face.png');
});

function setTask(taskName) {
    editor.off('change', validate);
    
    render.className = '';

    const activeTask = document.getElementById(taskName);
    document.getElementById("text").innerHTML = activeTask.querySelector("template.info").innerHTML;
    document.getElementById("task_text").innerHTML = activeTask.querySelector("template.task").innerHTML;
    editor.setValue(activeTask.querySelector("textarea.default").textContent);
    solution.textContent = activeTask.querySelector("textarea.solution").textContent;
    render.innerHTML = activeTask.querySelector("template.html").innerHTML;

    setSmile(activeTask.dataset.smile);

    activeValidation = window["validate_" + taskName];

    document.querySelectorAll("nav button").forEach(function (b) {
        b.className = "";
    });

    document.querySelector('nav button[data-target="' + taskName + '"]').className = "active";

    generateStyle();

    editor.on('change', validate);
}

function buildNav() {
    const nav = document.querySelector("nav");
    const tabs = document.querySelectorAll("#steps div");
    tabs.forEach((t) => {
        const button = document.createElement("button");
        button.innerText = t.dataset.title;
        button.dataset.target = t.id;
        button.addEventListener("click", function (e) {
            setTask(e.target.dataset.target);
        });
        nav.appendChild(button);
    });
}

buildNav();

setTask('task1');


