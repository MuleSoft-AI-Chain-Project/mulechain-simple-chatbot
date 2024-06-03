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
  let formattedMessage = mainMessage + '<br>';

  // For each section, handle bullet points and paragraphs
  sections.forEach((section) => {
    const paragraphs = section.trim().split('/\n-|\n   -/');
    paragraphs.forEach((paragraph, index) => {
      const trimmedParagraph = paragraph.trim();
      if (trimmedParagraph) {
        if (index === 0) {
            formattedMessage += `${trimmedParagraph}<br>`;
        } else {
            formattedMessage += `- ${trimmedParagraph}<br>`;
        }
    } else if (index === paragraphs.length - 1) {
        formattedMessage += '<br>';
    }
});
});

  return formattedMessage;
}

// Function to add the introductory message from the bot
function addIntroMessage() {
  const introMessage = `
    <p>Hi, I'm Max Mule, an AI Agent built with MuleChain on the MuleSoft Anypoint Platform.</p>
    <br>
    <p>Here are my key skills:</p>
    <ul>
      <li>- Check SAP ECC inventory</li>
      <li>- Retrieve SAP S4H order details</li>
      <li>- Access Salesforce CRM accounts details</li>
      <li>- Gather Hubspot sales leads</li>
      <li>- Display Workday employee info</li>
      <li>- Order laptops from your asset portal</li>
    </ul>
  `;

  addMessage('bot', formatReply(introMessage));
}

// Add the introductory message when the page loads
window.onload = function () {
  addIntroMessage();
};
