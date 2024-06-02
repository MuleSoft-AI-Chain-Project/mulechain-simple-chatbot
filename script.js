// Event listener for the send button
document.getElementById('send-btn').addEventListener('click', function () {
  sendMessage();
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
      sendMessage();
    }
  });

async function sendMessage() {
  let userInput = document.getElementById('user-input').value;
  if (!userInput) return;

  addMessage('user', userInput);
  document.getElementById('user-input').value = ''; // Clear the input field

  try {
    const response = await fetch(
      'https://ai-agent-chat-fsxdhm.5sc6y6-4.usa-e2.cloudhub.io/composed',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ data: userInput }),
      }
    );
    const data = await response.json();
    const formattedReply = formatReply(data.reply);
    addMessage('bot', formattedReply);
  } catch (error) {
    addMessage('bot', 'Error: Unable to communicate with the AI.');
    console.error('Error:', error);
  }
}

function addMessage(sender, message) {
  let outputDiv = document.getElementById('output');
  let messageDiv = document.createElement('div');
  messageDiv.classList.add(sender);
  messageDiv.innerHTML = message;
  outputDiv.appendChild(messageDiv);

  // Auto-scroll to the bottom
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
function formatReply(reply) {
  // Split the reply string at the first colon
  const colonIndex = reply.indexOf(':');
  const mainMessage = reply.substring(0, colonIndex).trim();
  const sections = reply.substring(colonIndex + 1).split('\n\n');

  // Join the main message with a line break
  let formattedMessage = mainMessage;

  // For each section, handle bullet points and paragraphs
  sections.forEach((section) => {
    const paragraphs = section.trim().split('\n-');
    paragraphs.forEach((paragraph, index) => {
      const trimmedParagraph = paragraph.trim();
      if (trimmedParagraph) {
        if (index === 0) {
          formattedMessage += `${trimmedParagraph}`;
        } else {
          formattedMessage += `<br>- ${trimmedParagraph}`;
        }
      }
    });
  });

  return formattedMessage;
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
      <li>- Checking Inventory in your SAP ECC System</li>
      <li>- Check order details in your SAP S4H System</li>
      <li>- Get account details from your Salesforce CRM</li>
      <li>- Get information about current Sales Leads from your Hubspot</li>
      <li>- Show all employees information from your Workday</li>
      <li>- Order a Laptop from your company's Asset Ordering Portal.</li>
    </ul>
  `;

  addMessage('bot', formatReply(introMessage));
}

// Add the introductory message when the page loads
window.onload = function () {
  addIntroMessage();
};
