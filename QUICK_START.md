# Quick Start Guide - New Features

## 🎯 Overview

This guide provides a quick reference for all the new features added to the Mannuh platform.

## 🚀 Feature Locations

### Homepage Enhancements

1. **Preloader** - Appears on first visit
   - 5-second animation with Bible verse
   - Session-based (won't show on refresh)

2. **Logo Reel** - Below hero section
   - Rotating partner logos every 3 seconds
   - Located between hero and features

3. **Cookie Banner** - Bottom of screen
   - Shows on first visit and every 30 days
   - Customizable preferences

4. **Enhanced Footer** - Bottom of all pages
   - Social media links
   - Legal pages (modal popups)
   - Quick links
   - App store badges

### New Pages

```
/pricing     - Pledges and subscription plans
/kids        - Mannuh for Kids landing page
/settings    - Comprehensive user settings
```

### Global Components

1. **Language Picker** - Top right header
   - Globe icon
   - 6 language options

2. **Theme Toggle** - Top right header
   - Moon/Sun icon
   - Light/Dark mode switch

3. **AI Chatbot** - Floating button (bottom right)
   - Click to open chat window
   - Minimizable and closable
   - Quick action buttons

4. **PWA Install Prompt** - Auto-appears after 30 seconds
   - Desktop and mobile support
   - iOS-specific instructions

## 📱 Mobile Responsiveness

All new features are fully responsive:
- Footer stacks on mobile
- Settings tabs collapse appropriately
- Chat window adjusts for small screens
- Logo reel adapts to screen size

## 🎨 Design System

All components use:
- **Colors:** Primary purple (#7c3aed), muted grays
- **Typography:** Inter & DM Sans fonts
- **Components:** Radix UI primitives
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 🔑 Key User Flows

### 1. First-Time Visitor
```
Homepage → Preloader (5s) → Cookie Banner → Browse Content
                    ↓
              (After 30s)
                    ↓
           PWA Install Prompt
```

### 2. Upgrade to Premium
```
Any Page → Pricing Link → Choose Plan → (Payment Integration)
```

### 3. Profile Setup
```
Login → Settings → Profile Tab → Fill Details → Save
```

### 4. Get Help
```
Any Page → AI Chat Button → Ask Question → Get Response
```

## 📊 Analytics Events to Track

Recommend tracking:
- Preloader completion rate
- Cookie consent choices
- PWA install acceptance rate
- Chatbot usage frequency
- Settings page engagement
- Pricing page conversions

## 🔧 Environment Variables

Add these for full functionality:

```env
# Gemini AI (for chatbot)
GEMINI_API_KEY=your_key_here

# Payment processor
STRIPE_PUBLIC_KEY=your_key_here
STRIPE_SECRET_KEY=your_key_here
```

## 📝 Content to Update

Before production, customize:

1. **Footer.tsx**
   - Social media URLs
   - Legal policy content
   - Quick links destinations

2. **LogoReel.tsx**
   - Replace placeholder logos
   - Update partner information

3. **Preloader.tsx**
   - Add/modify Bible verses
   - Adjust timing if needed

4. **PWA Icons**
   - Replace icon placeholders
   - Use actual app icons

## 🧪 Testing Checklist

- [ ] All new routes accessible
- [ ] Footer links working
- [ ] Legal modals open/close
- [ ] Cookie banner persists choices
- [ ] Preloader shows once per session
- [ ] Language picker changes selection
- [ ] Theme toggle works
- [ ] Chatbot opens/closes/minimizes
- [ ] PWA prompt appears (wait 30s)
- [ ] Settings tabs all functional
- [ ] Mobile layout looks good
- [ ] All animations smooth

## 🆘 Common Issues

**Preloader not showing?**
- Clear sessionStorage
- Hard refresh (Ctrl+Shift+R)

**Cookie banner reappearing?**
- Check localStorage
- Should persist for 30 days

**PWA prompt not showing?**
- Wait 30 seconds after page load
- Check browser supports PWA
- Try in incognito mode

**Chatbot not responding?**
- Currently uses simulated responses
- Gemini API needs to be integrated

## 📚 Component Props Reference

### Footer
```tsx
<Footer />
// No props - self-contained component
```

### Preloader
```tsx
<Preloader onComplete={() => void} />
// onComplete: Callback when loading finishes
```

### AIChatbot
```tsx
<AIChatbot />
// No props - manages own state
```

### LogoReel
```tsx
<LogoReel />
// No props - auto-rotates logos
```

### CookieBanner
```tsx
<CookieBanner />
// No props - manages own state
```

### PWAInstallPrompt
```tsx
<PWAInstallPrompt />
// No props - auto-detects install capability
```

## 🎓 Learning Resources

To modify these features:

1. **React Hooks** - State management used throughout
2. **Framer Motion** - Animation library
3. **Radix UI** - Component primitives
4. **TailwindCSS** - Styling system
5. **Wouter** - Routing library

## 💡 Tips

1. **Performance**: Preloader caches visit in sessionStorage
2. **Accessibility**: All components keyboard-navigable
3. **SEO**: PWA manifest enhances discoverability
4. **UX**: Cookie banner doesn't block content
5. **Engagement**: Chatbot provides instant help

## 🔄 Update Frequency

Recommend updating:
- Legal policies: Quarterly
- Bible verses: Annually  
- Partner logos: As needed
- Social links: As launched
- Pricing: As changed

---

For detailed technical documentation, see `IMPLEMENTATION_SUMMARY.md`
