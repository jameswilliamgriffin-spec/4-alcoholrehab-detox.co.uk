"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock3,
  ExternalLink,
  Facebook,
  HeartHandshake,
  Home,
  Instagram,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  Sun,
  Sunrise,
  Sunset,
  Users,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const mainSiteUrl = "https://thewellbourneclinic.co.uk/";
const contactUrl = "https://thewellbourneclinic.co.uk/contact/";
const phoneNumber = "0330 043 1715";
const phoneHref = "tel:+443300431715";
const emailAddress = "info@thewellbourneclinic.com";
const whatsappUrl = "https://wa.me/447491358745";
const facebookUrl =
  "https://www.facebook.com/people/The-Wellbourne-Clinic/61570002121911/";
const instagramUrl = "https://www.instagram.com/thewellbourneclinic/";
const address = "43 Waverley Rd, Kenilworth CV8 1JL";
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeIn = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-90px" },
  transition: { duration: 0.75, ease: smoothEase },
};

const heroImages = [
  {
    src: "/new images/1.jpg",
    alt: "A private one-to-one therapy conversation in a calm room",
    label: "Personal support",
    caption: "Private conversations shaped around your needs and recovery goals.",
  },
  {
    src: "/new images/2.jpg",
    alt: "A peaceful waterside setting surrounded by mature trees",
    label: "Space to breathe",
    caption: "A calmer environment with room to pause, reflect and reset.",
  },
  {
    src: "/new images/3.jpg",
    alt: "Steps leading through a peaceful autumn landscape",
    label: "Steps forward",
    caption: "Recovery approached one manageable, supported step at a time.",
  },
  {
    src: "/new images/care_alcohol_rehab_warwickshire.jpg",
    alt: "A quiet tree-lined path covered with autumn leaves",
    label: "A restorative setting",
    caption: "Natural surroundings that offer a little distance from daily pressures.",
  },
  {
    src: "/images/clinic-room.jpg",
    alt: "A private room at The Wellbourne Clinic",
    label: "Private rooms",
    caption: "Comfortable spaces that feel settled before care begins.",
  },
  {
    src: "/images/clinic-lounge.jpg",
    alt: "A calm lounge space at The Wellbourne Clinic",
    label: "Residential calm",
    caption: "Shared spaces designed for privacy, routine and quiet support.",
  },
];

const heroProofs = [
  {
    title: "Private",
    text: "Discreet enquiries, confidential conversations and a calmer first step.",
    icon: LockKeyhole,
  },
  {
    title: "Residential",
    text: "Structured care in a comfortable setting away from daily triggers.",
    icon: Home,
  },
  {
    title: "Personal",
    text: "Treatment planning shaped around your history, needs and recovery goals.",
    icon: Sparkles,
  },
];

const faqCardMessages = ["Talk to us now", "We are here to Help"];

const dayModes = [
  {
    id: "pre-dawn",
    label: "Pre-dawn",
    icon: Moon,
    background:
      "linear-gradient(180deg, #090d22 0%, #1c1d4a 44%, #4d3f77 100%)",
    glow: "rgba(113, 93, 255, 0.44)",
    line: "rgba(153, 136, 255, 0.42)",
    node: "#c8bcff",
    accent: "#9f8cff",
  },
  {
    id: "early-morning",
    label: "Early morning",
    icon: Sunrise,
    background:
      "linear-gradient(180deg, #dceaff 0%, #f6e7d2 45%, #f4b48f 100%)",
    glow: "rgba(241, 152, 133, 0.5)",
    line: "rgba(155, 105, 255, 0.34)",
    node: "#7b4cff",
    accent: "#f19885",
  },
  {
    id: "midday",
    label: "Midday",
    icon: Sun,
    background:
      "linear-gradient(180deg, #eef8ff 0%, #d9f1f0 48%, #fff0bf 100%)",
    glow: "rgba(255, 203, 104, 0.42)",
    line: "rgba(48, 112, 194, 0.32)",
    node: "#2f74c0",
    accent: "#e4a431",
  },
  {
    id: "sunset",
    label: "Sunset",
    icon: Sunset,
    background:
      "linear-gradient(180deg, #efe7ff 0%, #dbb8ff 44%, #f5a983 100%)",
    glow: "rgba(241, 152, 133, 0.62)",
    line: "rgba(77, 55, 210, 0.38)",
    node: "#4c37d2",
    accent: "#f19885",
  },
  {
    id: "night",
    label: "Night",
    icon: Moon,
    background:
      "linear-gradient(180deg, #030711 0%, #071326 52%, #11243a 100%)",
    glow: "rgba(81, 145, 255, 0.32)",
    line: "rgba(118, 174, 255, 0.38)",
    node: "#9fc9ff",
    accent: "#7ab0ff",
  },
];

const recoveryFieldNodes = Array.from({ length: 118 }, (_, index) => {
  const progress = index / 117;
  const angle = -166 + progress * 152 + Math.sin(index * 1.72) * 8;
  const distance = 96 + ((index * 37) % 280) + Math.sin(index * 0.8) * 24;
  const radians = (angle * Math.PI) / 180;
  const x = 450 + Math.cos(radians) * distance;
  const y = 420 + Math.sin(radians) * distance;

  return {
    id: index,
    x,
    y,
    opacity: 0.22 + ((index * 17) % 54) / 100,
    width: index % 6 === 0 ? 1.3 : 0.72,
    radius: index % 9 === 0 ? 3.1 : index % 4 === 0 ? 2.3 : 1.7,
    delay: (index % 18) * 0.12,
  };
});

const trustCards = [
  {
    title: "Private from the first call",
    text: "Your enquiry stays confidential. We’ll listen without judgement and help you understand your options.",
    icon: LockKeyhole,
  },
  {
    title: "Expert care, clearly explained",
    text: "Our experienced team plans detox and treatment around your health, circumstances and recovery goals.",
    icon: Stethoscope,
  },
  {
    title: "A calm place to recover",
    text: "Our comfortable residential setting gives you space away from everyday pressures, with support close by.",
    icon: Home,
  },
  {
    title: "Built around the person",
    text: "We see you as a person, not an addiction. Your treatment and aftercare are shaped around what you need.",
    icon: HeartHandshake,
  },
];

