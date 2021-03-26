export default class ColumnChart {
  constructor(options) {
    const currentOptions = options || {};
    this.data = currentOptions.data || [];
    this.label = currentOptions.label || '';
    this.link = currentOptions.link || '';
    this.value = currentOptions.value || 0;
    this.render(options) ;
  }

  render(params) {
    const element = document.createElement('div'); // (*)

    element.innerHTML = `
    <div class="dashboard__chart_orders ">
    <div class="column-chart" style="--chart-height: 50">
      <div class="column-chart__title">
        Total orders
        <a href="/sales" class="column-chart__link">View all</a>
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">344</div>
        <div data-element="body" class="column-chart__chart">
        </div>
      </div>
    </div>
    </div>
    `;

    this.element = element.firstElementChild;

    let labelLabel = this.element.querySelector(".column-chart__title");
    labelLabel.innerHTML = '<a href="/' + this.link + '"class="column-chart__link"> Total ' + this.label + '</a>';

    let valueLabel = this.element.querySelector(".column-chart__header");
    valueLabel.innerHTML = this.value;


    function getColumnProps(data) {
      const maxValue = Math.max(...data);
      const scale = 50 / maxValue;
      return data.map(item => {
        return {
          percent: (item / maxValue * 100).toFixed(0) + '%',
          value: String(Math.floor(item * scale))
        };
      });
    }

    // рисуем график
    function drawChartGraph (dataForGraph) {
      let result = String();
      while (dataForGraph.length) {
        const currentData = dataForGraph.shift();
        result += '<div style="--value:' + currentData['value'] + '" data-tooltip="' + currentData['percent'] + '"></div>';
      }
      return result;
    }

    let chartGraph = this.element.querySelector('.column-chart__chart');
    if (this.data.length) {
      const columnProps = getColumnProps(this.data);
      chartGraph.innerHTML = drawChartGraph(columnProps);
    }
  };

  update(params) {

  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
