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

    submitButton.onclick = () => {
      const input = inputField.value.trim()
      if (input !== '') {
        resultDisplay.textContent = `${playerName}: ${input}`
        resolve(input)
        inputField.value = ''
      }
    }
  })
}

export async function handlePlayerInput(playerName: string) {
  const move = await getInputFromPage(playerName)
  console.log('Move:', move)
  return move
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

    const clickHandler = () => {
      button.style.display = 'none'
      button.removeEventListener('click', clickHandler)
      resolve()
    }

    button.addEventListener('click', clickHandler)
  })
}
