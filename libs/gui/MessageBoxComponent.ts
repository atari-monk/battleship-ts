import {EventEmitter} from '@atari-monk/event-emitter'
import {EVENT_MESSAGE_USER, Events} from '../battleship/events/events'

export interface MessageBoxConfig {
  isTest: boolean
}

export class MessageBoxComponent {
  private config: MessageBoxConfig
  private messageBoxOverlay: HTMLElement
  private closeButton: HTMLElement
  private gameContent: HTMLElement
  private testButton: HTMLElement
  private eventEmitter: EventEmitter<Events>

  constructor(
    eventEmitter: EventEmitter<Events>,
    config: MessageBoxConfig = {isTest: false}
  ) {
    this.config = config
    this.eventEmitter = eventEmitter
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

    this.eventEmitter.on(EVENT_MESSAGE_USER, message => {
      const messageBox = document.querySelector('#messageBox p')
      if (messageBox) {
        messageBox.textContent = message.message
      }
      this.showMessage()
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
