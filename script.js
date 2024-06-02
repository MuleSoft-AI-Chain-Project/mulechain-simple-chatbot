document.getElementById('send-btn').addEventListener('click', function () {
  let userInput = document.getElementById('user-input').value;
  if (userInput.trim() !== '') {
    addMessage('user', userInput);
    document.getElementById('user-input').value = '';

    // Simulate chatbot response
    setTimeout(() => {
      addMessage('bot', 'This is a bot response.');
    }, 500);
  }
});

document.getElementById('theme-toggle').addEventListener('change', function () {
  document.body.classList.toggle('dark-theme');
});

document
  .getElementById('user-input')
  .addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      let userInput = document.getElementById('user-input').value;
      if (userInput.trim() !== '') {
        addMessage('user', userInput);
        document.getElementById('user-input').value = '';

        // Simulate chatbot response
        setTimeout(() => {
          addMessage('bot', 'This is a bot response.');
        }, 500);
      }
    }
  });

function addMessage(sender, message) {
  let outputDiv = document.getElementById('output');
  let messageDiv = document.createElement('div');
  messageDiv.classList.add(sender);
  messageDiv.textContent = message;
  outputDiv.appendChild(messageDiv);

  // Auto-scroll to the bottom
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
