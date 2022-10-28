//1. Создаем глобальные переменные
const input = document.querySelector(".main__input__add");
const btnAdd = document.querySelector(".main__icon__add");
const ul = document.querySelector(".main__list");
const btnSave = document.querySelector(".footer__button__save");
const btnClear = document.querySelector(".footer__button__clear");
const btnTips = document.querySelector(".footer__button__tips");

//2. обработчик событий при нажатии btnAdd
btnAdd.addEventListener("click", addTaskHandler);

//3. функция срабатываемая при клике на иконку плюс.
// если значение поле ввода равна нулю, ничего не создает
// если в поле задач больше 8, то он перестает добавлять и чистит поле ввода
// при остальных случаях, создает переменную task и приравнивает
// значению другой функции. При этом передает аргумент в виде значения текста
// в поле ввода. Далее, в нашу глобальную переменную ul добавляет с помощью
// метода нашу переменную task. В конце подчищает поле.

function addTaskHandler() {
   if(input.value === "") return;
   if(ul.childNodes.length > 8) return input.value = "";
   const task = createTask(input.value);
   ul.appendChild(task);
   input.value = "";
}

// функция создает шаблон задач. Переменная равна созданию элемента li.
// добавляем класс, далее во внутрь запихиваем другие элементы и классы
// не забывая про значения передаваемое другой функцией
// возвращаем значение

function createTask(value, index) {
   const li = document.createElement("li");
   li.className = "main__task";
   li.innerHTML = `
   <h2 class="main__text">
   ${value}
   </h2>
   <svg class = "main__icon bi bi-trash" onclick="taskDeleteHandler(this)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgba(26, 108, 197,0.7)" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
   </svg>`;
   return li;
}

// для иконки удаления у нас есть событие работающее с локал и есть второе работающее
// с новыми tasks. Первое написано снизу с 50 строки и второе на 40. С помощью события,
// мы сразу указываем на наш обработчик, передавая через this наш элемент.

const iconsDelete = document.querySelectorAll(".main__icon");
iconsDelete.forEach(icon => {
   icon.addEventListener("click", taskDeleteHandler);
})

// обработчик иконки, удаляет родителя
// объявляем переменную равную тексту родителя нажатой иконки
// далее меняем массив, отфильтруем и обновляем локал задачи
function taskDeleteHandler(icon) {
   const text = icon.parentElement.innerText;
   tasks = tasks.filter(item => item.description !== text);
   icon.parentElement.remove();
   updateLocal();
}
 
// создаем массив.
/*Объявляем с помощью let поскольку значение будет меняться.
Далее с помощью тернарного оператора мы запишем условие.
Если в истории localStorage нет задач, то в tasks будет равен пустому массиву.
Или же будучи с задачами, он с помощью JSON.parse(JSON – текстовый формат,
который используется для хранения и обмена данными, parse() используется
для парсинга данных JSON,полученных из массива, будет возвращать массив
JavaScript, а не объект.)получит и отправит в массив tasks задачи переданные ранее.*/

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"));

// функция вызывается сама, чтобы при обновлении задач из localstorage 
// вынести массив с объектами и создать задачи. Проверяет наличие задач,
// перебирает. Далее создает переменную и вызывает функцию и передает ей
// значение каждого элемента. вставляет ее в глобал переменную

function parseTasks() {
   if (tasks.length > 0) {
      tasks.forEach((task , index) => {
         const li = createTask(task.description, index);
         ul.appendChild(li);
      });
   }
}
parseTasks();

// при клике на кнопку save
btnSave.addEventListener("click", saveTaskHandler);

// обработчик, если в поле задач - нет задач. То ничего не делает.
// иначе, создаем переменную которая содержит коллекцию элементов.
// перебираем, при каждой итерации в массив tasks будет добавляться 
// новый объект. Куда добавляется текст элемента со свойством тега
// далее обновляем задачи в localstorage
function saveTaskHandler() {
   if(ul.innerHTML === "") return ;
   const taskList = document.querySelectorAll(".main__text");
   taskList.forEach(task => {
      tasks.push(new Task(task.innerText));
   });
   updateLocal();
}
// функция конструктор. его свойство равно значению его текста
function Task(description) {
   this.description = description;
}

// лямда функция.
/* Мы обращаемся к методу localStorage и передаем 2 объекта -
   ключ(tasks) и значение(массив tasks). Но для localStorage
   предпочтительнее работать с JSON. И благодаря его методу
   мы передаем значения массива.*/

const updateLocal = () => {
   localStorage.setItem("tasks", JSON.stringify(tasks));//.slice(0,8)
}

//  при клике на кнопку очистить.
btnClear.addEventListener("click", deleteTasksHandler);

//удаляет все что было в localstorage и задачи в поле задач.
function deleteTasksHandler() {
   localStorage.clear();
   ul.innerHTML = "";
}


///                                 Улучшения которыми надо заняться

/*
1.Даня предложил не ограничивать поле задач всего 8, чтобы при каждом заполнении
был переход на новый шаблон. и сделать это с помощью стрелок -> <-
2.верстка ужасная, недостаточно оберток. пересмотреть флексы
3.метод бэм почти не использован. пересмотреть
4.ужасные стили. переписать
*/

