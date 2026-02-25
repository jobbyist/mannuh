import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
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

const aboutLinks = [
  { labelKey: "footer.companyProfile", href: "/about" },
  { labelKey: "footer.foundingMembers", href: "/founding-members" },
  { labelKey: "footer.advertise", href: "/ads" },
  { labelKey: "footer.supportCause", href: "/causes" },
  { labelKey: "footer.businessSolutions", href: "/business" },
  { labelKey: "footer.partnerProgram", href: "/unavailable" },
  { labelKey: "footer.donate", href: "/donate" },
  { labelKey: "footer.helpCenter", href: "/help" },
];

const exploreLinks = [
  { labelKey: "footer.createJoinGroups", href: "/groups" },
  { labelKey: "footer.featuredArticles", href: "/discover" },
  { labelKey: "footer.guidedPathways", href: "/pathways" },
  { labelKey: "footer.discoverEvents", href: "/events" },
  { labelKey: "footer.wordlyPodcast", href: "/wordly-series" },
  { labelKey: "footer.churchDirectory", href: "/churches" },
  { labelKey: "footer.pricingPlans", href: "/pricing" },
  { labelKey: "footer.mannuhStore", href: "/shop" },
];

const quickLinks = [
  { labelKey: "footer.termsOfUse", href: "#", onClick: "terms" },
  { labelKey: "footer.privacyPolicy", href: "#", onClick: "privacy" },
  { labelKey: "footer.cookiePolicy", href: "#", onClick: "cookies" },
  { labelKey: "footer.refundPolicy", href: "#", onClick: "refunds" },
  { labelKey: "footer.community", href: "#", onClick: "guidelines" },
  { labelKey: "footer.contactUs", href: "#", onClick: "contact" },
];

