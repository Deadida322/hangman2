let alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧЩЪЫЬЭЮЯ"; // объявляем строку с алфавитом
let alphabetContainer = document.querySelector(".alphabet_container"); // получаем контейнер, куда будем выводить див элементы алфавита
let wordContainer = document.querySelector(".word_container"); // получаем контейнер, куда будем выводить угаданные и неугаданные буквы
let errors = document.querySelector('.errors') //контейнер с ошибками
let words = ["ААА", "ДУРАК"]; // массив заготовленных слов
let mistakes = 0 // счётчик ошибок
let success = 0 // счётчик угаданных букв
let img = document.querySelector(".hang_img") // html-элемент картинки, куда будет выводится виселица

let currentWord = words[Math.floor(Math.random() * words.length)]; //получаем случайное слово массива
for (let item of alphabet) { // проходимся по строке с алфавитом
    alphabetContainer.innerHTML += `<div class="letter">${item}</div>`; // добавляем в контейнер алфавита новые элементы
}

for (let item of currentWord) { // выводим прочерки в контейнер, где мы указываем угаданные буквы
    wordContainer.innerHTML += `<span class="word_letter"> _ </span>`;
}

let letterElements = document.querySelectorAll(".letter"); //получаем буквы уже как html элементы
let wordElements = document.querySelectorAll(".word_letter"); // получаем алфавитные кнопки как html 

for (let item of letterElements) { //проходимся по алфавитным кнопкам
    item.onclick = (e) => { //назначаем им действия при клике
        let currentLetter = e.target.innerHTML; // обозначаем текущую букву
        e.target.classList.add("pressed") // помечаем классом букву, на которую нажали, чтобы не нажимать повторно
        if(!checkLetter(currentLetter)){ // проверяем букву на наличие в слове
            mistakes++ //если ошиблись, увеличиваем счётчик ошибок
            img.src = `./assets/${mistakes}.png` // ставим картинку с ошибкой (виселица)
            errors.innerHTML = `Ошибки: ${mistakes}/5 ` // обновляем информацию с количеством ошибок
        }
        
        if(mistakes > 5){ // если ошибок слишком много - игра окончена
            alert("Игра окончена") // показываем пользователю сообщение об окончании игры
            alphabetContainer.style.display = "none"
        }
    };
}

const checkLetter = (letter)=>{
    let isExist = false // предполагаем, что такой буквы нет
    for(let i in currentWord){ //проходимся по всему слову
        if(letter == currentWord[i]){ //если буква совпала
            isExist = true // то говорим, что такая буква существует
            wordElements[i].innerHTML = letter  // заменяем прочерк на букву
            success++ //считаем это за верно угаданную букву
            if(success==currentWord.length){
                //если угаданы все, завершаем игру и говорим, что пользователь молодец
                alert("Вы красавчик!")
            }
        }
    }
    return isExist //возвращаем результат угадана или нет
}
