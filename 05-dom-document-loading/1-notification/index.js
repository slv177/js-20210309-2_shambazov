export default class NotificationMessage {

  static isDisplay = false;

  constructor(
    text = '',
    {duration = 1000,
    type = ''
  } = {}) {
    if (arguments[1]) {
      this.text = text;
      this.duration = duration;
      this.type = type;
    } else {
      this.text = text;
    }
    this.render();
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    switch (this.type) {
    case "error":
      this.element.classList.add('error');
      break;
    default:
      this.element.classList.add('success');
      break;
    }
  }

  get template() {
    return `
       <div class="notification" style="--value:2s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">success</div>
          <div class="notification-body">
            ${this.text}
          </div>
        </div>
      </div>
    `;
  }

  show () {
    if (!NotificationMessage.isDisplay) {
      document.body.append(this.element);
      NotificationMessage.isDisplay = true;
      setTimeout(() => this.remove(), this.duration);
    }
  }

  remove () {
    this.element.remove();
    NotificationMessage.isDisplay = false;
  }

  destroy() {
    this.remove();
  }

}
