import { useState } from "react";
import { Link } from "wouter";
import {
  Instagram, Twitter, Facebook, Music, Youtube, MessageCircle,
  Mail, Apple, Chrome
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
  { label: "Listen To Podcast", href: "/wordly-series" },
  { label: "Stories & Articles", href: "/discover" },
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
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">m</span>
                </div>
                <span className="font-bold text-xl tracking-tight">mannuh</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                A community for believers, by believers.
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
                {quickLinks.slice(0, 4).map((link) => (
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
                {quickLinks.slice(4).map((link) => (
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
                <div className="px-4 py-2 bg-muted rounded-lg text-xs font-medium text-muted-foreground">
                  Coming Soon to Google Play
                </div>
                <div className="px-4 py-2 bg-muted rounded-lg text-xs font-medium text-muted-foreground">
                  Coming Soon to App Store
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
