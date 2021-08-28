const sidenav = document.querySelector( "nav.sidenav")
const mainContent = document.querySelector( "main.main-content") 
const openSidenav = document.querySelector("span.open-sidenav") 
const closeSidenav = document.querySelector("span.close-sidenav")
const headerH1 = document.querySelector(".wrapper header h1")

openSidenav.onclick = () => {
    // sidenav.style.width = "150px"
    sidenav.style.right = "25px"
    mainContent.style.marginRight = "-50px"
}
    
closeSidenav.onclick = () => {
    sidenav.style.right = "-185px"
    mainContent.style.marginRight = "0"
}

if (window.matchMedia("(max-width: 335px)").matches) {
    headerH1.innerHTML = `Lista de <br> Tarefas`
}

const inputBox = document.querySelector(".inputField input")
const addBtn = document.querySelector(".inputField button")
const todoList = document.querySelector(".todoList")
const deleteAllBtn = document.querySelector(".footer button")
const wrapper = document.querySelector(".wrapper")
const body = document.querySelector("body")

const themeBlue = document.querySelector(".wrapper .theme-blue")
const themePurple = document.querySelector(".wrapper .theme-purple")

themeBlue.onclick = () => {
    inputBox.style.border = "1px solid #2274A5"
    addBtn.style.backgroundColor = "#2274A5"
    deleteAllBtn.style.backgroundColor = "#2274A5"
    body.style.background = "linear-gradient(to bottom, #68EACC 0%, #2274A5 100%)"

    if (window.matchMedia("(max-width: 445px)").matches) {
        wrapper.style.border = "5px solid #2274A5"
    }
}

themePurple.onclick = () => {
    inputBox.style.border = "1px solid #8E49E8"
    addBtn.style.backgroundColor = "#8E49E8"
    deleteAllBtn.style.backgroundColor = "#8E49E8"
    body.style.background = "linear-gradient(to bottom, #e2dfe6 0%, #8E49E8 100%)"

    if (window.matchMedia("(max-width: 445px)").matches) {
        wrapper.style.border = "5px solid #8E49E8"
    }
}

if (window.matchMedia("(max-width: 249px)").matches) {
    inputBox.setAttribute("maxlength", "20")
}

if (window.matchMedia("(max-width: 290px)").matches) {
    inputBox.setAttribute("placeholder", "Digite uma tarefa")
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