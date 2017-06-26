import dataDe from './data.de.json';
import dataEnUs from './data.en-US.json';

var locales = ['en-US', 'de'];

// This is essentially bulk require for our translation files which is in JSON format
var dictionaries = getAllMessages();

function getAllMessages(req) {
    var messages = {
        'en-US' : dataEnUs,
        'de' : dataDe
    };

    return messages;
}

// we need to make sure we transform the given locale to the right format first
// so we can access the right locale in our dictionaries for example: en-us should be transformed to en-US
function formatLocale(lang) {
    lang = lang.split('-');
    return lang[1] ? `${lang[0]}-${lang[1].toUpperCase()}` : lang[0];
}

function getMessages(locale) {
    var messages = dictionaries[locale] ? dictionaries[locale] : dictionaries['en-US'];

    return Object.assign({}, dictionaries[locale], messages);
}

var locale = formatLocale(navigator.language);
export default {
    intlData: {
        locales : ['en-US'],
        // Sometimes we will include a language with partial translation
        // and we need to make sure the object that we pass to `intlData`
        // contains all keys based on the `en-US` messages.
        messages: getMessages(locale)
    },
    defaultLang: 'en-US',
    currentLanguage: locale,
    isSupportedLanguage: function(lang) {
        return !!dictionaries[lang];
    },
    // This method will check if we have language code in the URL
    // by extracting the pathname from `window.location` and split
    // them to find language code. The expected language code is in the
    // first parameter e.g. /en-US/thank-you. If we don't find the language code
    // we will assume that the URL does not contain language code and return false for `test`
    urlOverrideLang: function(path) {
        var localPath = path || location.pathname;
        var localeCode = localPath.split('/')[1];
        var pathname = localPath.split('/')[2];
        return {
            test: locales.indexOf(localeCode) !== -1,
            pathname: pathname,
            lang: locales.indexOf(localeCode) !== -1 ? localeCode : null
        };
    },
    intlDataFor: function(lang) {
        var locale = formatLocale(lang);
        return {locales: [locale], messages: getMessages(locale)};
    }
};
