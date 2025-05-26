# 🏥 DocAlert - Patient Follow-Up Reminder System

An automated system for clinics and private doctors to track and remind patients of follow-up appointments via **SMS, WhatsApp, Email, and in-app notifications**.

## ✨ Features

- **Multi-Channel Reminders**:  
  📧 Email | 📱 SMS (Twilio) | 💬 WhatsApp | 🔔 In-App
- **Doctor & Patient Dashboards**  
- **Automated Scheduling**: Custom reminder timing (e.g., 1 day before appointment)  
- **HIPAA-Compliant** Data Handling  
- **Analytics**: Track confirmations, no-shows, and patient responses  

## 🚀 Deployment
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/docalert.git
   cd docalert
   
2. Install dependencies:
bash
npm install
Configure environment variables (create .env file):

env
VITE_TWILIO_ACCOUNT_SID=your_twilio_sid
VITE_TWILIO_AUTH_TOKEN=your_twilio_token
VITE_WHATSAPP_API_KEY=your_whatsapp_key
Run locally:

bash
npm run dev

🛠️ Tech Stack
Frontend: React + TypeScript, Tailwind CSS

Backend: Node.js (Express)

Database: Firebase/Firestore

APIs: Twilio (SMS), WhatsApp Business API, SendGrid (Email)

📂 Project Structure
src/
├── components/      # UI components (Select.tsx, etc.)
├── pages/           # Next.js/Vite pages
├── services/        # API/notification services
├── styles/          # Global CSS/Tailwind
└── utils/           # Helper functions

📝 Environment Variables
See .env.example for required variables:
env
VITE_API_BASE_URL="your_api_url"
VITE_TWILIO_ACCOUNT_SID="your_sid"
VITE_TWILIO_AUTH_TOKEN="your_token"
