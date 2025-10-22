// utils/platform-instructions.js

// Platform-specific reporting instructions with enhanced structure
export const PLATFORM_INSTRUCTIONS = {
  facebook: {
    steps: [
      {
        number: 1,
        title: "Open Profile & Find Menu",
        description: 'Tap the ⋯ three-dot menu in the top right corner, then select "Report Profile"',
        icon: "⋯",
        color: "blue"
      },
      {
        number: 2,
        title: "Select Reporting Reason",
        description: 'Select "Something about this profile" and then click "Fake Profile"',
        important: "This is the most important step!",
        color: "purple"
      },
      {
        number: 3,
        title: "Identify Impersonation",
        description: 'Choose Me, a friend, or public figure',
        color: "pink"
      },
      {
        number: 4,
        title: "Submit Your Report",
        description: 'Click "Submit" to complete the reporting process on Facebook',
        color: "orange"
      }
    ],
    finalStep: {
      title: "Complete the Process Here",
      description: "After submitting on Facebook, return here and click 'Takedown Submitted' to track your report in our system",
      important: "You must complete both Facebook's reporting AND click 'Takedown Submitted' below"
    }
  },
  linkedin: { // ✅ ADDED LINKEDIN INSTRUCTIONS
    steps: [
      {
        number: 1,
        title: "Open Profile & Find Menu",
        description: 'Click on three dots "..." button below the profile header, then select "Report / Block"',
        icon: "⋯",
        color: "blue"
      },
      {
        number: 2,
        title: "Select Reporting",
        description: 'Choose "Report @username or entire account"',
        important: "This is the most important step!",
        color: "purple"
      },
      {
        number: 3,
        title: "Identify Impersonation",
        description: 'Select "not a real person" or "impersonation someone"',
        color: "pink"
      },
      {
        number: 4,
        title: "Submit Your Report",
        description: 'Click "Submit" or "Send" to complete the reporting process on LinkedIn',
        color: "orange"
      }
    ],
    finalStep: {
      title: "Complete the Process Here",
      description: "After submitting on LinkedIn, return here and click 'Takedown Submitted' to track your report in our system",
      important: "You must complete both LinkedIn's reporting AND click 'Takedown Submitted' below"
    }
  },
  tiktok: {
    steps: [
      {
        number: 1,
        title: "Open Profile & Find Menu",
        description: 'Tap the ⋯ three-dot menu or arrow button on top of profile, then select "Report"',
        icon: "⋯",
        color: "blue"
      },
      {
        number: 2,
        title: "Select Reporting Reason",
        description: 'Choose "Report account" or "Report content" → "Pretending to be someone"',
        important: "This is the most important step!",
        color: "purple"
      },
      {
        number: 3,
        title: "Identify Impersonation",
        description: 'Choose "Me" or "Celebrity"',
        color: "pink"
      },
      {
        number: 4,
        title: "Submit Your Report",
        description: 'Click "Me" and then "Submit" to complete the reporting process on TikTok',
        color: "orange"
      }
    ],
    finalStep: {
      title: "Complete the Process Here",
      description: "After submitting on TikTok, return here and click 'Takedown Submitted' to track your report in our system",
      important: "You must complete both TikTok's reporting AND click 'Takedown Submitted' below"
    }
  },
  instagram: {
    steps: [
      {
        number: 1,
        title: "Open Profile & Find Menu",
        description: 'Tap the ⋯ three-dot menu in the top beside username, then select "Report"',
        icon: "⋯",
        color: "blue"
      },
      {
        number: 2,
        title: "Select Reporting Reason",
        description: 'Choose "Report account" → "They are pretending to be someone else"',
        important: "This is the most important step!",
        color: "purple"
      },
      {
        number: 3,
        title: "Identify Impersonation",
        description: 'Choose "Me" or "Someone else"',
        color: "pink"
      },
      {
        number: 4,
        title: "Choose Problem & Submit",
        description: 'Select Bullying or Harassment , Scam or Fraud, or something else and click "Submit"',
        color: "orange"
      }
      
    ],
    finalStep: {
      title: "Complete the Process Here",
      description: "After submitting on Instagram, return here and click 'Takedown Submitted' to track your report in our system",
      important: "You must complete both Instagram's reporting AND click 'Takedown Submitted' below"
    }
  },
  twitter: {
    steps: [
      {
        number: 1,
        title: "Find Report Option",
        description: 'Click the three dots (⋯) on the profile, below the cover picture, then select "Report @username"',
        icon: "⋯",
        color: "blue"
      },
      {
        number: 2,
        title: "Select Issue Type",
        description: 'Select "What type of issue are you reporting" → Choose "Impersonation"',
        important: "This is the most important step!",
        color: "purple"
      },
      {
        number: 3,
        title: "Identify Impersonation",
        description: 'Choose "Pretending to be me, my brand or a user that I represent"',
        color: "pink"
      },
      {
        number: 4,
        title: "Complete Form & Submit",
        description: 'Click Next and fill out the form to submit your request',
        color: "orange"
      }
    ],
    finalStep: {
      title: "Complete the Process Here",
      description: "After submitting on Twitter/X, return here and click 'Takedown Submitted' to track your report in our system",
      important: "You must complete both Twitter's reporting AND click 'Takedown Submitted' below"
    }
  }
};

// Color mapping for consistent styling
export const COLOR_CLASSES = {
  blue: {
    bg: 'from-blue-500/5 to-purple-500/5',
    border: 'border-blue-500/20',
    hover: 'hover:border-blue-500/40',
    gradient: 'from-blue-500 to-blue-600',
    ping: 'bg-blue-400'
  },
  purple: {
    bg: 'from-purple-500/5 to-pink-500/5',
    border: 'border-purple-500/20',
    hover: 'hover:border-purple-500/40',
    gradient: 'from-purple-500 to-purple-600',
    ping: 'bg-purple-400'
  },
  pink: {
    bg: 'from-pink-500/5 to-orange-500/5',
    border: 'border-pink-500/20',
    hover: 'hover:border-pink-500/40',
    gradient: 'from-pink-500 to-pink-600',
    ping: 'bg-pink-400'
  },
  orange: {
    bg: 'from-orange-500/5 to-yellow-500/5',
    border: 'border-orange-500/20',
    hover: 'hover:border-orange-500/40',
    gradient: 'from-orange-500 to-orange-600',
    ping: 'bg-orange-400'
  }
};