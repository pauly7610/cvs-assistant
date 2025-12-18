-- CVS Care Companion - Seed Data (5x expansion)
-- Run after all schema files

-- ============================================
-- MEDICATIONS (15 entries - 5x from 3)
-- ============================================
INSERT INTO medications (id, user_id, name, dosage, frequency, instructions, prescriber, pharmacy, refills_remaining, is_active) VALUES
-- Original 3
('rx-001', 'user_demo', 'Lisinopril', '10mg', 'Once daily', 'Take in the morning with water', 'Dr. Michael Rodriguez', 'CVS Pharmacy #4521 - Main Street', 3, true),
('rx-002', 'user_demo', 'Metformin', '500mg', 'Twice daily', 'Take with meals', 'Dr. Sarah Chen', 'CVS Pharmacy #4521 - Main Street', 2, true),
('rx-003', 'user_demo', 'Atorvastatin', '20mg', 'Once daily', 'Take at bedtime', 'Dr. Michael Rodriguez', 'CVS Pharmacy #4521 - Main Street', 5, true),
-- Expanded 12 more
('rx-004', 'user_demo', 'Amlodipine', '5mg', 'Once daily', 'Take in the morning', 'Dr. Sarah Chen', 'CVS Pharmacy #4521 - Main Street', 4, true),
('rx-005', 'user_demo', 'Omeprazole', '20mg', 'Once daily', 'Take 30 minutes before breakfast', 'Dr. James Wilson', 'CVS Pharmacy #4521 - Main Street', 2, true),
('rx-006', 'user_demo', 'Levothyroxine', '50mcg', 'Once daily', 'Take on empty stomach, 30-60 min before breakfast', 'Dr. Emily Park', 'CVS Pharmacy #8832 - Oak Avenue', 6, true),
('rx-007', 'user_demo', 'Gabapentin', '300mg', 'Three times daily', 'May cause drowsiness', 'Dr. Michael Rodriguez', 'CVS Pharmacy #4521 - Main Street', 1, true),
('rx-008', 'user_demo', 'Hydrochlorothiazide', '25mg', 'Once daily', 'Take in the morning to avoid nighttime urination', 'Dr. Sarah Chen', 'CVS Pharmacy #4521 - Main Street', 3, true),
('rx-009', 'user_demo', 'Sertraline', '50mg', 'Once daily', 'Take in the morning with food', 'Dr. Lisa Thompson', 'CVS Pharmacy #8832 - Oak Avenue', 2, true),
('rx-010', 'user_demo', 'Losartan', '50mg', 'Once daily', 'Monitor blood pressure regularly', 'Dr. Michael Rodriguez', 'CVS Pharmacy #4521 - Main Street', 4, true),
('rx-011', 'user_demo', 'Albuterol Inhaler', '90mcg', 'As needed', '2 puffs every 4-6 hours as needed for breathing', 'Dr. Emily Park', 'CVS Pharmacy #4521 - Main Street', 2, true),
('rx-012', 'user_demo', 'Pantoprazole', '40mg', 'Once daily', 'Take before breakfast', 'Dr. James Wilson', 'CVS Pharmacy #8832 - Oak Avenue', 3, true),
('rx-013', 'user_demo', 'Montelukast', '10mg', 'Once daily', 'Take in the evening', 'Dr. Emily Park', 'CVS Pharmacy #4521 - Main Street', 5, true),
('rx-014', 'user_demo', 'Escitalopram', '10mg', 'Once daily', 'Take at the same time each day', 'Dr. Lisa Thompson', 'CVS Pharmacy #8832 - Oak Avenue', 4, true),
('rx-015', 'user_demo', 'Prednisone', '10mg', '5-day taper', 'Follow taper schedule, take with food', 'Dr. Sarah Chen', 'CVS Pharmacy #4521 - Main Street', 0, true);

-- ============================================
-- HEALTH CONDITIONS (20 entries)
-- ============================================
INSERT INTO health_conditions (id, user_id, condition_name, diagnosed_date, status, notes) VALUES
('cond-001', 'user_demo', 'Hypertension', '2020-03-15', 'managed', 'Well controlled with medication'),
('cond-002', 'user_demo', 'Type 2 Diabetes', '2019-08-22', 'managed', 'A1C at target with metformin'),
('cond-003', 'user_demo', 'High Cholesterol', '2021-01-10', 'managed', 'LDL improved with statin therapy'),
('cond-004', 'user_demo', 'Seasonal Allergies', '2015-05-01', 'active', 'Worse in spring and fall'),
('cond-005', 'user_demo', 'GERD', '2022-06-18', 'managed', 'Controlled with PPI'),
('cond-006', 'user_demo', 'Hypothyroidism', '2018-11-30', 'managed', 'TSH levels stable'),
('cond-007', 'user_demo', 'Mild Asthma', '2016-04-12', 'managed', 'Uses rescue inhaler as needed'),
('cond-008', 'user_demo', 'Anxiety', '2021-09-05', 'managed', 'Responds well to SSRI'),
('cond-009', 'user_demo', 'Osteoarthritis', '2022-02-28', 'active', 'Knee pain, managed with OTC'),
('cond-010', 'user_demo', 'Vitamin D Deficiency', '2023-01-15', 'managed', 'On supplementation'),
('cond-011', 'user_demo2', 'Hypertension', '2019-07-20', 'managed', 'Controlled with losartan'),
('cond-012', 'user_demo2', 'Migraines', '2017-03-10', 'active', 'Episodic, 2-3 per month'),
('cond-013', 'user_demo2', 'Insomnia', '2022-11-08', 'active', 'Sleep hygiene improvements ongoing'),
('cond-014', 'user_demo2', 'Prediabetes', '2023-04-22', 'active', 'Lifestyle modifications in progress'),
('cond-015', 'user_demo2', 'Back Pain', '2020-09-14', 'managed', 'Chronic lower back, physical therapy'),
('cond-016', 'user_demo3', 'Asthma', '2010-06-01', 'managed', 'Well controlled with daily inhaler'),
('cond-017', 'user_demo3', 'Eczema', '2015-12-20', 'active', 'Flares in winter'),
('cond-018', 'user_demo3', 'Depression', '2021-02-14', 'managed', 'Stable on current regimen'),
('cond-019', 'user_demo3', 'IBS', '2019-08-30', 'active', 'Dietary management'),
('cond-020', 'user_demo3', 'Anemia', '2022-07-11', 'managed', 'Iron supplementation');

