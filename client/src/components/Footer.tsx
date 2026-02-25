import { useState } from "react";
import { Link } from "wouter";
import {
  Instagram, Twitter, Facebook, Music, Youtube, MessageCircle,
  Mail, Apple, Chrome, CreditCard
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/mannuh.space", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/mannuh.space", label: "Twitter/X" },
  { icon: Facebook, href: "https://facebook.com/mannuh.space", label: "Facebook" },
  { icon: Music, href: "https://tiktok.com/@mannuh.space", label: "TikTok" },
  { icon: Youtube, href: "https://youtube.com/@mannuhspace", label: "YouTube" },
  { icon: MessageCircle, href: "https://wa.me/", label: "WhatsApp" },
  { icon: Music, href: "https://open.spotify.com/", label: "Spotify" },
  { icon: Apple, href: "https://music.apple.com/", label: "Apple Music" },
  { icon: Chrome, href: "https://www.google.com/", label: "Google" },
];

const quickLinks = [
  { label: "About Mannuh", href: "/about" },
  { label: "Cell Groups", href: "/groups" },
  { label: "Reels", href: "/reels" },
  { label: "Browse Content", href: "/browse" },
  { label: "Discover Stories", href: "/discover" },
  { label: "Guided Pathways", href: "/pathways" },
  { label: "Events", href: "/events" },
  { label: "Church Directory", href: "/churches" },
  { label: "Listen To Podcast", href: "/wordly-series" },
  { label: "Merchandise", href: "/merchandise" },
  { label: "Pricing Plans", href: "/pricing" },
];

const communityLinks = [
  { label: "Mannuh for Kids", href: "/kids" },
  { label: "Founding Members", href: "/founding-members" },
  { label: "Help Center", href: "/help" },
  { label: "Advertise With Us", href: "/ads" },
  { label: "Support A Cause", href: "/support" },
  { label: "Business Solutions", href: "/business" },
  { label: "Partner Program", href: "/partner" },
  { label: "Donate/Support", href: "/donate" },
];

