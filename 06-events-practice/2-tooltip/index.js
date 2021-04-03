class Tooltip {
  showTooltip = (event) => {
    const shift = 10;
    const tooltips = event.target.closest('[data-tooltip]');

    if (!tooltips) {
      return;
    }

    if (this.element){
      this.element.remove();
    }

    this.render();
    this.element.innerHTML = tooltips.dataset.tooltip;
    this.element.style.left = event.clientX + shift + 'px';
    this.element.style.top = event.clientY + shift + 'px';
  }

  constructor() {
    this.addEventListeners();
    this.removeEventListeners();
  }

  addEventListeners(){
    document.addEventListener('pointerover', event => {
      this.showTooltip(event);
    }
    );

    document.addEventListener('pointermove', event => {
      this.showTooltip(event);
    }
    );

    document.addEventListener('pointerout', event => {
      this.destroy();
    }
    );
  }

  removeEventListeners(){
    document.removeEventListener('pointerout', event => {
      this.destroy();
    }
    );
  }

  destroy() {
    this.element.remove();
  };

  render(content = "") {
    const element = document.createElement('div');
    element.classList.add('tooltip');
    element.innerHTML = content;
    document.body.append(element);
    this.element = element;
  }

  initialize(){};
}

const tooltip = new Tooltip();

export default tooltip;
