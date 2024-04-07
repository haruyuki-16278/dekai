import { IndexedDB } from "./IndexedDB/IndexedDB.js";
import { dbname, dbcolumns } from "./utils/db.config.js";

async function log() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab.url, tab.title, tab.favIconUrl);
  const db = await IndexedDB.create(dbname, dbcolumns);
  const item = {
    time: new Date().getTime(),
    iconUrl: tab.favIconUrl,
    title: tab.title,
    url: tab.url,
  };
  db.add(item);
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "log") await log();
});