-- ============================================
-- ALLERGIES (25 entries)
-- ============================================
INSERT INTO allergies (id, user_id, allergen, severity, reaction) VALUES
('allergy-001', 'user_demo', 'Penicillin', 'severe', 'Anaphylaxis - requires EpiPen'),
('allergy-002', 'user_demo', 'Sulfa drugs', 'moderate', 'Skin rash and hives'),
('allergy-003', 'user_demo', 'Shellfish', 'moderate', 'Swelling and difficulty breathing'),
('allergy-004', 'user_demo', 'Latex', 'mild', 'Contact dermatitis'),
('allergy-005', 'user_demo', 'Aspirin', 'moderate', 'Stomach upset and hives'),
('allergy-006', 'user_demo2', 'Codeine', 'moderate', 'Severe nausea and vomiting'),
('allergy-007', 'user_demo2', 'Ibuprofen', 'mild', 'Stomach irritation'),
('allergy-008', 'user_demo2', 'Peanuts', 'severe', 'Anaphylaxis'),
('allergy-009', 'user_demo2', 'Amoxicillin', 'moderate', 'Full body rash'),
('allergy-010', 'user_demo2', 'Bee stings', 'severe', 'Anaphylaxis - carries EpiPen'),
('allergy-011', 'user_demo3', 'Erythromycin', 'mild', 'GI upset'),
('allergy-012', 'user_demo3', 'Eggs', 'moderate', 'Hives and swelling'),
('allergy-013', 'user_demo3', 'Morphine', 'moderate', 'Severe itching and confusion'),
('allergy-014', 'user_demo3', 'Dust mites', 'mild', 'Nasal congestion and sneezing'),
('allergy-015', 'user_demo3', 'Contrast dye', 'moderate', 'Requires pre-medication'),
('allergy-016', 'user_demo4', 'Tetracycline', 'mild', 'Photosensitivity'),
('allergy-017', 'user_demo4', 'Tree nuts', 'severe', 'Throat swelling'),
('allergy-018', 'user_demo4', 'NSAIDs', 'moderate', 'Asthma exacerbation'),
('allergy-019', 'user_demo4', 'Adhesive tape', 'mild', 'Skin irritation'),
('allergy-020', 'user_demo4', 'Fluoroquinolones', 'moderate', 'Tendon pain'),
('allergy-021', 'user_demo5', 'Metformin', 'mild', 'GI intolerance'),
('allergy-022', 'user_demo5', 'Dairy', 'moderate', 'Lactose intolerance symptoms'),
('allergy-023', 'user_demo5', 'Cephalosporins', 'moderate', 'Cross-reactivity with penicillin'),
('allergy-024', 'user_demo5', 'Nickel', 'mild', 'Contact dermatitis'),
('allergy-025', 'user_demo5', 'Tramadol', 'moderate', 'Seizure risk');

