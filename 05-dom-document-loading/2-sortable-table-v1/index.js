export default class SortableTable {

  constructor({
    header = [],
    data = {},
  } = {}) {
    this.header = arguments[0];
    this.data = arguments[1].data;
    this.sortStrings();
    this.render(this.data);
    console.log(this.header);
    console.log(this.data);
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
    while (tableHeaderRowCollection.length > 0)
    {
      header.appendChild(tableHeaderRowCollection[0])
    }

    let tableBodyRows = (document.createElement('div'));
    tableBodyRows.appendChild(this.tableBodyRow(dataToRender));

    // let tableBodyRowCollection = tableBodyRows.children;
    // let body = document.querySelector(".sortable-table__body")
    // while (tableBodyRowCollection.length > 0)
    // {
    //   body.appendChild(tableBodyRowCollection[0])
    // }

    let body = document.querySelector(".sortable-table__body");
    body.appendChild(tableBodyRows);

    // console.log("finally", element);
  }

  get tableTemplate(){
    return `
          <div data-element="productsContainer" class="products-list__container">
              <div class="sortable-table">
                  <div data-element="header" class="sortable-table__header sortable-table__row"></div>

                  <div data-element="body" class="sortable-table__body">


                    <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
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
    // result += this.header.forEach(element =>
    //   console.log('<div className="sortable-table__cell">' + element['title'] +'</div>')
    // );

    for (const item of this.header) {
      result += '<div class="sortable-table__cell" data-id="' + item.id + '" data-sortable="false" data-order="asc"><span>' + item.title + '</span></div>'
    }

    return result;
  }

  tableBodyRow(dataToDisplay) {
    //           <a href=" ${item['id']} " class="sortable-table__row">
    //               <div class="sortable-table__cell">
    //                   <img class="sortable-table-image" alt="Image" src="${item['images'][0]['url']}">
    //               </div>
    //               <div class="sortable-table__cell"> ${item['title']}1</div>
    //               <div class="sortable-table__cell"> ${item['quantity']}</div>
    //               <div class="sortable-table__cell"> ${item['price']}</div>
    //               <div class="sortable-table__cell"> ${item['sales']}</div>
    //         </a>

    let tableBody = document.createElement('div');

    for (const rowData of dataToDisplay) {
      let row = document.createElement('a');
      row.href = rowData.id;
      row.classList.add('sortable-table__row');
      // for (const cell of this.header) {
      //   let cellContent = document.createElement('div');
      //   cellContent.innerHTML = "<div class=\'sortable-table__cell\'> <p>123</p> </div>";
      //   row.prepend(cellContent);
      // }

      // while (this.header.length > 0)
      // {
      //   let cellContent = document.createElement('div');
      //   cellContent.innerHTML = "<div class=\'sortable-table__cell\'> <p>123</p> </div>";
      //   row.prepend(cellContent);
      // }

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
    // console.log("tableBody", tableBody);
    return tableBody;
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
    this.removeElementsByClass();
  }
}
