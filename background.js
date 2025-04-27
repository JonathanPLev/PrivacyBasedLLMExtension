// background.js

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "ask-llm",
      title: "Ask Local LLM: \"%s\"",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "ask-llm") {
      const prompt = info.selectionText;
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({prompt})
      });
      const text = await response.text();
      chrome.tabs.sendMessage(tab.id, { answer: text });
    }
  });
  