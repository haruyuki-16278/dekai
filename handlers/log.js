import { IndexedDB } from "../IndexedDB/IndexedDB";
import { dbname, dbcolumns } from "../utils/db.config";

export async function handler() {
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