const googleReviews = [
  {
    name: "Thom Sundblad",
    meta: "Local Guide • 36 reviews • 55 photos",
    date: "9 weeks ago",
    quote: "Excellent staff and excellent therapy. I highly recommend Wellbourne.",
  },
  {
    name: "Paul B",
    meta: "1 review • 0 photos",
    date: "12 weeks ago",
    quote:
      "The Wellbourne Clinic has truly given me the opportunity to turn my life around and I cannot recommend them enough.",
  },
  {
    name: "Rob Jenkins",
    meta: "3 reviews • 1 photo",
    date: "16 weeks ago",
    quote:
      "Where do I start regarding my stay at The Wellbourne Clinic? It was a truly excellent experience.",
  },
  {
    name: "Darren Gilbert",
    meta: "1 review • 0 photos",
    date: "17 weeks ago",
    quote:
      "The Wellbourne Clinic is the place to be if you want to sort your life out. I spent 5 weeks there.",
  },
  {
    name: "Aj",
    meta: "5 reviews • 0 photos",
    date: "19 weeks ago",
    quote:
      "Thank you all at The Wellbourne Clinic for everything you have done for me mentally. The care and compassion...",
  },
  {
    name: "tyler higginson",
    meta: "1 review • 0 photos",
    date: "22 weeks ago",
    quote:
      "I can’t put it into words how much I feel this place has helped me.",
  },
  {
    name: "Stephen Hodgkiss",
    meta: "2 reviews • 0 photos",
    date: "26 weeks ago",
    quote:
      "Can't recommend the Wellbourne Clinic any higher. The staff are extremely knowledgeable and helpful.",
  },
  {
    name: "Tracey Palmer",
    meta: "5 reviews • 6 photos",
    date: "34 weeks ago",
    quote:
      "Brilliant place. My partner went to many rehabs and constantly relapsed. He’s now 2 years sober and loving life again.",
  },
  {
    name: "Steph Kinson",
    meta: "1 review • 0 photos",
    date: "35 weeks ago",
    quote:
      "Absolutely amazing staff, felt completely at home. Great atmosphere, food is outstanding, cannot recommend them enough.",
  },
];

const supportLinks = [
  {
    title: "The Clinic",
    text: "Explore The Wellbourne Clinic, our setting and the care available.",
    href: "https://thewellbourneclinic.co.uk/",
  },
  {
    title: "Alcohol Rehab",
    text: "Private residential care, therapy and practical support for lasting recovery.",
    href: "https://thewellbourneclinic.co.uk/alcohol-rehab/",
  },
  {
    title: "Alcohol Detox",
    text: "Understand medically informed alcohol detox and withdrawal support.",
    href: "https://thewellbourneclinic.co.uk/alcohol-detox/",
  },
  {
    title: "Private Drug Rehab Near Me",
    text: "Confidential residential drug rehab with care shaped around the whole person.",
    href: "https://thewellbourneclinic.co.uk/drug-rehab/",
  },
  {
    title: "Drug Detox",
    text: "Find out how drug detox can be supported in a safer residential setting.",
    href: "https://thewellbourneclinic.co.uk/drug-detox/",
  },
];

const treatmentSteps = [
  {
    title: "A private first conversation",
    text: "We’ll listen to what’s happening, answer your questions and understand the support you may need.",
  },
  {
    title: "Supported detox",
    text: "If detox is needed, it’s planned around your health and withdrawal symptoms, with comfort and safety in mind.",
  },
  {
    title: "Therapy and understanding",
    text: "One-to-one and group therapy help you understand patterns, recognise triggers and find practical ways forward.",
  },
  {
    title: "Recovery planning",
    text: "Together, we’ll build a realistic plan for daily life, relationships, wellbeing and preventing relapse.",
  },
  {
    title: "Ongoing support",
    text: "Support doesn’t stop when treatment ends. Aftercare helps you stay connected to your recovery.",
  },
];

const reasons = [
  {
    title: "Small enough to be known",
    text: "With a small number of residents, our team can get to know you and provide more personal support.",
    icon: Users,
  },
  {
    title: "Privacy and a steady routine",
    text: "Your days have a clear structure, with time for therapy, rest, reflection and connection.",
    icon: ShieldCheck,
  },
  {
    title: "Care beyond detox",
    text: "Detox is only one part of recovery. We help you prepare for life after treatment and the challenges it may bring.",
    icon: BadgeCheck,
  },
  {
    title: "A welcoming environment",
    text: "Comfortable rooms, shared spaces and compassionate conversations help you feel safe and supported.",
    icon: Sparkles,
  },
];

const articles = [
  {
    title: "The Wellbourne Clinic individual addiction recovery",
    category: "Recovery approach",
    readTime: "Featured",
    image: "/images/article-detox.jpg",
    text: "How personal treatment planning shapes care at The Wellbourne Clinic.",
    href: "https://thewellbourneclinic.co.uk/the-wellbourne-clinic-individual-addiction-recovery/",
    tone: "from-[#12352f]/10 via-[#12352f]/18 to-[#07120f]/90",
  },
  {
    title: "The 12 steps of recovery explained",
    category: "Recovery guide",
    readTime: "Popular",
    image: "/images/article-withdrawal.jpg",
    text: "A clear introduction to the 12-step model and how it supports change.",
    href: "https://thewellbourneclinic.co.uk/the-12-steps-of-recovery-explained/",
    tone: "from-[#283241]/10 via-[#283241]/20 to-[#080b12]/90",
  },
  {
    title: "Replace drink: healthier ways to relax",
    category: "Alcohol support",
    readTime: "Popular",
    image: "/images/article-rehab.jpg",
    text: "Practical alternatives for winding down without relying on alcohol.",
    href: "https://thewellbourneclinic.co.uk/replace-drink-healthier-ways-relax/",
    tone: "from-[#472f21]/10 via-[#472f21]/24 to-[#120905]/90",
  },
  {
    title: "Alcohol Dependence: understanding the signs",
    category: "Alcohol education",
    readTime: "Popular",
    image: "/images/article-inpatient.jpg",
    text: "A plain-English guide to alcohol dependence, addiction and when support may help.",
    href: "https://thewellbourneclinic.co.uk/alcohol-addiction-vs-dependence-differences/",
    tone: "from-[#1f3848]/10 via-[#1f3848]/22 to-[#071018]/90",
  },
  {
    title: "Alcohol detox and rehab services",
    category: "Start here",
    readTime: "Core page",
    image: "/images/article-help.jpg",
    text: "Explore the main Wellbourne Clinic website for treatment options and next steps.",
    href: "https://thewellbourneclinic.co.uk/alcohol-rehab/",
    tone: "from-[#3d3325]/10 via-[#3d3325]/18 to-[#14100b]/90",
  },
];

