
export const checkValidity = (value, rules) => {
    let isValid = 0
    if (rules) {
        if (rules.required) {
            if (value.trim() === '') isValid += 1
        }
        if (rules.minLength) {
            if (value.length < rules.minLength) isValid += 1
        }
        if (rules.maxLength) {
            if (value.length > rules.maxLength) isValid += 1
        }
    } else {
        isValid = 0
    }
    return isValid === 0
}