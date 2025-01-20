// Create an interactive Battelship Game 9x9 grid for 2 bot-players to place ships and begin playing automatically

// Welche Bibliotheken sind am besten geeignet, um Bot-Spieler zu steuern
// Für die Steuerung von Bot-Spielern in Spielen wie Battleship gibt es verschiedene Bibliotheken und Frameworks, die dir helfen können, die Logik und das Verhalten der Bots zu implementieren. Hier sind einige der besten Optionen:
// 1. Microsoft Bot Framework
// Das Microsoft Bot Framework ist eine umfassende Plattform zur Entwicklung von Bots, die in verschiedenen Programmiersprachen wie C#, Java, Python und JavaScript verwendet werden kann. Es bietet Tools und Bibliotheken, um Konversationslogik zu implementieren, was nützlich sein kann, wenn du komplexe Entscheidungen für deine Bots treffen möchtest.
// 2. TensorFlow
// Wenn du fortgeschrittene KI-Logik für deine Bots implementieren möchtest, könnte TensorFlow eine gute Wahl sein. Diese Open-Source-Bibliothek für maschinelles Lernen ermöglicht es dir, Modelle zu erstellen, die auf historischen Spielverläufen basieren und Entscheidungen treffen können.
// 3. Unity mit C#
// Falls du ein visuelles Spiel entwickelst, ist Unity eine der beliebtesten Game-Engines und verwendet C# für die Skripterstellung. Du kannst KI-Logik direkt in Unity implementieren, um das Verhalten deiner Bots zu steuern. Unity bietet auch viele Ressourcen und Community-Support für die Entwicklung von Spielebots.
// 4. Pygame
// Für einfachere Spiele in Python ist Pygame eine geeignete Bibliothek. Sie ermöglicht es dir, Spiele schnell zu prototypisieren und einfache Bot-Logiken zu erstellen. Pygame ist besonders nützlich für Lernprojekte oder kleinere Spiele.
// 5. Custom AI Logic
// Wenn du spezifische Anforderungen hast oder ein einfaches Spiel wie Battleship entwickelst, kannst du auch eigene Algorithmen zur Entscheidungsfindung schreiben. Das könnte einfache Zufallsentscheidungen oder komplexere Strategien umfassen, um das Verhalten der Bots zu steuern.
// Fazit
// Die Wahl der richtigen Bibliothek oder des richtigen Frameworks hängt von den spezifischen Anforderungen deines Projekts ab, einschließlich der Programmiersprache, der Komplexität des Spiels und deiner Erfahrung mit den jeweiligen Technologien. Das Microsoft Bot Framework und Unity sind großartige Optionen für komplexere Anwendungen, während Pygame und benutzerdefinierte Logik für einfachere Spiele ausreichend sein können.




const grid = document.getElementById('grid');
const message = document.getElementById('message');
const startGameButton = document.getElementById('startGame');

const GRID_SIZE = 9; 
const NUM_SHIPS = 5; 
const SHIP_LENGTH = 3; 

let player1Grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
let player2Grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));

let currentPlayer = 'Player 1';
let gameOver = false;

startGameButton.addEventListener('click', startGame);

function startGame() {
    resetGame();
    
    placeShips(player1Grid);
    placeShips(player2Grid);

    message.textContent = `${currentPlayer}'s turn!`;
    
    setInterval(() => {
        if (!gameOver) {
            playTurn();
        }
    }, 100);
}

function resetGame() {
    grid.innerHTML = '';
    player1Grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    player2Grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i; 
        grid.appendChild(cell);
    }
    
    currentPlayer = 'Player 1';
    gameOver = false;
}

function placeShips(grid) {
    let shipsPlaced = 0;

    while (shipsPlaced < NUM_SHIPS) {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);
        const direction = Math.random() < 0.5 ? 'H' : 'V';

        if (canPlaceShip(grid, x, y, direction)) {
            for (let i = 0; i < SHIP_LENGTH; i++) {
                if (direction === 'H') {
                    grid[x][y + i] = 1; 
                } else {
                    grid[x + i][y] = 1; 
                }
            }
            shipsPlaced++;
        }
    }
}

function canPlaceShip(grid, x, y, direction) {
    for (let i = 0; i < SHIP_LENGTH; i++) {
        if (direction === 'H') {
            if (y + i >= GRID_SIZE || grid[x][y + i] === 1) return false; 
        } else {
            if (x + i >= GRID_SIZE || grid[x + i][y] === 1) return false; 
        }
    }
    
    return true; 
}

function playTurn() {
    const opponentGrid = currentPlayer === 'Player 1' ? player2Grid : player1Grid;

    let x, y;

    // Zufällige Angriffsposition wählen
    do {
        x = Math.floor(Math.random() * GRID_SIZE);
        y = Math.floor(Math.random() * GRID_SIZE);
        
        // Überprüfen, ob die Zelle bereits angegriffen wurde
        if (opponentGrid[x][y] === -1 || opponentGrid[x][y] === -2) continue;

        // Treffer oder Fehlschuss markieren
        if (opponentGrid[x][y] === 1) {
            hit(x, y);
            // Hier kann zusätzliche Logik hinzugefügt werden,
            // um angrenzende Felder zu attackieren
        } else {
            miss(x, y);
        }

        // Überprüfen auf Gewinnbedingung
        if (checkWin(opponentGrid)) {
            message.textContent = `${currentPlayer} wins!`;
            gameOver = true;
            return;
        }

        // Spieler wechseln
        currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
        
        // Nachricht aktualisieren
        message.textContent = `${currentPlayer}'s turn!`;

        // Beenden der Schleife nach einem Zug
        break;

   } while (!gameOver);
}


// function playTurn() {
//     const opponentGrid = currentPlayer === 'Player 1' ? player2Grid : player1Grid;

//     let x, y;

//     do {
//         x = Math.floor(Math.random() * GRID_SIZE);
//         y = Math.floor(Math.random() * GRID_SIZE);
        
//         // Check if the cell has already been targeted
//         if (opponentGrid[x][y] === -1 || opponentGrid[x][y] === -2) continue;

//         // Mark the shot
//         opponentGrid[x][y] === 1 ? hit(x, y) : miss(x, y);

//         // Check for win condition
//         if (checkWin(opponentGrid)) {
//             message.textContent = `${currentPlayer} wins!`;
//             gameOver = true;
//             return;
//         }

//         // Switch players
//         currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
        
//         // Update message
//         message.textContent = `${currentPlayer}'s turn!`;

//         // Break after one turn
//         break;

//    } while (!gameOver);
// }

function hit(x, y) {
   const cellIndex = x * GRID_SIZE + y;
   document.querySelectorAll('.cell')[cellIndex].classList.add('hit');
   player2Grid[x][y] === 1 ? player2Grid[x][y] = -1 : player2Grid[x][y] = -2; // Mark as hit or miss
}

function miss(x, y) {
   const cellIndex = x * GRID_SIZE + y;
   document.querySelectorAll('.cell')[cellIndex].classList.add('miss');
   player2Grid[x][y] === -2 ? player2Grid[x][y] : player2Grid[x][y] = -2; // Mark as miss
}

function checkWin(grid) {
   return grid.flat().every(cell => cell !== 1); // Check if all ships are sunk
}
