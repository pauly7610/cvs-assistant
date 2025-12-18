# CVS Care Companion

A mobile-first, healthcare-safe conversational assistant built with Next.js 14, Tailwind CSS, and shadcn/ui.

## Features

- **Prescription Status** - Check if medications are ready for pickup
- **Refill Requests** - Request prescription refills
- **Symptom Intake** - Get guidance and MinuteClinic booking
- **Safety Escalation** - Emergency keyword detection with immediate escalation
- **Clean, CVS-branded UI** - Calm, clinical, and accessible design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles with CVS brand tokens
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main chat page
├── components/
│   ├── chat/            # Chat-specific components
│   │   ├── chat-container.tsx
│   │   ├── chat-header.tsx
│   │   ├── chat-input.tsx
│   │   ├── chat-message.tsx
│   │   ├── emergency-modal.tsx
│   │   └── message-card.tsx
│   └── ui/              # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── lib/
│   ├── intent-classifier.ts  # Rules-based intent detection
│   ├── mock-data.ts          # Mock prescription data
│   ├── response-handler.ts   # Response generation logic
│   └── utils.ts              # Utility functions
└── types/
    └── index.ts         # TypeScript type definitions
```

## Intelligent Behavior

The assistant uses a rules-based intent classifier that maps user input to:

- **Prescription Status** - Queries about medication readiness
- **Refill Request** - Requests to renew prescriptions
- **Symptom Intake** - Health-related symptoms
- **OTC Question** - Over-the-counter medication questions
- **General Health** - General wellness questions
- **Emergency** - Detected emergency keywords trigger immediate escalation

### Safety Rules

- NO diagnosis
- NO dosage changes
- NO new prescriptions
- Emergency keywords → immediate escalation modal