const legalPolicies = {
  terms: {
    title: "Terms of Service",
    content: (
      <>
        <p className="text-xs text-muted-foreground mb-4"><strong>Last Updated:</strong> February 24, 2026</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">1. Acceptance of Terms</h3>
        <p className="mb-4">By accessing and using mannuh ("the Platform"), you accept and agree to be bound by the terms and provisions of this agreement.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">2. Use License</h3>
        <p className="mb-4">Permission is granted to temporarily access the Platform for personal, non-commercial use only. This is the grant of a license, not a transfer of title.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">3. User Accounts</h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>You must be at least 13 years old to use this Platform</li>
          <li>You are responsible for maintaining the confidentiality of your account</li>
          <li>You are responsible for all activities that occur under your account</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">4. Content Guidelines</h3>
        <p className="mb-2">All content shared on mannuh must:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Align with Christian values and principles</li>
          <li>Be respectful and edifying</li>
          <li>Not contain hate speech, profanity, or inappropriate material</li>
          <li>Respect intellectual property rights</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">5. Creator Partner Program</h3>
        <p className="mb-2">Premium subscribers can enable Creator Mode to:</p>
        <ul className="list-disc list-inside mb-2 space-y-1">
          <li>Post reels, articles, and stories</li>
          <li>Earn ad revenue sharing</li>
          <li>Access creator analytics</li>
        </ul>
        <p className="mb-4">10% of all proceeds are donated to charitable causes as outlined in our Whitepaper.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">6. Subscription Plans</h3>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">Freemium ($0/month)</h4>
        <p className="mb-3">Limited access to content and features</p>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Premium ($9.99/month)</h4>
        <ul className="list-disc list-inside mb-3 space-y-1">
          <li>Full access to all features</li>
          <li>Creator privileges enabled</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Enterprise (Custom pricing)</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>For churches and organizations</li>
          <li>Custom solutions and support</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">7. Termination</h3>
        <p className="mb-4">We reserve the right to terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these Terms.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">8. Disclaimers</h3>
        <p className="mb-4">The Platform is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">9. Limitation of Liability</h3>
        <p className="mb-4">mannuh and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">10. Governing Law</h3>
        <p className="mb-4">These Terms shall be governed by and construed in accordance with applicable laws.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">11. Contact</h3>
        <p className="mb-4">For questions about these Terms, contact us at: support@mannuh.space</p>
        
        <hr className="my-4" />
        <p className="text-xs text-muted-foreground text-center"><strong>A Gravitas Industries Initiative. All Rights Reserved.</strong></p>
      </>
    )
  },
  privacy: {
    title: "Privacy Policy",
    content: (
      <>
        <p className="text-xs text-muted-foreground mb-4"><strong>Last Updated:</strong> February 24, 2026</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">1. Information We Collect</h3>
        <p className="mb-2">We collect information you provide directly to us when you:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Create an account</li>
          <li>Use our services</li>
          <li>Communicate with us</li>
          <li>Participate in community activities</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">Personal Information</h4>
        <ul className="list-disc list-inside mb-3 space-y-1">
          <li>Name and email address</li>
          <li>Profile information (bio, interests, church affiliation)</li>
          <li>@username for community participation</li>
          <li>Payment information (processed securely through third-party providers)</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Usage Information</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Device information</li>
          <li>Log data</li>
          <li>Location information (with permission)</li>
          <li>Cookies and similar technologies</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">2. How We Use Your Information</h3>
        <p className="mb-2">We use the information we collect to:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send notifications</li>
          <li>Respond to your comments and questions</li>
          <li>Send marketing communications (with your consent)</li>
          <li>Monitor and analyze trends, usage, and activities</li>
          <li>Detect and prevent fraud and abuse</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">3. Information Sharing</h3>
        <p className="mb-2">We do not sell your personal information. We may share information:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>With your consent</li>
          <li>With service providers</li>
          <li>For legal reasons</li>
          <li>In connection with business transfers</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">4. Your Rights</h3>
        <p className="mb-2">You have the right to:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Delete your account and data</li>
          <li>Opt-out of marketing communications</li>
          <li>Control cookie preferences</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">5. Data Security</h3>
        <p className="mb-4">We implement appropriate security measures to protect your information, but no method of transmission over the internet is 100% secure.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">6. Children's Privacy</h3>
        <p className="mb-4">Our Platform is not directed to children under 13. We do not knowingly collect information from children under 13.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">7. International Data Transfers</h3>
        <p className="mb-4">Your information may be transferred to and processed in countries other than your own.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">8. Changes to Privacy Policy</h3>
        <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">9. Contact Us</h3>
        <p className="mb-4">For privacy-related questions: support@mannuh.space</p>
        
        <hr className="my-4" />
        <p className="text-xs text-muted-foreground text-center"><strong>A Gravitas Industries Initiative. All Rights Reserved.</strong></p>
      </>
    )
  },
  cookies: {
    title: "Cookie Policy",
    content: (
      <>
        <p className="text-xs text-muted-foreground mb-4"><strong>Last Updated:</strong> February 24, 2026</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">What Are Cookies?</h3>
        <p className="mb-4">Cookies are small text files stored on your device when you visit our Platform. They help us provide you with a better experience.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Types of Cookies We Use</h3>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">Essential Cookies</h4>
        <p className="mb-2">Required for the Platform to function properly:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Authentication cookies</li>
          <li>Security cookies</li>
          <li>Load balancing cookies</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Analytics Cookies</h4>
        <p className="mb-2">Help us understand how visitors use our Platform:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Google Analytics</li>
          <li>Usage patterns</li>
          <li>Performance metrics</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Functionality Cookies</h4>
        <p className="mb-2">Remember your preferences:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Language preference</li>
          <li>Theme selection (light/dark mode)</li>
          <li>Cookie consent choices</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Marketing Cookies</h4>
        <p className="mb-2">Used to deliver relevant advertisements:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Social media integration</li>
          <li>Ad targeting</li>
          <li>Conversion tracking</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Managing Cookies</h3>
        <p className="mb-2">You can control cookies through:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Your browser settings</li>
          <li>Our cookie preference center</li>
          <li>Opt-out tools provided by third parties</li>
        </ul>
        <p className="mb-4">Disabling cookies may affect Platform functionality.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Third-Party Cookies</h3>
        <p className="mb-2">Some cookies are placed by third-party services that appear on our pages:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Social media platforms</li>
          <li>Analytics providers</li>
          <li>Advertising partners</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Cookie Duration</h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Session cookies: Deleted when you close your browser</li>
          <li>Persistent cookies: Remain until expiration or deletion</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Updates to Cookie Policy</h3>
        <p className="mb-4">We may update this policy to reflect changes in our practices or legal requirements.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Contact</h3>
        <p className="mb-4">Questions about cookies: support@mannuh.space</p>
        
        <hr className="my-4" />
        <p className="text-xs text-muted-foreground text-center"><strong>A Gravitas Industries Initiative. All Rights Reserved.</strong></p>
      </>
    )
  },
  refunds: {
    title: "Refund Policy",
    content: (
      <>
        <p className="text-xs text-muted-foreground mb-4"><strong>Last Updated:</strong> February 24, 2026</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Subscription Refunds</h3>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">Premium Plan ($9.99/month)</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Monthly subscriptions: Refund available within 7 days of initial charge</li>
          <li>Subsequent months: No refunds for partial month usage</li>
          <li>Cancellation: Cancel anytime; access continues until end of billing period</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Annual Plans (if applicable)</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Refund available within 14 days of purchase</li>
          <li>Pro-rated refunds not available after 14-day period</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Donations</h3>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">One-Time Donations</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Donations are non-refundable unless made in error</li>
          <li>Contact us within 48 hours for error-related refund requests</li>
          <li>10% of proceeds go to charitable causes as stated</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Enterprise Solutions</h3>
        <p className="mb-4">Custom refund terms based on service agreement.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Requesting a Refund</h3>
        <p className="mb-2">To request a refund:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Email support@mannuh.space</li>
          <li>Include your account email and reason</li>
          <li>Allow 5-7 business days for processing</li>
        </ul>
        <p className="mb-4">Approved refunds will be issued to the original payment method within 10-14 business days.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Creator Earnings</h3>
        <p className="mb-4">Creator Partner Program earnings are non-refundable once paid out.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Exceptions</h3>
        <p className="mb-2">Refunds may be denied if:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Account violated Terms of Service</li>
          <li>Evidence of abuse or fraud</li>
          <li>Beyond refund eligibility period</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Changes to Refund Policy</h3>
        <p className="mb-4">We reserve the right to modify this policy at any time.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Contact</h3>
        <p className="mb-4">Refund inquiries: support@mannuh.space</p>
        
        <hr className="my-4" />
        <p className="text-xs text-muted-foreground text-center"><strong>A Gravitas Industries Initiative. All Rights Reserved.</strong></p>
      </>
    )
  },
  contact: {
    title: "Contact Us",
    content: (
      <>
        <p className="mb-4">We'd love to hear from you! Reach out with questions, feedback, or support requests.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Support Email</h3>
        <p className="mb-4"><strong>support@mannuh.space</strong></p>
        <p className="mb-4">For general inquiries, technical support, account issues, or feedback.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Response Time</h3>
        <p className="mb-4">We aim to respond to all inquiries within 24-48 hours during business days.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Support Categories</h3>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">Technical Support</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Account access issues</li>
          <li>Platform bugs</li>
          <li>Feature requests</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Billing & Subscriptions</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Payment questions</li>
          <li>Refund requests</li>
          <li>Subscription management</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Content & Moderation</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Report inappropriate content</li>
          <li>Appeal moderation decisions</li>
          <li>Content guidelines questions</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Partnership Inquiries</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Creator Partner Program</li>
          <li>Business Solutions</li>
          <li>Sponsorship opportunities</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Media & Press</h4>
        <p className="mb-4">For media inquiries, please email with "MEDIA" in the subject line.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Mailing Address</h3>
        <p className="mb-4"><em>(To be provided)</em></p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Social Media</h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Instagram: @mannuh.space</li>
          <li>Twitter/X: @mannuh.space</li>
          <li>Facebook: /mannuh.space</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Office Hours</h3>
        <p className="mb-4">Monday - Friday: 9:00 AM - 5:00 PM (EST)</p>
        
        <hr className="my-4" />
        <p className="text-xs text-muted-foreground text-center"><strong>A Gravitas Industries Initiative. All Rights Reserved.</strong></p>
        <p className="text-xs text-muted-foreground text-center mt-2"><em>mannuh is a faith-based community platform dedicated to connecting believers worldwide through cell groups, content creation, and shared fellowship.</em></p>
      </>
    )
  },
  guidelines: {
    title: "Community Guidelines",
    content: (
      <>
        <p className="text-xs text-muted-foreground mb-4"><strong>Last Updated:</strong> February 25, 2026</p>
        
        <p className="mb-4">Welcome to mannuh! Our community is built on faith, respect, and mutual support. These guidelines ensure that mannuh remains a safe, welcoming space for all believers to connect, share, and grow together.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Core Principles</h3>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">1. Faith-Centered Interaction</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>All interactions should reflect Christian values of love, kindness, and respect</li>
          <li>Content should be edifying and encourage spiritual growth</li>
          <li>Disagreements should be handled with grace and understanding</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">2. Respectful Communication</h4>
        <p className="mb-2">When interacting with other users, we expect:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Respectful dialogue</strong> - Treat others as you would like to be treated</li>
          <li><strong>Constructive feedback</strong> - Offer criticism in love and with the intent to help</li>
          <li><strong>Active listening</strong> - Seek to understand before being understood</li>
          <li><strong>Encouragement</strong> - Build up fellow believers in their faith journey</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">3. Zero Tolerance Policy</h4>
        <p className="mb-4">mannuh has <strong>zero tolerance</strong> for:</p>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">Abusive Language or Behavior</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Harassment, bullying, or intimidation of any kind</li>
          <li>Hate speech, discrimination, or prejudice based on race, ethnicity, gender, age, disability, or any other protected characteristic</li>
          <li>Threats of violence or harm</li>
          <li>Sexual harassment or inappropriate advances</li>
          <li>Personal attacks or defamatory statements</li>
        </ul>
        <p className="mb-4"><strong>Consequences:</strong> First offense may result in a warning. Repeated offenses will result in permanent account suspension.</p>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Unpleasant or Harmful Content</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Explicit or graphic content (sexual, violent, or disturbing)</li>
          <li>Content promoting self-harm or dangerous activities</li>
          <li>Spam, phishing, or fraudulent content</li>
          <li>Misinformation or deliberately false teachings</li>
          <li>Content that glorifies sin or encourages unbiblical behavior</li>
        </ul>
        <p className="mb-4"><strong>Consequences:</strong> Immediate content removal. Repeated violations will result in account restrictions or termination.</p>
        
        <h4 className="text-base font-semibold text-foreground mb-1">4. Content Creation & Sharing</h4>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">For All Users</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Share content that aligns with Christian values and teachings</li>
          <li>Verify facts before sharing information or teachings</li>
          <li>Give proper attribution when sharing others' work</li>
          <li>Report content that violates these guidelines</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">For Creator Partners (Premium Subscribers)</h4>
        <p className="mb-2">In addition to the above, creators must:</p>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">Copyright & Intellectual Property</h4>
        <p className="mb-2"><strong>Strict compliance required:</strong></p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Original Content Only</strong> - Share only content you have created or have explicit rights to use</li>
          <li><strong>No Unauthorized Distribution</strong> - Do not upload, share, or distribute copyrighted or plagiarized content from other platforms without proper authorization</li>
          <li><strong>Obtain Proper Consent</strong> - Before sharing any third-party content (reels, images, videos, music, artwork, writings, etc.), you must obtain:
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
              <li><strong>Written consent</strong> (e.g., licensing agreement, email permission, signed contract)</li>
              <li><strong>Verbal consent</strong> with documented proof (e.g., recorded conversation, witnessed agreement)</li>
              <li><strong>Other legally admissible consent</strong> as required by applicable local, national, and international copyright laws</li>
            </ul>
          </li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">What Requires Permission:</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Video clips or reels from social media (Instagram, TikTok, YouTube, etc.)</li>
          <li>Images or photographs taken by others</li>
          <li>Music, sound recordings, or audio clips</li>
          <li>Artwork, graphics, or designs</li>
          <li>Written content (articles, quotes longer than fair use, books, etc.)</li>
          <li>Any derivative works based on another's intellectual property</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Fair Use Exceptions:</h4>
        <p className="mb-2">Limited use may be acceptable under fair use doctrine for:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Commentary or criticism with proper attribution</li>
          <li>Educational purposes with limited excerpts</li>
          <li>News reporting</li>
          <li>Transformative works that add substantial new meaning</li>
        </ul>
        <p className="mb-4"><strong>Note:</strong> Fair use is determined on a case-by-case basis. When in doubt, obtain permission or create original content.</p>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Consequences for IP Violations:</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>First Offense:</strong> Content removal + 30-day creator privileges suspension + mandatory copyright training</li>
          <li><strong>Second Offense:</strong> Content removal + 90-day creator privileges suspension + final warning</li>
          <li><strong>Third Offense:</strong> Permanent removal from Creator Partner Program + possible account termination</li>
          <li><strong>Legal Action:</strong> IP owners may pursue legal remedies. mannuh will cooperate fully with copyright holders and legal authorities.</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">5. Privacy & Safety</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Protect your personal information</li>
          <li>Do not share others' private information without consent</li>
          <li>Report suspicious behavior or safety concerns immediately</li>
          <li>Be cautious about meeting online contacts in person</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">6. Platform Integrity</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Do not create multiple accounts to circumvent bans or restrictions</li>
          <li>Do not manipulate engagement metrics (fake likes, follows, comments)</li>
          <li>Do not attempt to access others' accounts or system vulnerabilities</li>
          <li>Do not use automation or bots to interact with the platform</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Reporting Violations</h3>
        <p className="mb-2">If you encounter content or behavior that violates these guidelines:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Report the content</strong> - Use the report button on posts, comments, or profiles</li>
          <li><strong>Block the user</strong> - If you feel unsafe or uncomfortable</li>
          <li><strong>Contact support</strong> - For serious concerns: support@mannuh.space</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">What to Include in Reports:</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Link to the content or profile</li>
          <li>Description of the violation</li>
          <li>Screenshots or evidence (if applicable)</li>
          <li>Any relevant context</li>
        </ul>
        <p className="mb-4">We review all reports within 24-48 hours and take appropriate action.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Appeals Process</h3>
        <p className="mb-2">If your content is removed or your account is restricted:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Review the decision</strong> - Check the notification for specific violations</li>
          <li><strong>Submit an appeal</strong> - Email support@mannuh.space with:
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
              <li>Your account information</li>
              <li>The content in question</li>
              <li>Why you believe the decision should be reconsidered</li>
            </ul>
          </li>
          <li><strong>Wait for response</strong> - Appeals are typically reviewed within 5-7 business days</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Content Moderation</h3>
        <p className="mb-2">Our moderation team:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Reviews reported content and accounts</li>
          <li>Makes decisions based on these guidelines</li>
          <li>Applies consequences consistently and fairly</li>
          <li>Continuously works to improve platform safety</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">Moderation Actions May Include:</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Content removal</li>
          <li>Warning notifications</li>
          <li>Temporary account restrictions</li>
          <li>Suspension of creator privileges</li>
          <li>Permanent account termination</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Supporting Resources</h3>
        
        <h4 className="text-base font-semibold text-foreground mb-1 mt-3">Need Help?</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Technical Support:</strong> support@mannuh.space</li>
          <li><strong>Report Abuse:</strong> Report button on content or support@mannuh.space</li>
          <li><strong>Mental Health Crisis:</strong> Contact local emergency services or crisis helpline</li>
          <li><strong>Legal Concerns:</strong> legal@mannuh.space</li>
        </ul>
        
        <h4 className="text-base font-semibold text-foreground mb-1">Community Resources:</h4>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Help Center: mannuh.space/help</li>
          <li>Creator Guidelines: mannuh.space/creator-guidelines</li>
          <li>Copyright FAQ: mannuh.space/copyright</li>
          <li>Safety Tips: mannuh.space/safety</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Our Commitment</h3>
        <p className="mb-2">mannuh is committed to:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Safety</strong> - Providing a secure environment for all users</li>
          <li><strong>Integrity</strong> - Enforcing guidelines consistently and transparently</li>
          <li><strong>Growth</strong> - Supporting spiritual development and community building</li>
          <li><strong>Excellence</strong> - Continuously improving our platform and policies</li>
        </ul>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Updates to Guidelines</h3>
        <p className="mb-2">We may update these guidelines periodically to address new challenges or improve clarity. Significant changes will be announced through:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Email notification to all users</li>
          <li>In-app announcements</li>
          <li>Posts on our social media channels</li>
        </ul>
        <p className="mb-4">Continued use of mannuh after changes constitutes acceptance of updated guidelines.</p>
        
        <h3 className="text-lg font-bold text-foreground mb-2">Final Note</h3>
        <p className="mb-4">These guidelines exist to protect our community and honor God through our interactions. By using mannuh, you agree to uphold these standards and help create a positive, faith-filled environment for all.</p>
        <p className="mb-4"><strong>Questions?</strong> Contact us at support@mannuh.space</p>
        
        <hr className="my-4" />
        <p className="text-xs text-muted-foreground text-center"><strong>A Gravitas Industries Initiative. All Rights Reserved.</strong></p>
        <p className="text-xs text-muted-foreground text-center mt-2"><em>"Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone." - Colossians 4:6</em></p>
      </>
    )
  }
};