-- ============================================
-- SYMPTOM LOGS (50 entries)
-- ============================================
INSERT INTO symptom_logs (id, user_id, symptom, severity, duration, notes, logged_at) VALUES
('sym-001', 'user_demo', 'Headache', 5, '2 hours', 'Started after lunch, tension-type', NOW() - INTERVAL '1 day'),
('sym-002', 'user_demo', 'Fatigue', 6, '3 days', 'Feeling tired despite adequate sleep', NOW() - INTERVAL '2 days'),
('sym-003', 'user_demo', 'Cough', 4, '1 week', 'Dry cough, worse at night', NOW() - INTERVAL '3 days'),
('sym-004', 'user_demo', 'Joint pain', 5, '2 weeks', 'Knee stiffness in morning', NOW() - INTERVAL '5 days'),
('sym-005', 'user_demo', 'Heartburn', 4, '1 day', 'After eating spicy food', NOW() - INTERVAL '1 day'),
('sym-006', 'user_demo', 'Dizziness', 3, '30 minutes', 'When standing up quickly', NOW() - INTERVAL '4 days'),
('sym-007', 'user_demo', 'Sore throat', 5, '2 days', 'Scratchy feeling, no fever', NOW() - INTERVAL '6 days'),
('sym-008', 'user_demo', 'Back pain', 6, '1 week', 'Lower back, worse with sitting', NOW() - INTERVAL '7 days'),
('sym-009', 'user_demo', 'Nausea', 4, '4 hours', 'After taking medication', NOW() - INTERVAL '8 days'),
('sym-010', 'user_demo', 'Insomnia', 5, '4 days', 'Difficulty falling asleep', NOW() - INTERVAL '2 days'),
('sym-011', 'user_demo2', 'Migraine', 8, '6 hours', 'With aura and light sensitivity', NOW() - INTERVAL '1 day'),
('sym-012', 'user_demo2', 'Congestion', 4, '3 days', 'Stuffy nose, seasonal allergies', NOW() - INTERVAL '3 days'),
('sym-013', 'user_demo2', 'Muscle aches', 5, '2 days', 'After exercise', NOW() - INTERVAL '4 days'),
('sym-014', 'user_demo2', 'Anxiety', 6, '1 week', 'Work-related stress', NOW() - INTERVAL '5 days'),
('sym-015', 'user_demo2', 'Stomach cramps', 5, '3 hours', 'After eating dairy', NOW() - INTERVAL '2 days'),
('sym-016', 'user_demo2', 'Shortness of breath', 4, '10 minutes', 'During exercise', NOW() - INTERVAL '6 days'),
('sym-017', 'user_demo2', 'Rash', 3, '2 days', 'On forearms, slightly itchy', NOW() - INTERVAL '7 days'),
('sym-018', 'user_demo2', 'Eye strain', 4, '1 day', 'From screen time', NOW() - INTERVAL '1 day'),
('sym-019', 'user_demo2', 'Neck stiffness', 5, '3 days', 'From sleeping wrong', NOW() - INTERVAL '3 days'),
('sym-020', 'user_demo2', 'Bloating', 4, '6 hours', 'After large meal', NOW() - INTERVAL '2 days'),
('sym-021', 'user_demo3', 'Wheezing', 5, '2 hours', 'Triggered by cold air', NOW() - INTERVAL '1 day'),
('sym-022', 'user_demo3', 'Dry skin', 3, '1 week', 'Winter dryness', NOW() - INTERVAL '4 days'),
('sym-023', 'user_demo3', 'Mood changes', 5, '5 days', 'Feeling low energy', NOW() - INTERVAL '5 days'),
('sym-024', 'user_demo3', 'Constipation', 4, '3 days', 'Less fiber intake', NOW() - INTERVAL '3 days'),
('sym-025', 'user_demo3', 'Hot flashes', 5, '15 minutes', 'Several times daily', NOW() - INTERVAL '2 days'),
('sym-026', 'user_demo3', 'Tingling', 3, '1 hour', 'In fingers, occasional', NOW() - INTERVAL '6 days'),
('sym-027', 'user_demo3', 'Loss of appetite', 4, '2 days', 'Not feeling hungry', NOW() - INTERVAL '7 days'),
('sym-028', 'user_demo3', 'Ear pain', 5, '1 day', 'Right ear, feels blocked', NOW() - INTERVAL '1 day'),
('sym-029', 'user_demo3', 'Leg cramps', 6, '5 minutes', 'At night, calf muscle', NOW() - INTERVAL '4 days'),
('sym-030', 'user_demo3', 'Sneezing', 3, '4 hours', 'Allergy season', NOW() - INTERVAL '2 days'),
('sym-031', 'user_demo', 'Chest tightness', 4, '30 minutes', 'Resolved with rest', NOW() - INTERVAL '10 days'),
('sym-032', 'user_demo', 'Swollen ankles', 3, '2 days', 'Mild, end of day', NOW() - INTERVAL '12 days'),
('sym-033', 'user_demo', 'Frequent urination', 4, '3 days', 'More than usual', NOW() - INTERVAL '14 days'),
('sym-034', 'user_demo', 'Dry mouth', 3, '1 week', 'Side effect of medication', NOW() - INTERVAL '9 days'),
('sym-035', 'user_demo', 'Weight gain', 4, '2 weeks', '3 pounds increase', NOW() - INTERVAL '15 days'),
('sym-036', 'user_demo2', 'Hair loss', 3, '1 month', 'Noticed more shedding', NOW() - INTERVAL '20 days'),
('sym-037', 'user_demo2', 'Bruising easily', 4, '2 weeks', 'Minor bumps cause bruises', NOW() - INTERVAL '18 days'),
('sym-038', 'user_demo2', 'Cold hands', 3, '1 month', 'Even in warm weather', NOW() - INTERVAL '25 days'),
('sym-039', 'user_demo2', 'Memory issues', 4, '2 weeks', 'Forgetting small things', NOW() - INTERVAL '16 days'),
('sym-040', 'user_demo2', 'Night sweats', 5, '1 week', 'Waking up damp', NOW() - INTERVAL '8 days'),
('sym-041', 'user_demo3', 'Jaw pain', 4, '3 days', 'TMJ-related', NOW() - INTERVAL '9 days'),
('sym-042', 'user_demo3', 'Palpitations', 5, '10 minutes', 'Occasional, with caffeine', NOW() - INTERVAL '11 days'),
('sym-043', 'user_demo3', 'Acne', 3, '2 weeks', 'Hormonal breakout', NOW() - INTERVAL '13 days'),
('sym-044', 'user_demo3', 'Foot pain', 5, '1 week', 'Plantar fasciitis', NOW() - INTERVAL '17 days'),
('sym-045', 'user_demo3', 'Sensitivity to light', 4, '2 days', 'With headache', NOW() - INTERVAL '19 days'),
('sym-046', 'user_demo', 'Runny nose', 3, '4 days', 'Clear discharge', NOW() - INTERVAL '21 days'),
('sym-047', 'user_demo', 'Weakness', 5, '2 days', 'General fatigue', NOW() - INTERVAL '22 days'),
('sym-048', 'user_demo2', 'Itchy eyes', 3, '1 week', 'Allergies', NOW() - INTERVAL '23 days'),
('sym-049', 'user_demo2', 'Indigestion', 4, '4 hours', 'Heavy meal', NOW() - INTERVAL '24 days'),
('sym-050', 'user_demo3', 'Stiff joints', 5, '1 week', 'Morning stiffness', NOW() - INTERVAL '26 days');

