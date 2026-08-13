/**
 * WHITE-LABEL CONTROL FILE
 * ========================
 * Everything tenant-specific lives here: palette, wordmark, logo path,
 * currency, locale, timezone, vocabulary, reason codes, entities, queues,
 * due-date offsets and feature flags.
 *
 * THE RULE: no component may hard-code a colour, a brand name, or any
 * tenant-specific value. Colours reach the DOM as CSS custom properties written
 * by BrandProvider; nouns reach the JSX through `terms`; the logo reaches the
 * DOM as a *path*, never an import.
 *
 * This rule has been broken before by a lookup table keyed on tenant data — an
 * entity-weight map naming vinted/vinted_pro/vinted_go, which silently produced
 * entity-less cases the moment a second tenant generated. So: any map, weight
 * table or constant keyed by tenant values belongs in this file and must be
 * derived positionally from the tenant's own lists, never named literally.
 * See ENTITY_WEIGHTS in data/cases.js for how that is done.
 */

/* ------------------------------------------------------------------ *
 * Scheme reason codes
 * ------------------------------------------------------------------ *
 * `category` drives the reason-category rollups on Reports centre, so every
 * code carries one of: fraud | authorisation | processing | consumer.
 */

const VISA_REASON_CODES = [
  { code: '10.4', label: 'Other Fraud — Card Absent Environment', category: 'fraud' },
  { code: '11.2', label: 'Declined Authorisation', category: 'authorisation' },
  { code: '11.3', label: 'No Authorisation', category: 'authorisation' },
  { code: '12.5', label: 'Incorrect Amount', category: 'processing' },
  { code: '12.6.2', label: 'Duplicate Processing', category: 'processing' },
  { code: '13.1', label: 'Merchandise/Services Not Received', category: 'consumer' },
  { code: '13.3', label: 'Not as Described or Defective Merchandise', category: 'consumer' },
  { code: '13.6', label: 'Credit Not Processed', category: 'consumer' },
  { code: '13.7', label: 'Cancelled Merchandise/Services', category: 'consumer' },
];

const MASTERCARD_REASON_CODES = [
  { code: '4837', label: 'No Cardholder Authorisation', category: 'fraud' },
  { code: '4840', label: 'Fraudulent Processing of Transactions', category: 'fraud' },
  { code: '4834', label: 'Point-of-Interaction Error', category: 'processing' },
  { code: '4842', label: 'Late Presentment', category: 'processing' },
  { code: '4853', label: 'Cardholder Dispute — Goods Not as Described', category: 'consumer' },
  { code: '4855', label: 'Goods or Services Not Provided', category: 'consumer' },
  { code: '4860', label: 'Credit Not Processed', category: 'consumer' },
];

const AMEX_REASON_CODES = [
  { code: 'C08', label: 'Goods/Services Not Received or Only Partially Received', category: 'consumer' },
  { code: 'C31', label: 'Goods/Services Not as Described', category: 'consumer' },
  { code: 'F29', label: 'Card Not Present', category: 'fraud' },
];

export const REASON_CATEGORIES = [
  { id: 'fraud', label: 'Fraud' },
  { id: 'authorisation', label: 'Authorisation' },
  { id: 'processing', label: 'Processing error' },
  { id: 'consumer', label: 'Consumer dispute' },
];

/* ------------------------------------------------------------------ *
 * Tenant: Nutrameg
 * ------------------------------------------------------------------ */

