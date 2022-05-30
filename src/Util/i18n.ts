import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import src/Translations/index.ts
import languages from "../Translations";

// Let's add the languages that will be included in our application and get their translations from the languages variable.
const resources = {
    en: {
        translation: languages.en
    },
    tr: {
        translation: languages.tr
    }
};

// Let's get the user's language
const getLanguage = () => {
    const ls = localStorage.getItem("language")
    // Let's check if there is a value containing the language key in localStorage.
    if (ls !== null) {
        // If there is a value containing language key in localstorage

        // Is the language value one of the languages that will be included in our application?
        if (Object.keys(resources).find(f => f === ls) !== undefined) {
            // return this if it is one of the languages included in the application
            return ls
        } else {
            // If it is a language that is not included in the application, use the English language by default
            localStorage.setItem("language", "en")
            return "en"
        }
    } else {
        // If the user's language is not saved in localstorage
        // Get browser language
        let parsed = navigator.language
        if (parsed.includes("-")) {
            parsed = parsed.split("-")[0]
        }
        localStorage.setItem("language", parsed)
        return parsed
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getLanguage(),
        interpolation: {
            escapeValue: false
        },
        saveMissing: true,
        parseMissingKeyHandler: (key) => {
            return `missing translation "${key}"`;
        },
        react: {
            transWrapTextNodes: 'span'
        }
    });
export default i18n;