-- ============================================
-- VITALS (60 entries)
-- ============================================
INSERT INTO vitals (id, user_id, type, value, unit, notes, measured_at) VALUES
-- Blood Pressure readings
('vital-001', 'user_demo', 'blood_pressure', '{"systolic": 128, "diastolic": 82}', 'mmHg', 'Morning reading', NOW() - INTERVAL '1 day'),
('vital-002', 'user_demo', 'blood_pressure', '{"systolic": 132, "diastolic": 85}', 'mmHg', 'After work', NOW() - INTERVAL '2 days'),
('vital-003', 'user_demo', 'blood_pressure', '{"systolic": 125, "diastolic": 80}', 'mmHg', 'Relaxed state', NOW() - INTERVAL '3 days'),
('vital-004', 'user_demo', 'blood_pressure', '{"systolic": 135, "diastolic": 88}', 'mmHg', 'Slightly elevated', NOW() - INTERVAL '4 days'),
('vital-005', 'user_demo', 'blood_pressure', '{"systolic": 122, "diastolic": 78}', 'mmHg', 'Good reading', NOW() - INTERVAL '5 days'),
('vital-006', 'user_demo', 'blood_pressure', '{"systolic": 130, "diastolic": 84}', 'mmHg', 'Morning', NOW() - INTERVAL '6 days'),
('vital-007', 'user_demo', 'blood_pressure', '{"systolic": 127, "diastolic": 81}', 'mmHg', 'Before medication', NOW() - INTERVAL '7 days'),
('vital-008', 'user_demo2', 'blood_pressure', '{"systolic": 145, "diastolic": 92}', 'mmHg', 'Need to monitor', NOW() - INTERVAL '1 day'),
('vital-009', 'user_demo2', 'blood_pressure', '{"systolic": 140, "diastolic": 90}', 'mmHg', 'Slightly high', NOW() - INTERVAL '2 days'),
('vital-010', 'user_demo2', 'blood_pressure', '{"systolic": 138, "diastolic": 88}', 'mmHg', 'Improving', NOW() - INTERVAL '3 days'),
-- Weight readings
('vital-011', 'user_demo', 'weight', '{"value": 185}', 'lbs', 'Morning weight', NOW() - INTERVAL '1 day'),
('vital-012', 'user_demo', 'weight', '{"value": 184}', 'lbs', 'After exercise', NOW() - INTERVAL '3 days'),
('vital-013', 'user_demo', 'weight', '{"value": 186}', 'lbs', 'Weekend', NOW() - INTERVAL '5 days'),
('vital-014', 'user_demo', 'weight', '{"value": 185}', 'lbs', 'Stable', NOW() - INTERVAL '7 days'),
('vital-015', 'user_demo', 'weight', '{"value": 183}', 'lbs', 'Good progress', NOW() - INTERVAL '10 days'),
('vital-016', 'user_demo2', 'weight', '{"value": 165}', 'lbs', 'Morning', NOW() - INTERVAL '1 day'),
('vital-017', 'user_demo2', 'weight', '{"value": 166}', 'lbs', 'After meals', NOW() - INTERVAL '4 days'),
('vital-018', 'user_demo3', 'weight', '{"value": 142}', 'lbs', 'Weekly check', NOW() - INTERVAL '1 day'),
('vital-019', 'user_demo3', 'weight', '{"value": 143}', 'lbs', 'Slight increase', NOW() - INTERVAL '7 days'),
('vital-020', 'user_demo3', 'weight', '{"value": 141}', 'lbs', 'Goal weight', NOW() - INTERVAL '14 days'),
-- Glucose readings
('vital-021', 'user_demo', 'glucose', '{"value": 105}', 'mg/dL', 'Fasting glucose', NOW() - INTERVAL '1 day'),
('vital-022', 'user_demo', 'glucose', '{"value": 142}', 'mg/dL', '2 hours after meal', NOW() - INTERVAL '1 day'),
('vital-023', 'user_demo', 'glucose', '{"value": 98}', 'mg/dL', 'Fasting', NOW() - INTERVAL '2 days'),
('vital-024', 'user_demo', 'glucose', '{"value": 155}', 'mg/dL', 'Post-lunch', NOW() - INTERVAL '2 days'),
('vital-025', 'user_demo', 'glucose', '{"value": 102}', 'mg/dL', 'Morning', NOW() - INTERVAL '3 days'),
('vital-026', 'user_demo', 'glucose', '{"value": 95}', 'mg/dL', 'Fasting - good', NOW() - INTERVAL '4 days'),
('vital-027', 'user_demo', 'glucose', '{"value": 110}', 'mg/dL', 'Slightly elevated', NOW() - INTERVAL '5 days'),
('vital-028', 'user_demo2', 'glucose', '{"value": 118}', 'mg/dL', 'Fasting - prediabetes', NOW() - INTERVAL '1 day'),
('vital-029', 'user_demo2', 'glucose', '{"value": 165}', 'mg/dL', 'After carb-heavy meal', NOW() - INTERVAL '2 days'),
('vital-030', 'user_demo2', 'glucose', '{"value": 112}', 'mg/dL', 'Fasting', NOW() - INTERVAL '3 days'),
-- Heart rate readings
('vital-031', 'user_demo', 'heart_rate', '{"value": 72}', 'bpm', 'Resting', NOW() - INTERVAL '1 day'),
('vital-032', 'user_demo', 'heart_rate', '{"value": 68}', 'bpm', 'Morning', NOW() - INTERVAL '2 days'),
('vital-033', 'user_demo', 'heart_rate', '{"value": 85}', 'bpm', 'After walking', NOW() - INTERVAL '3 days'),
('vital-034', 'user_demo', 'heart_rate', '{"value": 110}', 'bpm', 'After exercise', NOW() - INTERVAL '4 days'),
('vital-035', 'user_demo', 'heart_rate', '{"value": 70}', 'bpm', 'Resting', NOW() - INTERVAL '5 days'),
('vital-036', 'user_demo2', 'heart_rate', '{"value": 78}', 'bpm', 'Slightly elevated', NOW() - INTERVAL '1 day'),
('vital-037', 'user_demo2', 'heart_rate', '{"value": 65}', 'bpm', 'Good resting rate', NOW() - INTERVAL '2 days'),
('vital-038', 'user_demo3', 'heart_rate', '{"value": 62}', 'bpm', 'Athletic', NOW() - INTERVAL '1 day'),
('vital-039', 'user_demo3', 'heart_rate', '{"value": 130}', 'bpm', 'During workout', NOW() - INTERVAL '2 days'),
('vital-040', 'user_demo3', 'heart_rate', '{"value": 60}', 'bpm', 'Morning resting', NOW() - INTERVAL '3 days'),
-- Temperature readings
('vital-041', 'user_demo', 'temperature', '{"value": 98.6}', '°F', 'Normal', NOW() - INTERVAL '1 day'),
('vital-042', 'user_demo', 'temperature', '{"value": 99.2}', '°F', 'Slightly elevated', NOW() - INTERVAL '5 days'),
('vital-043', 'user_demo2', 'temperature', '{"value": 98.4}', '°F', 'Normal', NOW() - INTERVAL '1 day'),
('vital-044', 'user_demo2', 'temperature', '{"value": 100.4}', '°F', 'Low-grade fever', NOW() - INTERVAL '10 days'),
('vital-045', 'user_demo3', 'temperature', '{"value": 98.2}', '°F', 'Normal', NOW() - INTERVAL '1 day'),
-- Oxygen readings
('vital-046', 'user_demo', 'oxygen', '{"value": 98}', '%', 'Normal SpO2', NOW() - INTERVAL '1 day'),
('vital-047', 'user_demo', 'oxygen', '{"value": 97}', '%', 'Good', NOW() - INTERVAL '3 days'),
('vital-048', 'user_demo2', 'oxygen', '{"value": 96}', '%', 'Acceptable', NOW() - INTERVAL '1 day'),
('vital-049', 'user_demo3', 'oxygen', '{"value": 99}', '%', 'Excellent', NOW() - INTERVAL '1 day'),
('vital-050', 'user_demo3', 'oxygen', '{"value": 95}', '%', 'During asthma flare', NOW() - INTERVAL '8 days'),
-- More blood pressure
('vital-051', 'user_demo', 'blood_pressure', '{"systolic": 124, "diastolic": 79}', 'mmHg', 'Excellent', NOW() - INTERVAL '8 days'),
('vital-052', 'user_demo', 'blood_pressure', '{"systolic": 129, "diastolic": 83}', 'mmHg', 'Normal', NOW() - INTERVAL '9 days'),
('vital-053', 'user_demo', 'blood_pressure', '{"systolic": 131, "diastolic": 86}', 'mmHg', 'Borderline', NOW() - INTERVAL '10 days'),
('vital-054', 'user_demo2', 'blood_pressure', '{"systolic": 142, "diastolic": 91}', 'mmHg', 'High', NOW() - INTERVAL '4 days'),
('vital-055', 'user_demo2', 'blood_pressure', '{"systolic": 136, "diastolic": 87}', 'mmHg', 'Improving', NOW() - INTERVAL '5 days'),
('vital-056', 'user_demo3', 'blood_pressure', '{"systolic": 118, "diastolic": 76}', 'mmHg', 'Optimal', NOW() - INTERVAL '1 day'),
('vital-057', 'user_demo3', 'blood_pressure', '{"systolic": 120, "diastolic": 78}', 'mmHg', 'Normal', NOW() - INTERVAL '3 days'),
('vital-058', 'user_demo3', 'blood_pressure', '{"systolic": 116, "diastolic": 74}', 'mmHg', 'Great', NOW() - INTERVAL '5 days'),
('vital-059', 'user_demo', 'glucose', '{"value": 108}', 'mg/dL', 'Pre-meal', NOW() - INTERVAL '6 days'),
('vital-060', 'user_demo', 'glucose', '{"value": 92}', 'mg/dL', 'Best reading', NOW() - INTERVAL '7 days');

