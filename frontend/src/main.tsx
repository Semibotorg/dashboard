import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { Provider } from 'react-redux'
import { store } from './store/store'
import { NextUIProvider } from '@nextui-org/react';
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
   supportedLngs:['en','ar'],
    fallbackLng: 'en',
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/transl.json',
    },
    react: { useSuspense: false },
  });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    
    <App />
    
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