const legalPolicies = {
  terms: {
    title: "Terms of Service",
    content: `
# Terms of Service

**Last Updated:** February 24, 2026

## 1. Acceptance of Terms

By accessing and using mannuh ("the Platform"), you accept and agree to be bound by the terms and provisions of this agreement.

## 2. Use License

Permission is granted to temporarily access the Platform for personal, non-commercial use only. This is the grant of a license, not a transfer of title.

## 3. User Accounts

- You must be at least 13 years old to use this Platform
- You are responsible for maintaining the confidentiality of your account
- You are responsible for all activities that occur under your account

## 4. Content Guidelines

All content shared on mannuh must:
- Align with Christian values and principles
- Be respectful and edifying
- Not contain hate speech, profanity, or inappropriate material
- Respect intellectual property rights

## 5. Creator Partner Program

Premium subscribers can enable Creator Mode to:
- Post reels, articles, and stories
- Earn ad revenue sharing
- Access creator analytics

10% of all proceeds are donated to charitable causes as outlined in our Whitepaper.

## 6. Subscription Plans

### Freemium ($0/month)
- Limited access to content and features

### Premium ($9.99/month)
- Full access to all features
- Creator privileges enabled

### Enterprise (Custom pricing)
- For churches and organizations
- Custom solutions and support

## 7. Termination

We reserve the right to terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these Terms.

## 8. Disclaimers

The Platform is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind.

## 9. Limitation of Liability

mannuh and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages.

## 10. Governing Law

These Terms shall be governed by and construed in accordance with applicable laws.

## 11. Contact

For questions about these Terms, contact us at: support@mannuh.space

---

**A Gravitas Industries Initiative. All Rights Reserved.**
    `
  },
  privacy: {
    title: "Privacy Policy",
    content: `
# Privacy Policy

**Last Updated:** February 24, 2026

## 1. Information We Collect

We collect information you provide directly to us when you:
- Create an account
- Use our services
- Communicate with us
- Participate in community activities

### Personal Information
- Name and email address
- Profile information (bio, interests, church affiliation)
- @username for community participation
- Payment information (processed securely through third-party providers)

### Usage Information
- Device information
- Log data
- Location information (with permission)
- Cookies and similar technologies

## 2. How We Use Your Information

We use the information we collect to:
- Provide, maintain, and improve our services
- Process transactions and send notifications
- Respond to your comments and questions
- Send marketing communications (with your consent)
- Monitor and analyze trends, usage, and activities
- Detect and prevent fraud and abuse

## 3. Information Sharing

We do not sell your personal information. We may share information:
- With your consent
- With service providers
- For legal reasons
- In connection with business transfers

## 4. Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate information
- Delete your account and data
- Opt-out of marketing communications
- Control cookie preferences

## 5. Data Security

We implement appropriate security measures to protect your information, but no method of transmission over the internet is 100% secure.

## 6. Children's Privacy

Our Platform is not directed to children under 13. We do not knowingly collect information from children under 13.

## 7. International Data Transfers

Your information may be transferred to and processed in countries other than your own.

## 8. Changes to Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy.

## 9. Contact Us

For privacy-related questions: support@mannuh.space

---

**A Gravitas Industries Initiative. All Rights Reserved.**
    `
  },
  cookies: {
    title: "Cookie Policy",
    content: `
# Cookie Policy

**Last Updated:** February 24, 2026

## What Are Cookies?

Cookies are small text files stored on your device when you visit our Platform. They help us provide you with a better experience.

## Types of Cookies We Use

### Essential Cookies
Required for the Platform to function properly:
- Authentication cookies
- Security cookies
- Load balancing cookies

### Analytics Cookies
Help us understand how visitors use our Platform:
- Google Analytics
- Usage patterns
- Performance metrics

### Functionality Cookies
Remember your preferences:
- Language preference
- Theme selection (light/dark mode)
- Cookie consent choices

### Marketing Cookies
Used to deliver relevant advertisements:
- Social media integration
- Ad targeting
- Conversion tracking

## Managing Cookies

You can control cookies through:
- Your browser settings
- Our cookie preference center
- Opt-out tools provided by third parties

Disabling cookies may affect Platform functionality.

## Third-Party Cookies

Some cookies are placed by third-party services that appear on our pages:
- Social media platforms
- Analytics providers
- Advertising partners

## Cookie Duration

- Session cookies: Deleted when you close your browser
- Persistent cookies: Remain until expiration or deletion

## Updates to Cookie Policy

We may update this policy to reflect changes in our practices or legal requirements.

## Contact

Questions about cookies: support@mannuh.space

---

**A Gravitas Industries Initiative. All Rights Reserved.**
    `
  },
  refunds: {
    title: "Refund Policy",
    content: `
# Refund Policy

**Last Updated:** February 24, 2026

## Subscription Refunds

### Premium Plan ($9.99/month)
- Monthly subscriptions: Refund available within 7 days of initial charge
- Subsequent months: No refunds for partial month usage
- Cancellation: Cancel anytime; access continues until end of billing period

### Annual Plans (if applicable)
- Refund available within 14 days of purchase
- Pro-rated refunds not available after 14-day period

## Donations

### One-Time Donations
- Donations are non-refundable unless made in error
- Contact us within 48 hours for error-related refund requests
- 10% of proceeds go to charitable causes as stated

## Enterprise Solutions

Custom refund terms based on service agreement.

## Requesting a Refund

To request a refund:
1. Email support@mannuh.space
2. Include your account email and reason
3. Allow 5-7 business days for processing

Approved refunds will be issued to the original payment method within 10-14 business days.

## Creator Earnings

Creator Partner Program earnings are non-refundable once paid out.

## Exceptions

Refunds may be denied if:
- Account violated Terms of Service
- Evidence of abuse or fraud
- Beyond refund eligibility period

## Changes to Refund Policy

We reserve the right to modify this policy at any time.

## Contact

Refund inquiries: support@mannuh.space

---

**A Gravitas Industries Initiative. All Rights Reserved.**
    `
  },
  contact: {
    title: "Contact Us",
    content: `
# Contact Us

We'd love to hear from you! Reach out with questions, feedback, or support requests.

## Support Email
**support@mannuh.space**

For general inquiries, technical support, account issues, or feedback.

## Response Time
We aim to respond to all inquiries within 24-48 hours during business days.

## Support Categories

### Technical Support
- Account access issues
- Platform bugs
- Feature requests

### Billing & Subscriptions
- Payment questions
- Refund requests
- Subscription management

### Content & Moderation
- Report inappropriate content
- Appeal moderation decisions
- Content guidelines questions

### Partnership Inquiries
- Creator Partner Program
- Business Solutions
- Sponsorship opportunities

### Media & Press
For media inquiries, please email with "MEDIA" in the subject line.

## Mailing Address
*(To be provided)*

## Social Media
- Instagram: @mannuh.space
- Twitter/X: @mannuh.space
- Facebook: /mannuh.space

## Office Hours
Monday - Friday: 9:00 AM - 5:00 PM (EST)

---

**A Gravitas Industries Initiative. All Rights Reserved.**

*mannuh is a faith-based community platform dedicated to connecting believers worldwide through cell groups, content creation, and shared fellowship.*
    `
  },
  guidelines: {
    title: "Community Guidelines",
    content: `
# Community Guidelines

**Last Updated:** February 25, 2026

Welcome to mannuh! Our community is built on faith, respect, and mutual support. These guidelines ensure that mannuh remains a safe, welcoming space for all believers to connect, share, and grow together.

## Core Principles

### 1. Faith-Centered Interaction
- All interactions should reflect Christian values of love, kindness, and respect
- Content should be edifying and encourage spiritual growth
- Disagreements should be handled with grace and understanding

### 2. Respectful Communication
When interacting with other users, we expect:
- **Respectful dialogue** - Treat others as you would like to be treated
- **Constructive feedback** - Offer criticism in love and with the intent to help
- **Active listening** - Seek to understand before being understood
- **Encouragement** - Build up fellow believers in their faith journey

### 3. Zero Tolerance Policy

mannuh has **zero tolerance** for:

#### Abusive Language or Behavior
- Harassment, bullying, or intimidation of any kind
- Hate speech, discrimination, or prejudice based on race, ethnicity, gender, age, disability, or any other protected characteristic
- Threats of violence or harm
- Sexual harassment or inappropriate advances
- Personal attacks or defamatory statements

**Consequences:** First offense may result in a warning. Repeated offenses will result in permanent account suspension.

#### Unpleasant or Harmful Content
- Explicit or graphic content (sexual, violent, or disturbing)
- Content promoting self-harm or dangerous activities
- Spam, phishing, or fraudulent content
- Misinformation or deliberately false teachings
- Content that glorifies sin or encourages unbiblical behavior

**Consequences:** Immediate content removal. Repeated violations will result in account restrictions or termination.

### 4. Content Creation & Sharing

#### For All Users
- Share content that aligns with Christian values and teachings
- Verify facts before sharing information or teachings
- Give proper attribution when sharing others' work
- Report content that violates these guidelines

#### For Creator Partners (Premium Subscribers)
In addition to the above, creators must:

##### Copyright & Intellectual Property
**Strict compliance required:**

- **Original Content Only** - Share only content you have created or have explicit rights to use
- **No Unauthorized Distribution** - Do not upload, share, or distribute copyrighted or plagiarized content from other platforms without proper authorization
- **Obtain Proper Consent** - Before sharing any third-party content (reels, images, videos, music, artwork, writings, etc.), you must obtain:
  - **Written consent** (e.g., licensing agreement, email permission, signed contract)
  - **Verbal consent** with documented proof (e.g., recorded conversation, witnessed agreement)
  - **Other legally admissible consent** as required by applicable local, national, and international copyright laws

##### What Requires Permission:
- Video clips or reels from social media (Instagram, TikTok, YouTube, etc.)
- Images or photographs taken by others
- Music, sound recordings, or audio clips
- Artwork, graphics, or designs
- Written content (articles, quotes longer than fair use, books, etc.)
- Any derivative works based on another's intellectual property

##### Fair Use Exceptions:
Limited use may be acceptable under fair use doctrine for:
- Commentary or criticism with proper attribution
- Educational purposes with limited excerpts
- News reporting
- Transformative works that add substantial new meaning

**Note:** Fair use is determined on a case-by-case basis. When in doubt, obtain permission or create original content.

##### Consequences for IP Violations:
- **First Offense:** Content removal + 30-day creator privileges suspension + mandatory copyright training
- **Second Offense:** Content removal + 90-day creator privileges suspension + final warning
- **Third Offense:** Permanent removal from Creator Partner Program + possible account termination
- **Legal Action:** IP owners may pursue legal remedies. mannuh will cooperate fully with copyright holders and legal authorities.

### 5. Privacy & Safety
- Protect your personal information
- Do not share others' private information without consent
- Report suspicious behavior or safety concerns immediately
- Be cautious about meeting online contacts in person

### 6. Platform Integrity
- Do not create multiple accounts to circumvent bans or restrictions
- Do not manipulate engagement metrics (fake likes, follows, comments)
- Do not attempt to access others' accounts or system vulnerabilities
- Do not use automation or bots to interact with the platform

## Reporting Violations

If you encounter content or behavior that violates these guidelines:

1. **Report the content** - Use the report button on posts, comments, or profiles
2. **Block the user** - If you feel unsafe or uncomfortable
3. **Contact support** - For serious concerns: support@mannuh.space

### What to Include in Reports:
- Link to the content or profile
- Description of the violation
- Screenshots or evidence (if applicable)
- Any relevant context

We review all reports within 24-48 hours and take appropriate action.

## Appeals Process

If your content is removed or your account is restricted:

1. **Review the decision** - Check the notification for specific violations
2. **Submit an appeal** - Email support@mannuh.space with:
   - Your account information
   - The content in question
   - Why you believe the decision should be reconsidered
3. **Wait for response** - Appeals are typically reviewed within 5-7 business days

## Content Moderation

Our moderation team:
- Reviews reported content and accounts
- Makes decisions based on these guidelines
- Applies consequences consistently and fairly
- Continuously works to improve platform safety

### Moderation Actions May Include:
- Content removal
- Warning notifications
- Temporary account restrictions
- Suspension of creator privileges
- Permanent account termination

## Supporting Resources

### Need Help?
- **Technical Support:** support@mannuh.space
- **Report Abuse:** Report button on content or support@mannuh.space
- **Mental Health Crisis:** Contact local emergency services or crisis helpline
- **Legal Concerns:** legal@mannuh.space

### Community Resources:
- Help Center: mannuh.space/help
- Creator Guidelines: mannuh.space/creator-guidelines
- Copyright FAQ: mannuh.space/copyright
- Safety Tips: mannuh.space/safety

## Our Commitment

mannuh is committed to:
- **Safety** - Providing a secure environment for all users
- **Integrity** - Enforcing guidelines consistently and transparently
- **Growth** - Supporting spiritual development and community building
- **Excellence** - Continuously improving our platform and policies

## Updates to Guidelines

We may update these guidelines periodically to address new challenges or improve clarity. Significant changes will be announced through:
- Email notification to all users
- In-app announcements
- Posts on our social media channels

Continued use of mannuh after changes constitutes acceptance of updated guidelines.

## Final Note

These guidelines exist to protect our community and honor God through our interactions. By using mannuh, you agree to uphold these standards and help create a positive, faith-filled environment for all.

**Questions?** Contact us at support@mannuh.space

---

**A Gravitas Industries Initiative. All Rights Reserved.**

*"Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone." - Colossians 4:6*
    `
  }
};

