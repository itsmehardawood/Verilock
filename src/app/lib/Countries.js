// utils/countries.js

// Comprehensive list of country names for LinkedIn API
export const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Ireland",
  "Belgium",
  "Switzerland",
  "Austria",
  "Portugal",
  "Greece",
  "India",
  "China",
  "Japan",
  "South Korea",
  "Singapore",
  "Malaysia",
  "Indonesia",
  "Thailand",
  "Vietnam",
  "Philippines",
  "Pakistan",
  "Brazil",
  "Mexico",
  "Argentina",
  "Colombia",
  "Chile",
  "Peru",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Egypt",
  "Saudi Arabia",
  "United Arab Emirates",
  "Israel",
  "Turkey",
  "Russia",
  "Ukraine",
  "Poland",
  "Czech Republic",
  "Hungary",
  "Romania",
  "Bulgaria",
  "Serbia",
  "Croatia",
  "Slovenia",
  "Slovakia",
  "Lithuania",
  "Latvia",
  "Estonia",
  "Iceland",
  "Malta",
  "Cyprus",
  "Luxembourg",
  "Monaco",
  "Andorra",
  "San Marino",
  "Vatican City",
  "Liechtenstein",
  "New Zealand",
  "Fiji",
  "Papua New Guinea",
  "Solomon Islands",
  "Vanuatu",
  "Samoa",
  "Tonga",
  "Micronesia",
  "Marshall Islands",
  "Palau",
  "Kiribati",
  "Tuvalu",
  "Nauru"
];

// Alternative: Grouped by regions for better organization
export const COUNTRIES_BY_REGION = {
  northAmerica: [
    "United States",
    "Canada",
    "Mexico"
  ],
  europe: [
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Ireland",
    "Belgium",
    "Switzerland",
    "Austria",
    "Portugal",
    "Greece",
    "Poland",
    "Czech Republic",
    "Hungary",
    "Romania"
  ],
  asia: [
    "India",
    "China",
    "Japan",
    "South Korea",
    "Singapore",
    "Malaysia",
    "Indonesia",
    "Thailand",
    "Vietnam",
    "Philippines",
    "Israel",
    "Turkey",
    "Saudi Arabia",
    "United Arab Emirates"
  ],
  southAmerica: [
    "Brazil",
    "Argentina",
    "Colombia",
    "Chile",
    "Peru"
  ],
  africa: [
    "South Africa",
    "Nigeria",
    "Kenya",
    "Egypt"
  ],
  oceania: [
    "Australia",
    "New Zealand",
    "Fiji",
    "Papua New Guinea"
  ]
};

// Helper function to search countries
export const searchCountries = (query) => {
  const lowerQuery = query.toLowerCase();
  return COUNTRIES.filter(country => 
    country.toLowerCase().includes(lowerQuery)
  );
};

// Default export for easy importing
export default COUNTRIES;