// Translator.js

import React, { useState } from 'react';
import axios from 'axios';
import "./translate.css"

const Translator = () => {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [langFrom, setLangFrom] = useState('en');
  const [langTo, setLangTo] = useState('en');

  const apiUrl = 'https://api-free.deepl.com/v2/translate';
  const apiKey = 'e928253f-8503-d643-1d60-3c144c9d6991:fx';

  const translateText = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          auth_key: apiKey,
          text: fromText,
          source_lang: langFrom,
          target_lang: langTo
        }
      });

      if (response.data.translations && response.data.translations.length > 0) {
        setToText(response.data.translations[0].text);
      } else {
        setToText('Translation not available');
      }
    } catch (error) {
      console.error('Error translating text:', error);
      setToText('Error translating text');
    }
  };

  return (
    <div className="container ">
      <div className="row justify-content-center mt-5  d-flex align-items-center justify-content-center vh-100">
        <h2 className='text-center'>Translator</h2>
        <div className="col-lg-6">
          <div className="form-group">
            <textarea
              className="form-control from-text"
              placeholder="Please type here"
              value={fromText}
              onChange={(e) => setFromText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group my-3">
            <textarea
              className="form-control to-text"
              placeholder="Translation"
              value={toText}
              readOnly
              disabled
            ></textarea>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col my-3">
                <select
                  className="form-control lang-from"
                  value={langFrom}
                  onChange={(e) => setLangFrom(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="pt">Portuguese</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
              <div className="col-auto my-auto">
                <button
                  className="btn btn-primary exchange"
                  onClick={translateText}
                >
                  Translate
                </button>
              </div>
              <div className="col my-3">
                <select
                  className="form-control lang-to"
                  value={langTo}
                  onChange={(e) => setLangTo(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="pt">Portuguese</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;
