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
    let element = document.createElement('div');
    element.innerHTML = this.tableTemplate;
    this.element = element.firstElementChild;
    document.body.append(element);

    let tableHeaderRow = (document.createElement('div'));
    tableHeaderRow.innerHTML = this.tableHeaderRow;
    element.appendChild(tableHeaderRow);
    let tableHeaderRowCollection = tableHeaderRow.children;
    let header = document.querySelector(".sortable-table__header")
    while (tableHeaderRowCollection.length)
    {
      header.appendChild(tableHeaderRowCollection[0])
    }

    let tableBodyRow = (document.createElement('div'));
    tableBodyRow = this.tableBodyRow(this.data);
    let tableBodyRowCollection = tableBodyRow.children;
    let body = document.querySelector(".sortable-table__body");

    while (tableBodyRowCollection.length)
    {
      body.appendChild(tableBodyRowCollection[0])
    }

    this.subElements = this.getSubElements(element);
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
    let result = '';
    for (const item of this.header) {
      result += `<div class="sortable-table__cell" data-id= ${item.id} data-sortable="false" data-order="asc"><span> ${item.title} </span></div>`;
    }
    return result;
  }

  tableBodyRow(dataToDisplay) {
    let tableBody = document.createElement('div');
    for (const rowData of dataToDisplay) {
      const row = document.createElement('a');
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
    console.log("tableBody", tableBody);
    return tableBody;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');
    console.log("elements", elements);
    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;
      console.log("accum", accum);
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
    return this.data.sort(function (a, b) {
      if (order === 'desc') {
        if (typeof b[field] === 'number') {
          return b[field] - a[field];
        }
        return b[field].localeCompare(a[field], ["ru-ru-u-kf-upper"], {sensitivity: "case"});
      }
      if (typeof b[field] === 'number') {
        return a[field] - b[field];
      }
      return a[field].localeCompare(b[field], ["ru-ru-u-kf-upper"], {sensitivity: "case"});
    });
  }

  destroy() {
    // this.element.remove();
    // this.subElements = {};
  }
}
