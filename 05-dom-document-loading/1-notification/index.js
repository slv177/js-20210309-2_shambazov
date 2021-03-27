export default class NotificationMessage {
  constructor(message, options = {}) {
    this.text = message || '';
    this.duration = options['duration'] || 5000;
    this.type = options['type'] || 'unknown type';
    this.render();
  }

  static isDisplay = false;

  render(){
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    switch (this.type) {
    case "success":
      this.element.classList.add('success');
      break;
    case "error":
      this.element.classList.add('error');
      break;
    default:
      console.log("unknown type");
    }
  }

  get template() {
    return `
       <div class="notification" style="--value:2s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">success</div>
          <div class="notification-body">
            ` + this.text + `
          </div>
        </div>
      </div>
    `;
  }


  show (elementToDisplay) {
    if (!NotificationMessage.isDisplay) {
      if (elementToDisplay) {
        let newElement = elementToDisplay.append(this.element);
        document.body.append(newElement);
      } else {
        document.body.append(this.element);
      }

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
