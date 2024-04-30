import { IndexedDB } from "./IndexedDB/IndexedDB.js";
import { dbname, dbcolumns } from "./utils/db.config.js";

let selectedText = "";

async function updateBadge() {
  const db = await IndexedDB.create(dbname, dbcolumns);
  const now = new Date();
  const today = new Date(
    `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
  ).getTime();
  const count = (await db.getAll())
    .filter((item) => item.time > today)
    .length.toString();
  chrome.action.setBadgeText({
    text: count,
  });
  chrome.action.setBadgeBackgroundColor({
    color: "#B4E9FF",
  });
}

async function log() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab.url, tab.title, tab.favIconUrl);
  console.log(selectedText);
  const db = await IndexedDB.create(dbname, dbcolumns);
  const item = {
    time: new Date().getTime(),
    iconUrl: tab.favIconUrl,
    title: tab.title,
    url: tab.url,
    marked: selectedText,
  };
  db.add(item);
  updateBadge();
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "log") await log();
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(message.message);
  if (sender.tab.id === tab.id) {
    selectedText = message.message;
  }
  return true;
});

updateBadge();
