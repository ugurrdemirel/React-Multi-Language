import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// src/Translations/index.ts dosyasını import edelim.
import languages from "../Translations";

// Uygulamızda yer alacak dilleri ekleyelim ve çevirilerini languages değişkeninden alalım.
const resources = {
    en: {
        translation: languages.en
    },
    tr: {
        translation: languages.tr
    }
};

// Kullanıcının dilini alalım
const getLanguage = () => {
    const ls = localStorage.getItem("language")
    // LocalStorage içerisinde language key'i içeren bir değer var mı kontrol edelim.
    if (ls !== null) {
        // Eğer localstorage içinde language key'i içeren bir değer varsa

        // language değeri uygulamamızda yer alacak dillerden biri mi ?
        if (Object.keys(resources).find(f => f === ls) !== undefined) {
            // uygulamada yer alan dillerden biri ise bunu return et
            return ls
        } else {
            // uygulamada yer almayan bir dil ise default olarak ingilizce dilini kullan
            localStorage.setItem("language", "en")
            return "en"
        }
    } else {
        // Kullanıcının dili localstorage içine kaydedilmemiş ise
        // Browser dilini al
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
