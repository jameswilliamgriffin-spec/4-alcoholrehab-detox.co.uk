"use client";

import Image from "next/image";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BedDouble,
  BookOpen,
  Brain,
  Check,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  Clock3,
  Droplets,
  HeartHandshake,
  Home,
  Info,
  LockKeyhole,
  Menu,
  MessageCircle,
  Phone,
  Pill,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Thermometer,
  TriangleAlert,
  UserRoundCheck,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const phoneNumber = "0330 043 1715";
const phoneHref = "tel:+443300431715";

const symptomGroups = [
  {
    level: "Mild symptoms",
    timing: "Often begin within 6–12 hours",
    icon: Activity,
    tone: "mild",
    symptoms: ["Anxiety or restlessness", "Sweating", "Insomnia or disturbed sleep", "Headache", "Irritability"],
  },
  {
    level: "Moderate symptoms",
    timing: "May intensify over 12–48 hours",
    icon: Thermometer,
    tone: "moderate",
    symptoms: ["Tremors or shaking", "Nausea or vomiting", "Increased heart rate", "Raised blood pressure", "Difficulty concentrating"],
  },
  {
    level: "Severe symptoms",
    timing: "Require urgent medical attention",
    icon: TriangleAlert,
    tone: "severe",
    symptoms: ["Hallucinations", "Seizures", "Delirium tremens (DTs)", "Severe confusion or agitation", "High temperature"],
  },
];

const timeline = [
  {
    time: "First 24 hours",
    title: "Early withdrawal",
    icon: Clock3,
    text: "Early alcohol withdrawal symptoms may begin around 6–12 hours after the last drink. Anxiety, sweating, headache, nausea, poor sleep and mild tremors are common. Symptoms may appear sooner in people who drink heavily or regularly.",
    note: "An early medical assessment can identify factors linked with a more difficult withdrawal.",
  },
  {
    time: "Days 2–3",
    title: "Peak risk period",
    icon: TriangleAlert,
    text: "Many people find symptoms are strongest during the second and third days. Tremors, agitation, vomiting, a rapid pulse or confusion may worsen. Seizures and delirium tremens are uncommon but potentially life-threatening complications.",
    note: "This stage may require close observation and medication during a medically assisted alcohol detox.",
  },
  {
    time: "Days 4–7",
    title: "Physical symptoms ease",
    icon: Activity,
    text: "For many people, the acute physical symptoms start to settle. Sleep, appetite, energy and mood can remain unsettled, while anxiety and cravings may continue even as shaking and nausea improve.",
    note: "Hydration, nutrition, sleep and a planned transition into alcohol addiction treatment remain important.",
  },
  {
    time: "Week 2 and beyond",
    title: "Ongoing recovery",
    icon: Sparkles,
    text: "The main detox period may be over, but disrupted sleep, low mood, irritability or cravings can continue. These longer-lasting effects vary and do not mean that treatment has failed.",
    note: "Alcohol rehab and detox work best as connected stages, with therapy and aftercare following physical stabilisation.",
  },
];

const timelineSymptoms = [
  ["Anxiety", "Sweating", "Headache", "Poor sleep", "Mild tremors"],
  ["Stronger tremors", "Agitation", "Vomiting", "Rapid pulse", "Confusion"],
  ["Low energy", "Unsettled sleep", "Low appetite", "Anxiety", "Cravings"],
  ["Irritability", "Low mood", "Sleep disruption", "Cravings", "Reduced concentration"],
];

const comparisons = [
  ["Purpose", "Manage withdrawal safely and reduce the immediate medical risk of stopping alcohol", "Support sustained change through therapy, structured care and relapse-prevention planning"],
  ["Timescale", "Usually several days — NICE guidance allows for 3 to 10 days depending on dependence severity", "Often several weeks or longer, depending on individual need and treatment goals"],
  ["Medical support", "Observation, CIWA-Ar monitoring and medication (e.g. chlordiazepoxide) where clinically indicated", "Continuing health support alongside psychological and therapeutic care"],
];

