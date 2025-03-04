document.getElementById('encryptForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const textToEncrypt = document.getElementById('textToEncrypt').value;

    if (textToEncrypt) {
        fetch('/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: textToEncrypt}),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Encryption Response:', data); // Debugging

                if (data.encryptedText) {
                    let encryptedText = typeof data.encryptedText === 'object'
                        ? JSON.stringify(data.encryptedText)
                        : data.encryptedText.toString();

                    // console.log('Encrypted Text:', encryptedText);
                    document.getElementById('encryptedTextLabel').textContent = encryptedText;
                } else {
                    console.error('Encryption failed!', data);
                    document.getElementById('encryptedTextLabel').textContent = 'Encryption failed!';
                }
            })
            .catch(error => {
                console.error('Error during encryption:', error);
            });
    }
});

document.getElementById('decryptForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const textToDecrypt = document.getElementById('textToDecrypt').value;

    if (textToDecrypt) {
        fetch('/decrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({encryptedText: textToDecrypt}),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Decryption Response:', data); // Debugging

                if (data.decryptedText) {
                    let decryptedText = typeof data.decryptedText === 'object'
                        ? JSON.stringify(data.decryptedText)
                        : data.decryptedText.toString();

                    // console.log('Decrypted Text:', decryptedText); // Log Decrypted Text
                    document.getElementById('decryptedTextLabel').textContent = decryptedText;
                } else {
                    console.error('Decryption failed!', data);
                    document.getElementById('decryptedTextLabel').textContent = 'Decryption failed!';
                }
            })
            .catch(error => {
                console.error('Error during decryption:', error);
            });
    }
});
