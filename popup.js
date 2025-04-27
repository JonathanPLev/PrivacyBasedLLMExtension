const chatEl = document.getElementById("chat");
const promptEl = document.getElementById("prompt");
document.getElementById("send").onclick = async () => {
  const prompt = promptEl.value.trim();
  if (!prompt) return;
  appendMessage("You", prompt);
  promptEl.value = "";

  const res = await fetch("http://localhost:5000/chat", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({prompt})
  });
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let answer = "";
  while(true) {
    const {value, done} = await reader.read();
    if (done) break;
    answer += decoder.decode(value);
    updateLastMessage(answer);
  }
};

function appendMessage(who, text){
  const p = document.createElement("p");
  p.textContent = `${who}: ${text}`;
  chatEl.appendChild(p);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function updateLastMessage(text){
  chatEl.lastChild.textContent = `LLM: ${text}`;
}