-- ============================================
-- APPOINTMENTS (20 entries)
-- ============================================
INSERT INTO appointments (id, user_id, location, location_address, appointment_type, provider, scheduled_at, duration_minutes, status, notes) VALUES
('apt-001', 'user_demo', 'CVS MinuteClinic - Main Street', '123 Main Street, Boston, MA 02101', 'Wellness Visit', 'NP Sarah Johnson', NOW() + INTERVAL '2 days', 30, 'scheduled', 'Annual checkup'),
('apt-002', 'user_demo', 'CVS MinuteClinic - Oak Avenue', '456 Oak Avenue, Boston, MA 02102', 'Flu Shot', 'Available', NOW() + INTERVAL '1 day', 15, 'scheduled', 'Seasonal flu vaccination'),
('apt-003', 'user_demo', 'CVS MinuteClinic - Main Street', '123 Main Street, Boston, MA 02101', 'Blood Pressure Check', 'Available', NOW() + INTERVAL '5 days', 15, 'scheduled', 'Routine monitoring'),
('apt-004', 'user_demo', 'CVS MinuteClinic - Park Plaza', '789 Park Plaza, Boston, MA 02103', 'Diabetes Screening', 'NP Michael Brown', NOW() + INTERVAL '1 week', 30, 'scheduled', 'A1C test'),
('apt-005', 'user_demo', 'CVS MinuteClinic - Main Street', '123 Main Street, Boston, MA 02101', 'Skin Condition', 'NP Sarah Johnson', NOW() - INTERVAL '2 weeks', 20, 'completed', 'Rash evaluation'),
('apt-006', 'user_demo', 'CVS MinuteClinic - Oak Avenue', '456 Oak Avenue, Boston, MA 02102', 'Strep Test', 'NP Lisa Chen', NOW() - INTERVAL '1 month', 15, 'completed', 'Negative result'),
('apt-007', 'user_demo', 'CVS MinuteClinic - Main Street', '123 Main Street, Boston, MA 02101', 'COVID Test', 'Available', NOW() - INTERVAL '3 months', 15, 'completed', 'Negative'),
('apt-008', 'user_demo2', 'CVS MinuteClinic - Downtown', '100 Downtown Crossing, Boston, MA 02108', 'Migraine Consultation', 'NP David Park', NOW() + INTERVAL '3 days', 30, 'scheduled', 'Discuss treatment options'),
('apt-009', 'user_demo2', 'CVS MinuteClinic - Main Street', '123 Main Street, Boston, MA 02101', 'Vaccination', 'Available', NOW() + INTERVAL '1 week', 15, 'scheduled', 'Tdap booster'),
('apt-010', 'user_demo2', 'CVS MinuteClinic - Oak Avenue', '456 Oak Avenue, Boston, MA 02102', 'Physical Exam', 'NP Sarah Johnson', NOW() - INTERVAL '6 months', 45, 'completed', 'Annual physical'),
('apt-011', 'user_demo3', 'CVS MinuteClinic - Park Plaza', '789 Park Plaza, Boston, MA 02103', 'Asthma Follow-up', 'NP Michael Brown', NOW() + INTERVAL '4 days', 20, 'scheduled', 'Inhaler review'),
('apt-012', 'user_demo3', 'CVS MinuteClinic - Main Street', '123 Main Street, Boston, MA 02101', 'Allergy Testing', 'NP Lisa Chen', NOW() + INTERVAL '2 weeks', 45, 'scheduled', 'Seasonal allergies'),
('apt-013', 'user_demo3', 'CVS MinuteClinic - Downtown', '100 Downtown Crossing, Boston, MA 02108', 'Ear Infection', 'NP David Park', NOW() - INTERVAL '1 week', 20, 'completed', 'Prescribed antibiotics'),
('apt-014', 'user_demo', 'CVS MinuteClinic - Oak Avenue', '456 Oak Avenue, Boston, MA 02102', 'Sports Physical', 'Available', NOW() - INTERVAL '2 months', 30, 'completed', 'Cleared for activity'),
('apt-015', 'user_demo', 'CVS MinuteClinic - Main Street', '123 Main Street, Boston, MA 02101', 'UTI Treatment', 'NP Sarah Johnson', NOW() - INTERVAL '5 months', 20, 'completed', 'Antibiotics prescribed'),
('apt-016', 'user_demo2', 'CVS MinuteClinic - Park Plaza', '789 Park Plaza, Boston, MA 02103', 'Mental Health Check', 'NP David Park', NOW() + INTERVAL '10 days', 30, 'scheduled', 'Anxiety management'),
('apt-017', 'user_demo2', 'CVS MinuteClinic - Downtown', '100 Downtown Crossing, Boston, MA 02108', 'Weight Management', 'NP Michael Brown', NOW() - INTERVAL '3 weeks', 30, 'completed', 'Lifestyle counseling'),
('apt-018', 'user_demo3', 'CVS MinuteClinic - Main Street', '123 Main Street, Boston, MA 02101', 'Skin Check', 'NP Lisa Chen', NOW() - INTERVAL '4 months', 20, 'completed', 'Mole examination'),
('apt-019', 'user_demo', 'CVS MinuteClinic - Downtown', '100 Downtown Crossing, Boston, MA 02108', 'Travel Vaccines', 'NP David Park', NOW() + INTERVAL '3 weeks', 30, 'scheduled', 'Hepatitis A & B'),
('apt-020', 'user_demo', 'CVS MinuteClinic - Park Plaza', '789 Park Plaza, Boston, MA 02103', 'Cholesterol Check', 'Available', NOW() - INTERVAL '4 weeks', 15, 'completed', 'Lipid panel');