export const nutramegBrand = {
  id: 'nutrameg',
  name: 'Nutrameg',
  productName: 'Dispute Console',
  legalName: 'Nutrameg SIA',
  shortName: 'NUT',
  tagline: 'Chargebacks and member claims in one operational queue.',
  supportEmail: 'disputes@nutrameg.example',
  emailDomain: 'nutrameg.example',
  /** HQ is Riga — this tenant's due-date timezone, locale and demo staff all key off it. */
  address: 'Republikas laukums 2A, Riga, LV-1010, Latvia',
  department: 'Chargeback & Dispute Resolution',

  /** Path only — never imported into a component. Served from /public. */
  logo: '/tenant-nutrameg.svg',

  /** Full lockup (icon + wordtype baked into one asset), white-on-transparent —
   * used in place of the icon+text combo wherever the surface is dark. Its
   * natural aspect ratio is 626:133. */
  wordmarkImage: '/nutrameg-wordmark.svg',
  wordmarkImageRatio: 626 / 133,

  wordmark: { text: 'Nutrameg', accent: 'Console', weight: 700 },

  /* --- Palette ---------------------------------------------------------- *
   * Matched to the real nutrameg.com brand: near-black background with a
   * mint-green accent, rather than an invented amber. Sampled directly from
   * the live site's computed styles. */
  colors: {
    primary: '#3DBF7B',
    primaryDeep: '#1DB578',
    primaryTint: '#E3F5EC',
    primaryWash: '#F3FBF7',

    /* Nav rail is its own token pair: dark for this tenant, but a light-chrome
       tenant swaps these without touching a component. */
    navRail: '#18141E',
    navRailDeep: '#100D15',
    navActive: '#4ECB8D',
    navInk: '#E4EDE9',
    navInkMuted: '#8CA89A',

    ink: '#161B18',
    inkMuted: '#5B6B63',
    inkSubtle: '#8B9990',
    canvas: '#F5F9F7',
    surface: '#FFFFFF',
    surfaceSunken: '#FAFCFB',
    line: '#E1EAE5',
    lineStrong: '#C9D6CE',

    success: '#1F8A55',
    successTint: '#E3F5EA',
    warning: '#9A6B00',
    warningTint: '#FBF0DD',
    danger: '#B3261E',
    dangerTint: '#FBE9E7',
    info: '#3B6EA5',
    infoTint: '#EAF1F8',

    schemeVisa: '#1A1F71',
    schemeMastercard: '#C8102E',
    schemeAmex: '#016FD0',
  },

  /* --- Chart ramp ------------------------------------------------------- *
   * ONE HUE PLUS TINTS, not a rainbow. Five steps of the brand mint-green from
   * the deep rail colour to a pale tint, plus a single contrast colour reserved
   * for the "other" bucket and for negative series (rejected, lost, failed).
   *
   * Separation here comes from LIGHTNESS rather than hue, which is why a
   * single-hue ramp survives colour-vision deficiency and greyscale printing
   * at least as well as the multi-hue ramp it replaced — the steps stay
   * distinguishable when hue information is removed entirely.
   *
   * Assign in fixed order and never cycle. A sixth category folds into
   * "Other" and takes chartContrast. */
  chartSeries: ['#3DBF7B', '#5ECB93', '#8FDBB4', '#C3ECD6', '#161B18'],
  chartContrast: '#B3261E',
  chartNeutral: '#7C8B84',

  /* --- Money, locale, markets ------------------------------------------- */
  currency: 'EUR',
  locale: 'en-GB',
  timezone: 'Europe/Riga',
  markets: ['LV', 'DE', 'FR', 'GB', 'ES', 'IT', 'US', 'PL'],

  /* --- Vocabulary -------------------------------------------------------- *
   * Nutrameg is a direct-to-member health/nutrition subscription, not a
   * peer marketplace, so the marketplace-shaped nouns are remapped the same
   * way the PriceLine tenant remaps them for travel: same domain model,
   * different words. */
  terms: {
    case: 'case',
    cases: 'cases',
    chargeback: 'chargeback',
    chargebacks: 'chargebacks',
    claim: 'claim',
    claims: 'claims',
    claimProgramme: 'Member Protection',
    buyer: 'member',
    buyers: 'members',
    seller: 'coach',
    sellers: 'coaches',
    order: 'subscription',
    item: 'plan',
    entity: 'entity',
    analyst: 'Dispute Specialist',
    analysts: 'Dispute Specialists',
    queue: 'queue',
    marketplace: 'platform',
  },

  /** Case-ID numbering, editable from System preferences. */
  numbering: { prefix: 'NUT', separator: '-', digits: 6, nextSequence: 810000 },

  /* --- Entities ----------------------------------------------------------- */
  entities: [
    { id: 'nutrameg', label: 'Nutrameg', descriptor: 'Core nutrition app', mid: '8099100021' },
    { id: 'nutrameg_coach', label: 'Nutrameg Coach', descriptor: '1:1 coaching add-on', mid: '8099100074' },
    { id: 'nutrameg_clinical', label: 'Nutrameg Clinical', descriptor: 'Clinical and prescription programme', mid: '8099100135' },
  ],

  /* --- Card schemes -------------------------------------------------------- */
  schemes: [
    { id: 'visa', label: 'Visa', short: 'VI', colorKey: 'schemeVisa', binPrefix: '4', reasonCodes: VISA_REASON_CODES },
    { id: 'mastercard', label: 'Mastercard', short: 'MC', colorKey: 'schemeMastercard', binPrefix: '5', reasonCodes: MASTERCARD_REASON_CODES },
    { id: 'amex', label: 'Amex', short: 'AX', colorKey: 'schemeAmex', binPrefix: '3', reasonCodes: AMEX_REASON_CODES },
  ],

  cardTypes: ['Credit', 'Debit', 'Prepaid', 'Corporate'],

  cycles: [
    { id: 'first_cb', label: '1st Chargeback', short: '1st CB' },
    { id: 'second_cb', label: '2nd Chargeback', short: '2nd CB' },
    { id: 'pre_arb', label: 'Pre-Arbitration', short: 'Pre-Arb' },
    { id: 'retrieval', label: 'Retrieval', short: 'Retr' },
    { id: 'rfi', label: 'RFI', short: 'RFI' },
  ],

  /** Member Protection claim reasons — the non-card intake path. */
  claimReasons: [
    { id: 'not_as_described', label: 'Plan not as advertised', category: 'consumer' },
    { id: 'never_arrived', label: 'Subscription never activated', category: 'consumer' },
    { id: 'counterfeit', label: 'Unauthorised recurring charge', category: 'fraud' },
    { id: 'damaged', label: 'Coaching not delivered as promised', category: 'consumer' },
    { id: 'wrong_item', label: 'Charged after cancellation', category: 'consumer' },
  ],

  paymentMethods: ['Card', 'Apple Pay', 'Google Pay', 'PayPal', 'App Store', 'Google Play'],

  mccs: [
    { code: '8099', label: 'Health Practitioners and Medical Services' },
    { code: '7372', label: 'Computer Software Stores' },
    { code: '5122', label: 'Drugs, Drug Proprietary and Druggists Sundries' },
    { code: '8011', label: 'Doctors — Physicians' },
    { code: '7298', label: 'Health and Beauty Spas' },
  ],

  acquirers: ['Adyen', 'Stripe', 'Checkout.com'],

  /* --- Queues -------------------------------------------------------------- *
   * Queue ids are shared across tenants by design (data/cases.js routes into
   * them by id) — only the label and description change here. */
  queues: [
    { id: 'all_chargebacks', label: 'All Chargebacks', description: 'Landing queue for every inbound chargeback.', sla: 24 },
    { id: 'buyer_protection', label: 'Member Protection', description: 'Subscription claims with no card leg.', sla: 72 },
    { id: 'second_cycle', label: '2nd Cycle Chargeback', description: 'Second presentments and pre-arbitration.', sla: 16 },
    { id: 'high_value', label: 'High Value Disputes', description: 'Cases above the configured risk amount.', sla: 24 },
    { id: 'counterfeit', label: 'Unauthorised Charges', description: 'Fraud and unauthorised-signup escalations.', sla: 36 },
    { id: 'not_received', label: 'Subscription Not Activated', description: 'Non-activation across both intake paths.', sla: 48 },
    { id: 'logistics', label: 'Onboarding Review', description: 'Signup and activation evidence.', sla: 48 },
    { id: 'supervisor', label: 'Supervisor', description: 'Cases escalated to a supervisor.', sla: 12 },
    { id: 'no_docs', label: 'No Documents Available', description: 'Cases where evidence was never delivered.', sla: 48 },
  ],

  assignmentReasons: [
    { id: 'review_resolve', label: 'Review and Resolve Dispute', description: 'Standard review of an inbound dispute.' },
    { id: 'merchant_docs', label: 'Coach Docs Received', description: 'Coach documentation has arrived and needs assessment.' },
    { id: 'timeframe', label: 'Potential Timeframe Breach', description: 'Approaching or past the scheme deadline.' },
    { id: 'inbound', label: 'Inbound Correspondence', description: 'New correspondence attached to the case.' },
    { id: 'zero_doc', label: '1st CB with 0 Doc Indicator', description: 'First chargeback arrived with no documents.' },
    { id: 'high_value', label: 'High Value — Manual Review', description: 'Above the risk amount, needs a senior decision.' },
    { id: 'consolidation', label: 'Consolidation', description: 'Grouped with linked cases for one decision.' },
    { id: 'duplicate', label: 'Duplicate Item — Existing in Open', description: 'A matching case already exists.' },
  ],

  /* --- Due-date offsets ---------------------------------------------------- *
   * Network windows are fixed by the schemes; the internal buffer is ours and
   * is what analysts actually work to. Editable from System preferences. */
  dueDateOffsets: {
    schemeDays: { visa: 30, mastercard: 45, amex: 20 },
    cycleDays: { first_cb: 0, second_cb: -8, pre_arb: -14, retrieval: -10, rfi: -18 },
    claimDays: 21,
    internalBufferDays: 4,
  },

  thresholds: {
    minimumProcessingAmount: 5,
    riskAmount: 250,
    autoAssign: true,
    routingHighValue: 400,
    defaultReviewer: 'matteo.rossi',
  },

  /* --- Consolidation ------------------------------------------------------- *
   * Minimums are deliberately asymmetric. Two disputes on one card is already
   * a signal; two against one coach is just a coach with volume — hence
   * three, open-only, inside 30 days. Tuned loosely this flagged 60% then 28%
   * of the book, at which point the flag carries no information. Target 10-15%. */
  consolidation: {
    rules: [
      { id: 'same_card', label: 'Same card', minSize: 2, windowDays: 90, openOnly: false, description: 'Multiple disputes presented on one PAN.' },
      { id: 'same_order', label: 'Same subscription', minSize: 2, windowDays: 120, openOnly: false, description: 'One subscription disputed more than once, including across intake paths.' },
      { id: 'same_seller', label: 'Same coach', minSize: 3, windowDays: 30, openOnly: true, description: 'A cluster of open disputes against one coach inside 30 days.' },
    ],
  },

  features: {
    bulkActions: true,
    ruleCheck: true,
    consolidation: true,
    customReports: true,
    monitoring: true,
    uploadCases: true,
    webhooks: true,
    apiDocs: true,
    help: true,
  },

  demoCredentials: { username: 'NutramegDemo', password: 'Changeme123' },
};

