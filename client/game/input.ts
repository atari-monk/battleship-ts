export async function getInputFromPage(playerName: string): Promise<string> {
  return new Promise((resolve) => {
    const inputField = document.getElementById(
      'playerInput'
    ) as HTMLInputElement
    const submitButton = document.getElementById(
      'submitInput'
    ) as HTMLButtonElement
    const resultDisplay = document.getElementById(
      'inputResult'
    ) as HTMLParagraphElement

    inputField.style.display = 'block'
    submitButton.style.display = 'block'
    resultDisplay.style.display = 'none'
    inputField.focus()

    const submitInput = () => {
      const input = inputField.value.trim()
      if (input !== '') {
        resultDisplay.textContent = `${playerName}: ${input}`
        resultDisplay.style.display = 'block'
        inputField.style.display = 'none'
        submitButton.style.display = 'none'
        resolve(input)
        inputField.value = ''
        inputField.removeEventListener('keydown', enterHandler)
      }
    }

    const enterHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        submitInput()
      }
    }

    submitButton.onclick = submitInput
    inputField.addEventListener('keydown', enterHandler)
  })
}

export async function setInputResult(
  playerName: string,
  shot: string,
  result: boolean
): Promise<void> {
  return new Promise((resolve) => {
    const resultDisplay = document.getElementById(
      'inputResult'
    ) as HTMLParagraphElement

    resultDisplay.textContent = `${playerName}: ${shot} ${
      result ? 'hit' : 'miss'
    }`
    resultDisplay.style.display = 'block'

    resolve()
  })
}

export function getInputFromConsole(playerName: string): Promise<string> {
  return new Promise((resolve) => {
    const input = prompt(playerName)
    if (input !== null && input.trim() !== '') {
      resolve(input)
    }
  })
}

export function waitForButtonClick(buttonId: string): Promise<void> {
  return new Promise((resolve) => {
    const button = document.getElementById(buttonId) as HTMLButtonElement
    if (!button) throw new Error(`Button with ID "${buttonId}" not found`)

    button.style.display = 'block'

    const triggerClick = () => {
      button.style.display = 'none'
      button.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', enterHandler)
      resolve()
    }

    const clickHandler = () => triggerClick()

    const enterHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        setTimeout(triggerClick, 100)
      }
    }

    button.addEventListener('click', clickHandler)
    setTimeout(() => document.addEventListener('keydown', enterHandler), 200)
  })
}
