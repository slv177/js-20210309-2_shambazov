export default class ColumnChart {
  constructor(params) {
    this.render(params);

  }

  render(params) {
    console.log(`Hello, `, params['label']);
    console.log(`I am`, params['value']);

    const element = document.createElement('div'); // (*)

    element.innerHTML = `
      <div class="wrapper">
        <div class="column-chart" style="--chart-height: 50">
      <div class="column-chart__title">
        <a href="/sales" class="column-chart__link">View all</a>
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">344</div>
        <div data-element="body" class="column-chart__chart">
          <div style="--value: 2" data-tooltip="6%"></div>
          <div style="--value: 22" data-tooltip="44%"></div>
          <div style="--value: 5" data-tooltip="11%"></div>
          <div style="--value: 50" data-tooltip="100%"></div>
          <div style="--value: 12" data-tooltip="25%"></div>
          <div style="--value: 4" data-tooltip="8%"></div>
          <div style="--value: 13" data-tooltip="28%"></div>
          <div style="--value: 5" data-tooltip="11%"></div>
          <div style="--value: 23" data-tooltip="47%"></div>
          <div style="--value: 12" data-tooltip="25%"></div>
          <div style="--value: 34" data-tooltip="69%"></div>
          <div style="--value: 1" data-tooltip="3%"></div>
          <div style="--value: 23" data-tooltip="47%"></div>
          <div style="--value: 27" data-tooltip="56%"></div>
          <div style="--value: 2" data-tooltip="6%"></div>
          <div style="--value: 1" data-tooltip="3%"></div>
        </div>
      </div>
    </div>
      </div>
    `;

    // NOTE: в этой строке мы избавляемся от обертки-пустышки в виде `div`
    // который мы создали на строке (*)
    this.element = element.firstElementChild;

  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