-- ============================================
-- MEDICATION ADHERENCE (40 entries)
-- ============================================
INSERT INTO medication_adherence (id, medication_id, user_id, scheduled_time, taken_at, status, notes) VALUES
('adh-001', 'rx-001', 'user_demo', NOW() - INTERVAL '1 day' + TIME '08:00', NOW() - INTERVAL '1 day' + TIME '08:15', 'taken', 'Taken with breakfast'),
('adh-002', 'rx-001', 'user_demo', NOW() - INTERVAL '2 days' + TIME '08:00', NOW() - INTERVAL '2 days' + TIME '08:05', 'taken', NULL),
('adh-003', 'rx-001', 'user_demo', NOW() - INTERVAL '3 days' + TIME '08:00', NULL, 'missed', 'Forgot - was traveling'),
('adh-004', 'rx-001', 'user_demo', NOW() - INTERVAL '4 days' + TIME '08:00', NOW() - INTERVAL '4 days' + TIME '08:30', 'taken', 'Late but taken'),
('adh-005', 'rx-001', 'user_demo', NOW() - INTERVAL '5 days' + TIME '08:00', NOW() - INTERVAL '5 days' + TIME '08:00', 'taken', NULL),
('adh-006', 'rx-002', 'user_demo', NOW() - INTERVAL '1 day' + TIME '08:00', NOW() - INTERVAL '1 day' + TIME '08:20', 'taken', 'With breakfast'),
('adh-007', 'rx-002', 'user_demo', NOW() - INTERVAL '1 day' + TIME '18:00', NOW() - INTERVAL '1 day' + TIME '18:30', 'taken', 'With dinner'),
('adh-008', 'rx-002', 'user_demo', NOW() - INTERVAL '2 days' + TIME '08:00', NOW() - INTERVAL '2 days' + TIME '08:10', 'taken', NULL),
('adh-009', 'rx-002', 'user_demo', NOW() - INTERVAL '2 days' + TIME '18:00', NULL, 'skipped', 'Stomach upset'),
('adh-010', 'rx-002', 'user_demo', NOW() - INTERVAL '3 days' + TIME '08:00', NOW() - INTERVAL '3 days' + TIME '08:00', 'taken', NULL),
('adh-011', 'rx-003', 'user_demo', NOW() - INTERVAL '1 day' + TIME '21:00', NOW() - INTERVAL '1 day' + TIME '21:15', 'taken', 'Before bed'),
('adh-012', 'rx-003', 'user_demo', NOW() - INTERVAL '2 days' + TIME '21:00', NOW() - INTERVAL '2 days' + TIME '22:00', 'taken', 'Took late'),
('adh-013', 'rx-003', 'user_demo', NOW() - INTERVAL '3 days' + TIME '21:00', NOW() - INTERVAL '3 days' + TIME '21:00', 'taken', NULL),
('adh-014', 'rx-003', 'user_demo', NOW() - INTERVAL '4 days' + TIME '21:00', NOW() - INTERVAL '4 days' + TIME '21:30', 'taken', NULL),
('adh-015', 'rx-003', 'user_demo', NOW() - INTERVAL '5 days' + TIME '21:00', NULL, 'missed', 'Fell asleep early'),
('adh-016', 'rx-004', 'user_demo', NOW() - INTERVAL '1 day' + TIME '07:00', NOW() - INTERVAL '1 day' + TIME '07:00', 'taken', NULL),
('adh-017', 'rx-004', 'user_demo', NOW() - INTERVAL '2 days' + TIME '07:00', NOW() - INTERVAL '2 days' + TIME '07:15', 'taken', NULL),
('adh-018', 'rx-004', 'user_demo', NOW() - INTERVAL '3 days' + TIME '07:00', NOW() - INTERVAL '3 days' + TIME '07:05', 'taken', NULL),
('adh-019', 'rx-005', 'user_demo', NOW() - INTERVAL '1 day' + TIME '06:30', NOW() - INTERVAL '1 day' + TIME '06:30', 'taken', '30 min before breakfast'),
('adh-020', 'rx-005', 'user_demo', NOW() - INTERVAL '2 days' + TIME '06:30', NOW() - INTERVAL '2 days' + TIME '06:45', 'taken', NULL),
('adh-021', 'rx-006', 'user_demo', NOW() - INTERVAL '1 day' + TIME '06:00', NOW() - INTERVAL '1 day' + TIME '06:00', 'taken', 'Empty stomach'),
('adh-022', 'rx-006', 'user_demo', NOW() - INTERVAL '2 days' + TIME '06:00', NOW() - INTERVAL '2 days' + TIME '06:10', 'taken', NULL),
('adh-023', 'rx-006', 'user_demo', NOW() - INTERVAL '3 days' + TIME '06:00', NOW() - INTERVAL '3 days' + TIME '07:00', 'taken', 'Took with food by mistake'),
('adh-024', 'rx-007', 'user_demo', NOW() - INTERVAL '1 day' + TIME '08:00', NOW() - INTERVAL '1 day' + TIME '08:00', 'taken', NULL),
('adh-025', 'rx-007', 'user_demo', NOW() - INTERVAL '1 day' + TIME '14:00', NOW() - INTERVAL '1 day' + TIME '14:30', 'taken', NULL),
('adh-026', 'rx-007', 'user_demo', NOW() - INTERVAL '1 day' + TIME '20:00', NOW() - INTERVAL '1 day' + TIME '20:00', 'taken', NULL),
('adh-027', 'rx-007', 'user_demo', NOW() - INTERVAL '2 days' + TIME '08:00', NOW() - INTERVAL '2 days' + TIME '08:15', 'taken', NULL),
('adh-028', 'rx-007', 'user_demo', NOW() - INTERVAL '2 days' + TIME '14:00', NULL, 'missed', 'Was in meeting'),
('adh-029', 'rx-007', 'user_demo', NOW() - INTERVAL '2 days' + TIME '20:00', NOW() - INTERVAL '2 days' + TIME '20:00', 'taken', NULL),
('adh-030', 'rx-008', 'user_demo', NOW() - INTERVAL '1 day' + TIME '07:00', NOW() - INTERVAL '1 day' + TIME '07:00', 'taken', NULL),
('adh-031', 'rx-008', 'user_demo', NOW() - INTERVAL '2 days' + TIME '07:00', NOW() - INTERVAL '2 days' + TIME '07:00', 'taken', NULL),
('adh-032', 'rx-009', 'user_demo', NOW() - INTERVAL '1 day' + TIME '08:00', NOW() - INTERVAL '1 day' + TIME '08:00', 'taken', 'With food'),
('adh-033', 'rx-009', 'user_demo', NOW() - INTERVAL '2 days' + TIME '08:00', NOW() - INTERVAL '2 days' + TIME '08:00', 'taken', NULL),
('adh-034', 'rx-010', 'user_demo', NOW() - INTERVAL '1 day' + TIME '09:00', NOW() - INTERVAL '1 day' + TIME '09:00', 'taken', NULL),
('adh-035', 'rx-010', 'user_demo', NOW() - INTERVAL '2 days' + TIME '09:00', NOW() - INTERVAL '2 days' + TIME '09:30', 'taken', NULL),
('adh-036', 'rx-011', 'user_demo', NOW() - INTERVAL '3 days' + TIME '15:00', NOW() - INTERVAL '3 days' + TIME '15:00', 'taken', 'Rescue inhaler used'),
('adh-037', 'rx-012', 'user_demo', NOW() - INTERVAL '1 day' + TIME '07:00', NOW() - INTERVAL '1 day' + TIME '07:00', 'taken', NULL),
('adh-038', 'rx-013', 'user_demo', NOW() - INTERVAL '1 day' + TIME '20:00', NOW() - INTERVAL '1 day' + TIME '20:00', 'taken', 'Evening dose'),
('adh-039', 'rx-014', 'user_demo', NOW() - INTERVAL '1 day' + TIME '08:00', NOW() - INTERVAL '1 day' + TIME '08:00', 'taken', NULL),
('adh-040', 'rx-001', 'user_demo', NOW() - INTERVAL '6 days' + TIME '08:00', NOW() - INTERVAL '6 days' + TIME '08:00', 'taken', NULL);

