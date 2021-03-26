export default class ColumnChart {
  constructor(options) {
    const currentOptions = options || {};
    this.data = currentOptions.data || [];
    this.label = currentOptions.label || '';
    this.link = currentOptions.link || '';
    this.value = currentOptions.value || 0;
    this.chartHeight = 50;
    this.render(options) ;
  }

  render(params) {
    const element = document.createElement('div'); // (*)

    if (this.data.length) {
      element.innerHTML = `
      <div class="column-chart_orders ">
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
    } else {
      element.innerHTML = `
      <div class="column-chart_loading">
        <div class="column-chart" style="--chart-height: 50">
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
    }

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

    function drawChartGraph (dataForGraph) {
      let result = String();
      while (dataForGraph.length) {
        const currentData = dataForGraph.shift();
        result += '<div style="--value:' + currentData['value'] + '" data-tooltip="' + currentData['percent'] + '"></div>';
      }
      return result;
    }

    let chartGraph = this.element.querySelector('.column-chart__chart');
    const columnProps = getColumnProps(this.data);
    chartGraph.innerHTML = drawChartGraph(columnProps);
  }

  update(params) {
    var graphbar = document.querySelector('.column-chart__chart');

    if (graphbar.hasChildNodes) {
      console.log(params);
    }

    const columnProps = getColumnProps(params);
    graphbar.innerHTML = drawChartGraph(columnProps);


    function drawChartGraph (dataForGraph) {
      let result = String();
      while (dataForGraph.length) {
        const currentData = dataForGraph.shift();
        result += '<div style="--value:' + currentData['value'] + '" data-tooltip="' + currentData['percent'] + '"></div>';
      }
      return result;
    }

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


  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
