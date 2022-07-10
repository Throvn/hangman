import Hangman from './hangman'
import getPuzzle from './requests'
const $puzzle: HTMLParagraphElement = document.querySelector('#puzzle') as HTMLParagraphElement
const $guesses: HTMLParagraphElement  = document.querySelector('#guesses') as HTMLParagraphElement
let game: Hangman

window.addEventListener('keypress', (e: KeyboardEvent) => {
    const guess: string = e.key
    game.makeGuess(guess)
    render()
})

/**
 * Renders the game state to the DOM.
 */
const render = () => {
    $puzzle.textContent = ''
    $guesses.textContent = game.statusMessage

    game.puzzle.split('').forEach((letter) => {
        const $letter = document.createElement('span')
        $letter.textContent = letter
        $puzzle.appendChild($letter)
    })
}

/**
 * Starts a new game and renders the initial state.
 */
const startGame = async () => {
    // Calculate a random number between 1 and 5
    const randomWordLength = Math.floor(Math.random() * 5) + 1
    const puzzle = await getPuzzle(randomWordLength)
    game = new Hangman(puzzle, 7)
    render()
}

const $reset = document.querySelector('#reset')
if ($reset) {
    $reset.addEventListener('click', startGame)
} else { 
    throw new Error("No reset button found in DOM.")
}

startGame()