-- ============================================
-- USER PREFERENCES (5 entries)
-- ============================================
INSERT INTO user_preferences (id, user_id, preferred_pharmacy, preferred_communication, notification_enabled, reminder_time_preference, language, accessibility_settings) VALUES
('pref-001', 'user_demo', 'CVS Pharmacy #4521 - Main Street', 'sms', true, 'morning', 'en', '{"high_contrast": false, "large_text": false, "screen_reader": false}'),
('pref-002', 'user_demo2', 'CVS Pharmacy #8832 - Oak Avenue', 'email', true, 'evening', 'en', '{"high_contrast": true, "large_text": true, "screen_reader": false}'),
('pref-003', 'user_demo3', 'CVS Pharmacy #4521 - Main Street', 'push', true, 'morning', 'en', '{"high_contrast": false, "large_text": false, "screen_reader": true}'),
('pref-004', 'user_demo4', 'CVS Pharmacy #9921 - Downtown', 'sms', false, 'afternoon', 'es', '{"high_contrast": false, "large_text": true, "screen_reader": false}'),
('pref-005', 'user_demo5', 'CVS Pharmacy #8832 - Oak Avenue', 'email', true, 'morning', 'en', '{"high_contrast": false, "large_text": false, "screen_reader": false}');

-- ============================================
-- MEDICATION REMINDERS (15 entries)
-- ============================================
INSERT INTO medication_reminders (id, medication_id, user_id, reminder_time, days_of_week, is_enabled) VALUES
('rem-001', 'rx-001', 'user_demo', '08:00', '{1,2,3,4,5,6,7}', true),
('rem-002', 'rx-002', 'user_demo', '08:00', '{1,2,3,4,5,6,7}', true),
('rem-003', 'rx-002', 'user_demo', '18:00', '{1,2,3,4,5,6,7}', true),
('rem-004', 'rx-003', 'user_demo', '21:00', '{1,2,3,4,5,6,7}', true),
('rem-005', 'rx-004', 'user_demo', '07:00', '{1,2,3,4,5,6,7}', true),
('rem-006', 'rx-005', 'user_demo', '06:30', '{1,2,3,4,5,6,7}', true),
('rem-007', 'rx-006', 'user_demo', '06:00', '{1,2,3,4,5,6,7}', true),
('rem-008', 'rx-007', 'user_demo', '08:00', '{1,2,3,4,5,6,7}', true),
('rem-009', 'rx-007', 'user_demo', '14:00', '{1,2,3,4,5,6,7}', true),
('rem-010', 'rx-007', 'user_demo', '20:00', '{1,2,3,4,5,6,7}', true),
('rem-011', 'rx-008', 'user_demo', '07:00', '{1,2,3,4,5,6,7}', true),
('rem-012', 'rx-009', 'user_demo', '08:00', '{1,2,3,4,5,6,7}', true),
('rem-013', 'rx-010', 'user_demo', '09:00', '{1,2,3,4,5,6,7}', true),
('rem-014', 'rx-013', 'user_demo', '20:00', '{1,2,3,4,5,6,7}', true),
('rem-015', 'rx-014', 'user_demo', '08:00', '{1,2,3,4,5,6,7}', true);

