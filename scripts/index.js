const state = {
    taskList: [],
};

// To access DOM -- Need DOM OBJECT

const taskContents = document.querySelector(".task__contents")
const taskModal = document.querySelector(".task__modal_body")

// console.log(taskContent);

const htmlTaskContent = ({ id, title, description, type, url }) => `

<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card shadow-sm task__card">
        <div class="card-header d-flex gap-2 justify-content-end task__card_header">
            <button type="button" class="btn btn-outline-info mr-2" name=${id}><i class="fas fa-pencil-alt"
                    name=${id}></i></button>
            <button type="button" class="btn btn-outline-danger mr-2" name=${id}><i class="fas fa-trash-alt"
                    name=${id}></i></button>
        </div>
        <div class="card-body">
        <!-- becz img is optional so lets provide a default one -->
        ${url ? `<img width=" 100%" src=${url} alt="card-image cap" class=" card-image-top md-3 rounded-lg" /> `
        : `
            <img width=" 100%" src="https://imgs.search.brave.com/2ifs1BBJeFWLBaaP7tBttXlhe5e1B7PTCOrv2qWgTcM/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9icmVh/a3Rocm91Z2gub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzEwL2RlZmF1bHQt/cGxhY2Vob2xkZXIt/aW1hZ2UucG5n" alt="card-image cap" class=" card-image-top md-3 rounded-lg" />
            `}


    
    <h4 class="task__card_title" > ${title}</h4 >
            <p class="description trim-3-lines text-muted" data-gram_editor="false">${description}</p>
            <div class="tags text-white d-flex flex-wrap">
                <span class="badge bg-primary m-1"> ${type}<span>
            </div>
        </div>

   
    <div class="card-footer">
        <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal"
            data-bs-target="#showTask" id="${id}" onclick= "openTask.apply(this, arguments
                )" >Open Task</button>
    </div>
</div >
</div >
    `;

const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
    ${url ? `<img width=" 100%" src=${url} alt="card-image cap" class=" card-image-top md-3 rounded-lg" /> `
            : `
        <img width=" 100%" src="https://imgs.search.brave.com/2ifs1BBJeFWLBaaP7tBttXlhe5e1B7PTCOrv2qWgTcM/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9icmVh/a3Rocm91Z2gub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzEwL2RlZmF1bHQt/cGxhY2Vob2xkZXIt/aW1hZ2UucG5n" alt="card-image cap" class=" card-image-top md-3 rounded-lg" />
        `}
   
    <strong class ="text-sm text-muted">Created on ${date.toDateString()}</strong>
    <h2 class="my-3">${title}</h2>
    <p class ="lead">${description}</p>
    </div >
`;
};

//to store data in localstorage
//It can only store string so we need to do conversions
//localStorage.setItem("name", "Aashish")


//This fn will convert our data in string to store in localstprage
const updateLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify({
        tasks: state.taskList,

    }));
};


//now we want our data back in real format so we need to convert them again

const LoadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.tasks);
    if (localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardData) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    });
};

const handleSubmit = (event) => {
    const id = `${Date.now()} `;
    const input = {
        url: document.getElementById('imageUrl').value,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        type: document.getElementById('tags').value

    };
    if (input.title === "" || input.description === "" || input.type === "") {
        return alert("Please fill the required details")
    }
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({
        ...input,
        id,
    })
    );
    state.taskList.push({ ...input, id });
    updateLocalStorage();
};

const openTask = (e) => {
    if (!e) e = window.event;
    const getTask = state.taskList.find(({ id }) => id === e.target.id
    );
    taskModal.innerHTML = htmlModalContent(getTask);

}