export interface MessageBoxConfig {
  isTest: boolean
}

export class MessageBoxComponent {
  private config: MessageBoxConfig
  private messageBoxOverlay: HTMLElement
  private closeButton: HTMLElement
  private gameContent: HTMLElement
  private testButton: HTMLElement

  constructor(config: MessageBoxConfig = {isTest: true}) {
    this.config = config
    this.messageBoxOverlay = document.getElementById('messageBoxOverlay')!
    this.closeButton = document.getElementById('close-btn')!
    this.gameContent = document.querySelector('.game-content')!
    this.testButton = document.getElementById('test-btn')!
    this._init()
  }

  private _init(): void {
    if (this.config.isTest) {
      this.testButton.style.display = 'block'
      this.testButton.addEventListener('click', () => {
        this.showMessage()
      })
    }

    this.closeButton.addEventListener('click', () => {
      this.hideMessage()
    })
  }

  public showMessage(): void {
    if (this.config.isTest) this.testButton.style.display = 'none'
    this.messageBoxOverlay.style.display = 'flex'
    this.gameContent.style.display = 'none'
  }

  public hideMessage(): void {
    if (this.config.isTest) this.testButton.style.display = 'block'
    this.messageBoxOverlay.style.display = 'none'
    this.gameContent.style.display = 'block'
  }
}