type LegalPolicy = keyof typeof legalPolicies;

export default function Footer() {
  const [openPolicy, setOpenPolicy] = useState<LegalPolicy | null>(null);
  const { t } = useTranslation();

  return (
    <>
      <footer className="border-t border-border/50 bg-white">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="col-span-1">
              <div className="mb-4">
                <img src="/mannuhlogo.png" alt="mannuh logo" style={{ width: '175px', height: 'auto' }} />
              </div>
              <p className="text-sm mb-4">
                <strong>{t("footer.premierPlatform")}</strong>
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

            {/* ABOUT */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t("footer.about")}</h3>
              <ul className="space-y-2">
                {aboutLinks.map((link) => (
                  <li key={link.labelKey}>
                    <Link href={link.href}>
                      <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {t(link.labelKey)}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* EXPLORE */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t("footer.explore")}</h3>
              <ul className="space-y-2">
                {exploreLinks.map((link) => (
                  <li key={link.labelKey}>
                    <Link href={link.href}>
                      <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {t(link.labelKey)}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t("footer.quickLinks")}</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.labelKey}>
                    <button
                      onClick={() => setOpenPolicy(link.onClick as LegalPolicy)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      {t(link.labelKey)}
                    </button>
                  </li>
                ))}
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
              <p className="text-xs text-muted-foreground font-medium">{t("footer.acceptedPayment")}</p>
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
            <p>© {new Date().getFullYear()} {t("footer.copyright")}</p>
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
              <div className="prose prose-sm max-w-none text-muted-foreground">
                {legalPolicies[openPolicy].content}
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