const faqs = [
  {
    question: "How can I find Alcohol Rehab Near Me?",
    answer:
      "You may want care that is easy to reach while still giving you privacy and space from everyday pressures. The Wellbourne Clinic is a private residential alcohol rehab in Kenilworth, Warwickshire, with access from Birmingham and across the UK. We’ll talk through whether our setting and support are right for you.",
  },
  {
    question: "What does Private Rehab UK treatment include?",
    answer:
      "Private rehab in the UK can include a personal assessment, supported detox when needed, one-to-one and group therapy, a structured residential routine and aftercare planning. At Wellbourne, your programme is built around you rather than a one-size-fits-all approach.",
  },
  {
    question: "How much does rehab cost?",
    answer:
      "The cost depends on the length of your stay and the support you need. A confidential conversation lets us explain the options and costs clearly, with no pressure to make an immediate decision.",
  },
  {
    question: "How long does detox take?",
    answer:
      "Alcohol detox often takes several days, but the exact timescale varies. Drinking history, physical health, medication needs and previous withdrawal symptoms can all affect the plan.",
  },
  {
    question: "Is treatment confidential?",
    answer:
      "Yes. Your enquiry and treatment are handled privately. We want you to feel safe enough to speak openly, ask questions and take the next step at your own pace.",
  },
  {
    question: "Can family members be involved?",
    answer:
      "Family involvement can be helpful when it is appropriate and agreed with the person in treatment. The team can also offer guidance to relatives who are worried about someone they love.",
  },
  {
    question: "What happens after rehab?",
    answer:
      "Before you leave, we’ll help you build a recovery plan for ongoing support, daily routines, relationships and relapse prevention. Recovery is a journey, and support shouldn’t simply end when your residential stay does.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 inline-flex rounded-full border border-graphite/10 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-ink shadow-sm backdrop-blur">
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  text: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      {...fadeIn}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-5xl"}
    >
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="text-balance break-words font-heading text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.04em] text-graphite md:text-[4rem] md:tracking-[-0.045em]">
        {title}
      </h2>
      <p className="mt-5 max-w-4xl text-pretty text-lg leading-8 text-muted md:text-xl">
        {text}
      </p>
    </motion.div>
  );
}

function GoogleLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.52h11.84a10.12 10.12 0 0 1-4.4 6.64v5.52h7.12c4.16-3.84 6.56-9.5 6.56-16.18Z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.96 14.56-5.32l-7.12-5.52c-1.98 1.32-4.5 2.1-7.44 2.1-5.74 0-10.6-3.88-12.34-9.08H4.3v5.7A22 22 0 0 0 24 46Z"
      />
      <path
        fill="#FBBC05"
        d="M11.66 28.18A13.22 13.22 0 0 1 10.96 24c0-1.44.25-2.84.7-4.18v-5.7H4.3A22 22 0 0 0 2 24c0 3.54.84 6.9 2.3 9.88l7.36-5.7Z"
      />
      <path
        fill="#EA4335"
        d="M24 10.74c3.24 0 6.14 1.12 8.42 3.3l6.3-6.3C34.9 4.18 29.92 2 24 2A22 22 0 0 0 4.3 14.12l7.36 5.7C13.4 14.62 18.26 10.74 24 10.74Z"
      />
    </svg>
  );
}