const guides = [
  { title: "Alcohol Withdrawal Symptoms", label: "Symptoms guide", icon: Activity, href: "#symptoms", image: "/images/article-withdrawal.jpg", description: "Recognise common physical and psychological symptoms, from anxiety and sweating to severe complications." },
  { title: "Alcohol Withdrawal Timeline", label: "Timeline guide", icon: Clock3, href: "#timeline", image: "/images/article-detox.jpg", description: "A stage-by-stage guide to what may happen during the first hours, first week and beyond." },
  { title: "Home Detox vs Residential Detox", label: "Compare options", icon: Home, href: "#detox-vs-rehab", image: "/images/clinic-room.jpg", description: "Understand when a home alcohol detox may be considered and when residential alcohol detox may be safer." },
  { title: "Can You Quit Alcohol Cold Turkey?", label: "Safety guide", icon: TriangleAlert, href: "https://thewellbourneclinic.co.uk/can-you-quit-cold-turkey/", image: "/images/article-help.jpg", description: "Why abruptly stopping alcohol can be dangerous when physical dependence has developed." },
  { title: "Detox vs Rehab", label: "Treatment guide", icon: Droplets, href: "#detox-vs-rehab", image: "/images/article-rehab.jpg", description: "How short-term withdrawal management differs from longer-term therapy and recovery support." },
  { title: "Life After Rehab", label: "Recovery guide", icon: Sparkles, href: "https://thewellbourneclinic.co.uk/life-after-rehab-support-aftercare/", image: "/new images/3.jpg", description: "Preparing for routines, relationships, triggers and continued support after residential treatment." },
  { title: "The Importance Of Aftercare", label: "Aftercare guide", icon: BadgeCheck, href: "https://thewellbourneclinic.co.uk/the-importance-of-aftercare-in-rehab-building-a-lasting-recovery/", image: "/new images/care_alcohol_rehab_warwickshire.jpg", description: "How ongoing therapy, peer support and relapse-prevention planning can strengthen recovery." },
  { title: "Alcohol Rehab Success Rates", label: "Evidence guide", icon: BookOpen, href: "#questions", image: "/images/article-inpatient.jpg", description: "Why outcomes depend on individual needs, treatment engagement, continuing care and how success is measured." },
];

const faqs = [
  {
    question: "How long does alcohol detox take?",
    answer:
      "Acute alcohol detox is typically completed within 7 to 10 days, though some guidance allows for a wider window of 3 to 10 days depending on the severity of dependence and any complications. Drinking history, physical health, previous withdrawal, medication and the level of dependence can all affect the process. Sleep problems, anxiety, low mood or cravings may continue after the main physical symptoms have eased. Source: NICE clinical guideline CG100; NHS Trust alcohol detoxification protocols.",
  },
  {
    question: "What are the symptoms of alcohol withdrawal?",
    answer:
      "Mild alcohol withdrawal symptoms can include anxiety, sweating, headache and insomnia. Moderate symptoms may include tremors, nausea, vomiting and an increased heart rate. Severe symptoms include hallucinations, seizures and delirium tremens. Symptoms can change quickly, so personal medical advice is important.",
  },
  {
    question: "Can alcohol withdrawal kill you?",
    answer:
      "Yes. Although many withdrawals are mild or moderate, severe alcohol withdrawal can cause seizures, dangerous changes in heart rate or blood pressure, and delirium tremens. These complications can be fatal without prompt treatment. Call 999 if someone has a seizure, severe confusion, hallucinations, collapse or rapidly worsening symptoms.",
  },
  {
    question: "Is a home alcohol detox safe?",
    answer:
      "A home alcohol detox may be suitable for some people, but only after an appropriate assessment and with a clear treatment plan, reliable support and access to professional help. It is generally unsuitable where there is a history of seizures or delirium tremens, significant physical or mental illness, pregnancy, very heavy drinking or an unsafe home environment.",
  },
  {
    question: "What is delirium tremens?",
    answer:
      "Delirium tremens, often shortened to DTs, is the most severe form of alcohol withdrawal. It can involve profound confusion, agitation, hallucinations, fever, sweating and changes in heart rate or blood pressure. It is a medical emergency and requires urgent hospital treatment.",
  },
  {
    question: "How long does alcohol rehab last?",
    answer:
      "The appropriate length of rehab depends on the person, the severity and duration of alcohol use, physical and mental health, home circumstances and recovery goals. Residential programmes often last several weeks, while continuing therapy and aftercare may extend for months. A longer stay is not automatically better; the quality and continuity of treatment matter.",
  },
  {
    question: "What happens after alcohol detox?",
    answer:
      "Detox is usually the beginning rather than the end of alcohol addiction treatment. Once withdrawal is under control, the next stage may include residential or outpatient rehab, one-to-one and group therapy, work on triggers and coping strategies, family support, relapse-prevention planning and continuing aftercare.",
  },
  {
    question: "What is the difference between detox and rehab?",
    answer:
      "Detox focuses on the short-term physical process of stopping alcohol and managing withdrawal safely. Rehab addresses the psychological, behavioural and social aspects of alcohol dependence through therapy, education, structure and practical recovery planning. Alcohol rehab and detox are often most effective when they form one connected treatment pathway.",
  },
  {
    question: "Can family members help during detox and recovery?",
    answer:
      "Yes. Family members can help someone seek an assessment, follow a treatment plan and maintain a calm, alcohol-free environment. They can also learn how to respond to warning signs and support healthy boundaries after treatment. A relative should not be expected to manage severe withdrawal at home; seizures, hallucinations or severe confusion require urgent medical help.",
  },
];

