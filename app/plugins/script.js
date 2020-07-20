const fieldCell = document.querySelectorAll('[data-cell]');
const cellX = 'cell_x';
const cellO = 'cell_o';
let xScore = 0;
let oScore = 0;
const comboWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let field = ['', '', '', '', '', '', '', '', ''];
let turn = true;
//Добавляется скрытая кнопка рестарта
let button = document.querySelector('.navbar__button_play');
button.addEventListener('click', restartGame);
button.style.display = "none";

function start() {
    turn = Math.floor(Math.random(1));
    playerStep();
    button.style.display = "none";
}
//Задается поведение компьютера во время игры
function pcStep() {

    const sources = Array.from(document.getElementsByClassName('cell'));
    let index;

    do {
        if (!isDraw())
            index = Math.floor(Math.random() * 9);
        else
            break;
    } while (!checkCell(index));

    if (!checkWinner(cellO) && (!checkWinner(cellX)) && (!isDraw())) {
        mark(sources[index], cellO);
        swap();
        playerStep();
    }
    if (checkWinner(cellO) || isDraw()) {
        oScore += 1;
        console.log(isDraw());
        if (isDraw() && !(checkWinner(cellO))) {
            xScore += 1;
        }
        document.getElementById("score").textContent = `Счет: ${xScore} : ${oScore}`;
        document.getElementById("results").textContent += `
        Счет: ${xScore} : ${oScore}`;
        button.style.display = "inherit";
        fieldCell.forEach(cell => {
            cell.removeEventListener('click', clickCell)
        })
        restartButton();

    }

}

function playerStep() {
    fieldCell.forEach(cell => {
        cell.addEventListener('click', clickCell)
    })
}
//Проверка ячейки на возможность ее использования
function checkCell(number) {
    if (field[number] !== '') {
        return false;
    } else {
        return true;
    }
}
//Обработка хода игрока
function clickCell(e) {
    const cell = e.target;
    let index = cell.dataset.number;

    if ((checkCell(index))) {
        mark(cell, cellX);

        if (checkWinner(cellX) || isDraw() && (!checkWinner(cellO))) {
            fieldCell.forEach(cell => {
                cell.removeEventListener('click', clickCell)
            })
            xScore += 1;
            if (isDraw() && !(checkWinner(cellX))) {
                oScore += 1;
            }
            document.getElementById("score").textContent = `Счет: ${xScore} : ${oScore}`;
            document.getElementById("results").textContent += ` Счет: ${xScore} : ${oScore}`;
            button.style.display = "inherit";
            restartButton();
        }
        else {
            swap();
            pcStep();
        }

    }

}
//Прорисовка крестиков и ноликов на сайте и запись выбранных игроками ячеек в массив
function mark(cell, turnCurrent) {
    if (turn) {
        field[cell.dataset.number] = 'X';
    } else {
        field[cell.dataset.number] = 'O';
    }
    cell.classList.add(turnCurrent);
}
//Смена хода
function swap() {
    turn = !turn;
}
//Кнопка рестарта игры и обнуление данных
function restartButton() {
    button.style.display = "inherit";
}
function restartGame() {
    field = ['', '', '', '', '', '', '', '', ''];
    fieldCell.forEach(cell => {
        cell.classList.remove("cell_o");
        cell.classList.remove("cell_x");
    })
    start();
}
//Проверят выиграл ли данный игрок
function checkWinner(currentClass) {
    return comboWin.some(combination => {
        return combination.every(index => {
            return fieldCell[index].classList.contains(currentClass)
        })
    })
}
//Проверят вышли ли игроки в ничью
function isDraw() {
    return [...fieldCell].every(cell => {
        return cell.classList.contains(cellX) || cell.classList.contains(cellO)
    })
}

// Алгоритм поиска наилучшего хода
// function miniMax{
// }

start();