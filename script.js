const inputBox = document.querySelector(".inputField input")
const addBtn = document.querySelector(".inputField button")
const todoList = document.querySelector(".todoList")
const deleteAllBtn = document.querySelector(".footer button")

if (window.matchMedia("(max-width: 249px)").matches) {
    inputBox.setAttribute("maxlength", "20");
}

if (window.matchMedia("(max-width: 290px)").matches) {
    inputBox.setAttribute("placeholder", "Digite uma tarefa");
    inputBox.style.paddingLeft = "5px"
}

inputBox.onkeyup = () => {
    let userData = inputBox.value // getting user entered

    if (userData.trim() != 0) { //if user values aren't only space
        addBtn.classList.add("active") //active the add button
    } else {
        addBtn.classList.remove("active") //remove active the add button
    }
}

showTasks()

// if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value //getting user entered

    let getLocalStorage = localStorage.getItem("Nova Tarefa") //getting localstorage

    if (getLocalStorage == null) { //if localstorage is null
        listArr = [] //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage) //tranforming json string into a js object
    }

    listArr.push(userData) //pushing or adding user data

    localStorage.setItem("Nova Tarefa", JSON.stringify(listArr)) //tranforming js object into a json string
    showTasks() //calling showtasks function

    addBtn.classList.remove("active")
}

//function to add task list inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("Nova Tarefa") //getting localstorage

    if (getLocalStorage == null) { //if localstorage is null
        listArr = [] //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage) //tranforming json string into a js object
    }

    const paragraphNumb = document.querySelector(".paragraphNumb")

    if (listArr.length > 0) {
        deleteAllBtn.classList.add("active")
    } else {
        deleteAllBtn.classList.remove("active")
    }

    if (listArr.length == 0) {
        paragraphNumb.innerHTML = "Você não tem nenhuma <br> tarefa pendente!"
    } else if (listArr.length == 1) {
        paragraphNumb.innerHTML = `Você tem ${listArr.length} tarefa <br> pendente!`
    } else {
        paragraphNumb.innerHTML = `Você tem ${listArr.length} tarefas pendentes!` //passing the length value in pendingNumb
    }

    const helpMobile = document.querySelector(".wrapper .helpMobile")

    if (listArr.length > 0) {
        helpMobile.classList.add("active")
    } else {
        helpMobile.classList.remove("active")
    }

    let newLiTag = ""
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element} <span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
    })

    todoList.innerHTML = newLiTag //adding new li tag inside ul tag

    inputBox.value = "" //once task added leave the input blank
}

//delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("Nova Tarefa")

    listArr = JSON.parse(getLocalStorage)

    listArr.splice(index, 1) //delete the particular index li

    //after remove the li again update the localstorage
    localStorage.setItem("Nova Tarefa", JSON.stringify(listArr))

    showTasks()
}

//delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = [] //empty an array

    //after delete all tasks again update the localstorage
    localStorage.setItem("Nova Tarefa", JSON.stringify(listArr))

    showTasks()
}