const assessmentAreas = [
  { icon: Activity, title: "Withdrawal risk", text: "Drinking history, previous seizures or DTs, frequency of use and physical health all affect withdrawal severity and the appropriate level of care." },
  { icon: ClipboardCheck, title: "CIWA-Ar scoring", text: "The Clinical Institute Withdrawal Assessment for Alcohol measures symptom severity across ten indicators and guides medication decisions throughout supervised detox." },
  { icon: Home, title: "Setting decision", text: "Assessment determines whether community, hospital or residential detox is appropriate — there is no single setting that suits everyone." },
  { icon: Stethoscope, title: "Health screening", text: "Blood pressure, pulse, liver function and other physical markers are checked. Pre-existing conditions affect how medication is prescribed and monitored." },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="Alcohol Rehab Detox home">
      <Image
        src="/mainlogo.png"
        alt="The Wellbourne Clinic"
        width={220}
        height={33}
        priority
        className="h-auto w-[200px] sm:w-[210px]"
      />
      <span className="hidden border-l border-graphite/15 pl-3 text-[10px] font-bold uppercase leading-4 tracking-[0.16em] text-muted xl:block">
        Alcohol detox
        <br />
        reference
      </span>
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="medical-eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.045em] text-graphite">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{text}</p>
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function InfoPanel({
  label,
  children,
  icon: Icon,
  tone = "fact",
}: {
  label: string;
  children: React.ReactNode;
  icon: typeof Info;
  tone?: "fact" | "important" | "recovery";
}) {
  return (
    <aside className={`info-panel info-panel-${tone}`}>
      <span className="info-panel-icon"><Icon className="h-5 w-5" /></span>
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em]">{label}</p>
        <p className="mt-1 text-sm leading-6 text-muted">{children}</p>
      </div>
    </aside>
  );
}

