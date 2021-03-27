export default class NotificationMessage {
  constructor(message, options = {}) {
    this.text = message || '123';
    this.duration = options['duration'] || 1000;
    this.type = options['type'] || 'unknown type';

    if (this.type === 'success') {
      this.render_success();
    } else  {
      this.render_error();
    }
  }

  static isDisplay = false;

  render_success(){
  const element = document.createElement('div');
  element.innerHTML = this.template_success;
  this.element = element.firstElementChild;
  }

  get template_success() {
    return `
    <body>
       <div class="notification success" style="--value:2s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">success</div>
          <div class="notification-body">
            ` + this.text + `
          </div>
        </div>
      </div>
    </body>
    `;
  }

  render_error(){
    const element = document.createElement('div');
    element.innerHTML = this.template_error;
    this.element = element.firstElementChild;
  }

  get template_error() {
    return `
    <body>
       <div class="notification error" style="--value:2s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">success</div>
          <div class="notification-body">
            ` + this.text + `
          </div>
        </div>
      </div>
    </body>
    `;
  }


  show (elementToDisplay = this.element) {
    console.log(elementToDisplay)
    if (!NotificationMessage.isDisplay) {
      document.body.append(elementToDisplay);
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
