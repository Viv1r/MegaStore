const genders = ['male', 'female'];

export default {
    name(str: string) {
        if (!str) return null;
        const regex = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
        if (regex.test(str)) {
            return str;
        }
        return null;
    },

    phone(str: string) {
        if (!str) return null;
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (regex.test(str)) {
            return '+7' + str.replace(/[-. ]/g, '');
        }
        return null;
    },

    email(str: string) {
        if (!str) return null;
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(str)
            ? str
            : null;
    },

    gender(str: string) {
        if (!str) return null;
        return genders.find(elem => elem === str.toLowerCase());
    }
}