export function WellbourneMicrosite() {
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const [activeSupportImage, setActiveSupportImage] = useState(0);
  const [activeFaqMessage, setActiveFaqMessage] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [activeDayMode, setActiveDayMode] = useState("sunset");
  const [isReviewPaused, setIsReviewPaused] = useState(false);
  const [isArticleRailPaused, setIsArticleRailPaused] = useState(false);
  const articleRailRef = useRef<HTMLDivElement>(null);
  const activeDay =
    dayModes.find((mode) => mode.id === activeDayMode) ?? dayModes[3];
  const ActiveDayIcon = activeDay.icon;
  const isDarkDayMode =
    activeDayMode === "pre-dawn" || activeDayMode === "night";
  const shouldReduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const headerBackground = useTransform(
    scrollY,
    [0, 180],
    ["rgba(247, 244, 238, 0.72)", "rgba(247, 244, 238, 0.9)"],
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 180],
    ["0 0 0 rgba(17,24,39,0)", "0 18px 50px rgba(17,24,39,0.08)"],
  );
  const heroPointerX = useMotionValue(0);
  const heroPointerY = useMotionValue(0);
  const heroRotateX = useSpring(
    useTransform(heroPointerY, [-1, 1], shouldReduceMotion ? [0, 0] : [2.2, -2.2]),
    { stiffness: 140, damping: 22 },
  );
  const heroRotateY = useSpring(
    useTransform(heroPointerX, [-1, 1], shouldReduceMotion ? [0, 0] : [-2.8, 2.8]),
    { stiffness: 140, damping: 22 },
  );
  const heroImageX = useSpring(
    useTransform(heroPointerX, [-1, 1], shouldReduceMotion ? [0, 0] : [-10, 10]),
    { stiffness: 120, damping: 24 },
  );
  const heroImageY = useSpring(
    useTransform(heroPointerY, [-1, 1], shouldReduceMotion ? [0, 0] : [-8, 8]),
    { stiffness: 120, damping: 24 },
  );

  const handleHeroPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    heroPointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    heroPointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const resetHeroPointer = () => {
    heroPointerX.set(0);
    heroPointerY.set(0);
  };

  const handleSpotlightMove = (event: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spotlight-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--spotlight-y",
      `${event.clientY - rect.top}px`,
    );
  };

  const showPreviousReview = () => {
    setActiveReview((current) =>
      current === 0 ? googleReviews.length - 1 : current - 1,
    );
  };

  const showNextReview = () => {
    setActiveReview((current) => (current + 1) % googleReviews.length);
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % heroImages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || isReviewPaused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % googleReviews.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [isReviewPaused, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveSupportImage((current) => (current + 1) % heroImages.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || isArticleRailPaused) {
      return undefined;
    }

    const rail = articleRailRef.current;
    if (!rail) {
      return;
    }

    const timer = window.setInterval(() => {
      const firstCard = rail.querySelector<HTMLElement>(".article-card");
      const scrollDistance = firstCard
        ? firstCard.offsetWidth + 28
        : Math.round(rail.clientWidth * 0.82);
      const halfway = rail.scrollWidth / 2;

      if (rail.scrollLeft >= halfway - scrollDistance) {
        rail.scrollTo({ left: 0, behavior: "auto" });
      } else {
        rail.scrollBy({ left: scrollDistance, behavior: "smooth" });
      }
    }, 2000);

    return () => window.clearInterval(timer);
  }, [isArticleRailPaused, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveFaqMessage((current) => (current + 1) % faqCardMessages.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <main className="min-h-screen overflow-hidden bg-cream text-graphite">
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/55 backdrop-blur-2xl"
        style={{ backgroundColor: headerBackground, boxShadow: headerShadow }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-brand to-transparent"
          style={{ scaleX: progressScaleX }}
        />
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8"
        >
          <a
            href="#top"
            className="group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <Image
              src="/mainlogo.png"
              alt="The Wellbourne Clinic"
              width={280}
              height={42}
              className="h-auto w-[210px] transition duration-300 group-hover:opacity-80 sm:w-[280px]"
              priority
            />
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-muted lg:flex">
            <a href="#help" className="transition hover:text-graphite">
              Support
            </a>
            <a href="#treatment" className="transition hover:text-graphite">
              Journey
            </a>
            <a href="#articles" className="transition hover:text-graphite">
              Advice
            </a>
            <a href="#faqs" className="transition hover:text-graphite">
              FAQs
            </a>
          </div>
          <Button asChild size="sm">
            <a href={contactUrl} className="px-5">
              <span className="hidden sm:inline">Speak privately</span>
              <span className="sm:hidden">Call</span>
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
        </nav>
      </motion.header>

      <section id="top" className="relative px-5 pb-20 pt-32 md:px-8 md:pb-28">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="soft-grid absolute inset-x-0 top-0 h-[720px] opacity-50" />
          <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: smoothEase }}
          >
            <SectionLabel>Private Rehab UK • Kenilworth, Warwickshire</SectionLabel>
            <h1 className="max-w-5xl text-balance break-words font-heading text-[2.75rem] font-semibold leading-[1] tracking-[-0.052em] text-graphite sm:text-[3.45rem] md:text-[5.35rem] md:leading-[0.98] md:tracking-[-0.06em]">
              Private Alcohol Rehab with care that sees the whole person.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-xl leading-9 text-muted">
              If you’re searching for Alcohol Rehab Near Me, you don’t have to
              make sense of everything alone. The Wellbourne Clinic offers
              confidential detox, therapy and residential support in a calm,
              welcoming setting.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href={contactUrl}>
                  Speak to our team <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={mainSiteUrl}>
                  Visit thewellbourneclinic.co.uk <ChevronRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <dl className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
              {heroProofs.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/80 bg-white/60 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  <item.icon className="mb-5 h-5 w-5 text-brand" />
                  <dt className="text-xl font-semibold tracking-[-0.03em]">
                    {item.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-muted">
                    {item.text}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: smoothEase }}
            className="relative"
            style={{ perspective: 1200 }}
            onPointerMove={handleHeroPointerMove}
            onPointerLeave={resetHeroPointer}
          >
            <div className="absolute -left-4 top-12 z-10 hidden rounded-2xl border border-white/70 bg-white/80 p-4 shadow-card backdrop-blur md:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Enquiries
                  </p>
                  <p className="text-sm font-semibold">Handled privately</p>
                </div>
              </div>
            </div>
            <motion.div
              className="relative aspect-[4/4.55] overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-soft md:aspect-[4/4.25]"
              style={{
                rotateX: heroRotateX,
                rotateY: heroRotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {heroImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  initial={false}
                  animate={{
                    opacity: activeHeroImage === index ? 1 : 0,
                    scale: activeHeroImage === index ? 1 : 1.035,
                  }}
                  transition={{ duration: 0.9, ease: smoothEase }}
                  className="absolute inset-0"
                  style={{
                    x: heroImageX,
                    y: heroImageY,
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={index === 0}
                  />
                </motion.div>
              ))}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0)_42%,rgba(17,24,39,0.72)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                  {heroImages[activeHeroImage].label}
                </p>
                <p className="mt-2 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em]">
                  {heroImages[activeHeroImage].caption}
                </p>
                <div className="mt-6 flex gap-2">
                  {heroImages.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      aria-label={`Show ${image.label}`}
                      onClick={() => setActiveHeroImage(index)}
                      className={`h-2 rounded-full transition-all ${
                        activeHeroImage === index
                          ? "w-8 bg-white"
                          : "w-2 bg-white/45 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 right-5 min-w-[214px] rounded-3xl border border-white bg-white p-6 shadow-[0_28px_80px_rgba(17,24,39,0.24)] ring-1 ring-graphite/10"
            >
              <div
                className="flex w-full items-center justify-between text-[#F19885]"
                aria-hidden="true"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-6 w-6 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-base font-extrabold tracking-[-0.02em] text-[#111827]">
                5-star Google reviews
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <motion.p
          {...fadeIn}
          className="mx-auto max-w-5xl text-center text-2xl font-semibold leading-tight tracking-[-0.035em] text-graphite md:text-4xl"
        >
          Contact us today on{" "}
          <a
            href={phoneHref}
            className="text-brand underline decoration-brand/35 underline-offset-8 transition hover:text-[#e88975]"
          >
            {phoneNumber}
          </a>{" "}
          for a free, confidential conversation. We’ll listen and guide you
          through your options whenever you’re ready.
        </motion.p>
      </section>

      <section className="px-5 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 md:grid-cols-4">
            {trustCards.map((item, index) => (
              <motion.div
                key={item.title}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.06 }}
              >
                <Card
                  onPointerMove={handleSpotlightMove}
                  className="premium-spotlight h-full border-white/80 bg-white/62 shadow-none backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card"
                >
                  <CardContent className="p-6">
                    <item.icon className="mb-8 h-5 w-5 text-brand" />
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted md:text-base">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeIn} className="mt-8 flex justify-center">
            <Button asChild variant="secondary">
              <a href={contactUrl}>
                Ask a confidential question <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <motion.div
          {...fadeIn}
          onPointerEnter={() => setIsReviewPaused(true)}
          onPointerLeave={() => setIsReviewPaused(false)}
          onFocus={() => setIsReviewPaused(true)}
          onBlur={() => setIsReviewPaused(false)}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/75 bg-[#f4efea] p-5 shadow-soft md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(241,152,133,0.2),transparent_32%),radial-gradient(circle_at_82%_24%,rgba(255,255,255,0.84),transparent_30%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
            <div className="flex flex-col justify-between rounded-[1.75rem] bg-white/58 p-6 backdrop-blur md:p-8">
              <div>
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-graphite/10 bg-white px-4 py-2 shadow-sm">
                  <GoogleLogo className="h-5 w-5" />
                  <span className="text-sm font-bold text-graphite">
                    Google reviews
                  </span>
                </div>
                <h2 className="max-w-xl text-balance font-heading text-[2.3rem] font-semibold leading-[1.02] tracking-[-0.045em] text-graphite md:text-[4.35rem]">
                  Real words from people who took the first step.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-muted md:text-lg">
                  A quieter kind of proof: recent public feedback from people
                  and families who experienced care at The Wellbourne Clinic.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild>
                  <a href={contactUrl}>
                    Speak privately <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
                <div
                  className="flex items-center gap-1 text-brand"
                  aria-label="Rated 5 stars on Google"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[430px] overflow-hidden rounded-[1.75rem] bg-midnight p-5 text-white shadow-[0_34px_90px_rgba(17,24,39,0.22)] md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(241,152,133,0.34),transparent_34%),linear-gradient(145deg,#111827_0%,#08101d_58%,#02040a_100%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
                      <GoogleLogo className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white/58">
                        Public Google review
                      </p>
                      <p className="font-semibold">
                        {googleReviews[activeReview].date}
                      </p>
                    </div>
                  </div>
                  <div className="hidden items-center gap-1 text-brand sm:flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="py-10 md:py-14">
                  <motion.blockquote
                    key={googleReviews[activeReview].quote}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 16 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: smoothEase }}
                    className="max-w-3xl text-[2rem] font-semibold leading-[1.04] tracking-[-0.045em] md:text-[3.65rem]"
                  >
                    “{googleReviews[activeReview].quote}”
                  </motion.blockquote>
                </div>

                <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <p className="text-2xl font-bold tracking-[-0.035em]">
                      {googleReviews[activeReview].name}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white/55">
                      {googleReviews[activeReview].meta}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={showPreviousReview}
                      aria-label="Show previous Google review"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.07] text-white transition hover:bg-white hover:text-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <ArrowRight className="h-5 w-5 rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextReview}
                      aria-label="Show next Google review"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.07] text-white transition hover:bg-white hover:text-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {googleReviews.map((review, index) => (
                    <button
                      key={review.name}
                      type="button"
                      onClick={() => setActiveReview(index)}
                      aria-label={`Show Google review from ${review.name}`}
                      aria-current={activeReview === index}
                      className={`h-2.5 rounded-full transition-all ${
                        activeReview === index
                          ? "w-9 bg-brand"
                          : "w-2.5 bg-white/25 hover:bg-white/55"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="help" className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Find the support you need"
            title="Clear information, without pressure or judgement."
            text="Explore Alcohol Rehab, detox and private drug rehab support. Each page explains what to expect and how we can help."
          />
          <motion.div
            {...fadeIn}
            className="mt-14 overflow-hidden rounded-[2rem] border border-graphite/10 bg-porcelain shadow-card"
          >
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[420px] overflow-hidden">
                {heroImages.map((image, index) => (
                  <motion.div
                    key={image.src}
                    initial={false}
                    animate={{
                      opacity: activeSupportImage === index ? 1 : 0,
                      scale: activeSupportImage === index ? 1 : 1.035,
                    }}
                    transition={{ duration: 0.9, ease: smoothEase }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 45vw, 100vw"
                    />
                  </motion.div>
                ))}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.02)_20%,rgba(17,24,39,0.62)_100%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                    {heroImages[activeSupportImage].label}
                  </p>
                  <p className="mt-2 max-w-md text-2xl font-semibold leading-tight tracking-[-0.04em]">
                    {heroImages[activeSupportImage].caption}
                  </p>
                </div>
              </div>
              <div className="grid content-center gap-3 p-5 md:p-8">
                {supportLinks.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.05,
                      ease: smoothEase,
                    }}
                    onPointerMove={handleSpotlightMove}
                    className="premium-spotlight group flex items-center justify-between gap-5 rounded-2xl border border-graphite/10 bg-white/70 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand-ink">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold tracking-[-0.03em]">
                          {item.title}
                        </h3>
                        <p className="mt-1 max-w-xl text-sm leading-6 text-muted">
                          {item.text}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-brand opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  </motion.a>
                ))}
                <motion.div
                  {...fadeIn}
                  className="pt-3"
                  transition={{ ...fadeIn.transition, delay: 0.25 }}
                >
                  <Button asChild>
                    <a href={mainSiteUrl}>
                      Visit the main clinic website <ExternalLink className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="treatment"
        className="relative overflow-hidden bg-[#05080f] px-5 py-24 text-white md:px-8 md:py-32"
      >
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(3, 10, 32)"
          gradientBackgroundEnd="rgb(0, 5, 18)"
          firstColor="18, 113, 255"
          secondColor="105, 82, 255"
          thirdColor="100, 220, 255"
          fourthColor="28, 64, 190"
          fifthColor="78, 145, 255"
          pointerColor="120, 165, 255"
          size="82%"
          blendingValue="hard-light"
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <motion.div {...fadeIn} className="lg:sticky lg:top-32">
              <SectionLabel>Treatment journey</SectionLabel>
              <h2 className="text-balance break-words text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.04em] md:text-[4rem] md:tracking-[-0.045em]">
                We’ll guide you through every stage of recovery.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/70 md:text-xl">
                Knowing what happens next can make the first step feel less
                overwhelming. Your care is explained clearly, shaped around you
                and supported beyond your residential stay.
              </p>
              <div className="mt-8">
                <Button asChild>
                  <a href={contactUrl}>
                    Start a private enquiry <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
            <div className="grid gap-4">
              {treatmentSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  {...fadeIn}
                  transition={{ ...fadeIn.transition, delay: index * 0.08 }}
                  onPointerMove={handleSpotlightMove}
                  className="premium-spotlight premium-spotlight-dark group rounded-[1.5rem] border border-white/14 bg-white/[0.085] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.13]"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-lg font-semibold text-midnight">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-2xl leading-7 text-white/68">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div {...fadeIn}>
            <SectionHeading
              eyebrow="Why Wellbourne"
              title="Professional expertise, delivered with genuine warmth."
              text="You’ll find experienced care, a peaceful residential setting and a small team who take time to understand you. We treat the whole person, not just the addiction."
              align="left"
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  {...fadeIn}
                  transition={{ ...fadeIn.transition, delay: index * 0.05 }}
                  onPointerMove={handleSpotlightMove}
                  className="premium-spotlight rounded-[1.4rem] border border-graphite/10 bg-white/65 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card"
                >
                  <reason.icon className="h-5 w-5 text-brand" />
                  <h3 className="mt-7 text-xl font-semibold tracking-[-0.03em]">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {reason.text}
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeIn} className="mt-8">
              <Button asChild variant="secondary">
                <a href="https://thewellbourneclinic.co.uk/alcohol-rehab/">
                  Explore alcohol rehab <ExternalLink className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            {...fadeIn}
            className="grid grid-cols-2 gap-4"
            transition={{ ...fadeIn.transition, delay: 0.12 }}
          >
            <div className="space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card">
                <Image
                  src="/images/therapy-room.jpg"
                  alt="A therapy room prepared for a private conversation"
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                  sizes="(min-width: 1024px) 24vw, 50vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-card">
                <Image
                  src="/images/cotswolds-rural-countryside-and-farmland-landscape-2024-09-22-14-55-20-utc-scaled.jpg"
                  alt="Cotswolds rural countryside and farmland landscape"
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                  sizes="(min-width: 1024px) 24vw, 50vw"
                />
              </div>
            </div>
            <div className="relative mt-12 aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card">
              <Image
                src="/images/clinic-lounge.jpg"
                alt="A calm lounge space at The Wellbourne Clinic"
                fill
                className="object-cover transition duration-700 hover:scale-105"
                sizes="(min-width: 1024px) 24vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="articles" className="bg-porcelain py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <SectionHeading
              eyebrow="Helpful articles"
              title="Honest guidance for the questions you may be carrying."
              text="Read clear, practical information about Alcohol Dependence, detox, treatment and everyday recovery. We’re here to help you understand your options."
              align="left"
            />
          </div>
        </div>
        <div
          ref={articleRailRef}
          onPointerEnter={() => setIsArticleRailPaused(true)}
          onPointerLeave={() => setIsArticleRailPaused(false)}
          onFocus={() => setIsArticleRailPaused(true)}
          onBlur={() => setIsArticleRailPaused(false)}
          className="article-rail no-scrollbar mt-10 overflow-x-auto overscroll-x-contain px-5 pb-10 pt-8 md:px-8"
        >
          <div className="mx-auto flex w-max max-w-none gap-5 pr-5 md:gap-7">
            {[...articles, ...articles].map((article, index) => (
              <motion.article
                key={`${article.title}-${index}`}
                initial={{ opacity: 0, x: 50, rotate: index % 2 ? 0.7 : -0.7 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                  ease: smoothEase,
                }}
                whileHover={{ y: -8 }}
                className="article-card group relative h-[520px] w-[82vw] max-w-[390px] overflow-hidden rounded-[2rem] bg-midnight shadow-editorial ring-1 ring-white/70 sm:w-[390px] md:h-[610px] md:max-w-[460px] md:w-[460px]"
              >
                <div className="ambient-loading absolute inset-0" />
                <Image
                  src={article.image}
                  alt=""
                  fill
                  className="object-cover transition duration-[1200ms] group-hover:scale-105"
                  sizes="(min-width: 768px) 460px, 82vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${article.tone}`} />
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-white bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-graphite shadow-sm">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-2 rounded-full bg-black/24 px-4 py-2 text-sm font-semibold backdrop-blur">
                      <Clock3 className="h-4 w-4" /> {article.readTime}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-balance text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.055em] md:text-[3.2rem]">
                      {article.title}
                    </h3>
                    <p className="mt-5 max-w-sm text-base leading-7 text-white/78 md:text-lg">
                      {article.text}
                    </p>
                    <a
                      href={article.href}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-graphite transition duration-300 hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
                    >
                      Read on main site <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 py-24 md:px-8 md:py-32">
        <motion.div
          {...fadeIn}
          className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-white/70 bg-midnight text-white shadow-soft lg:grid-cols-[1.08fr_0.92fr]"
        >
          <div className="p-8 md:p-14">
            <SectionLabel>Take the next step</SectionLabel>
            <h2 className="max-w-3xl text-balance break-words text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.04em] md:text-[4rem] md:tracking-[-0.045em]">
              You do not need the right words before asking for help.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              We understand that the first step can feel difficult. Your
              information will stay confidential, and our friendly team will
              simply listen and guide you through your options.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href={phoneHref}>
                  Call {phoneNumber} <Phone className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={contactUrl}>Contact on main website</a>
              </Button>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-white/76 sm:grid-cols-2">
              <a
                href={`mailto:${emailAddress}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition hover:bg-white/[0.1]"
              >
                <Mail className="h-4 w-4 text-brand" />
                {emailAddress}
              </a>
              <a
                href={whatsappUrl}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition hover:bg-white/[0.1]"
              >
                <MessageCircle className="h-4 w-4 text-brand" />
                WhatsApp the clinic
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:col-span-2">
                <MapPin className="h-4 w-4 shrink-0 text-brand" />
                {address}
              </div>
            </div>
          </div>
          <div className="relative min-h-[380px]">
            <Image
              src="/images/home.jpg"
              alt="A private room at The Wellbourne Clinic"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,22,33,0.42),rgba(13,22,33,0.02))]" />
          </div>
        </motion.div>
      </section>

      <section id="faqs" className="bg-[#eee9e9] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.42fr_0.88fr] lg:items-start">
          <motion.div {...fadeIn}>
            <h2 className="max-w-3xl text-[2.45rem] font-semibold leading-[1.02] tracking-[-0.045em] text-black md:text-[4rem]">
              Frequently asked questions
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-graphite/68 md:text-lg">
              Everyone’s situation is different. These answers offer a simple
              starting point, and you can speak with us privately whenever
              you’re ready.
            </p>
            <div className="mt-10">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={`item-${index}`}
                    className="border-b border-black/16"
                  >
                    <AccordionTrigger className="py-4 text-[1.02rem] font-semibold leading-[1.18] tracking-[-0.018em] text-black hover:text-brand-ink md:text-[1.18rem] [&>svg]:text-black">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-3xl text-sm leading-6 text-graphite/70">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>

          <motion.aside
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.08 }}
            className="sticky top-28 min-h-[540px] overflow-hidden rounded-[2rem] bg-[#f19885] p-7 text-white shadow-[0_34px_90px_rgba(17,24,39,0.24)] md:p-9"
          >
            <Image
              src="/cardbackground.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 36vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.04)_0%,rgba(17,24,39,0.16)_100%)]" />
            <div className="relative flex min-h-[484px] flex-col justify-between text-center md:text-left">
              <div className="flex flex-col items-center md:items-start">
                <div className="mb-10 flex h-28 w-28 items-center justify-center rounded-full bg-white/22 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32)] backdrop-blur md:mb-12 md:h-24 md:w-24">
                  <Smile className="h-16 w-16 stroke-[1.9] md:h-14 md:w-14" />
                </div>
                <h3 className="min-h-[3.8rem] max-w-full text-[1.45rem] font-semibold leading-[1.06] tracking-[-0.035em] sm:text-[1.7rem] md:min-h-[4.6rem] md:text-[1.95rem]">
                  <motion.span
                    key={faqCardMessages[activeFaqMessage]}
                    className="typewriter-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {faqCardMessages[activeFaqMessage]}
                  </motion.span>
                </h3>
                <a
                  href={phoneHref}
                  className="mt-10 flex min-h-20 items-center justify-center gap-4 rounded-2xl bg-white/95 px-6 text-center text-lg font-extrabold tracking-[-0.025em] text-[#7a3157] shadow-[0_18px_45px_rgba(17,24,39,0.14)] transition hover:-translate-y-0.5 hover:bg-white md:text-xl"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f19885]/18 text-[#7a3157]">
                    <Phone className="h-5 w-5 animate-bounce" />
                  </span>
                  Call {phoneNumber}
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center gap-5 md:justify-between">
                <a
                  href={`mailto:${emailAddress}`}
                  className="group flex min-w-0 items-center gap-5 text-left text-white"
                >
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/22 text-white backdrop-blur transition group-hover:scale-105">
                    <Mail className="h-8 w-8" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xl font-extrabold tracking-[-0.025em]">
                      Prefer to email?
                    </span>
                    <span className="mt-1 block truncate text-base font-semibold text-white/82">
                      {emailAddress}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f4efea] px-5 py-20 md:px-8 md:py-28">
        <motion.div
          {...fadeIn}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.35rem] border border-white/75 shadow-soft"
          style={{ background: activeDay.background }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(circle at 50% 98%, ${activeDay.glow}, transparent 38%)`,
                `radial-gradient(circle at 48% 94%, ${activeDay.glow}, transparent 42%)`,
                `radial-gradient(circle at 52% 96%, ${activeDay.glow}, transparent 39%)`,
              ],
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 9,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="absolute inset-0 soft-grid opacity-[0.08]" />

          <div className="relative z-10 grid gap-8 p-6 md:p-10 lg:grid-cols-[0.88fr_1.12fr] lg:p-12">
            <div className="flex min-h-[520px] flex-col justify-between">
              <div>
                <SectionLabel>Recovery rhythm</SectionLabel>
                <h2
                  className={`max-w-3xl text-balance font-heading text-[2.5rem] font-semibold leading-[1] tracking-[-0.052em] transition-colors duration-500 md:text-[5rem] ${
                    isDarkDayMode ? "text-white" : "text-graphite"
                  }`}
                >
                  Support can meet you wherever you are in your day.
                </h2>
                <p
                  className={`mt-6 max-w-xl text-lg leading-8 transition-colors duration-500 md:text-xl ${
                    isDarkDayMode ? "text-white/75" : "text-graphite/68"
                  }`}
                >
                  Change the light and watch the field settle. A quiet reminder
                  that recovery has different moments, and you don’t have to
                  move through them alone.
                </p>
              </div>

              <div className="mt-10 max-w-sm rounded-[1.5rem] border border-white/70 bg-white/62 p-4 shadow-card backdrop-blur-xl">
                <label
                  htmlFor="recovery-day-mode"
                  className="mb-3 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.14em] text-graphite/58"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand shadow-sm">
                    <ActiveDayIcon className="h-5 w-5" />
                  </span>
                  Choose the light
                </label>
                <select
                  id="recovery-day-mode"
                  value={activeDayMode}
                  onChange={(event) => setActiveDayMode(event.target.value)}
                  className="w-full appearance-none rounded-2xl border border-graphite/10 bg-white px-4 py-4 text-base font-bold text-graphite shadow-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/18"
                >
                  {dayModes.map((mode) => (
                    <option key={mode.id} value={mode.id}>
                      {mode.label}
                    </option>
                  ))}
                </select>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {dayModes.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setActiveDayMode(mode.id)}
                      aria-label={`Use ${mode.label} colours`}
                      aria-pressed={activeDayMode === mode.id}
                      className={`flex h-11 items-center justify-center rounded-xl border transition ${
                        activeDayMode === mode.id
                          ? "border-brand bg-brand text-white shadow-sm"
                          : "border-graphite/10 bg-white/72 text-graphite/58 hover:bg-white hover:text-graphite"
                      }`}
                    >
                      <mode.icon className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[520px] overflow-hidden rounded-[1.9rem] bg-white/18 backdrop-blur-sm">
              <svg
                viewBox="0 0 900 520"
                role="img"
                aria-label="Animated radial field representing changing recovery rhythms"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMax slice"
              >
                <defs>
                  <radialGradient id="recoveryCore" cx="50%" cy="96%" r="58%">
                    <stop offset="0%" stopColor={activeDay.accent} stopOpacity="0.7" />
                    <stop offset="45%" stopColor={activeDay.glow} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={activeDay.glow} stopOpacity="0" />
                  </radialGradient>
                  <filter id="nodeGlow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <motion.circle
                  cx="450"
                  cy="438"
                  r="250"
                  fill="url(#recoveryCore)"
                  animate={shouldReduceMotion ? undefined : { r: [228, 268, 238] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {recoveryFieldNodes.map((node) => (
                  <motion.g
                    key={node.id}
                    initial={false}
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: [node.opacity * 0.72, node.opacity, node.opacity * 0.82],
                          }
                    }
                    whileHover={{ opacity: 1, scale: 1.045 }}
                    transition={{
                      duration: 4.4 + (node.id % 7) * 0.32,
                      delay: node.delay,
                      repeat: shouldReduceMotion ? 0 : Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "450px 438px" }}
                  >
                    <line
                      x1="450"
                      y1="438"
                      x2={node.x}
                      y2={node.y}
                      stroke={activeDay.line}
                      strokeWidth={node.width}
                      strokeLinecap="round"
                    />
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={node.radius}
                      fill={activeDay.node}
                      filter={node.id % 4 === 0 ? "url(#nodeGlow)" : undefined}
                      whileHover={{
                        r: node.radius * 2.4,
                        fill: activeDay.accent,
                      }}
                    />
                  </motion.g>
                ))}
              </svg>

              <div className="absolute right-4 top-4 rounded-2xl border border-white/60 bg-white/62 p-2 shadow-card backdrop-blur-xl">
                <div className="flex items-center gap-2 px-2 py-1 text-sm font-bold text-graphite">
                  <ActiveDayIcon className="h-4 w-4 text-brand" />
                  {activeDay.label}
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 rounded-[1.45rem] border border-white/55 bg-white/52 p-5 shadow-card backdrop-blur-xl md:left-6 md:right-auto md:max-w-md">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-graphite/50">
                  Current light
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-graphite">
                  {activeDay.label} at The Wellbourne Clinic
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="relative overflow-hidden bg-[#060914] px-5 py-16 text-white md:px-8 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(241,152,133,0.28),transparent_34%),radial-gradient(circle_at_88%_28%,rgba(80,130,255,0.22),transparent_34%),linear-gradient(180deg,#0c1224_0%,#050711_100%)]" />
        <div className="absolute inset-0 soft-grid opacity-[0.08]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <Image
                src="/mainlogo.png"
                alt="The Wellbourne Clinic"
                width={340}
                height={50}
                className="h-auto w-[280px] brightness-0 invert sm:w-[340px]"
              />
              <h2 className="mt-10 max-w-4xl text-[3.2rem] font-semibold leading-[0.96] tracking-[-0.065em] md:text-[5.8rem]">
                We’re here whenever you’re ready.
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
                Speak with us privately about Alcohol Rehab, drug rehab or
                detox. We’ll listen without judgement and help you understand
                what the next step could look like.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <a href={contactUrl}>
                    Contact the clinic <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={mainSiteUrl}>
                    Visit main website <ExternalLink className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <a
                href={phoneHref}
                className="group flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-card transition group-hover:scale-105">
                  <Phone className="h-8 w-8" />
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
                    Call now
                  </span>
                  <span className="mt-1 block text-2xl font-bold tracking-[-0.04em]">
                    {phoneNumber}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${emailAddress}`}
                className="group flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-graphite shadow-card transition group-hover:scale-105">
                  <Mail className="h-8 w-8" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
                    Email
                  </span>
                  <span className="mt-1 block truncate text-xl font-bold tracking-[-0.04em] md:text-2xl">
                    {emailAddress}
                  </span>
                </span>
              </a>
              <a
                href={whatsappUrl}
                className="group flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-card transition group-hover:scale-105">
                  <MessageCircle className="h-8 w-8" />
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
                    WhatsApp
                  </span>
                  <span className="mt-1 block text-2xl font-bold tracking-[-0.04em]">
                    Message us
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/45">
              Copyright 2026 The Wellbourne Clinic. For urgent medical help,
              call 999.
            </p>
            <div className="flex gap-3">
              <a
                href={instagramUrl}
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-white transition hover:-translate-y-1 hover:bg-white hover:text-graphite"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={facebookUrl}
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-white transition hover:-translate-y-1 hover:bg-white hover:text-graphite"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 flex justify-center border-t border-white/10 pt-8 md:justify-start">
            <Image
              src="/new images/CQC-Registered-scaled-1.png"
              alt="Regulated by the Care Quality Commission"
              width={480}
              height={252}
              className="h-auto w-[220px] rounded-[0.8rem]"
            />
          </div>
        </div>
      </footer>
    </main>
  );
}