/* ------------------------------------------------------------------ *
 * Tenant: PriceLine — proof the swap is real
 * ------------------------------------------------------------------ */

export const pricelineBrand = {
  ...nutramegBrand,
  id: 'priceline',
  name: 'PriceLine',
  legalName: 'PriceLine Payments Ltd',
  shortName: 'PRL',
  tagline: 'Card disputes and booking claims in one operational queue.',
  supportEmail: 'disputes@priceline.example',
  emailDomain: 'priceline.example',
  address: '800 Connecticut Ave, Norwalk, CT 06854, USA',
  department: 'Chargeback & Dispute Resolution',
  logo: '/tenant-priceline.svg',
  wordmark: { text: 'PriceLine', accent: 'Console', weight: 700 },

  colors: {
    ...nutramegBrand.colors,
    primary: '#0F4C99',
    primaryDeep: '#0A3A76',
    primaryTint: '#E6EEF9',
    primaryWash: '#F5F8FD',
    navRail: '#0B1F3B',
    navRailDeep: '#07162B',
    navActive: '#3E8FE0',
    navInk: '#D8E3F2',
    navInkMuted: '#8299B7',
    ink: '#101C2E',
    inkMuted: '#556579',
    inkSubtle: '#8695A6',
    canvas: '#F3F5F8',
    surfaceSunken: '#F8FAFB',
    line: '#DEE4EC',
    lineStrong: '#C3CDDA',
  },

  /** Same single-hue-plus-tints rule, in this tenant's own blue. */
  chartSeries: ['#0F4C99', '#3E8FE0', '#84B6EC', '#C7DDF6', '#0B1F3B'],
  chartContrast: '#B3261E',
  chartNeutral: '#6E7C8C',

  currency: 'USD',
  locale: 'en-US',
  timezone: 'America/New_York',
  markets: ['US', 'CA', 'GB', 'DE', 'FR', 'ES', 'IT', 'AU'],

  terms: {
    ...nutramegBrand.terms,
    claim: 'booking claim',
    claims: 'booking claims',
    claimProgramme: 'Traveller Protection',
    buyer: 'traveller',
    buyers: 'travellers',
    seller: 'supplier',
    sellers: 'suppliers',
    order: 'booking',
    item: 'reservation',
    marketplace: 'travel',
  },

  numbering: { ...nutramegBrand.numbering, prefix: 'PRL', nextSequence: 440000 },

  entities: [
    { id: 'priceline', label: 'PriceLine', descriptor: 'Consumer travel', mid: '4722100011' },
    { id: 'priceline_biz', label: 'PriceLine Business', descriptor: 'Corporate travel', mid: '4722100048' },
    { id: 'priceline_air', label: 'PriceLine Air', descriptor: 'Flight-only bookings', mid: '4722100092' },
  ],

  claimReasons: [
    { id: 'not_as_described', label: 'Property not as described', category: 'consumer' },
    { id: 'never_arrived', label: 'Booking not honoured', category: 'consumer' },
    { id: 'counterfeit', label: 'Fraudulent listing', category: 'fraud' },
    { id: 'damaged', label: 'Service failure', category: 'consumer' },
    { id: 'wrong_item', label: 'Wrong reservation supplied', category: 'consumer' },
  ],

  paymentMethods: ['Card', 'Wallet balance', 'PayPal', 'Apple Pay', 'Google Pay', 'Affirm'],

  mccs: [
    { code: '4722', label: 'Travel Agencies and Tour Operators' },
    { code: '7011', label: 'Lodging — Hotels and Motels' },
    { code: '4511', label: 'Airlines and Air Carriers' },
    { code: '7512', label: 'Automobile Rental Agency' },
    { code: '4131', label: 'Bus Lines' },
  ],

  acquirers: ['Chase Paymentech', 'Worldpay', 'Stripe'],

  queues: [
    { id: 'all_chargebacks', label: 'All Chargebacks', description: 'Landing queue for every inbound chargeback.', sla: 24 },
    { id: 'buyer_protection', label: 'Traveller Protection', description: 'Claims with no card leg.', sla: 72 },
    { id: 'second_cycle', label: '2nd Cycle Chargeback', description: 'Second presentments and pre-arbitration.', sla: 16 },
    { id: 'high_value', label: 'High Value Disputes', description: 'Cases above the configured risk amount.', sla: 24 },
    { id: 'counterfeit', label: 'Fraudulent Listing', description: 'Supplier authenticity escalations.', sla: 36 },
    { id: 'not_received', label: 'Booking Not Honoured', description: 'Non-delivery of a booked service.', sla: 48 },
    { id: 'logistics', label: 'Supplier Review', description: 'Supplier confirmation evidence.', sla: 48 },
    { id: 'supervisor', label: 'Supervisor', description: 'Cases escalated to a supervisor.', sla: 12 },
    { id: 'no_docs', label: 'No Documents Available', description: 'Cases where evidence was never delivered.', sla: 48 },
  ],

  thresholds: { ...nutramegBrand.thresholds, minimumProcessingAmount: 10, riskAmount: 500, routingHighValue: 900 },

  /** Its own, so the second tenant never shows the first tenant's username. */
  demoCredentials: { username: 'PriceLineDemo', password: 'Changeme123' },
};

