class Tooltip {
  constructor() {
    // тут какие то объявления со стрелками

    this.addEventListeners();

    }

  addEventListeners(){
    const tooltip = document.querySelector("[data-tooltip]");

    tooltip.addEventListener('pointerover', event => {
      console.log("tooltipFoo", 'pointerover', event.clientX, event.clientY);
      let target = event.target;
      showTooltop(event);
    });

    tooltip.addEventListener('pointermove', event => {
      console.log("tooltipFoo", 'pointermove', event.clientX, event.clientY);
      let target = event.target;
      showTooltop(event);
    });

    function showTooltop(event) {
      let target = event.target;
      let message = document.createElement('div');
      message.classList.add('tooltip');
      message.innerHTML = target.dataset.tooltip;
      message.style.left = event.clientX + 10 + 'px';
      message.style.top = event.clientY + 10 + 'px';
      document.body.append(message);
    }
  }

  removeEventListeners(){
    const tooltip = document.querySelector("[data-tooltip]");

    tooltip.removeEventListener('pointerout', event => {
      console.log("tooltipFoo", 'pointerout', event.clientX, event.clientY);
      this.message.remove();
    });
  }

  destroy() {
    // в методе дестрой снимаем обработчики событий
  };

  // для удаления тултипа может подойти capturing
  // обработчик движения нужен только после pointerin, а после pointerout он не должен работать
  // удалять подсказку надо во время движения
  // значит по поинтерин навешиваем обработчик  а по пойнтераут удаляем

  // render() {
  //   const element = document.createElement('div');
  //   element.innerHTML = this.template;
  //   this.element = element.firstElementChild;
  // }
  //
  // template(message) {
  //   console.log("template", message);
  //   return `
  //   <body>
  //       <div className="tooltip">${message}</div>
  //   </body>
  //   `;
  // }
}

const tooltip = new Tooltip();

export default tooltip;
