export default class ColumnChart {
  constructor({
    data = [],
    label = '',
    link = '',
    value = 0
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.chartHeight = 50;
    this.render();
  }

  render() {
    const element = document.createElement('div'); // (*)

    element.innerHTML = `
      <div>
        <div class="column-chart " style="--chart-height: 50">
          <div class="column-chart__title">
            Total orders
            <a href="/sales" class="column-chart__link"></a>
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header"></div>
            <div data-element="body" class="column-chart__chart">
            </div>
          </div>
        </div>
      </div>
      `;

    this.element = element.firstElementChild;

    if (this.data.length) {
      this.element.classList.add('column-chart_orders');
    } else {
      this.element.classList.add('column-chart_loading');
    }

    const labelLabel = this.element.querySelector(".column-chart__title");
    labelLabel.innerHTML = `<a href= ${this.link} class="column-chart__link"> Total ${this.label}</a>`;

    const valueLabel = this.element.querySelector(".column-chart__header");
    valueLabel.innerHTML = this.value;

    const chartGraph = this.element.querySelector('.column-chart__chart');
    const columnProps = this.getColumnProps(this.data);
    chartGraph.innerHTML = this.drawChartGraph(columnProps);
  }

  update(params) {
    const graphbar = document.querySelector('.column-chart__chart');

    const columnProps = this.getColumnProps(params);
    graphbar.innerHTML = this.drawChartGraph(columnProps);

  }

  drawChartGraph (dataForGraph) {
    let result = '';
    while (dataForGraph.length) {
      const currentData = dataForGraph.shift();
      result += '<div style="--value:' + currentData['value'] + '" data-tooltip="' + currentData['percent'] + '"></div>';
    }
    return result;
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
