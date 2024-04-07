import { IndexedDB } from "../IndexedDB/IndexedDB.js"
import { dbname, dbcolumns } from "../utils/db.config.js";

const db = await IndexedDB.create(dbname, dbcolumns);
const items = await db.getAll();

const table = document.createElement("table");
document.body.appendChild(table);
const thead = document.createElement("thead");
table.appendChild(thead);
const headrow = document.createElement("tr");
thead.appendChild(headrow);
["time", "link"].forEach((column) => {
  const th = document.createElement("th");
  th.scope = "col";
  th.textContent = column;
  headrow.appendChild(th);
})

const tbody = document.createElement("tbody");
table.appendChild(tbody);
items.slice(items.length - 5, items.length).forEach(item => {
  const tableRow = document.createElement("tr");
  tbody.appendChild(tableRow);
  const timecol = document.createElement("th");
  timecol.scope = "row";
  timecol.textContent = new Date(item.time).toLocaleString();
  tableRow.appendChild(timecol)
  const linkcol = document.createElement("td");
  linkcol.innerHTML = `<img src="${item.iconUrl}"/><a href="${item.url}">${item.title}</a>`;
  tableRow.appendChild(linkcol);
});

if (items.length > 5) {
  const more = document.createElement("p");
  more.textContent = "and more..."
  document.body.appendChild(more);
}
