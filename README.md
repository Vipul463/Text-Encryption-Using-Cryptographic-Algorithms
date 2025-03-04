Text Encryption & Decryption Web App
A simple web application that allows users to encrypt and decrypt textual information securely using AES-256 encryption.

🚀 Features
Encrypts user-inputted text using AES-256-CBC encryption.
Decrypts previously encrypted text.
Ensures strong encryption by generating a unique IV (Initialization Vector) for each encryption.
Simple Express.js backend with an EJS frontend.
Secure handling of the encryption key using environment variables.
🛠️ Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Encryption: Crypto module (AES-256-CBC)
Templating Engine: EJS
📦 Installation
1. Clone the repository
sh
Copy
Edit
git clone https://github.com/yourusername/encryption-app.git
cd encryption-app
2. Install dependencies
sh
Copy
Edit
npm install
3. Configure environment variables
Create a .env file in the root directory and add:

ini
Copy
Edit
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef  # Must be 32 characters
PORT=3000
4. Start the server
sh
Copy
Edit
npm start
or in development mode:

sh
Copy
Edit
npm run dev
The application will run at http://localhost:3000

📜 Usage
Enter text into the encryption form and click Encrypt.
Copy the generated encrypted text.
Paste it into the decryption form and click Decrypt.
The original text will be displayed.
🔍 Example
Encryption
Input:
Hello, World!
Output:
b8a3f5d6e2:5b21f3c9d6c9a1...

Decryption
Input:
b8a3f5d6e2:5b21f3c9d6c9a1...
Output:
Hello, World!

🧪 Running Tests
To run tests (Jest or Mocha/Chai), use:

sh
Copy
Edit
npm test
🤝 Contributing
Fork the repo.
Create a new branch (git checkout -b feature-name).
Commit your changes (git commit -m "Added new feature").
Push to the branch (git push origin feature-name).
Open a Pull Request.
📜 License
This project is licensed under the MIT License.
