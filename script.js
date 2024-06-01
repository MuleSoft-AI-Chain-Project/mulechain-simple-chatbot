document.addEventListener("DOMContentLoaded", () => {
    const messagesDiv = document.getElementById('messages');
    const userInput = document.getElementById('userInput');

    function appendMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        const senderName = document.createElement('div');
        senderName.classList.add('sender-name');
        senderName.textContent = sender === 'user' ? 'User:' : 'Max Mule:';

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerHTML = message; // Use innerHTML for formatted text

        messageDiv.appendChild(senderName);
        messageDiv.appendChild(messageContent);
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
    }

    function formatReply(reply) {
        // Split the reply string at the first colon
        const colonIndex = reply.indexOf(':');
        const mainMessage = reply.substring(0, colonIndex).trim();
        const sections = reply.substring(colonIndex + 1).split('\n\n');
    
        // Join the main message with line break
        let formattedMessage = mainMessage + '<br>';
    
        // For each section, handle bullet points and paragraphs
        sections.forEach(section => {
            const paragraphs = section.trim().split('\n-');
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
                    
    async function sendMessage() {
        const userMessage = userInput.value;
        if (!userMessage) return;

        appendMessage(userMessage, 'user');
        userInput.value = ''; // Clear the input field

        try {
            const response = await fetch('https://ai-agent-chat-fsxdhm.5sc6y6-4.usa-e2.cloudhub.io/composed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ data: userMessage })
            });
            const data = await response.json();
            const formattedReply = formatReply(data.reply);
            appendMessage(formattedReply, 'ai');
        } catch (error) {
            appendMessage('Error: Unable to communicate with the AI.', 'ai');
            console.error('Error:', error);
        }
    }

    function displayWelcomeMessage() {
        const welcomeMessage = '<div class="message-content">Hi, my name is Max Mule. <br><br>I am an AI Agent built using MuleChain and deployed on MuleSoft Cloudhub 2. <br><br>Here are my key skills<br>- Checking Inventory in your <b>SAP ECC</b> System,<br>- Check order details in your <b>SAP S4H</b> System,<br>- Get account details from your <b>Salesforce</b> CRM,<br>- Get information about current Sales Leads from your <b>Hubspot</b>,<br>- Show all employees infromation from your <b>Workday</b>,<br>- and Order a Laptop from your companies <b>Asset Ordering Portal</b>.<br></div>';
    
        const formattedReply = formatReply(welcomeMessage);
        appendMessage(formattedReply, 'ai');
    }
    
    // Call the function to display the welcome message
    displayWelcomeMessage();
    
    // Make sendMessage available globally
    window.sendMessage = sendMessage;

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
