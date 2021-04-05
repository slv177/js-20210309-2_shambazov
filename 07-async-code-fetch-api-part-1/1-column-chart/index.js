export default class ColumnChart {

  constructor(
    {url = '',
      range = {
        from: '',
        to: '',
      },
      label = '', }
  ) {
    this.url = url;
    this.range = range;
    this.from = range.from.toISOString();
    this.to = range.to.toISOString();
    this.label = label;
    this.link = '/link'
    this.value = 100;
    this.render();
  }

  render() {

    const element = document.createElement('div');
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
    this.element.classList.add('column-chart_loading');

    const url = this.requestUrl();
    this.getData(url).then(_ => {
      this.element.classList.remove('column-chart_loading');
      this.element.classList.add('column-chart_orders');

      const labelLabel = this.element.querySelector(".column-chart__title");
      labelLabel.innerHTML = `<a href= ${this.link} class="column-chart__link"> Total ${this.label}</a>`;

      const valueLabel = this.element.querySelector(".column-chart__header");
      valueLabel.innerHTML = this.getValue();

      // console.log("***");
      const chartGraph = this.element.querySelector('.column-chart__chart');
      console.log('this.getColumnProps(this.data)', this.getColumnProps(this.data));

      // console.log("** **");
      const columnProps = this.getColumnProps(this.data);
      // console.log("** ** *", this.label, columnProps);
      chartGraph.innerHTML = this.drawChartGraph(columnProps);console.log("** ** ** chartGraph.innerHTML", this.label, );

      this.update();
    });
  }

  requestUrl(){
    return `https://course-js.javascript.ru/${this.url}?from=${this.from}&to=${this.to}`;
  }

  async getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log("getData data", data);
    this.data = data;
  }

  getColumnProps(data) {
    console.log("getColumnProps data", data);
    // const maxValue = Math.max(...data);
    const maxValue = this.getMaxValue();
    const scale = 50 / maxValue;
    return Object.values(data).map(item => {
      console.log("getColumnProps data percent", (item / maxValue * 100).toFixed(0) + '%');
      console.log("getColumnProps data value", String(Math.floor(item * scale)));
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  drawChartGraph (dataForGraph) {

    let result = '';
    while (dataForGraph.length) {
      const currentData = dataForGraph.shift();
      result += '<div style="--value:' + currentData['value'] + '" data-tooltip="' + currentData['percent'] + '"></div>';
    }
    return result;
  }

  update() {
    const url = this.requestUrl();
    this.getData(url).then(_ => {
      this.element.classList.remove('column-chart_loading');
      this.element.classList.add('column-chart_orders');

      const labelLabel = this.element.querySelector(".column-chart__title");
      labelLabel.innerHTML = `<a href= ${this.link} class="column-chart__link"> Total ${this.label}</a>`;

      const valueLabel = this.element.querySelector(".column-chart__header");
      valueLabel.innerHTML = this.getValue();

      const chartGraph = this.element.querySelector('.column-chart__chart');
      console.log('this.getColumnProps(this.data)', this.getColumnProps(this.data));

      const columnProps = this.getColumnProps(this.data);

      chartGraph.innerHTML = this.drawChartGraph(columnProps);console.log("** ** ** chartGraph.innerHTML", this.label, );

    });

    console.log("update this data", this.label, this.data);
    const chartGraph = document.querySelector('.column-chart__chart');
    const columnProps = this.getColumnProps(this.data);
    console.log("update columnProps", this.label, columnProps);
    chartGraph.innerHTML = this.drawChartGraph(columnProps);
  }

  getValue() {
    let result = 0;
    Object.values(this.data).map(item => {
      result += item;
    });
    return result;
  }

  getMaxValue(){
    let result = 0;
    Object.values(this.data).map(item => {
      if (item > result) {
        result = item;
      };
    });
    return result;
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }

}
