document.getElementById('caesar-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const text = document.getElementById('text').value.toUpperCase();
    const shift = parseInt(document.getElementById('shift').value);
    const resultDiv = document.getElementById('result');

    const encrypted = caesarCipher(text, shift);
    resultDiv.textContent = `Résultat : ${encrypted}`;
});

function caesarCipher(text, shift) {
    let result = '';
    shift = ((shift % 26) + 26) % 26; // Normaliser le décalage

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[A-Z]/)) {
            let code = text.charCodeAt(i);
            let shifted = ((code - 65 + shift) % 26) + 65;
            result += String.fromCharCode(shifted);
        } else {
            result += char;
        }
    }
    return result;
}