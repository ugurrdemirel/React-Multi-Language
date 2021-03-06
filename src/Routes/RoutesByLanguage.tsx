import translations from "../Translations";
import {Route, Routes, Navigate, useLocation} from "react-router-dom";
import { useEffect} from "react";
import {useTranslation} from "react-i18next";
import App from "../App";

function RoutesByLanguage(){
    // Translation hook
    const { i18n} = useTranslation()
    // React Router location hook
    const loc = useLocation()
    useEffect(() => {
        // parse language code from url. ex: test.com/tr/home -> result: tr
        const lang = loc.pathname.split(/\/([a-z]{2})(?![^\/])/gm)[1]
        // check lang index
        const i = Object.keys(translations).findIndex(f => f === lang)
        // if language different than known language
        if( i !== -1 && i18n.language !== lang) {
            // change language
            i18n.changeLanguage(lang)
        }
    }, [loc, i18n])
    const routes = () => {
        return(
            <>
                {/* test.com/tr -> test.com/tr/home */ }
                <Route index element={<Navigate to={`/${i18n.language}/home`} />} />
                <Route path={"home"} element={<App />} />
            </>
        )
    }
    function renderRoutes(){
        return Object.keys(translations).map((lang_code: string, id) => {
            return (
                <>
                    {/* Generate url by language. Ex: test.com/en, test.com/en */}
                    <Route key={id} path={lang_code}>
                        {routes()}
                    </Route>
                </>
            );
        })
    }
    return (
        <Routes>
            {/* If the user visits test.com, redirect them to the appropriate page for their language. For example test.com -> test.com/en */}
            <Route path={"/"} element={<Navigate to={`${i18n.language}`} replace />} />
            {renderRoutes()}
        </Routes>
    )
}

export default RoutesByLanguage
