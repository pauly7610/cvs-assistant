# CVS Care Companion

A mobile-first, healthcare-safe conversational assistant built with Next.js 14, featuring hybrid AI (structured workflows + LLM), Clerk authentication, and Supabase persistence.

![CVS Care Companion](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## 🚀 Live Demo

[https://cvs-assistant.vercel.app](https://cvs-assistant.vercel.app)

## ✨ Features

### Core Functionality
- **Prescription Status** - Check medication readiness with notification opt-in
- **Refill Requests** - Request prescription refills
- **Symptom Intake** - Multi-turn flow with MinuteClinic booking
- **Appointment Booking** - Browse and book MinuteClinic slots
- **Pharmacist Escalation** - Request callback from a CVS pharmacist

### AI & Safety
- **Hybrid AI Router** - Structured workflows for critical paths, LLM for general queries
- **Intent Classification** - 12+ intent types with pattern matching
- **Emergency Detection** - Immediate escalation for safety keywords
- **Personalized Responses** - LLM uses health context (conditions, allergies, medications)

### Health Tracking (Database-ready)
- Symptom logging
- Vital signs tracking
- Medication adherence
- Appointment history

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Animations** | Framer Motion |
| **Auth** | Clerk |
| **Database** | Supabase (Postgres + pgvector) |
| **LLM** | OpenAI GPT-4o-mini |
| **Deployment** | Vercel |

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- Clerk account
- Supabase project
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pauly7610/cvs-assistant.git
cd cvs-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your keys to `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_service_role_key
OPENAI_API_KEY=sk-...
```

5. Run database migrations (in Supabase SQL Editor):
```sql
-- Run in order:
-- 1. supabase/schema.sql
-- 2. supabase/expanded-schema.sql
-- 3. supabase/notifications-schema.sql
-- 4. supabase/rag-schema.sql (optional, requires pgvector)
```

6. Start the dev server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/           # Chat API with auth + LLM routing
│   │   └── notifications/  # Prescription notification API
│   ├── sign-in/            # Clerk sign-in page
│   ├── sign-up/            # Clerk sign-up page
│   └── page.tsx            # Main chat interface
├── components/
│   ├── chat/               # Chat UI components
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── db/                 # Supabase database functions
│   ├── llm/                # OpenAI + hybrid router
│   ├── rag/                # RAG retriever (pgvector)
│   ├── intent-classifier.ts
│   └── response-handler.ts
└── types/
    └── index.ts            # TypeScript interfaces
```

## 🧠 Intent Classification

| Intent | Description |
|--------|-------------|
| `prescription_status` | Check medication readiness |
| `refill_request` | Request prescription refill |
| `symptom_intake` | Report symptoms (multi-turn) |
| `book_appointment` | MinuteClinic scheduling |
| `medication_info` | Medication questions |
| `log_symptom` | Track symptoms |
| `log_vital` | Record vitals |
| `adherence_check` | Medication adherence |
| `health_summary` | Health profile overview |
| `emergency` | Safety escalation |

## 🔒 Safety Rules

- ❌ NO diagnosis
- ❌ NO dosage changes
- ❌ NO new prescriptions
- ✅ Emergency keywords → immediate escalation
- ✅ Uncertain queries → human handoff

## 📄 License

MIT
