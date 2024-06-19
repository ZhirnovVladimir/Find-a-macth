// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createNumbersArray(count) {
  let arr = []
  for (let i = 1; i <= count; i++) {
    arr.push(i)
    arr.push(i)
  }
  return arr
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

const shuffle = (array) => {
  let m = array.length, t, i;

  // Пока есть элементы для перемешивания
  while (m) {

    // Взять оставшийся элемент
    i = Math.floor(Math.random() * m--);

    // И поменять его местами с текущим элементом
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}


// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.


function cardsGuessed() { //Делает все карты видимыми
  let cards = document.querySelectorAll('button.button__card')
  for (let i of cards) {
    i.firstElementChild.className = 'button__card__image__guessed'
    i.className = 'button__card button__guessed'
    i.setAttribute('disabled', '')
  }
  startButton.removeAttribute('disabled')
}

function deleteLastGame() { //Удаляет DOM элементы последней игры
  let lastGame = document.querySelectorAll('button.button__card')
  if (lastGame.length > 0) {
    let winner = document.querySelector('h2.winner')
    if (winner !== null) {
      winner.remove()
    }

    let lastTimer = document.querySelector('span.timer')
    if (lastTimer !== null) {
      lastTimer.remove()
    }

    for (let item of lastGame) {
      item.remove()
    }
  }
}


function startGame(count) {
  const cardImages = {
    1: './images/cocker.png',
    2: './images/cow.png',
    3: './images/elefant.png',
    4: './images/goose.png',
    5: './images/horse.png',
    6: './images/lion.png',
    7: './images/monkey.png',
    8: './images/penguin.png',
    9: './images/pig.png',
    10: './images/sheep.png'
  }
  if (count == 2 || count == 4 || count == 6 || count == 8 || count == 10) {
    let timerSpan = document.createElement('span')
    timerSpan.className = 'timer'
    let divTimer = document.getElementById('endDiv')
    divTimer.append(timerSpan)
    let counter = 60
    timerSpan.textContent = counter
    let timer = setInterval(() => {
      counter--
      if (counter < 0) {
        clearInterval(timer)
        let countGuesedCard = document.querySelectorAll('button.button__guessed')
        timerSpan.textContent = `Время вышло! Отгадано пар - ${(countGuesedCard.length) / 2}`
        cardsGuessed()
      }
      else {
        timerSpan.textContent = counter
      }
    }, 1000)
    startButton.setAttribute('disabled', '')
    const shufledArray = shuffle(createNumbersArray(count))
    const container = document.getElementById('cont')
    let idCounter = 0

    for (let i of shufledArray) {
      let button = document.createElement('button')
      let image = document.createElement('img')
      image.setAttribute('src', cardImages[i])
      image.className = 'button__card__image__hidden'
      button.className = 'button__card button__hidden'
      button.textContent = i
      button.setAttribute('id', idCounter)
      idCounter++
      container.append(button)
      button.append(image)
      button.addEventListener('click', () => {
        let showedButton = document.querySelectorAll('button.button__show')

        if (showedButton.length == 2) {
          showedButton[0].classList.toggle('button__show')
          showedButton[0].firstElementChild.classList.toggle('button__card__image__show')

          showedButton[1].classList.toggle('button__show')
          showedButton[1].firstElementChild.classList.toggle('button__card__image__show')
        }

        else if (showedButton.length > 0) {
          if (showedButton[0].textContent == button.textContent && showedButton[0].id != button.id) {
            button.className = 'button__card button__guessed'
            button.firstElementChild.className = 'button__card__image__guessed'
            showedButton[0].className = 'button__card button__guessed'
            showedButton[0].firstElementChild.className = 'button__card__image__guessed'
            button.removeEventListener('click', this)
            showedButton[0].removeEventListener('click', this)
          }

          else {
            button.classList.toggle('button__show')
            button.firstElementChild.classList.toggle('button__card__image__show')
          }
        }

        else {
          button.classList.toggle('button__show')
          button.firstElementChild.classList.toggle('button__card__image__show')
        }

        if (document.querySelectorAll('button.button__guessed').length == count * 2) {
          let winner = document.createElement('h2')
          winner.textContent = 'Поздравляем, вы отгадали все карточки!'
          winner.className = 'winner'
          document.getElementById('endDiv').append(winner)
          cardsGuessed()
          startButton.removeAttribute('disabled')
          clearInterval(timer)
        }
      })
    }
  }
  else {
    alert('Выберете количество пар карточек')
  }
}


const startButton = document.getElementById('start-button')
startButton.addEventListener('click', (e) => {
  e.preventDefault()
  deleteLastGame()

  const select = document.getElementById('inlineFormSelectPref')
  startGame(select.value)
})


