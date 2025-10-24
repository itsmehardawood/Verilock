// lib/platform-instructions.js

// Platform-specific reporting instructions with enhanced structure
export const PLATFORM_INSTRUCTIONS = {
  facebook: {
    steps: [
      {
        number: 1,
        title: "Submit Report via Facebook Help",
        description: 'To report this profile or account, click on the "Report " button and follow the necessary steps.',
        color: "orange",
        url: "https://www.facebook.com/help/174210519303259/?helpref=related_articles",
        urlText: "Report"
      },
      
    ],
    finalStep: {
      title: "Complete the Process Here",
      description: "After submitting on Facebook, return here and click 'Takedown Submitted' to track your report in our system",
      important: "You must complete both Facebook's reporting AND click 'Takedown Submitted' below"
    }
  },
  linkedin: {
    steps: [
      {
        number: 1,
        title: "Submit Report via LinkedIn Help",
        description: 'For additional reporting options or if you encounter issues, use the official LinkedIn reporting form',
        color: "orange",
        url: "https://www.linkedin.com/help/linkedin/answer/a1338436",
        urlText: "Report"
      },
      
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
        title: "In-App Reporting (U.S. Accounts)",
        description: 'To report this profile or account, click on the "Report" button and follow the necessary steps.',
        important: "Use this form for U.S. accounts",
        color: "blue",
        url: "https://www.tiktok.com/legal/report/submit-requests",
        urlText: "U.S. Reporting"
      },
      {
        number: 2,
        title: "Web Reporting (Outside U.S.)",
        description: 'For accounts outside the United States, use this below web reporting form for impersonation reports',
        important: "Use this form for non-U.S. accounts",
        color: "purple",
        url: "https://www.tiktok.com/legal/report/feedback",
        urlText: "International Reporting"
      },
      
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
        title: "Instagram Reporting Page",
        description: "To report this profile or account, click on the 'Report' button and follow the necessary steps.",
        color: "orange",
        url: "https://help.instagram.com/contact/636276399721841",
        urlText: "Report"
      },
      
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
        title: "Official X Reporting Portal",
        description: 'To report this profile or account, click on the "Report" button and follow the necessary steps.',
        color: "blue",
        url: "https://help.x.com/en/rules-and-policies/x-report-violation",
        urlText: "Open X Reporting Panel"
      },
      
    ],
    finalStep: {
      title: "Complete the Process Here",
      description: "After submitting on Twitter/X, return here and click 'Takedown Submitted' to track your report in our system",
      // important: "You must complete both Twitter's reporting AND click 'Takedown Submitted' below"
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