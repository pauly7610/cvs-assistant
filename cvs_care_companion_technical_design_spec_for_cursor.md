# CVS Care Companion
## Technical + Design Specification (Cursor-Optimized)

> **Purpose**: This document is designed to be handed directly to Cursor (or similar AI coding tools) to generate a visually polished, production-ready prototype of the CVS Care Companion. It prioritizes **clean UI**, **modern tooling**, **intelligent system behavior**, and **safe-by-design AI patterns**.

---

## 1. Product Intent (TL;DR for Cursor)

Build a **mobile-first, healthcare-safe conversational assistant** that:
- Helps users manage prescriptions, care navigation, and adherence
- Uses **hybrid AI** (structured workflows + LLM)
- Looks clean, trustworthy, and CVS-branded
- Defaults to **safety, escalation, and explainability**

This is **not** a chatbot demo. It is a **care workflow product**.

---

## 2. Tech Stack (Modern, Simple, Proven)

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: React Server Components + minimal client state
- **Animations**: Framer Motion (subtle, purposeful)
- **Icons**: Lucide

### Backend
- **API Layer**: Next.js Route Handlers
- **Auth**: Clerk (mock patient profiles)
- **Database**: Supabase (Postgres + Row Level Security)
- **Vector Store**: Supabase pgvector

### AI / LLM
- **LLM**: OpenAI GPT‑4.1 or Claude 3.5 Sonnet
- **Embeddings**: OpenAI text-embedding-3-large
- **Orchestration**: Lightweight internal router (no LangChain overkill)

### Safety & Evaluation
- **Prompt Versioning**: Git-based
- **Eval Sampling**: 1% conversation logging (mocked)
- **Guardrails**: Explicit system rules + intent gating

---

## 3. System Architecture (Conceptual)

User → UI Chat Surface
→ Intent Classifier
→ Decision Router
→ (A) Structured Workflow OR (B) RAG + LLM
→ Safety Filter
→ Response Renderer
→ Optional Human Escalation

**Rule**: Clinical, prescription, or risk-bearing flows MUST go through structured logic first.

---

## 4. Core Screens & Visual Design

### Design Principles
- Calm, clinical, human
- No “chatbot gimmicks”
- High contrast, accessible, readable

### Brand Tokens
- Primary: CVS Red `#CC0000`
- Background: `#FFFFFF`
- Surface: `#F8F9FA`
- Text Primary: `#111827`
- Success: `#15803D`
- Warning: `#B45309`

### Typography
- Font: Inter
- Headings: Semi-bold
- Body: Regular

---

## 5. UI Components (Cursor should generate these explicitly)

### Chat Layout
- Sticky header: "CVS Care Companion"
- Message bubbles:
  - Assistant: left, white card
  - User: right, light gray
- Inline cards for:
  - Prescription status
  - Appointment slots
  - Safety warnings

### Assistant Message Card
- Title
- Key info (bold)
- Optional CTA buttons

Example CTA buttons:
- “Notify me when ready”
- “Talk to a pharmacist”
- “Book MinuteClinic visit”

---

## 6. Intelligent Behavior Rules (Critical)

### Intent Classification (Required)
Cursor should implement a simple classifier that maps input to:
- Prescription Status
- Refill Request
- Symptom Intake
- OTC Question
- General Health Question
- Unknown → Clarify

### AI vs Human Authority (Hard Rules)
- NO diagnosis
- NO dosage changes
- NO new prescriptions
- Emergency keywords → escalation only

Emergency keywords list (starter):
- chest pain
- trouble breathing
- stroke
- severe bleeding

---

## 7. Prompting Strategy (Cursor must follow this)

### System Prompt (Global)
“You are CVS Care Companion, a healthcare support assistant. You provide information and workflow support, not diagnoses or medical decisions. When uncertain, escalate to a human. Safety overrides helpfulness.”

### Retrieval Prompt Pattern
- Cite source
- Use neutral language
- Avoid absolutes

### Refusal Pattern
- Empathetic
- Clear
- Redirect to human

---

## 8. Example Intelligent Flows

### Prescription Status Flow
1. Identify Rx name + location
2. Fetch mocked API result
3. Render status card
4. Offer notification CTA

### Symptom Intake Flow
1. Ask duration
2. Ask severity
3. If red flag → escalate
4. Else → MinuteClinic suggestion

---

## 9. Data Models (Simplified)

### Conversation
- id
- user_id
- intent
- messages[]
- escalated (boolean)

### Prescription (Mock)
- name
- dosage
- status
- ready_time

---

## 10. What Cursor Should Build First (Explicit Instructions)

1. Clean chat UI with shadcn components
2. Intent router (simple rules-based)
3. Prescription status mock flow
4. Safety escalation modal
5. Visually polished cards

**Do NOT**:
- Over-engineer
- Add unnecessary libraries
- Generate placeholder lorem UI

---

## 11. Definition of “Looks Good”

- Consistent spacing
- Rounded cards (8–12px)
- Subtle shadows
- Clear hierarchy
- Feels like a real CVS app

---

## 12. Success Criteria

If a recruiter or stakeholder opens this prototype, they should say:
> “This feels like something CVS could actually ship.”

---

END OF SPEC