type LegalPolicy = keyof typeof legalPolicies;

export default function Footer() {
  const [openPolicy, setOpenPolicy] = useState<LegalPolicy | null>(null);

  return (
    <>
      <footer className="border-t border-border/50 bg-white">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/mannuhlogo.png" alt="mannuh" className="w-8 h-8 object-contain" />
                <span className="font-bold text-xl tracking-tight">mannuh</span>
              </div>
              <p className="text-sm mb-4">
                <strong>Premier Faith-Based Community Platform</strong>
              </p>
              {/* Social Media Links */}
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center"
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Community</h3>
              <ul className="space-y-2">
                {communityLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setOpenPolicy("terms")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setOpenPolicy("privacy")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setOpenPolicy("cookies")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setOpenPolicy("refunds")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    Refund Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setOpenPolicy("guidelines")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    Community Guidelines
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setOpenPolicy("contact")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & App Badges */}
          <div className="border-t border-border/50 pt-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:support@mannuh.space" className="hover:text-primary transition-colors">
                    support@mannuh.space
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://play.google.com/store" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-foreground hover:bg-foreground/90 rounded-lg text-white text-xs font-medium transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] opacity-80">GET IT ON</div>
                    <div className="text-xs font-semibold leading-tight">Google Play</div>
                  </div>
                </a>
                <a 
                  href="https://apps.apple.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-foreground hover:bg-foreground/90 rounded-lg text-white text-xs font-medium transition-colors"
                >
                  <Apple className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-[10px] opacity-80">Download on the</div>
                    <div className="text-xs font-semibold leading-tight">App Store</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border-t border-border/50 pt-8 mb-8">
            <div className="flex flex-col items-center gap-4">
              <p className="text-xs text-muted-foreground font-medium">Accepted Payment Methods</p>
              <div className="flex items-center gap-4 flex-wrap justify-center">
                {/* Visa */}
                <div className="h-8 px-3 bg-white border border-border/50 rounded flex items-center justify-center">
                  <svg className="h-5" viewBox="0 0 48 16" fill="none">
                    <path d="M18.5 0.5L15.5 15.5H11.5L14.5 0.5H18.5Z" fill="#00579F"/>
                    <path d="M31 1C30 0.5 28.5 0 26.5 0C22.5 0 19.5 2 19.5 5C19.5 7.5 21.5 8.5 23 9.5C24.5 10 25 11 25 11.5C25 12.5 24 13 22.5 13C20.5 13 19.5 12.5 18 12L17.5 14.5C19 15 20.5 15.5 22.5 15.5C27 15.5 29.5 13.5 29.5 10.5C29.5 6 24 5.5 24 4C24 3.5 24.5 3 26 3C27.5 3 29 3.5 30 4L31 1Z" fill="#00579F"/>
                    <path d="M37 0.5C36.5 0.5 36 1 35.5 1.5L29 15.5H33.5L34.5 13H40L40.5 15.5H44.5L41 0.5H37ZM37.5 5L39 10H35.5L37.5 5Z" fill="#00579F"/>
                    <path d="M10 0.5L6 11L5.5 9C4.5 6 2 3 0 1.5L4 15.5H8.5L15 0.5H10Z" fill="#00579F"/>
                  </svg>
                </div>
                {/* Mastercard */}
                <div className="h-8 px-3 bg-white border border-border/50 rounded flex items-center justify-center">
                  <svg className="h-5" viewBox="0 0 48 32" fill="none">
                    <circle cx="18" cy="16" r="14" fill="#EB001B"/>
                    <circle cx="30" cy="16" r="14" fill="#F79E1B"/>
                    <path d="M24 6C21 9 19 12.5 19 16.5C19 20.5 21 24 24 27C27 24 29 20.5 29 16.5C29 12.5 27 9 24 6Z" fill="#FF5F00"/>
                  </svg>
                </div>
                {/* American Express */}
                <div className="h-8 px-3 bg-[#006FCF] border border-border/50 rounded flex items-center justify-center">
                  <svg className="h-4" viewBox="0 0 48 16" fill="white">
                    <text x="0" y="12" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white">AMEX</text>
                  </svg>
                </div>
                {/* PayPal */}
                <div className="h-8 px-3 bg-white border border-border/50 rounded flex items-center justify-center">
                  <svg className="h-5" viewBox="0 0 48 16" fill="none">
                    <path d="M18 1H12L8 15H12L13 11H15C19 11 21 9 21.5 5.5C22 2 20 1 18 1Z" fill="#003087"/>
                    <path d="M18 1H12L8 15H12L13 11H15C19 11 21 9 21.5 5.5C22 2 20 1 18 1Z" fill="#009CDE" opacity="0.7"/>
                    <path d="M28 4H22L18 15H22L23 12H25C28 12 30 10.5 30.5 7.5C31 5 29.5 4 28 4Z" fill="#003087"/>
                    <path d="M28 4H22L18 15H22L23 12H25C28 12 30 10.5 30.5 7.5C31 5 29.5 4 28 4Z" fill="#009CDE" opacity="0.7"/>
                  </svg>
                </div>
                {/* Apple Pay */}
                <div className="h-8 px-3 bg-white border border-border/50 rounded flex items-center justify-center gap-1">
                  <Apple className="w-4 h-4" />
                  <span className="text-xs font-semibold">Pay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} mannuh. A Gravitas Industries Initiative. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Legal Policy Modals */}
      <Dialog open={openPolicy !== null} onOpenChange={() => setOpenPolicy(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {openPolicy && (
            <>
              <DialogHeader>
                <DialogTitle>{legalPolicies[openPolicy].title}</DialogTitle>
              </DialogHeader>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {legalPolicies[openPolicy].content}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={() => setOpenPolicy(null)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
