export type Country = {
  code: string,
  emoji: string,
  label: string,
  phone: string,
  phoneFormats?: Array<string | number>,
};

export default [
  { code: 'ru', label: 'Russian Federation', emoji: '🇷🇺', phone: '+7', phoneFormats: [10, 'ddd ddd dd-dd'] },
  { code: 'us', label: 'United States', emoji: '🇱🇷', phone: '+1', phoneFormats: [10, 'ddd-ddd-dddd'] },
  { code: 'uk', label: 'United Kingdom', emoji: '🇬🇧', phone: '+44', phoneFormats: [9, 'dddd ddddd', 10, 'ddd ddd dddd'] },
  { code: 'test', label: 'Test', emoji: '🤔', phone: '+', phoneFormats: [10, 'ddd ddd dd-dd'] },
  // { code: 'AF', phone: '+93' },
  // { code: 'AX', phone: '+358' },
  // { code: 'AL', phone: '+355' },
  // { code: 'DZ', phone: '+213' },
  // { code: 'AS', phone: '+1 684' },
  // { code: 'AD', phone: '+376' },
  // { code: 'AO', phone: '+244' },
  // { code: 'AI', phone: '+1 264' },
  // { code: 'AG', phone: '+1 268' },
  // { code: 'AR', phone: '+54' },
  // { code: 'AM', phone: '+374' },
  // { code: 'AW', phone: '+297' },
  // { code: 'SH', phone: '+247' },
  // { code: 'AU', phone: '+61' },
  // { code: 'AU', phone: '+672' },
  // { code: 'AT', phone: '+43' },
  // { code: 'AZ', phone: '+994' },
  // { code: 'BS', phone: '+1 242' },
  // { code: 'BH', phone: '+973' },
  // { code: 'BD', phone: '+880' },
  // { code: 'BB', phone: '+1 246' },
  // { code: 'AG', phone: '+1 268' },
  // { code: 'BY', phone: '+375' },
  // { code: 'BE', phone: '+32' },
  // { code: 'BZ', phone: '+501' },
  // { code: 'BJ', phone: '+229' },
  // { code: 'BM', phone: '+1 441' },
  // { code: 'BT', phone: '+975' },
  // { code: 'BO', phone: '+591' },
  // { code: 'BQ', phone: '+599 7' },
  // { code: 'BA', phone: '+387' },
  // { code: 'BW', phone: '+267' },
  // { code: 'BR', phone: '+55' },
  // { code: 'IO', phone: '+246' },
  // { code: 'VG', phone: '+1 284' },
  // { code: 'BN', phone: '+673' },
  // { code: 'BG', phone: '+359' },
  // { code: 'BF', phone: '+226' },
  // { code: 'MY', phone: '+95' },
  // { code: 'BI', phone: '+257' },
  // { code: 'KH', phone: '+855' },
  // { code: 'CM', phone: '+237' },
  // { code: 'CA', phone: '+1' },
  // { code: 'CV', phone: '+238' },
  // { code: 'KY', phone: '+1 345' },
  // { code: 'CF', phone: '+236' },
  // { code: 'TD', phone: '+235' },
  // { code: 'CL', phone: '+56' },
  // { code: 'CN', phone: '+86' },
  // { code: 'CX', phone: '+61' },
  // { code: 'CC', phone: '+61' },
  // { code: 'CO', phone: '+57' },
  // { code: 'KM', phone: '+269' },
  // { code: 'CG', phone: '+242' },
  // { code: 'CD', phone: '+243' },
  // { code: 'CK', phone: '+682' },
  // { code: 'CR', phone: '+506' },
  // { code: 'CI', phone: '+225' },
  // { code: 'HR', phone: '+385' },
  // { code: 'CU', phone: '+53' },
  // { code: 'CW', phone: '+599 9' },
  // { code: 'CY', phone: '+357' },
  // { code: 'CZ', phone: '+420' },
  // { code: 'DK', phone: '+45' },
  // { code: 'DG', phone: '+246' },
  // { code: 'DJ', phone: '+253' },
  // { code: 'DM', phone: '+1 767' },
  // { code: 'DO', phone: '+1' },
  // { code: 'TL', phone: '+670' },
  // { code: 'EC', phone: '+593' },
  // { code: 'EG', phone: '+20' },
  // { code: 'SV', phone: '+503' },
  // { code: 'GQ', phone: '+240' },
  // { code: 'ER', phone: '+291' },
  // { code: 'EE', phone: '+372' },
  // { code: 'ET', phone: '+251' },
  // { code: 'FK', phone: '+500' },
  // { code: 'FO', phone: '+298' },
  // { code: 'FJ', phone: '+679' },
  // { code: 'FI', phone: '+358' },
  // { code: 'FR', phone: '+33' },
  // { code: 'GF', phone: '+594' },
  // { code: 'PF', phone: '+689' },
  // { code: 'GA', phone: '+241' },
  // { code: 'GM', phone: '+220' },
  // { code: 'GE', phone: '+995' },
  // { code: 'DE', phone: '+49' },
  // { code: 'GH', phone: '+233' },
  // { code: 'GI', phone: '+350' },
  // { code: 'GR', phone: '+30' },
  // { code: 'GL', phone: '+299' },
  // { code: 'GD', phone: '+1 473' },
  // { code: 'GP', phone: '+590' },
  // { code: 'GU', phone: '+1 671' },
  // { code: 'GT', phone: '+502' },
  // { code: 'GG', phone: '+44' },
  // { code: 'GN', phone: '+224' },
  // { code: 'GW', phone: '+245' },
  // { code: 'GY', phone: '+592' },
  // { code: 'HT', phone: '+509' },
  // { code: 'HN', phone: '+504' },
  // { code: 'HK', phone: '+852' },
  // { code: 'HU', phone: '+36' },
  // { code: 'IS', phone: '+354' },
  // { code: 'IN', phone: '+91' },
  // { code: 'ID', phone: '+62' },
  // { code: 'IR', phone: '+98' },
  // { code: 'IQ', phone: '+964' },
  // { code: 'IE', phone: '+353' },
  // { code: 'IL', phone: '+972' },
  // { code: 'IT', phone: '+39' },
  // { code: 'JM', phone: '+1 876' },
  // { code: 'SJ', phone: '+47 79' },
  // { code: 'JP', phone: '+81' },
  // { code: 'JE', phone: '+44' },
  // { code: 'JO', phone: '+962' },
  // { code: 'KZ', phone: '+7 7' },
  // { code: 'KE', phone: '+254' },
  // { code: 'KI', phone: '+686' },
  // { code: 'KP', phone: '+850' },
  // { code: 'KR', phone: '+82' },
  // { code: 'KW', phone: '+965' },
  // { code: 'KG', phone: '+996' },
  // { code: 'LA', phone: '+856' },
  // { code: 'LV', phone: '+371' },
  // { code: 'LB', phone: '+961' },
  // { code: 'LS', phone: '+266' },
  // { code: 'LR', phone: '+231' },
  // { code: 'LY', phone: '+218' },
  // { code: 'LI', phone: '+423' },
  // { code: 'LT', phone: '+370' },
  // { code: 'LU', phone: '+352' },
  // { code: 'MO', phone: '+853' },
  // { code: 'MK', phone: '+389' },
  // { code: 'MG', phone: '+261' },
  // { code: 'MW', phone: '+265' },
  // { code: 'MY', phone: '+60' },
  // { code: 'MV', phone: '+960' },
  // { code: 'ML', phone: '+223' },
  // { code: 'MT', phone: '+356' },
  // { code: 'MH', phone: '+692' },
  // { code: 'MQ', phone: '+596' },
  // { code: 'MR', phone: '+222' },
  // { code: 'MU', phone: '+230' },
  // { code: 'YT', phone: '+262' },
  // { code: 'MX', phone: '+52' },
  // { code: 'FM', phone: '+691' },
  // { code: 'MD', phone: '+373' },
  // { code: 'MC', phone: '+377' },
  // { code: 'MN', phone: '+976' },
  // { code: 'ME', phone: '+382' },
  // { code: 'MS', phone: '+1 664' },
  // { code: 'MA', phone: '+212' },
  // { code: 'MZ', phone: '+258' },
  // { code: 'NA', phone: '+264' },
  // { code: 'NR', phone: '+674' },
  // { code: 'NP', phone: '+977' },
  // { code: 'NL', phone: '+31' },
  // { code: 'NC', phone: '+687' },
  // { code: 'NZ', phone: '+64' },
  // { code: 'NI', phone: '+505' },
  // { code: 'NE', phone: '+227' },
  // { code: 'NG', phone: '+234' },
  // { code: 'NU', phone: '+683' },
  // { code: 'NF', phone: '+672' },
  // { code: 'MP', phone: '+1 670' },
  // { code: 'NO', phone: '+47' },
  // { code: 'OM', phone: '+968' },
  // { code: 'PK', phone: '+92' },
  // { code: 'PW', phone: '+680' },
  // { code: 'PS', phone: '+970' },
  // { code: 'PA', phone: '+507' },
  // { code: 'PG', phone: '+675' },
  // { code: 'PY', phone: '+595' },
  // { code: 'PE', phone: '+51' },
  // { code: 'PH', phone: '+63' },
  // { code: 'PN', phone: '+64' },
  // { code: 'PL', phone: '+48' },
  // { code: 'PT', phone: '+351' },
  // { code: 'PR', phone: '+1' },
  // { code: 'QA', phone: '+974' },
  // { code: 'RE', phone: '+262' },
  // { code: 'RO', phone: '+40' },
  // { code: 'RU', phone: '+7' },
  // { code: 'RW', phone: '+250' },
  // { code: 'BL', phone: '+590' },
  // { code: 'SH', phone: '+290' },
  // { code: 'KN', phone: '+1 869' },
  // { code: 'LC', phone: '+1 758' },
  // { code: 'MF', phone: '+590' },
  // { code: 'PM', phone: '+508' },
  // { code: 'VC', phone: '+1 784' },
  // { code: 'WS', phone: '+685' },
  // { code: 'SM', phone: '+378' },
  // { code: 'ST', phone: '+239' },
  // { code: 'SA', phone: '+966' },
  // { code: 'SN', phone: '+221' },
  // { code: 'RS', phone: '+381' },
  // { code: 'SC', phone: '+248' },
  // { code: 'SL', phone: '+232' },
  // { code: 'SG', phone: '+65' },
  // { code: 'BQ', phone: '+599 3' },
  // { code: 'SX', phone: '+1 721' },
  // { code: 'SK', phone: '+421' },
  // { code: 'SI', phone: '+386' },
  // { code: 'SB', phone: '+677' },
  // { code: 'SO', phone: '+252' },
  // { code: 'ZA', phone: '+27' },
  // { code: 'GS', phone: '+500' },
  // { code: 'SS', phone: '+211' },
  // { code: 'ES', phone: '+34' },
  // { code: 'LK', phone: '+94' },
  // { code: 'SD', phone: '+249' },
  // { code: 'SR', phone: '+597' },
  // { code: 'SJ', phone: '+47 79' },
  // { code: 'SZ', phone: '+268' },
  // { code: 'SE', phone: '+46' },
  // { code: 'CH', phone: '+41' },
  // { code: 'SY', phone: '+963' },
  // { code: 'TW', phone: '+886' },
  // { code: 'TJ', phone: '+992' },
  // { code: 'TZ', phone: '+255' },
  // { code: 'TH', phone: '+66' },
  // { code: 'TG', phone: '+228' },
  // { code: 'TK', phone: '+690' },
  // { code: 'TO', phone: '+676' },
  // { code: 'TT', phone: '+1 868' },
  // { code: 'TN', phone: '+216' },
  // { code: 'TR', phone: '+90' },
  // { code: 'TM', phone: '+993' },
  // { code: 'TC', phone: '+1 649' },
  // { code: 'TV', phone: '+688' },
  // { code: 'UG', phone: '+256' },
  // { code: 'UA', phone: '+380' },
  // { code: 'AE', phone: '+971' },
  // { code: 'UK', phone: '+44' },
  // { code: 'US', phone: '+1' },
  // { code: 'UY', phone: '+598' },
  // { code: 'VI', phone: '+1 340' },
  // { code: 'UZ', phone: '+998' },
  // { code: 'VU', phone: '+678' },
  // { code: 'VE', phone: '+58' },
  // { code: 'VA', phone: '+379' },
  // { code: 'VN', phone: '+84' },
  // { code: 'WF', phone: '+681' },
  // { code: 'YE', phone: '+967' },
  // { code: 'ZM', phone: '+260' },
  // { code: 'ZW', phone: '+263' },
] as Country[];
