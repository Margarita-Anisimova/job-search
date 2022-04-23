export function crypto(password: string): string {
    var result = "";
    let key = GenerateHexArr(password.length)
    for (let i = 0; i < password.length; ++i) {
        result += (parseInt(key[i], 16) ^ parseInt(password[i], 16)).toString(16) + ' ';
    }
    let a = key.join(' ');
    result += a;
    return result;
}

function GenerateHexArr(length: number) {
    let result = [];
    for (let i = 0; i < length; i++) {
        result.push((Math.floor(Math.random() * 0xFFF)).toString(16))
    }
    return result;
}