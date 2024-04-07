import { IndexedDB } from "../IndexedDB/IndexedDB.js";
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
});

const tbody = document.createElement("tbody");
table.appendChild(tbody);
items
  .reverse()
  .slice(0, 5)
  .forEach((item) => {
    const tableRow = document.createElement("tr");
    tbody.appendChild(tableRow);
    const timecol = document.createElement("th");
    timecol.scope = "row";
    timecol.textContent = new Date(item.time).toLocaleString();
    tableRow.appendChild(timecol);
    const linkcol = document.createElement("td");
    linkcol.innerHTML = `<img src="${item.iconUrl}"/><a href="${item.url}">${item.title}</a>`;
    tableRow.appendChild(linkcol);
  });

if (items.length > 5) {
  const more = document.createElement("p");
  more.textContent = "and more...";
  document.body.appendChild(more);
}

document
  .getElementById("copyToClipboard")
  .addEventListener("click", async () => {
    const now = new Date();
    const today = new Date(
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    ).getTime();
    const db = await IndexedDB.create(dbname, dbcolumns);
    const items = (await db.getAll()).filter((item) => item.time > today);
    console.log(items.length);
    let text = "";
    items.forEach((item) => {
      text += `- [${item.title}](${item.url})\n`;
    });
    console.log(text);
    await navigator.clipboard.writeText(text);
  });
