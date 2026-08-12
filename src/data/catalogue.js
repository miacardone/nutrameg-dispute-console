/**
 * Fixture vocabulary — the raw material the generator draws from.
 *
 * Deliberately plausible rather than random: real product titles, real EU
 * market spread, subscription/programme price bands that make the amounts
 * believable. Nothing here names a tenant.
 */

export const FIRST_NAMES = [
  'Ieva', 'Lukas', 'Camille', 'Mathis', 'Lena', 'Jonas', 'Zofia', 'Kacper',
  'Marta', 'Andrea', 'Sofia', 'Matteo', 'Emma', 'Daan', 'Noor', 'Lars',
  'Elin', 'Tomas', 'Klara', 'Petr', 'Anouk', 'Rúben', 'Alba', 'Hugo',
  'Nina', 'Sven', 'Julia', 'Milan', 'Eva', 'Adam', 'Chloé', 'Théo',
  'Greta', 'Rasa', 'Mila', 'Otto', 'Sara', 'Bruno', 'Lea', 'Viktor',
  'Aiste', 'Pierre', 'Katrin', 'Joris', 'Maja', 'Filip', 'Ana', 'Erik',
];

export const LAST_NAMES = [
  'Kazlauskas', 'Petrauskiene', 'Dubois', 'Moreau', 'Fischer', 'Weber',
  'Nowak', 'Wojcik', 'Rossi', 'Ferrari', 'Garcia', 'Fernandez', 'de Vries',
  'Jansen', 'Novak', 'Svoboda', 'Horvath', 'Kovacs', 'Andersson', 'Lindberg',
  'Silva', 'Costa', 'Bakker', 'Visser', 'Schmitt', 'Braun', 'Lefevre',
  'Girard', 'Marino', 'Greco', 'Ruiz', 'Ortega', 'Vasiliauskas', 'Butkute',
  'Meyer', 'Klein', 'Laurent', 'Simon', 'Conti', 'Bruno', 'Serrano', 'Blanco',
];

export const SELLER_HANDLES = [
  'balanced_bites_coach', 'plantfuel_riga', 'macro_maison', 'nordic_nutrition',
  'metabolic_mentor', 'sunrise_sustenance', 'coastal_cleaneating', 'urban_wellness_co',
  'rooted_nutrition', 'thrive_with_thea', 'lean_clean_ldn', 'glow_gut_health',
  'protein_project', 'mindful_macros', 'seed_to_plate', 'vital_verve',
  'clean_slate_nutrition', 'foundry_fitfuel', 'harvest_and_health', 'wellness_ward',
  'northstar_nutrition', 'kindred_kitchen_coach', 'strong_roots_coaching', 'balance_and_bloom',
  'nourish_nordics', 'freshstart_fuel', 'macro_method', 'evergreen_eats',
];

