chrome.runtime.onMessage.addListener((msg) => {
    if (msg.answer) {
      let box = document.getElementById("llm-overlay");
      if (!box) {
        box = document.createElement("div");
        box.id = "llm-overlay";
        Object.assign(box.style,{
          position: "fixed", top: "10px", right: "10px",
          width: "300px", height: "200px",
          background: "white", border: "1px solid #333", padding: "8px",
          overflowY: "auto", zIndex: 999999
        });
        document.body.appendChild(box);
      }
      box.textContent = msg.answer;
    }
  });
  