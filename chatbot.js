/* MIKI AI Chatbot Script */

// 🚀 MIKI AI Chatbot - Enhanced Version
document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatbotWindow = document.getElementById("chatbot-window");
    const closeBot = document.getElementById("close-bot");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");
    const suggestedQuestions = document.getElementById("suggested-questions");
    const typingIndicator = document.getElementById("typing-indicator");

    if (!chatbotIcon || !chatbotWindow) return;

    // Show/Hide bot
    chatbotIcon.onclick = () => {
        chatbotWindow.style.display = "flex";
        addWelcomeMessage();
    };
    closeBot.onclick = (e) => {
        e.stopPropagation();
        chatbotWindow.style.display = "none";
    }

    // Initialize bot with welcome message
    function addWelcomeMessage() {
        if (chatbotMessages.children.length === 0) {
            addMessage("👋 Welcome! I'm MIKI, the AI assistant for the Earth Sky team. I can help you with information about our environmental monitoring projects. What would you like to know?", "bot");
            showSuggestedQuestions();
        }
    }

    // Suggested questions
    const suggestedTopics = [
        "Amazon Deforestation",
        "European Heat Waves",
        "California Wildfires",
        "New Zealand Snow Cover",
        "Cairo Air Pollution",
        "Indian Monsoon",
        "Arabian Sea Phytoplankton"
    ];

    function showSuggestedQuestions() {
        if (suggestedQuestions) {
            suggestedQuestions.innerHTML = "";
            suggestedTopics.forEach(topic => {
                const btn = document.createElement("button");
                btn.className = "question-btn";
                btn.textContent = topic;
                btn.onclick = () => {
                    chatbotInput.value = topic;
                    sendMessage();
                };
                suggestedQuestions.appendChild(btn);
            });
        }
    }

    // Extended bot knowledge base
    const botKnowledge = {
        // General greetings
        "hello": "👋 Welcome! I'm MIKI, the AI assistant for the Earth Sky team. Ask me about any of our environmental monitoring projects 🚀",
        "hi": "👋 Welcome! I'm MIKI, the AI assistant for the Earth Sky team. Ask me about any of our environmental monitoring projects 🚀",
        "hey": "👋 Welcome! I'm MIKI, the AI assistant for the Earth Sky team. Ask me about any of our environmental monitoring projects 🚀",

        // Project information
        "fire watch": "🔥 Fire Watch uses satellite images to detect forest fires with high accuracy and warn the relevant teams. We utilize Terra MODIS thermal anomalies for early detection and monitoring.",
        "flood alert": "🌊 Flood Alert analyzes weather data and river levels to predict floods and alert residents early. Our system integrates satellite data with ground sensors for comprehensive monitoring.",
        "climate tracker": "🌍 Climate Tracker monitors climate changes in real-time using NASA data. We track temperature anomalies, precipitation patterns, and other climate indicators globally.",
        "satellite view": "🛰️ Satellite View provides interactive images of Earth and advanced data analysis. We use multiple satellite sources including Terra MODIS for comprehensive Earth observation.",
        "air quality": "🌫️ Air Quality measures air quality and monitors pollution using satellite data. Our system tracks particulate matter, aerosols, and other pollutants globally.",

        // Extended topics with detailed information
        "amazon deforestation": "🌳 Amazon Deforestation Monitoring: We use Terra MODIS and NDVI analysis on Google Earth Engine to track forest loss in the Amazon. Our system monitors deforestation rates, land use changes, and carbon emissions from rainforest degradation. We also track reforestation efforts and biodiversity impacts.",

        "european heat waves": "🌡️ European Heat Waves: Our monitoring system uses Terra MODIS Land Surface Temperature (LST) data to analyze heat waves across Europe. We track temperature anomalies, urban heat island effects, and climate change impacts. Our data helps in heat stress management and environmental resilience planning.",

        "california wildfires": "🔥 California Wildfires: We monitor wildfire activity using Terra MODIS thermal anomalies and hotspot analysis. Our system tracks fire trends, vegetation dryness, and provides early warnings. We also analyze climate-induced fire patterns and provides support for fire management strategies.",

        "new zealand snow cover": "🏔️ New Zealand Snow Cover Decline: Using Terra MODIS reflectance data, we monitor snow retreat in New Zealand's alpine regions. Our analysis covers snow loss patterns, glacier melt, and impacts on water resources. This helps in understanding cryosphere changes and hydrological impacts.",

        "cairo air pollution": "🌫️ Cairo Black Cloud (Air Pollution): We monitor air quality in Cairo using Terra MODIS Aerosol Optical Depth (AOD) data. Our system tracks pollution sources including agricultural waste burning and urban emissions. We analyze particulate matter levels and support environmental management efforts.",

        "indian monsoon": "🌧️ Indian Monsoon Variability: Our system monitors monsoon patterns using Terra MODIS rainfall data and vegetation indices. We track precipitation anomalies, agricultural drought risks, and provides climate adaptation needs. Our analysis supports food security planning and climate resilience.",

        "arabian sea phytoplankton": "🌊 Arabian Sea Phytoplankton Blooms: We monitor marine ecosystems using Terra MODIS ocean color data to track chlorophyll-a concentrations. Our system detects algal blooms, analyzes primary productivity, and assesses impacts on fisheries. We also study nutrient runoff effects and carbon cycle implications."
    };

    // Keyword mapping for intelligent responses
    const keywordMapping = {
        "amazon": "amazon deforestation",
        "deforestation": "amazon deforestation",
        "forest": "amazon deforestation",
        "heat": "european heat waves",
        "temperature": "european heat waves",
        "wildfire": "california wildfires",
        "fire": "california wildfires",
        "snow": "new zealand snow cover",
        "alpine": "new zealand snow cover",
        "cairo": "cairo air pollution",
        "pollution": "cairo air pollution",
        "smog": "cairo air pollution",
        "monsoon": "indian monsoon",
        "rain": "indian monsoon",
        "phytoplankton": "arabian sea phytoplankton",
        "algae": "arabian sea phytoplankton",
        "bloom": "arabian sea phytoplankton"
    };

    // Function to add messages to chat
    function addMessage(text, sender, speak = false) {
        const msg = document.createElement("div");
        msg.className = sender;
        msg.innerText = text;
        chatbotMessages.appendChild(msg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // 🎙️ If bot responds → Read aloud
        if (speak && sender === "bot") {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en";
            utterance.rate = 1;
            utterance.pitch = 1;
            speechSynthesis.speak(utterance);
        }
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement("div");
        typingDiv.className = "typing-indicator";
        typingDiv.id = "typing-indicator";

        const typingText = document.createElement("span");
        typingText.textContent = "MIKI is typing";

        const typingDots = document.createElement("div");
        typingDots.className = "typing-dots";
        typingDots.innerHTML = '<span></span><span></span><span></span>';

        typingDiv.appendChild(typingText);
        typingDiv.appendChild(typingDots);
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Function to hide typing indicator
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById("typing-indicator");
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Function to find the best matching topic
    function findMatchingTopic(userText) {
        const lowerText = userText.toLowerCase();

        // First, check for exact matches
        for (let key in botKnowledge) {
            if (lowerText.includes(key.toLowerCase())) {
                return { topic: key, confidence: "exact" };
            }
        }

        // Then, check for keyword matches
        for (let keyword in keywordMapping) {
            if (lowerText.includes(keyword.toLowerCase())) {
                return { topic: keywordMapping[keyword], confidence: "keyword" };
            }
        }

        return null;
    }

    // Function to send message
    function sendMessage() {
        const userText = chatbotInput.value.trim();
        if (userText === "") return;

        addMessage(userText, "user");
        chatbotInput.value = "";

        // Show typing indicator
        showTypingIndicator();

        // Simulate processing delay
        setTimeout(() => {
            hideTypingIndicator();

            const match = findMatchingTopic(userText);
            let reply;

            if (match) {
                if (match.confidence === "keyword") {
                    // Ask for confirmation if it's a keyword match
                    const confirmMsg = `Did you mean "${match.topic}"?`;
                    addMessage(confirmMsg, "bot");

                    // Add suggestion buttons
                    const suggestionYes = document.createElement("div");
                    suggestionYes.className = "suggestion";
                    suggestionYes.textContent = "Yes, tell me more";
                    suggestionYes.onclick = () => {
                        addMessage("Yes, tell me more", "user");
                        showTypingIndicator();
                        setTimeout(() => {
                            hideTypingIndicator();
                            addMessage(botKnowledge[match.topic], "bot", true);
                        }, 800);
                    };

                    const suggestionNo = document.createElement("div");
                    suggestionNo.className = "suggestion";
                    suggestionNo.textContent = "No, that's not what I meant";
                    suggestionNo.onclick = () => {
                        addMessage("No, that's not what I meant", "user");
                        showTypingIndicator();
                        setTimeout(() => {
                            hideTypingIndicator();
                            addMessage("I'm sorry, could you please rephrase your question? I can help you with: Amazon Deforestation, European Heat Waves, California Wildfires, New Zealand Snow Cover, Cairo Air Pollution, Indian Monsoon, or Arabian Sea Phytoplankton.", "bot");
                        }, 800);
                    };

                    chatbotMessages.appendChild(suggestionYes);
                    chatbotMessages.appendChild(suggestionNo);
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                    return;
                } else {
                    // Exact match - provide direct answer
                    reply = botKnowledge[match.topic];
                }
            } else {
                // No match found
                reply = "❓ I didn't understand your question. Try asking about: Amazon Deforestation, European Heat Waves, California Wildfires, New Zealand Snow Cover, Cairo Air Pollution, Indian Monsoon, or Arabian Sea Phytoplankton.";
            }

            addMessage(reply, "bot", true);
        }, 1000);
    }

    // Event listeners
    if (chatbotInput && chatbotSend) {
        chatbotInput.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                sendMessage();
            }
        });

        chatbotSend.addEventListener("click", sendMessage);
    }
});
