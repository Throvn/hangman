interface PuzzleResponse {
    puzzle: string
}

const getPuzzle = async (wordCount: number) => {
    const response: Response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    
    if (response.status === 200) {
        const data: PuzzleResponse = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to get puzzle')
    }
}

export  {getPuzzle as default}