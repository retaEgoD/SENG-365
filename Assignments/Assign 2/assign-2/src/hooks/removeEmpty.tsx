export default function removeEmpty(obj: any) {
    const newJSON: any = {}
    for (let key in obj) {
        if (obj[key] !== '' && obj[key] !== 0 && obj[key] !== "0") {
            newJSON[key] = obj[key];
        }
    }
    return newJSON
}