const BACKEND_URL = 'https://course-js.javascript.ru/api/dashboard/bestsellers?from=2021-03-06T07%3A54%3A34.307Z&to=2021-04-05T07%3A54%3A34.307Z&_sort=title&_order=asc&_start=0&_end=30';

export default class SortableTable {

  onSortClick = event => {
    console.log("onSortClick");
    const column = event.target.closest('[data-sortable="true"]');

    // const toggleOrder = order => {
    //   const orders = {
    //     asc: 'desc',
    //     desc: 'asc'
    //   };
    //   this.order = orders[order];
    // };

    this.order = 'desc';

    this.sort = column.dataset.id;
    console.log("this.sort", this.sort);
    const currentUrl = this.createUrl();
    console.log("this.currentUrl ->", currentUrl);
    this.getData(currentUrl).then(_ => {
      console.log("this.getData(currentUrl)", this.data);
      this.update();
    });
  };

  constructor(
    header = [],
    {url} = {},
  ) {
    this.header = header;
    this.url = url;
    let newUrl = this.createUrl();
    console.log("constructor newurl ", newUrl);
    this.render();
    this.getData(newUrl).then(result => this.update());
  }

  render() {
    console.log("render");
    const element = document.createElement('div');
    element.innerHTML = this.tableTemplate;
    this.element = element.firstElementChild;

    const tableHeaderRow = (document.createElement('div'));
    tableHeaderRow.innerHTML = this.tableHeaderRow;
    element.append(tableHeaderRow);

    const tableHeaderRowCollection = tableHeaderRow.children;
    const header = element.querySelector(".sortable-table__header");
    while (tableHeaderRowCollection.length > 0)
    {
      header.append(tableHeaderRowCollection[0]);
    }
    this.subElements = this.getSubElements(this.element);
    this.initEventListeners();
  }

  update() {
    console.log("update");
    const body = this.element.querySelector(".sortable-table__body");
    body.innerHTML = this.tableBodyRow(this.data);
  }

  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.onSortClick);
  }

  createUrl(from = '2021-03-06T07:54:34.307Z', to = '2021-04-05T07:54:34.307Z') {
    let newUrl = new URL('api/rest/products', 'https://course-js.javascript.ru/');
    // newUrl.searchParams.set('from', from);
    // newUrl.searchParams.set('to', to);
    newUrl.searchParams.set('_sort', this.sort);
    newUrl.searchParams.set('_order', this.order);
    newUrl.searchParams.set('_start', 0);
    newUrl.searchParams.set('_end', 10);
    console.log("newUrl ", newUrl);
    return newUrl;
  }

  async getDataTest(url) {
    return await fetch(url);
  }

  async getData(url) {
    const response = await fetch(url);
    this.data = await response.json();
  }

  get tableTemplate(){
    return `
        <div data-element="productsContainer" class="products-list__container">
            <div class="sortable-table">
                <div data-element="header" class="sortable-table__header sortable-table__row">
                </div>
                <div data-element="body" class="sortable-table__body">
                </div>
                <div data-element="loading" class="loading-line sortable-table__loading-line">
                </div>
                <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
                    <div>
                        <p>No products satisfies your filter criteria</p>
                        <button type="button" class="button-primary-outline">Reset all filters</button>
                    </div>
                </div>
            </div>
        </div>
  `;
  }

  get tableHeaderRow() {

    return this.header.map(item => `<div class="sortable-table__cell" data-id=${item.id} data-sortable="true"><span>${item.title}</span></div>`).join("");

  }

  tableBodyRow(dataToDisplay) {

    let tableBody = document.createElement('div');

    for (const rowData of dataToDisplay) {
      let row = document.createElement('a');
      row.href = rowData.id;
      row.classList.add('sortable-table__row');


      for (let i = 0; i < this.header.length; i++) {
        let cellContent = document.createElement('div');
        let idFromHeader = this.header[i].id;
        cellContent.classList.add('sortable-table__cell');
        if (idFromHeader === 'images') {
          cellContent.innerHTML = `<img class="sortable-table-image" alt="Image" src=${rowData[idFromHeader][0].url}>`;
        } else {
          cellContent.textContent = rowData[idFromHeader];
        }
        row.append(cellContent);
      }

      tableBody.appendChild(row);
    }

    return tableBody.innerHTML;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');
    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;
      return accum;
    }, {});
  }

  removeElementsByClass(className){
    let elements = document.getElementsByClassName(className);
    while (elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  // sort(fieldValue, orderValue) {
  //   this.data = this.sortStrings(fieldValue, orderValue);
  //   this.removeElementsByClass('sortable-table__header');
  //   this.removeElementsByClass('sortable-table__body');
  //   this.removeElementsByClass('products-list__container');
  //   this.render(this.data);
  // }
  //
  // sortStrings(field = 'title', order = 'asc') {
  //
  //   switch (order){
  //   case "desc":
  //     return sort(this.data, -1);
  //     break;
  //   default:
  //     return sort(this.data, 1);
  //   }
  //
  //   function sort(arr, direction){
  //     return arr.sort(function (a, b) {
  //       if (typeof b[field] === 'number') {
  //         return direction * a[field] - b[field];
  //       }
  //       return direction * a[field].localeCompare(b[field], ["ru-ru-u-kf-upper"], {sensitivity: "case"});
  //     });
  //   }
  // }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