export function WellbourneMicrosite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTimelineStage, setActiveTimelineStage] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-cream text-graphite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-graphite px-5 py-2.5 text-center text-xs font-medium text-white/80">
        <span className="inline-flex items-center gap-2">
          <Info className="h-3.5 w-3.5 text-brand" />
          If someone is having a seizure, hallucinations or severe confusion, call 999.
        </span>
      </div>

      <header className="sticky top-0 z-50 border-b border-graphite/10 bg-cream/95 backdrop-blur-xl">
        <div className="page-shell flex h-[78px] items-center justify-between px-4 sm:px-5 xl:px-0">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-graphite/70 lg:flex" aria-label="Main navigation">
            <a className="nav-item" href="#understanding">Understanding detox</a>
            <a className="nav-item" href="#symptoms">Symptoms</a>
            <a className="nav-item" href="#timeline">Timeline</a>
            <a className="nav-item" href="#questions">Questions</a>
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <a className="inline-flex min-h-11 items-center gap-2 rounded-full border border-graphite/15 bg-white px-5 text-sm font-bold transition hover:border-brand hover:text-brand-ink" href={phoneHref}>
              <Phone className="h-4 w-4 text-brand" /> {phoneNumber}
            </a>
            <a className="hidden min-h-11 items-center rounded-full bg-brand px-5 text-sm font-bold text-white shadow-[0_9px_24px_rgba(241,152,133,.28)] transition hover:-translate-y-0.5 hover:bg-[#e88975] xl:inline-flex" href="#final-cta">
              Find support
            </a>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-graphite/15 bg-white sm:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="page-shell grid gap-1 border-t border-graphite/10 px-4 py-4 text-sm font-semibold sm:hidden" aria-label="Mobile navigation">
            {[
              ["Understanding detox", "#understanding"],
              ["Withdrawal symptoms", "#symptoms"],
              ["Withdrawal timeline", "#timeline"],
              ["Common questions", "#questions"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 hover:bg-white">
                {label}
              </a>
            ))}
            <a href={phoneHref} className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-white">
              <Phone className="h-4 w-4" /> Call {phoneNumber}
            </a>
          </nav>
        )}
      </header>

      <section className="calm-hero relative border-b border-graphite/10 px-5">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="calm-hero-glow calm-hero-glow-left" />
        <div className="calm-hero-glow calm-hero-glow-right" />

        <div className="page-shell relative">
          <div className="mx-auto max-w-7xl pt-12 text-center md:pt-14 lg:pt-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-brand-ink shadow-[0_10px_35px_rgba(82,75,120,.08)] backdrop-blur-xl">
              <ShieldCheck className="h-4 w-4 text-brand" />
              Clinically informed guidance
            </div>
            <h1 className="calm-hero-title mx-auto mt-5 max-w-7xl text-balance text-[clamp(2.65rem,5.7vw,5.25rem)] leading-[0.96] tracking-[-0.05em]">
              Your alcohol detox guide: <span>symptoms, timelines and safe treatment.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-graphite/65 md:text-lg md:leading-8">
              Understand alcohol withdrawal symptoms, the detox timeline and when medical support matters — without jargon or judgement.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#understanding" className="calm-primary-button inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-bold text-white">
                Start with the basics <ArrowRight className="h-4 w-4" />
              </a>
              <a href={phoneHref} className="calm-secondary-button inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-bold">
                <Phone className="h-4 w-4 text-brand" /> Speak to someone
              </a>
            </div>
            <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2.5 text-sm">
              {[
                [Stethoscope, "Medical review"],
                [LockKeyhole, "Confidential support"],
                [UserRoundCheck, "Person-centred care"],
              ].map(([Icon, label]) => {
                const TrustIcon = Icon as typeof Stethoscope;
                return (
                  <div key={label as string} className="calm-trust-pill flex items-center gap-2 font-semibold text-graphite/65">
                    <TrustIcon className="h-4 w-4 text-brand" />
                    {label as string}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="calm-card-stage relative mx-auto mt-8 max-w-5xl md:mt-10">
            <div className="calm-orb calm-orb-alert">
              <CircleAlert className="h-5 w-5" />
            </div>
            <div className="calm-orb calm-orb-heart">
              <HeartHandshake className="h-5 w-5" />
            </div>

            <article className="calm-support-card calm-support-card-left">
              <span className="calm-card-icon"><Stethoscope className="h-5 w-5" /></span>
              <p className="calm-card-eyebrow">Medical review</p>
              <p className="calm-card-title">Clear guidance for a safer first step.</p>
            </article>

            <article className="calm-image-card">
              <div className="relative min-h-[340px] overflow-hidden rounded-[1.8rem] md:min-h-[380px]">
                <Image
                  src="/new images/1.jpg"
                  alt="A calm private conversation with a care professional"
                  fill
                  sizes="(max-width: 768px) 92vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181529]/75 via-transparent to-white/5" />
                <div className="calm-warning-card absolute inset-x-4 bottom-4 p-4 sm:inset-x-5 sm:bottom-5 sm:p-5">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fff0eb] text-brand-ink">
                      <CircleAlert className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="calm-warning-title">Do not stop suddenly if you may be dependent.</p>
                      <p className="calm-warning-copy">Withdrawal can be unpredictable. Ask a healthcare professional for advice first.</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="calm-support-card calm-support-card-right">
              <span className="calm-card-icon"><LockKeyhole className="h-5 w-5" /></span>
              <p className="calm-card-eyebrow">Confidential support</p>
              <p className="calm-card-title">A private, judgement-free conversation.</p>
            </article>

            <div className="calm-availability">
              <span className="text-xl font-extrabold text-brand">24/7</span>
              <span className="text-xs font-semibold text-graphite/55">Support available</span>
            </div>
          </div>
        </div>
      </section>

      <section id="understanding" className="understanding-section px-5 py-20 md:py-24">
        <div className="page-shell">
          <div className="understanding-layout">
            <div className="understanding-intro">
              <SectionIntro
                eyebrow="Understanding alcohol detox"
                title="Detox helps your body adjust safely."
                text="Alcohol detox is the process of stopping alcohol while the body adjusts to its absence. If physical dependence has developed, this adjustment can produce withdrawal symptoms because the brain and nervous system have adapted to regular alcohol use."
              />
              <p className="mt-5 max-w-xl text-base leading-7 text-muted">
                Detox allows alcohol to leave the body while symptoms are observed and treated. Some people need medical supervision because it is difficult to predict who will develop severe withdrawal, and risk can be higher after prolonged heavy drinking or previous complicated withdrawals.
              </p>
              <div className="mt-8">
                <InfoPanel label="Did you know?" icon={Info}>
                  Withdrawal symptoms vary considerably from person to person. The safest alcohol detox treatment depends on drinking history, health, previous withdrawal, medication and support at home.
                </InfoPanel>
              </div>
            </div>
            <div className="understanding-cards">
              {[
                {
                  number: "01",
                  icon: Droplets,
                  title: "What detox means",
                  text: "Detox is a short-term period of physical stabilisation. The immediate aims are to manage withdrawal, support hydration and nutrition, and reduce the risk of complications while alcohol leaves the body.",
                },
                {
                  number: "02",
                  icon: Stethoscope,
                  title: "Why withdrawal occurs",
                  text: "Regular heavy drinking can change how the brain regulates activity. When alcohol is suddenly removed, the nervous system can become overactive, causing symptoms such as anxiety, sweating, tremors, nausea and disturbed sleep.",
                },
                {
                  number: "03",
                  icon: Brain,
                  title: "Who may need supervision",
                  text: "Medically assisted alcohol detox may be advised after heavy daily drinking, previous seizures or DTs, repeated withdrawal, significant health problems, pregnancy, or where there is limited support. Assessment determines whether home, hospital or residential alcohol detox is appropriate.",
                },
              ].map((item, index) => (
                <Reveal key={item.number} delay={index * 0.08}>
                  <article className="reference-card group">
                    <div className="flex items-start gap-5">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-ink transition group-hover:rotate-[-4deg] group-hover:scale-105">
                        <item.icon className="h-6 w-6" />
                      </span>
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">{item.number} / Detox essentials</p>
                          <ChevronRight className="h-5 w-5 text-graphite/20 transition group-hover:translate-x-1 group-hover:text-brand" />
                        </div>
                        <h3 className="mt-3 text-2xl font-bold tracking-[-0.025em]">{item.title}</h3>
                        <p className="mt-3 leading-7 text-muted">{item.text}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.25} className="understanding-image mt-10 overflow-hidden rounded-[1.75rem]">
            <div className="relative h-64 md:h-72">
              <Image
                src="/images/doctor-talking.png"
                alt="A healthcare professional in a warm, supportive consultation about alcohol detox options"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,17,27,.9)_0%,rgba(14,17,27,.6)_38%,rgba(14,17,27,.12)_72%,transparent_100%)]" />
              <div className="understanding-image-copy absolute inset-y-0 left-0 flex max-w-3xl flex-col justify-center px-7 py-8 md:px-12">
                <p className="understanding-image-label">The right level of care</p>
                <p className="understanding-image-statement">
                  A thorough assessment identifies the safest type of support — whether at home, in hospital or in a residential clinic.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="relative min-h-[380px] md:min-h-[440px]">
          <Image
            src="/images/talking-recovery.png"
            alt="Two people in a calm, open conversation about alcohol withdrawal and recovery"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-graphite/65" />
          <div className="withdrawal-perspective-content relative flex min-h-[380px] items-center px-5 md:min-h-[440px]">
            <div className="page-shell">
              <Reveal>
                <div className="max-w-2xl">
                  <p className="withdrawal-perspective-eyebrow medical-eyebrow text-brand">A calmer perspective</p>
                  <p className="mt-5 text-balance text-[clamp(1.7rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.035em] text-white">
                    Withdrawal is unpredictable. No one should have to face it without the right support.
                  </p>
                  <p className="mt-4 text-base leading-7 text-white/60">
                    This is a core principle of safe, medically assisted alcohol detox care — and the starting point for every conversation we have.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#e88975]">
                      <Phone className="h-4 w-4" /> Talk to someone now
                    </a>
                    <a href="#symptoms" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white/10">
                      Understand the symptoms <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="symptoms" className="relative bg-[#f0ece6] px-5 py-20 md:py-28">
        <div className="section-wave absolute inset-x-0 top-0 h-5 -translate-y-full" />
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionIntro
              eyebrow="Alcohol withdrawal symptoms"
              title="Symptoms vary in severity."
              text="Withdrawal is different for everyone. Symptoms may be physical, psychological or both, and can change quickly during the early alcohol withdrawal stages. Their severity cannot be judged by alcohol intake alone."
            />
            <div className="max-w-sm">
              <InfoPanel label="Important" icon={Zap} tone="important">
                Severe confusion, seizures or hallucinations are medical emergencies. Call 999.
              </InfoPanel>
            </div>
          </div>
          <Reveal className="mt-8 overflow-hidden rounded-2xl">
            <div className="relative h-[150px] md:h-[175px]">
              <Image
                src="/images/reflection.png"
                alt="A person in quiet contemplation — withdrawal is a deeply personal experience that varies between individuals"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f0ece6]/90 via-[#f0ece6]/40 to-transparent" />
              <p className="absolute left-5 top-1/2 -translate-y-1/2 max-w-xs text-sm font-semibold leading-6 text-graphite/85 md:max-w-sm">
                Everyone&apos;s experience of withdrawal is different. It cannot be reliably predicted from the amount someone drinks.
              </p>
            </div>
          </Reveal>
          <div className="severity-scale mt-10" aria-label="Symptom severity increases from mild to severe">
            <span>Mild</span><span>Moderate</span><span>Severe</span>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {symptomGroups.map((group, index) => (
              <Reveal key={group.level} delay={index * 0.1} className={index === 1 ? "lg:translate-y-6" : ""}>
                <article className={`symptom-card symptom-${group.tone}`}>
                  <div className="flex items-start justify-between">
                    <span className="symptom-icon"><group.icon className="h-6 w-6" /></span>
                    <span className="text-xs font-extrabold tabular-nums text-graphite/30">Severity 0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 text-2xl font-bold tracking-[-0.03em]">{group.level}</h3>
                  <p className="mt-2 text-sm font-semibold text-muted">{group.timing}</p>
                  <ul className="mt-7 space-y-3">
                    {group.symptoms.map((symptom) => (
                      <li key={symptom} className="flex items-center gap-3 border-t border-graphite/8 pt-3 text-sm font-medium">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-white"><Check className="h-3 w-3" /></span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="bg-graphite px-5 py-20 text-white md:py-28">
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="medical-eyebrow text-brand">Alcohol withdrawal timeline</p>
              <h2 className="mt-4 text-balance text-[clamp(2.2rem,4.5vw,4rem)] font-bold leading-[1] tracking-[-0.045em]">
                What may happen after the last drink.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-white/60">
                This alcohol withdrawal timeline is a general guide, not a prediction. Symptoms can overlap between stages, and previous severe withdrawal can increase the risk during a future attempt.
              </p>
            </div>
            <div className="max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-brand" />
                <p className="text-sm font-bold">The first 72 hours need particular care.</p>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 md:p-8"
            role="img"
            aria-label="Chart showing alcohol withdrawal symptom severity over time, peaking at days 2 to 3"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-brand">Symptom severity over time</p>
            <svg viewBox="0 0 900 210" className="w-full" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="wdSeverityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f19885" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#f19885" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Horizontal grid lines */}
              <line x1="0" y1="50" x2="900" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1="100" x2="900" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1="150" x2="900" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              {/* Stage separator lines */}
              <line x1="185" y1="0" x2="185" y2="170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="385" y1="0" x2="385" y2="170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="600" y1="0" x2="600" y2="170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="770" y1="0" x2="770" y2="170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
              {/* Fill under curve */}
              <path
                d="M 0,165 C 55,165 85,150 125,134 C 165,115 215,74 272,38 C 315,16 350,12 390,12 C 428,12 458,30 510,66 C 568,107 638,135 715,148 C 792,158 855,162 900,163 L 900,170 L 0,170 Z"
                fill="url(#wdSeverityFill)"
              />
              {/* Main curve */}
              <motion.path
                d="M 0,165 C 55,165 85,150 125,134 C 165,115 215,74 272,38 C 315,16 350,12 390,12 C 428,12 458,30 510,66 C 568,107 638,135 715,148 C 792,158 855,162 900,163"
                fill="none"
                stroke="#f19885"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* Stage dots */}
              <circle cx="125" cy="134" r="4.5" fill="#f19885" />
              <circle cx="390" cy="12" r="5.5" fill="#f19885" />
              <circle cx="600" cy="118" r="4.5" fill="#f19885" />
              <circle cx="770" cy="149" r="4.5" fill="#f19885" />
              {/* Peak label */}
              <text x="390" y="6" textAnchor="middle" fontSize="9" fill="#f19885" fontFamily="inherit" fontWeight="700">▲ Peak risk</text>
              {/* Baseline */}
              <line x1="0" y1="170" x2="900" y2="170" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              {/* X axis labels */}
              <text x="92" y="186" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.38)" fontFamily="inherit">Hours 6–12</text>
              <text x="284" y="186" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.38)" fontFamily="inherit">Days 2–3</text>
              <text x="492" y="186" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.38)" fontFamily="inherit">Days 4–7</text>
              <text x="683" y="186" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.38)" fontFamily="inherit">Week 2+</text>
              <text x="845" y="186" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.38)" fontFamily="inherit">Beyond</text>
              {/* Y axis labels */}
              <text x="8" y="20" fontSize="8" fill="rgba(255,255,255,0.25)" fontFamily="inherit">High</text>
              <text x="8" y="168" fontSize="8" fill="rgba(255,255,255,0.25)" fontFamily="inherit">Low</text>
            </svg>
            <p className="mt-3 text-xs leading-5 text-white/28">
              General guide only — individual experience varies. Source: NICE clinical guideline CG100; SIGN 74 — The management of harmful drinking and alcohol dependence.
            </p>
          </motion.div>
          <div
            className="interactive-timeline mt-12"
            onMouseLeave={() => setActiveTimelineStage(null)}
          >
            <div className="interactive-timeline-line" aria-hidden="true" />
            {timeline.map((item, index) => (
              <div key={item.time} className="interactive-timeline-point">
                <button
                  type="button"
                  className={`interactive-timeline-dot ${activeTimelineStage === index ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveTimelineStage(index)}
                  onFocus={() => setActiveTimelineStage(index)}
                  onBlur={() => setActiveTimelineStage(null)}
                  onClick={() => setActiveTimelineStage((current) => current === index ? null : index)}
                  aria-label={`Show common symptoms for ${item.time}`}
                  aria-expanded={activeTimelineStage === index}
                  aria-controls={`timeline-tooltip-${index}`}
                >
                  <item.icon className="h-5 w-5" />
                </button>
                <p className="interactive-timeline-label">{item.time}</p>
                <AnimatePresence>
                  {activeTimelineStage === index && (
                    <motion.div
                      id={`timeline-tooltip-${index}`}
                      className="interactive-timeline-tooltip"
                      role="tooltip"
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>Common symptoms</p>
                      <ul>
                        {timelineSymptoms[index].map((symptom) => <li key={symptom}>{symptom}</li>)}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <ol className="timeline-list mt-10">
            {timeline.map((item, index) => (
              <motion.li
                key={item.time}
                className={`timeline-item ${activeTimelineStage === index ? "is-active" : ""}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => setActiveTimelineStage(index)}
                onMouseLeave={() => setActiveTimelineStage(null)}
              >
                <div className="timeline-card">
                  <div className="timeline-stage">Stage {index + 1} of 4</div>
                  <div className="p-6 md:p-7">
                    <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand">{item.time}</p>
                    <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
                    <p className="mt-3 leading-7 text-white/65">{item.text}</p>
                    <p className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-sm font-semibold text-white/85">
                      <ShieldCheck className="h-4 w-4 text-brand" /> {item.note}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
          <div className="mt-10 max-w-xl">
            <InfoPanel label="Recovery fact" icon={Sparkles} tone="recovery">
              Detox is often only the first stage of treatment. Therapy and aftercare help turn physical stabilisation into a longer-term recovery plan.
            </InfoPanel>
          </div>
        </div>
      </section>

      <section id="detox-vs-rehab" className="px-5 py-20 md:py-28">
        <div className="page-shell">
          <SectionIntro
            eyebrow="Detox vs rehab"
            title="Connected stages, different purposes."
            text="The simplest way to understand detox vs rehab is that detox treats the immediate physical effects of stopping alcohol, while rehab helps a person understand their drinking and build the skills, support and routines needed for longer-term change."
          />
          <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-graphite/10 bg-white shadow-card">
            <div className="grid grid-cols-[.8fr_1fr_1fr] bg-graphite text-white">
              <div className="p-5 md:p-7"><span className="text-xs font-bold uppercase tracking-[.16em] text-white/45">At a glance</span></div>
              <div className="border-l border-white/10 p-5 md:p-7">
                <div className="flex items-center gap-3"><Droplets className="h-5 w-5 text-brand" /><h3 className="text-xl font-bold">Alcohol detox</h3></div>
              </div>
              <div className="border-l border-white/10 p-5 md:p-7">
                <div className="flex items-center gap-3"><HeartHandshake className="h-5 w-5 text-brand" /><h3 className="text-xl font-bold">Alcohol rehab</h3></div>
              </div>
            </div>
            {comparisons.map(([label, detox, rehab]) => (
              <div key={label} className="comparison-row grid grid-cols-[.8fr_1fr_1fr]">
                <div className="p-4 text-sm font-bold md:p-6">{label}</div>
                <div className="border-l border-graphite/10 p-4 text-sm leading-6 text-muted md:p-6">{detox}</div>
                <div className="border-l border-graphite/10 bg-brand-soft/20 p-4 text-sm leading-6 text-muted md:p-6">{rehab}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            Alcohol rehab detox programmes often connect medically assisted alcohol detox directly with residential rehabilitation, therapy and aftercare, so there is no unsupported gap between stages.
          </p>
          <Reveal className="mt-10 overflow-hidden rounded-[1.75rem] border border-graphite/10 bg-white shadow-card">
            <div className="grid lg:grid-cols-[1fr_1.5fr]">
              <div className="relative min-h-[220px]">
                <Image
                  src="/images/therapy-chairs.png"
                  alt="Empty therapy chairs in a calm, private room — the space that follows a successful detox"
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/30 to-transparent" />
              </div>
              <div className="flex items-center bg-brand-soft/40 p-7 md:p-9">
                <div>
                  <p className="medical-eyebrow">What comes next</p>
                  <h3 className="mt-4 text-2xl font-bold leading-snug tracking-tight md:text-3xl">
                    Detox ends the physical dependence. Rehab builds the life that follows.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    Connecting detox directly into residential rehabilitation reduces unsupported gaps — and creates the strongest foundation for sustained change.
                  </p>
                  <a href="#final-cta" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-ink hover:underline">
                    Speak to a specialist <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="medical-support" className="px-5 pb-20 md:pb-28">
        <div className="page-shell">
          <div className="overflow-hidden rounded-[2rem] bg-brand-soft">
            <div className="grid lg:grid-cols-[1.08fr_.92fr]">
            <div className="p-7 md:p-12 lg:p-16">
              <p className="medical-eyebrow">Why professional support matters</p>
              <h2 className="mt-4 max-w-2xl text-balance text-[clamp(2.1rem,4vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.045em]">
                Withdrawal is treatable. It should also be taken seriously.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-brand-ink/70">
                Professional support can make withdrawal safer and more manageable, but good alcohol rehab and detox care goes beyond monitoring symptoms. It also creates a structured route into therapy, recovery planning and continuing support.
              </p>
              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {[
                  [ShieldCheck, "Safety", "Assess withdrawal risk, monitor changing symptoms and provide urgent care when needed — particularly during the peak risk period at days 2–3."],
                  [Pill, "Medication", "Chlordiazepoxide or diazepam are commonly prescribed during medically assisted detox to reduce seizure risk and manage moderate-to-severe withdrawal."],
                  [BedDouble, "Structure", "Provide regular meals, rest, clinical observations and a predictable routine away from immediate access to alcohol."],
                  [ClipboardCheck, "Monitoring", "CIWA-Ar scoring tracks how symptoms change over time and guides decisions about dosage, escalation or step-down across the detox period."],
                ].map(([Icon, title, text]) => {
                  const ItemIcon = Icon as typeof ShieldCheck;
                  return (
                    <div key={title as string} className="rounded-2xl bg-white/65 p-5">
                      <ItemIcon className="h-5 w-5 text-brand" />
                      <h3 className="mt-3 font-bold">{title as string}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted">{text as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative min-h-[430px]">
              <Image src="/images/therapy-woodland.png" alt="A warm, outdoor therapy conversation between two people during residential treatment" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-center transition duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-brand-soft lg:via-transparent lg:to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-5 backdrop-blur">
                <p className="text-sm font-bold">A supported detox can be planned around you.</p>
                <p className="mt-1 text-sm leading-6 text-muted">An alcohol detox clinic can assess whether community support or a residential alcohol detox setting best reflects your personal level of risk.</p>
              </div>
            </div>
            </div>
          </div>
          <div className="mt-14">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="medical-eyebrow">Clinical assessment</p>
                <h3 className="mt-3 text-3xl font-bold tracking-[-.035em] md:text-4xl">What a medically assisted detox assessment covers.</h3>
              </div>
              <p className="max-w-lg text-sm leading-6 text-muted">A thorough assessment before detox begins identifies the safest treatment setting and the level of supervision needed throughout.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {assessmentAreas.map(({ icon: Icon, title, text }, index) => (
                <motion.div
                  key={title}
                  className="rounded-2xl border border-graphite/10 bg-white p-6 shadow-sm"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <Icon className="h-5 w-5 text-brand" />
                  <h4 className="mt-3 font-bold">{title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="questions" className="bg-white px-5 py-20 md:py-28">
        <div className="page-shell grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <SectionIntro
              eyebrow="Common questions"
              title="Clear answers to sensible questions."
              text="These answers cover common questions from people searching for alcohol detox near me, comparing treatment settings or trying to understand what happens next. General information cannot replace personal medical advice."
            />
            <a href={phoneHref} className="mt-8 inline-flex items-center gap-3 rounded-full bg-graphite px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-1">
              <MessageCircle className="h-4 w-4 text-brand" /> Ask about treatment
            </a>
            <Reveal delay={0.15} className="mt-6 overflow-hidden rounded-2xl">
              <div className="relative h-52">
                <Image
                  src="/images/morning-coffee.png"
                  alt="A calm morning with a cup of coffee — life often feels steadier and more manageable after alcohol treatment"
                  fill
                  sizes="(max-width: 1024px) 90vw, 28vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/55 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-xs font-semibold leading-5 text-white/90">
                  Many people describe daily life after treatment as calmer, steadier and more connected.
                </p>
              </div>
            </Reveal>
          </div>
          <Accordion type="single" collapsible className="border-t border-graphite/10">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-lg md:text-xl">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="related-guides" className="px-5 py-20 md:py-28">
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro
              eyebrow="Helpful guides"
              title="Further reading, at your own pace."
              text="Practical, plain-English guides to withdrawal, alcohol addiction treatment, rehab and life after treatment."
            />
            <a href="#top" className="inline-flex items-center gap-2 text-sm font-bold text-brand-ink">Browse all topics <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            {guides.map((guide, index) => (
              <a
                key={guide.title}
                href={guide.href}
                className={`guide-card group ${index === 0 || index === 5 ? "guide-featured lg:col-span-7" : index === 1 || index === 4 ? "lg:col-span-5" : "lg:col-span-4"}`}
              >
                <div className="guide-image">
                  <Image src={guide.image} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/35 to-transparent" />
                  <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-brand-ink shadow-sm backdrop-blur transition duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    <guide.icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-1 items-start justify-between gap-5 p-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[.15em] text-brand">{guide.label}</p>
                    <h3 className="mt-2 max-w-sm text-xl font-bold tracking-[-.025em]">{guide.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-muted">{guide.description}</p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-graphite/10 transition group-hover:translate-x-1 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="final-cta" className="px-5 pb-5">
        <div className="page-shell relative overflow-hidden rounded-[2rem] bg-graphite px-7 py-14 text-white md:px-14 md:py-16 lg:px-20">
          <Image
            src="/images/costal-walk.png"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center opacity-20"
            aria-hidden="true"
          />
          <div className="absolute -right-12 -top-24 h-72 w-72 rounded-full border-[55px] border-brand/15" />
          <div className="absolute bottom-0 right-[30%] h-36 w-36 rounded-full bg-brand/10 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="medical-eyebrow text-brand">A calmer first step</p>
            <h2 className="mt-4 text-balance text-[clamp(2.35rem,5vw,4.5rem)] font-bold leading-[.98] tracking-[-.05em]">
              You do not have to work it all out today.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
              A confidential conversation can help you understand the safest next step for you or someone you care about.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={phoneHref} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-brand px-7 font-bold transition hover:-translate-y-1 hover:bg-[#e88975]">
                <Phone className="h-4 w-4" /> Call {phoneNumber}
              </a>
              <a href="https://thewellbourneclinic.co.uk/contact/" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 font-bold transition hover:-translate-y-1 hover:bg-white/10">
                Request a call back <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-5 py-10">
        <div className="page-shell flex flex-col gap-7 border-t border-graphite/10 pt-8 md:flex-row md:items-center md:justify-between">
          <Logo />
          <p className="max-w-xl text-xs leading-5 text-muted">
            This website provides general information and is not a substitute for medical assessment, diagnosis or emergency care.
          </p>
          <div className="flex gap-5 text-xs font-semibold text-muted">
            <a href="#questions" className="hover:text-brand-ink">FAQs</a>
            <a href="https://thewellbourneclinic.co.uk/privacy-policy/" className="hover:text-brand-ink">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
