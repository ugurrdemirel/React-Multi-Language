import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useTranslation} from "react-i18next";
import languages from "./Translations";
import {Helmet} from 'react-helmet';
import {useNavigate} from "react-router-dom";
function App() {

  // use useTranslation hook
  const { t, i18n } = useTranslation()
    const navigation = useNavigate()

    function renderLanguageChangeButtons() {
        return Object.keys(languages).map((items, index) =>
            <button
                key={index}
                disabled={i18n.language === items}
                onClick={async () => {
                    await i18n.changeLanguage(items)
                    navigation(`/${items}`)
                }}
                style={{margin: 5}}>

                {items}
            </button>
        );
    }

    return (
        <div className="App">
            <Helmet>
                <meta lang={i18n.language} />
                <title>{t("seo_about_us_page_title")}</title>
                <meta name="description" content={t("seo_about_us_page_title")} />
            </Helmet>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    {/* print hello key in translations to screen */}
                    {t("hello")}
                </p>
                {renderLanguageChangeButtons()}
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
