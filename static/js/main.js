document.addEventListener("DOMContentLoaded", () => {
    console.log("VaaniLink initialized.");
    loadMessages();

    const sendBtn = document.getElementById('send-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const sourceLang = document.getElementById('source-lang').value;
    const targetLang = document.getElementById('target-lang').value;
    
    const text = messageInput.value.trim();
    if (!text) return;

    fetch("/api/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: text,
            source_language: sourceLang,
            target_language: targetLang
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            messageInput.value = "";
            loadMessages();
        }
    })
    .catch(error => {
        console.error("Error sending message:", error);
    });
}

function loadMessages() {
    const messagesList = document.getElementById('messages-list');
    if (!messagesList) return;

    fetch("/api/messages")
        .then(response => response.json())
        .then(messages => {
            messagesList.innerHTML = "";
            messages.forEach(msg => {
                const li = document.createElement('li');
                
                const origDiv = document.createElement('div');
                origDiv.className = 'original-text';
                origDiv.textContent = `[${msg.source_language}] ${msg.original_message}`;
                
                const transDiv = document.createElement('div');
                transDiv.className = 'translated-text';
                transDiv.textContent = msg.translated_message;
                
                li.appendChild(origDiv);
                li.appendChild(transDiv);
                messagesList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error loading messages:", error);
        });
}
