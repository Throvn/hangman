enum GameStatus {
    Playing,
    Finished,
    Failed
}

class Hangman {
    word: string[]
    remainingGuesses: number
    guessedLetters: string[]
    status: GameStatus

    constructor(word: string, remainingGuesses: number) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = GameStatus.Playing
    }

    /**
     * Calculates the status of the game.
     */
    calculateStatus(): void {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

        if (this.remainingGuesses === 0) {
            this.status = GameStatus.Failed
        } else if (finished) {
            this.status = GameStatus.Finished
        } else {
            this.status = GameStatus.Playing
        }
    }

    /**
     * Returns the status message for the game.
     */
    get statusMessage(): string {
        if (this.status === GameStatus.Playing) {
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === GameStatus.Failed) {
            return `Nice try! The word was "${this.word.join('')}".`
        } else {
            return 'Great work! You guessed the word.'
        }
    }

    /**
     * Returns the puzzle for the game.
     */
    get puzzle(): string {
        let puzzle = ''

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })

        return puzzle
    }

    /**
     * Updates the games state based on the given guess.
     * @param guess The letter to guess.
     */
    makeGuess(guess: string): void {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)

        if (this.status !== GameStatus.Playing) return

        if (isUnique) {
            this.guessedLetters = [...this.guessedLetters, guess]
        }

        if (isUnique && isBadGuess) {
            this.remainingGuesses--
        }

        this.calculateStatus()
    }
}

export { Hangman as default }