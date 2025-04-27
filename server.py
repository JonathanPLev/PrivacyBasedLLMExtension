# server.py
from flask import Flask, request, jsonify, stream_with_context, Response
from gpt4all import GPT4All

app = Flask(__name__)
model = GPT4All("gpt4all-13b-snoozy-q4_0.gguf", n_threads=4)

@app.route("/chat", methods=["POST"])
def chat():
    prompt = request.json.get("prompt", "")
    def generate():
        for token in model.generate(prompt, stream=True):
            yield token
    return Response(generate(), mimetype="text/plain")

if __name__ == "__main__":
    app.run(port=5000)
