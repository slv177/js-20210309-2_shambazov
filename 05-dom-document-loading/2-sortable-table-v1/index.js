export default class SortableTable {
  constructor(header, data = {}) {
    this.data = data['data'];
    this.header = header;
    console.log(this.header);
    this.sortStrings();
    this.render(this.data);
  }

  render(dataToRender){
    const element = document.createElement('div');
    element.innerHTML = this.tableHeader;
    this.element = element.firstElementChild;

    const tableRows = (document.createElement('div'));
    tableRows.innerHTML = this.tableRows(dataToRender);
    document.body.appendChild(tableRows);

    const tableFooter = (document.createElement('div'));
    tableFooter.innerHTML = this.tableFooter;
    document.body.appendChild(tableFooter);
  }

  sort(fieldValue, orderValue){
    this.data = this.sortStrings(fieldValue, orderValue);
    this.removeElementsByClass('sortable-table__body');
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

  get tableHeader(){
    const tableHeader = `<div data-element="productsContainer" class="products-list__container">
      <div class="sortable-table">

      <div data-element="header" class="sortable-table__header sortable-table__row">
          <div class="sortable-table__cell" data-id="images" data-sortable="false" data-order="asc">
            <span>Image</span>
          </div>
          <div class="sortable-table__cell" data-id="title" data-sortable="true" data-order="asc">
            <span>Name</span>
            <span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>
          </div>
          <div class="sortable-table__cell" data-id="title" data-sortable="true" data-order="asc">
            <span>Quantity</span>
          </div>
          <div class="sortable-table__cell" data-id="quantity" data-sortable="true" data-order="asc">
            <span>Price</span>
          </div>
          <div class="sortable-table__cell" data-id="price" data-sortable="true" data-order="asc">
            <span>Sales</span>
          </div>
        </div>`;
    return tableHeader;
  }

  tableHeaderRow(){
    this.header.forEach(element =>
      console.log('<div className="sortable-table__cell">' + element['title'] +'</div>')

  )
  }

  get tableFooter(){
    const tableFooter = `<div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
          <div>
            <p>No products satisfies your filter criteria</p>
            <button type="button" class="button-primary-outline">Reset all filters</button>
          </div>
        </div>

      </div>
    </div>`;
    return tableFooter;
  }

  tableRows(dataToDisplay){
    this.tableHeaderRow();
    return '<div data-element="body" class="sortable-table__body">' + dataToDisplay
      .map (item => {
        return `
           <a href=" ${item['id']} " class="sortable-table__row">
            <div class="sortable-table__cell">
              <img class="sortable-table-image" alt="Image" src="${item['images'][0]['url']}">
            </div>
            <div class="sortable-table__cell"> ${item['title']}1</div>
            <div class="sortable-table__cell"> ${item['quantity']}</div>
            <div class="sortable-table__cell"> ${item['price']}</div>
            <div class="sortable-table__cell"> ${item['sales']}</div>
          </a>
        `;})
      .join('') + '</div><div data-element="loading" class="loading-line sortable-table__loading-line"></div>';
  }

  removeElementsByClass(className){
    let elements = document.getElementsByClassName(className);
    while (elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  destroy() {
    this.remove();
  }
}