-- ============================================
-- PRESCRIPTION NOTIFICATIONS (10 entries)
-- ============================================
INSERT INTO prescription_notifications (id, user_id, prescription_id, prescription_name, pharmacy, notify_when, status) VALUES
('notif-001', 'user_demo', 'rx-002', 'Metformin 500mg', 'CVS Pharmacy #4521 - Main Street', 'ready', 'pending'),
('notif-002', 'user_demo', 'rx-003', 'Atorvastatin 20mg', 'CVS Pharmacy #4521 - Main Street', 'ready', 'pending'),
('notif-003', 'user_demo', 'rx-007', 'Gabapentin 300mg', 'CVS Pharmacy #4521 - Main Street', 'reminder', 'pending'),
('notif-004', 'user_demo2', 'rx-001', 'Lisinopril 10mg', 'CVS Pharmacy #8832 - Oak Avenue', 'ready', 'sent'),
('notif-005', 'user_demo2', 'rx-004', 'Amlodipine 5mg', 'CVS Pharmacy #8832 - Oak Avenue', 'ready', 'pending'),
('notif-006', 'user_demo3', 'rx-006', 'Levothyroxine 50mcg', 'CVS Pharmacy #4521 - Main Street', 'reminder', 'pending'),
('notif-007', 'user_demo', 'rx-015', 'Prednisone 10mg', 'CVS Pharmacy #4521 - Main Street', 'ready', 'sent'),
('notif-008', 'user_demo', 'rx-011', 'Albuterol Inhaler', 'CVS Pharmacy #4521 - Main Street', 'reminder', 'pending'),
('notif-009', 'user_demo2', 'rx-009', 'Sertraline 50mg', 'CVS Pharmacy #8832 - Oak Avenue', 'ready', 'cancelled'),
('notif-010', 'user_demo3', 'rx-013', 'Montelukast 10mg', 'CVS Pharmacy #4521 - Main Street', 'ready', 'pending');

-- ============================================
-- Summary
-- ============================================
-- Total records inserted:
-- Medications: 15
-- Health Conditions: 20
-- Allergies: 25
-- Symptom Logs: 50
-- Vitals: 60
-- Appointments: 20
-- Medication Adherence: 40
-- User Preferences: 5
-- Medication Reminders: 15
-- Prescription Notifications: 10
-- TOTAL: 260 records (5x+ expansion)
