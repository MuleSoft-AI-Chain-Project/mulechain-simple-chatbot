// Event listener for the send button
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

// Event listener for theme toggle
document.getElementById('theme-toggle').addEventListener('change', function () {
  document.body.classList.toggle('dark-theme');
});

// Event listener for pressing Enter key in the input field
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

// Function to add a message to the chat window
function addMessage(sender, message) {
  let outputDiv = document.getElementById('output');
  let messageDiv = document.createElement('div');
  messageDiv.classList.add(sender);
  messageDiv.innerHTML = message; // Use innerHTML to allow HTML content
  outputDiv.appendChild(messageDiv);

  // Auto-scroll to the bottom
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Function to add the introductory message from the bot
function addIntroMessage() {
  const introMessage = `
    <p>Hi, my name is Max Mule.</p>
    <br>
    <p>I am an AI Agent built using MuleChain and deployed on MuleSoft Cloudhub 2.</p>
    <br>
    <p>Here are my key skills:</p>
    <ul>
      <li>Checking Inventory in your SAP ECC System,</li>
      <li>Check order details in your SAP S4H System,</li>
      <li>Get account details from your Salesforce CRM,</li>
      <li>Get information about current Sales Leads from your Hubspot,</li>
      <li>Show all employees information from your Workday,</li>
      <li>Order a Laptop from your company's Asset Ordering Portal.</li>
    </ul>
  `;

  addMessage('bot', introMessage);
}

// Add the introductory message when the page loads
window.onload = function () {
  addIntroMessage();
};
