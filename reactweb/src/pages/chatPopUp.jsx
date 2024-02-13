import React, { useState } from 'react';
import './ChatPopup.css';

const apiKey = 'e928253f-8503-d643-1d60-3c144c9d6991:fx'; // DeepL API key

const ChatPopup = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleChangeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;
    
    try {
      const response = await fetch(`https://api.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(inputText)}&target_lang=${selectedLanguage}`);
      const data = await response.json();
      const translatedText = data.translations[0].text;
      setMessages([...messages, { original: inputText, translated: translatedText }]);
      setInputText('');
    } catch (error) {
      console.error('Error translating message:', error);
    }
  };

  return (
    <div className="modal fade" id="chatModal" tabIndex="-1" role="dialog" aria-labelledby="chatModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="chatModalLabel">Chat</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  <strong>Original:</strong> {msg.original} <br />
                  <strong>Translated:</strong> {msg.translated}
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <select
              className="form-control"
              value={selectedLanguage}
              onChange={(e) => handleChangeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="pt">Portuguese</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
              <option value="hi">Hindi</option>
              <option value="ja">Japanese</option>
            </select>
            <button type="button" className="btn btn-primary" onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