/* ------------------------------------------------------------------ *
 * Registry + lookups
 * ------------------------------------------------------------------ */

export const TENANTS = { nutrameg: nutramegBrand, priceline: pricelineBrand };

export const brand = TENANTS[import.meta.env?.VITE_TENANT] ?? nutramegBrand;

export const allReasonCodes = (b = brand) =>
  b.schemes.flatMap((s) => s.reasonCodes.map((rc) => ({ ...rc, schemeId: s.id, schemeLabel: s.label })));

export const findReasonCode = (code, b = brand) =>
  allReasonCodes(b).find((rc) => rc.code === code) ?? null;

export const findScheme = (id, b = brand) => b.schemes.find((s) => s.id === id) ?? null;
export const findQueue = (id, b = brand) => b.queues.find((q) => q.id === id) ?? null;
export const findEntity = (id, b = brand) => b.entities.find((e) => e.id === id) ?? null;
export const findCycle = (id, b = brand) => b.cycles.find((c) => c.id === id) ?? null;
export const findClaimReason = (id, b = brand) => b.claimReasons.find((r) => r.id === id) ?? null;
export const categoryLabel = (id) => REASON_CATEGORIES.find((c) => c.id === id)?.label ?? id;

/** Reason label for either intake path — claims have no scheme code. */
export const reasonLabelFor = (code, b = brand) =>
  findReasonCode(code, b)?.label ?? findClaimReason(code, b)?.label ?? code;

export default brand;
