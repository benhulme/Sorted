/*! sorted-constants.js */
var test_constant = 12;
var constants = {
  gst: 0.15,
  pi: 3.141592653,
  golden_ratio: 1.618033988,
  inverse_golden_ratio: 0.618033988,
  inflation_rate: 0.02,
  interest_rate_pa: 0.051,
  salary_inflation_pa: 0.035,
  retire_age: 65,
  govt_kiwisaver_kick_start_period: 14,
  govt_kiwisaver_kick_start_amount: 0,
  govt_kiwisaver_tax_credit_full: 1042.86,
  govt_kiwisaver_tax_credit_cuttoff_date: "30-06-2011",
  pir_lookup: {
    'over0k': {
      'net_return': 0.033,
      'PIR': 0.105
    },
    'over14k': {
      'net_return': 0.029,
      'PIR': 0.175
    },
    'over48k': {
      'net_return': 0.024,
      'PIR': 0.28
    }
  },
  inflation_adjusted_contrib_for_self_employed: 'yes',
  employer_contribution_rate: 0.03,
  employer_tax_break_ends: '01-04-2012',
  kiwisaver_3percent_contributions_start: '01-04-2013',
  nz_super_single: 20290.40,
  nz_super_married: 15607.80,
  nz_super_ineligible_partner: 29669.12,
  desired_nz_super_freq: 4,
  expected_kiwisaver_freq: 5,
  your_expected_other_schemes_freq: 5,
  partners_expected_other_schemes_freq: 5,
  your_expected_other_income_freq: 4,
  partners_expected_other_income_freq: 4
};
