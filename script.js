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

    // Function to display welcome message
    function displayWelcomeMessage() {
        const welcomeMessage = "Hi, my name is Max Mule. \n\nI am an AI Agent built using MuleChain and deployed on MuleSoft Cloudhub 2. \n\nHere are my key skills: \n- Checking Inventory in your SAP ECC System, \n- Check order details for OMS on SAP S4H, \n- Get account details from Salesforce CRM, \n- Get information about current Sales Leads, \n- Show all employees infromation, \n- and Order a Laptop for you. ";

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
