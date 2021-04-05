export default class SortableTable {

  constructor(
    header = [],
    {data} = {},
  ) {
    this.header = header;
    this.data = data;
    this.render(this.data);
  }

  render(dataToRender) {
    const element = document.createElement('div');
    element.innerHTML = this.tableTemplate;
    this.element = element.firstElementChild;
    document.body.append(element);
    const tableHeaderRow = (document.createElement('div'));
    tableHeaderRow.innerHTML = this.tableHeaderRow;
    element.append(tableHeaderRow);
    const tableHeaderRowCollection = tableHeaderRow.children;
    const header = document.querySelector(".sortable-table__header")
    while (tableHeaderRowCollection.length > 0)
    {
      header.append(tableHeaderRowCollection[0])
    }

    const body = document.querySelector(".sortable-table__body");
    body.innerHTML = this.tableBodyRow(dataToRender);
    this.subElements = this.getSubElements(element);

    this.addEventListeners();

  }

  addEventListeners() {
    document.addEventListener('pointerdown', event => {
      let target = event.target;
      console.log(target.dataset.element);

    });
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
    return this.header.map(item => `<div class="sortable-table__cell" data-element="123" data-id=${item.id} data-sortable="false"><span>${item.title}</span></div>`).join("");
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

  sort(fieldValue, orderValue) {
    this.data = this.sortStrings(fieldValue, orderValue);
    this.removeElementsByClass('sortable-table__header');
    this.removeElementsByClass('sortable-table__body');
    this.removeElementsByClass('products-list__container');
    this.render(this.data);
  }

  sortStrings(field = 'title', order = 'asc') {

    switch (order){
    case "desc":
      return sort(this.data, -1);
      break;
    default:
      return sort(this.data, 1);
    }

    function sort(arr, direction){
      return arr.sort(function (a, b) {
        if (typeof b[field] === 'number') {
          return direction * a[field] - b[field];
        }
        return direction * a[field].localeCompare(b[field], ["ru-ru-u-kf-upper"], {sensitivity: "case"});
      });
    }
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