/** Titles are grouped so a plan lines up with a sensible category and price. */
export const ITEMS = [
  { title: 'Nutrameg Starter Box, first month', category: 'Core — Subscription Boxes', low: 18, high: 34 },
  { title: 'Nutrameg Monthly Supplement Box', category: 'Core — Subscription Boxes', low: 28, high: 55 },
  { title: 'Nutrameg Quarterly Supplement Box', category: 'Core — Subscription Boxes', low: 75, high: 145 },
  { title: 'Daily Multivitamin, 90-day supply', category: 'Core — Supplements', low: 22, high: 38 },
  { title: 'Omega-3 & Vitamin D Stack', category: 'Core — Supplements', low: 18, high: 32 },
  { title: 'Protein & Recovery Bundle', category: 'Core — Supplements', low: 35, high: 68 },
  { title: 'Personalised Supplement Stack, monthly', category: 'Core — Supplements', low: 45, high: 90 },
  { title: 'Personalised Supplement Stack, quarterly', category: 'Core — Supplements', low: 120, high: 240 },
  { title: 'Prenatal Vitamin Subscription', category: 'Family — Kids Nutrition', low: 22, high: 40 },
  { title: 'Kids Nutrition Starter Box', category: 'Family — Kids Nutrition', low: 15, high: 28 },
  { title: '1:1 Nutrition Coaching Welcome Kit', category: 'Coaching — Starter Kits', low: 40, high: 75 },
  { title: 'Sports Performance Coaching, monthly', category: 'Coaching — Programmes', low: 110, high: 220 },
  { title: '1:1 Nutrition Coaching, monthly', category: 'Coaching — Programmes', low: 89, high: 180 },
  { title: '1:1 Nutrition Coaching, quarterly', category: 'Coaching — Programmes', low: 240, high: 480 },
  { title: 'Postnatal Coaching Package', category: 'Coaching — Programmes', low: 150, high: 320 },
  { title: 'Sleep & Recovery Coaching, monthly', category: 'Coaching — Programmes', low: 95, high: 190 },
  { title: 'Diabetes Prevention Coaching, 12-week', category: 'Coaching — Programmes', low: 180, high: 360 },
  { title: 'Continuous Glucose Monitor, starter kit', category: 'Clinical — Monitoring Devices', low: 79, high: 149 },
  { title: 'Continuous Glucose Monitor, 3-month refill', category: 'Clinical — Monitoring Devices', low: 180, high: 260 },
  { title: 'At-Home Metabolic Test Kit', category: 'Clinical — Monitoring Devices', low: 59, high: 99 },
  { title: 'At-Home Micronutrient Panel', category: 'Clinical — Monitoring Devices', low: 89, high: 140 },
  { title: 'GLP-1 Companion Programme, monthly', category: 'Clinical — Prescription Kits', low: 199, high: 349 },
  { title: 'GLP-1 Companion Programme, quarterly', category: 'Clinical — Prescription Kits', low: 540, high: 980 },
  { title: 'Metabolic Reset, 12-week programme kit', category: 'Clinical — Programmes', low: 320, high: 620 },
  { title: 'Cholesterol Management Programme', category: 'Clinical — Programmes', low: 220, high: 410 },
  { title: 'PCOS Nutrition Programme, 3-month', category: 'Clinical — Programmes', low: 280, high: 520 },
  { title: 'Prenatal Clinical Nutrition Programme', category: 'Clinical — Programmes', low: 190, high: 360 },
  { title: 'Nutrameg Clinical Annual Membership', category: 'Clinical — Programmes', low: 900, high: 2400 },
  { title: 'Executive Health Screening Programme', category: 'Clinical — Programmes', low: 450, high: 1150 },
];

export const CONDITIONS = ['Sealed, unopened', 'Opened, unused', 'Lightly used', 'Used', 'Incomplete'];

export const MARKET_CITIES = {
  FR: ['Paris', 'Lyon', 'Marseille', 'Bordeaux'],
  DE: ['Berlin', 'Hamburg', 'Munich', 'Cologne'],
  LT: ['Vilnius', 'Kaunas', 'Klaipeda'],
  PL: ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw'],
  ES: ['Madrid', 'Barcelona', 'Valencia', 'Seville'],
  IT: ['Milan', 'Rome', 'Turin', 'Bologna'],
  NL: ['Amsterdam', 'Rotterdam', 'Utrecht'],
  BE: ['Brussels', 'Antwerp', 'Ghent'],
  CZ: ['Prague', 'Brno'],
  SK: ['Bratislava', 'Kosice'],
  US: ['New York', 'Chicago', 'Austin', 'Denver'],
  CA: ['Toronto', 'Montreal', 'Vancouver'],
  GB: ['London', 'Manchester', 'Bristol', 'Leeds'],
  AU: ['Sydney', 'Melbourne', 'Brisbane'],
  PT: ['Lisbon', 'Porto'],
};

export const CARRIERS = ['DPD', 'InPost', 'DHL', 'Mondial Relay', 'Colissimo', 'GLS', 'Evri'];

export const LAST_NOTES = [
  'Awaiting coach documents',
  'Represented — pending scheme response',
  'Escalated to supervisor',
  'Docs received, in review',
  'Member contacted issuer directly',
  'Partial refund applied',
  'Tracking confirms delivery to pickup point',
  'Return label issued, awaiting despatch',
  'Programme enrolment confirmation requested',
  'Below write-off threshold',
  '—',
];

export const TRANSACTION_TYPES = ['Sale', 'Refund', 'Authorization', 'Recurring'];
export const SALES_METHODS = ['Ecommerce', 'Mobile App', 'MOTO', 'Recurring Billing'];
export const FRAUD_MARKERS = ['Confirmed Fraud', 'Suspected Fraud', 'No Fraud Marker', 'Fraud Reported by Issuer'];
