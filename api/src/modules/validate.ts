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
    },

    date(str: string) {
        if (!str) return null;
        const regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g;
        if (regex.test(str)) {
            const split = str.split('/');
            return new Date(
                Number(split[2]),
                Number(split[1]) - 1,
                Number(split[0])
            );
        }
        return null;
    }
}