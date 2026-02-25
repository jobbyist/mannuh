import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { 
  HelpCircle, Rocket, Mail, MessageSquare, Sparkles, 
  CheckCircle, Calendar, Send 
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const recentUpdates = [
  {
    id: 1,
    title: "AI Chatbot Enhancement",
    description: "Improved AI responses with preset prompts for common questions",
    date: "February 24, 2026",
    badge: "New"
  },
  {
    id: 2,
    title: "Browse Page Launch",
    description: "Discover mixed content including articles, reels, podcasts, and merchandise",
    date: "February 24, 2026",
    badge: "New"
  },
  {
    id: 3,
    title: "Merchandise Store",
    description: "Shop official mannuh branded merchandise with charitable giving",
    date: "February 24, 2026",
    badge: "New"
  }
];

const upcomingFeatures = [
  {
    id: 1,
    title: "Mobile Apps",
    description: "Native iOS and Android apps for on-the-go access",
    eta: "Q2 2026"
  },
  {
    id: 2,
    title: "Live Streaming",
    description: "Stream live worship services and cell group meetings",
    eta: "Q2 2026"
  },
  {
    id: 3,
    title: "Enhanced Analytics",
    description: "Detailed insights for creators and church administrators",
    eta: "Q3 2026"
  },
  {
    id: 4,
    title: "mannuh for Kids",
    description: "Child-safe content and features for young believers",
    eta: "Q3 2026"
  }
];

const supportContacts = [
  {
    name: "General Support",
    email: "support@mannuh.space",
    description: "For general inquiries, technical issues, and account help"
  },
  {
    name: "Catherine K.",
    email: "catherine@mannuh.space",
    description: "Community manager and creator support"
  },
  {
    name: "Michael C.",
    email: "michael@mannuh.space",
    description: "Technical support and platform development"
  }
];

const faqs = [
  {
    question: "How do I join a cell group?",
    answer: "Navigate to the 'Cell Groups' section from the main menu. Browse available groups and click 'Join' on any group that interests you. You'll be added immediately and can start participating in discussions and meetings."
  },
  {
    question: "What is the Creator Partner Program?",
    answer: "Premium members can enable Creator Mode to post reels, articles, and stories. You earn ad revenue sharing based on views and engagement. Visit the Pricing page to learn more about becoming a Premium member."
  },
  {
    question: "How do subscriptions work?",
    answer: "We offer three tiers: Freemium (free with limited features), Premium ($9.99/month with full access and creator privileges), and Enterprise (custom pricing for churches and organizations). You can cancel anytime."
  },
  {
    question: "Where do charitable donations go?",
    answer: "10% of all proceeds from subscriptions and merchandise are donated to various Christian charitable causes. Details about our charitable giving are outlined in our Whitepaper and Terms of Service."
  },
  {
    question: "Can I suggest a feature?",
    answer: "Absolutely! We love hearing from our community. Use the feedback form below to submit your ideas and suggestions. We review all submissions and prioritize features based on community needs."
  },
  {
    question: "How do I report inappropriate content?",
    answer: "If you encounter content that violates our community guidelines, click the report button on the content or contact our support team at support@mannuh.space. We take all reports seriously."
  },
  {
    question: "What devices are supported?",
    answer: "mannuh currently works on any modern web browser (Chrome, Firefox, Safari, Edge) on desktop and mobile devices. Native iOS and Android apps are coming in Q2 2026."
  },
  {
    question: "How do I delete my account?",
    answer: "Go to Settings > Account > Delete Account. Note that this action is permanent and cannot be undone. All your data will be removed from our systems within 30 days."
  }
];

export default function HelpCenter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="container pt-20 pb-16 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <Badge variant="secondary" className="mb-4">
              Help & Support
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
              <span className="text-primary">Help</span> Center
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about mannuh - from getting started to advanced features
            </p>
          </motion.div>
        </section>

        {/* Recent Updates */}
        <section className="container pb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Recent Updates</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {recentUpdates.map((update, i) => (
                <motion.div
                  key={update.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <Badge className="mb-3">{update.badge}</Badge>
                      <h3 className="font-bold text-foreground mb-2">{update.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{update.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {update.date}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Upcoming Features / Roadmap */}
        <section className="container pb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Upcoming Features</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingFeatures.map((feature, i) => (
                <motion.div
                  key={feature.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-foreground">{feature.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {feature.eta}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Support Team Contacts */}
        <section className="bg-white border-y border-border/50">
          <div className="container py-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Contact Support</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {supportContacts.map((contact, i) => (
                  <motion.div
                    key={contact.email}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i + 1}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-foreground mb-1">{contact.name}</h3>
                        <a 
                          href={`mailto:${contact.email}`}
                          className="text-sm text-primary hover:underline mb-3 block"
                        >
                          {contact.email}
                        </a>
                        <p className="text-xs text-muted-foreground">{contact.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* User Feedback Form */}
        <section className="container py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Send Us Feedback</h2>
            </div>
            
            <Card>
              <CardContent className="p-8">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Thank You!</h3>
                    <p className="text-sm text-muted-foreground">
                      Your feedback has been submitted. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Message
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white border-y border-border/50">
          <div className="container py-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-8 justify-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              </div>
              
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
}
