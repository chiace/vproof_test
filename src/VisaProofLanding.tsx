import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Globe2,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
  WalletCards,
  Copy,
  Eye,
  X,
} from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import heroIllustration from "./assets/hero-illustration.svg";
import docPreview from "./assets/doc-preview.svg";

const stats = [
  {
    value: "1",
    label: "Focused MVP: Australian skilled visa document readiness",
  },
  {
    value: "0",
    label: "No token, no trading, no airdrops, no speculative layer",
  },
  {
    value: "Global",
    label: "Reusable trust layer for migration, hiring and education",
  },
];

const problems = [
  {
    title: "Repeated paperwork",
    description:
      "Applicants upload the same degrees, references, test results and identity evidence across multiple systems.",
  },
  {
    title: "Manual verification",
    description:
      "Migration agents, employers and institutions still need to check whether documents are genuine and current.",
  },
  {
    title: "Fraud risk",
    description:
      "PDFs and letters can be altered, forged or difficult to validate across borders.",
  },
  {
    title: "Low visibility",
    description:
      "Applicants often do not know what is verified, what is missing, or what might delay their pathway.",
  },
];

const flow = [
  {
    title: "Upload privately",
    description: "Applicants add immigration documents to a secure private profile.",
    icon: UploadCloud,
  },
  {
    title: "Verify once",
    description: "A trusted issuer or verifier confirms the document is legitimate.",
    icon: BadgeCheck,
  },
  {
    title: "Anchor proof",
    description: "A tamper-resistant verification reference is anchored on Solana, while files stay off-chain.",
    icon: ShieldCheck,
  },
  {
    title: "Reuse trust",
    description: "Applicants share a simple verification page with agents, employers or institutions.",
    icon: ArrowRight,
  },
];

const dashboardDocs = [
  { label: "Degree certificate", issuer: "University issuer", status: "Verified", tone: "ok", icon: GraduationCap },
  { label: "Employment letter", issuer: "Employer verifier", status: "Verified", tone: "ok", icon: Briefcase },
  { label: "English test result", issuer: "Test provider", status: "Pending", tone: "pending", icon: Clock3 },
  { label: "Police check", issuer: "Authorised authority", status: "Needs review", tone: "review", icon: FileCheck2 },
];

type DemoDocId = "degree" | "employment" | "english" | "police";
type DemoDoc = {
  id: DemoDocId;
  title: string;
  issuer: string;
  status: "Verified" | "Pending" | "Needs review";
  description: string;
  onchainRef: string;
};

const demoDocs: DemoDoc[] = [
  {
    id: "degree",
    title: "Degree certificate",
    issuer: "University issuer",
    status: "Verified",
    description: "Credential verified by issuing institution. Original file stays private.",
    onchainRef: "solana:vp:8C7B…A12F",
  },
  {
    id: "employment",
    title: "Employment letter",
    issuer: "Employer verifier",
    status: "Verified",
    description: "Signed reference verified by employer. Shareable verification page generated.",
    onchainRef: "solana:vp:2F31…9D0B",
  },
  {
    id: "english",
    title: "English test result",
    issuer: "Test provider",
    status: "Pending",
    description: "Awaiting issuer confirmation. Status updates propagate instantly to viewers.",
    onchainRef: "solana:vp:0B19…2AC4",
  },
  {
    id: "police",
    title: "Police check",
    issuer: "Authorised authority",
    status: "Needs review",
    description: "Document flagged for review. Proof exists, but verification is not granted.",
    onchainRef: "solana:vp:7A0E…C883",
  },
];

const safeguards = [
  "Sensitive documents stay private and off-chain",
  "No token, memecoin, airdrop or investment component",
  "Only hashes, attestations or credential references are anchored",
  "Issuer trust matters: universities, employers, test providers and authorised verifiers",
  "Designed as support infrastructure, not a replacement for government decision-making",
];

const mvp = [
  "Applicant onboarding",
  "Document checklist for Australian skilled visa readiness",
  "Private upload flow",
  "Verifier dashboard",
  "Verification statuses: pending, verified, rejected, expired",
  "Solana proof/reference creation",
  "Shareable verification page",
];

const markets = [
  "Australian skilled migration",
  "Migration agents",
  "Employer sponsorship",
  "International student admissions",
  "Global hiring",
  "Professional licence verification",
];

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-cyan-300 text-xs md:text-sm uppercase tracking-[0.22em]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight leading-tight">{title}</h2>
      {description ? <p className="mt-5 text-slate-300 text-lg leading-relaxed">{description}</p> : null}
    </div>
  );
}

function GlowCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[28px] border border-white/10 bg-white/[0.055] backdrop-blur-xl shadow-[0_0_80px_rgba(34,211,238,0.08)] ${className}`}>
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function TiltCard({
  children,
  className = "",
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.6 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.6 });

  useEffect(() => {
    const unsubX = mx.on("change", (v) => {
      const y = (v - 0.5) * -intensity;
      rx.set(y);
    });
    const unsubY = my.on("change", (v) => {
      const x = (v - 0.5) * intensity;
      ry.set(x);
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [intensity, mx, my, rx, ry]);

  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0px)`;

  return (
    <motion.div
      ref={ref}
      style={{ transform }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        mx.set(Math.max(0, Math.min(1, px)));
        my.set(Math.max(0, Math.min(1, py)));
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatusDot({ tone }: { tone: string }) {
  const className = tone === "ok" ? "bg-emerald-300" : tone === "pending" ? "bg-amber-300" : "bg-violet-300";
  return <span className={`h-3 w-3 rounded-full ${className}`} />;
}

export default function VisaProofLanding() {
  const modalTitleId = useId();
  const [demoTab, setDemoTab] = useState<"applicant" | "verifier" | "share">("applicant");
  const [activeDoc, setActiveDoc] = useState<DemoDoc>(demoDocs[0]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const statusTone = useMemo(() => {
    if (activeDoc.status === "Verified") return "ok";
    if (activeDoc.status === "Pending") return "pending";
    return "review";
  }, [activeDoc.status]);

  useEffect(() => {
    if (!isPreviewOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPreviewOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPreviewOpen]);

  async function copyProof() {
    try {
      await navigator.clipboard.writeText(activeDoc.onchainRef);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1200);
    } catch {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 1200);
    }
  }

  return (
    <div className="min-h-screen bg-[#040816] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.17),transparent_26%),radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.14),transparent_30%)]" />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.065) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,8,22,0.05),rgba(4,8,22,0.8),rgba(4,8,22,1))]" />

      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-sm text-cyan-200 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
            Superteam Australia Ideathon · Real-world Solana infrastructure
          </motion.div>

          <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-12 items-center mt-10">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
            >
              <div className="inline-flex items-center gap-2 text-sm text-slate-300 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md">
                <Globe2 className="w-4 h-4 text-cyan-300" />
                Start in Australia. Scale to global mobility.
              </div>

              <h1 className="mt-7 text-5xl md:text-7xl font-semibold leading-[0.95] tracking-tight max-w-4xl">
                Verified documents
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400">
                  for faster immigration.
                </span>
              </h1>

              <p className="mt-7 text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                VisaProof is a Solana-based verification layer that helps applicants, migration agents, employers and institutions verify immigration documents faster.
              </p>

              <p className="mt-4 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
                The personal document stays private. Solana anchors the proof that it was verified by a trusted source. Prepare once. Verify once. Reuse trust.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#problem"
                  className="rounded-2xl bg-white text-slate-950 px-6 py-3.5 font-medium shadow-2xl shadow-cyan-500/20 hover:scale-[1.02] transition inline-flex items-center gap-2"
                >
                  Explore the idea
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#mvp"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-medium backdrop-blur-md hover:bg-white/10 transition inline-flex items-center gap-2"
                >
                  View MVP
                </a>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
                {stats.map((item) => (
                  <TiltCard key={item.value} className="h-full">
                    <GlowCard className="p-5 h-full hover:bg-white/[0.07] transition">
                      <div className="text-2xl md:text-3xl font-semibold text-cyan-300">{item.value}</div>
                      <div className="mt-2 text-sm text-slate-400 leading-snug">{item.label}</div>
                    </GlowCard>
                  </TiltCard>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.12 }}
              className="relative"
            >
              <motion.img
                src={heroIllustration}
                alt="VisaProof product visual"
                className="absolute -top-10 -right-10 w-[560px] max-w-[90vw] opacity-70 pointer-events-none select-none"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <GlowCard className="p-4 md:p-5 shadow-[0_0_120px_rgba(34,211,238,0.15)]">
                <div className="rounded-[26px] border border-cyan-400/15 bg-[#091121]/95 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm text-slate-400">Applicant dashboard</div>
                      <div className="text-2xl font-semibold mt-1">Document readiness</div>
                    </div>
                    <div className="rounded-2xl px-3 py-2 bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-sm">
                      2 verified
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                    <div className="text-sm text-cyan-200">TL;DR</div>
                    <div className="mt-2 text-base leading-relaxed text-white">
                      Turn key immigration documents into reusable verification proofs without putting private files on-chain.
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {dashboardDocs.map((doc) => {
                      const Icon = doc.icon;
                      return (
                        <div key={doc.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-cyan-200" />
                            </div>
                            <div>
                              <div className="font-medium">{doc.label}</div>
                              <div className="text-sm text-slate-400 mt-1">
                                {doc.issuer} · {doc.status}
                              </div>
                            </div>
                          </div>
                          <StatusDot tone={doc.tone} />
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm text-slate-400">Use case</div>
                      <div className="mt-2 font-semibold">Skilled visa</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm text-slate-400">Data</div>
                      <div className="mt-2 font-semibold text-cyan-300">Off-chain</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm text-slate-400">Proof</div>
                      <div className="mt-2 font-semibold text-emerald-300">On-chain</div>
                    </div>
                  </div>
                </div>
              </GlowCard>

              <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <Reveal>
            <SectionTitle
              eyebrow="Interactive demo"
              title="Make it feel real in 30 seconds."
              description="Click around the prototype. The goal is instant clarity: what’s private, what’s verified, and what a third party actually sees."
            />
          </Reveal>

          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 mt-12 items-start">
            <Reveal delay={0.05}>
              <GlowCard className="p-6 md:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  {(
                    [
                      { id: "applicant", label: "Applicant view" },
                      { id: "verifier", label: "Verifier view" },
                      { id: "share", label: "Share link" },
                    ] as const
                  ).map((tab) => {
                    const active = demoTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setDemoTab(tab.id)}
                        className={`rounded-2xl px-4 py-2 text-sm font-medium border transition ${
                          active
                            ? "bg-white text-slate-950 border-white shadow-2xl shadow-cyan-500/10"
                            : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-3">
                  {demoDocs.map((doc) => {
                    const isActive = doc.id === activeDoc.id;
                    const tone = doc.status === "Verified" ? "ok" : doc.status === "Pending" ? "pending" : "review";
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => setActiveDoc(doc)}
                        className={`w-full text-left rounded-2xl border p-4 flex items-center justify-between gap-4 transition ${
                          isActive ? "bg-white/10 border-cyan-400/30" : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="font-medium truncate">{doc.title}</div>
                          <div className="text-sm text-slate-400 mt-1 truncate">
                            {doc.issuer} · {doc.status}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <StatusDot tone={tone} />
                          <ArrowRight className="w-4 h-4 text-slate-300" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </GlowCard>
            </Reveal>

            <Reveal delay={0.1}>
              <TiltCard intensity={12}>
                <GlowCard className="p-6 md:p-7 overflow-hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                        Live prototype
                      </div>
                      <h3 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight truncate">{activeDoc.title}</h3>
                      <p className="mt-2 text-slate-400 leading-relaxed">{activeDoc.description}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="rounded-2xl px-3 py-2 border border-white/10 bg-white/5">
                        <div className="text-[11px] text-slate-400">Status</div>
                        <div className={`mt-1 text-sm font-semibold ${statusTone === "ok" ? "text-emerald-300" : statusTone === "pending" ? "text-amber-300" : "text-violet-300"}`}>
                          {activeDoc.status}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <div className="text-sm text-slate-400">On-chain reference</div>
                      <div className="mt-2 font-mono text-sm text-slate-200 break-all">{activeDoc.onchainRef}</div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={copyProof}
                          className="rounded-2xl bg-white text-slate-950 px-4 py-2 font-medium inline-flex items-center gap-2 hover:scale-[1.02] transition"
                        >
                          <Copy className="w-4 h-4" />
                          {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy proof"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsPreviewOpen(true)}
                          className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 font-medium backdrop-blur-md hover:bg-white/10 transition inline-flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-cyan-400/15 bg-cyan-400/10 p-5">
                      <div className="text-sm text-cyan-200">What a viewer sees</div>
                      <div className="mt-3 space-y-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Private file</div>
                          <div className="mt-1 text-sm text-slate-200">Hidden · Off-chain</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Verification</div>
                          <div className="mt-1 text-sm text-slate-200">Issuer: {activeDoc.issuer}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="text-sm text-slate-300">Interaction</div>
                    <div className="mt-3 text-slate-400 leading-relaxed">
                      {demoTab === "applicant"
                        ? "Applicants can upload, track statuses, and share a verification page—without re-uploading sensitive files everywhere."
                        : demoTab === "verifier"
                          ? "Verifiers confirm authenticity once. The status becomes reusable trust infrastructure for agents, employers, and institutions."
                          : "Share a link that proves verification status. Anyone can validate the reference without seeing the private file."}
                    </div>
                  </div>
                </GlowCard>
              </TiltCard>
            </Reveal>
          </div>
        </section>

        <section id="problem" className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <Reveal>
            <SectionTitle
              eyebrow="Problem"
              title="Immigration is slowed down because trust is rebuilt manually every time."
              description="Australia depends on skilled migration, international students and global talent, but applicants still rely on document-heavy workflows that are hard to verify across borders."
            />
          </Reveal>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-12">
            {problems.map((item) => (
              <Reveal key={item.title} delay={0.04}>
                <TiltCard intensity={8} className="h-full">
                  <GlowCard className="p-6 h-full hover:bg-white/[0.07] transition">
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <p className="mt-3 text-slate-400 leading-relaxed">{item.description}</p>
                  </GlowCard>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            <Reveal>
              <GlowCard className="p-8 md:p-10 h-full">
                <SectionTitle
                  eyebrow="Idea"
                  title="A reusable verification layer for immigration documents."
                  description="VisaProof helps applicants prove that key documents have already been verified by a trusted source, while keeping the original files private and off-chain."
                />
                <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-slate-300 text-lg leading-relaxed">
                    It is not a visa decision system. It is not a token. It is not a replacement for government checks. It is a practical trust layer that can reduce repeated verification work.
                  </p>
                </div>
              </GlowCard>
            </Reveal>

            <div className="grid gap-4">
              {flow.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.title} delay={0.03 * index}>
                    <TiltCard intensity={8}>
                      <GlowCard className="p-6 md:p-7 hover:bg-white/[0.07] transition">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-cyan-200" />
                          </div>
                          <div>
                            <div className="text-sm text-cyan-300">Step {index + 1}</div>
                            <h3 className="mt-1 text-xl font-medium">{step.title}</h3>
                            <p className="mt-2 text-slate-400 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </GlowCard>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <Reveal>
                <SectionTitle
                  eyebrow="Why Solana"
                  title="Use Solana as verification infrastructure, not speculation."
                  description="This use case needs low-cost, high-volume and tamper-resistant proof. Solana is useful here because it can support fast verification references while keeping sensitive data off-chain."
                />
              </Reveal>

              <div className="mt-8 grid gap-4">
                {[
                  ["Low-cost proof", "Credential references should be cheap enough to use at scale."],
                  ["Fast verification", "Employers, agents and institutions need quick confidence, not another slow process."],
                  ["Tamper-resistant records", "Verification status should be hard to alter after a trusted issuer confirms it."],
                  ["Composable infrastructure", "The same proof layer can later support hiring, education and licensing."],
                ].map(([title, description], idx) => (
                  <Reveal key={title} delay={0.04 * idx}>
                    <TiltCard intensity={8}>
                      <GlowCard className="p-5 hover:bg-white/[0.07] transition">
                        <h3 className="text-lg font-medium">{title}</h3>
                        <p className="mt-2 text-slate-400 leading-relaxed">{description}</p>
                      </GlowCard>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.08}>
              <GlowCard className="p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <LockKeyhole className="w-5 h-5 text-cyan-300" />
                  <h3 className="text-2xl font-semibold">Fraud-aware by design</h3>
                </div>
                <p className="mt-4 text-slate-400 leading-relaxed">
                  The product avoids the risky parts of crypto UX and uses Solana only where it adds real value: verification.
                </p>
                <div className="mt-6 space-y-3">
                  {safeguards.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: 0.04 * idx }}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                      <p className="text-slate-300 leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </GlowCard>
            </Reveal>
          </div>
        </section>

        <section id="mvp" className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <Reveal>
            <SectionTitle
              eyebrow="MVP"
              title="Small enough to build. Useful enough to matter."
              description="Start with Australian skilled visa document readiness. Do not wait for government integration. Build for applicants, migration agents and employers first."
            />
          </Reveal>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mt-12">
            <GlowCard className="p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-4">
                {mvp.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex gap-3 items-start hover:bg-white/10 transition">
                    <CheckCircle2 className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
                    <p className="text-slate-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </GlowCard>

            <GlowCard className="p-6 md:p-8">
              <div className="text-sm text-cyan-300 uppercase tracking-[0.2em]">Early wedge</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">Sell to the people doing the checking.</h3>
              <p className="mt-4 text-slate-400 leading-relaxed">
                The strongest first customer is likely a migration agent or employer, not the government. They already experience the pain of document collection, readiness and verification.
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  { Icon: Users, title: "Migration agents", desc: "Reduce repeated admin and document chasing" },
                  { Icon: Briefcase, title: "Employers", desc: "Gain confidence before sponsoring talent" },
                  { Icon: WalletCards, title: "Applicants", desc: "Know what is ready, pending or risky" },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex gap-3 items-start">
                    <Icon className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{title}</div>
                      <div className="text-sm text-slate-400 mt-1">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Reveal>
              <SectionTitle
                eyebrow="Scale"
                title="Start with immigration. Expand into global proof of credentials."
                description="The same document verification problem exists across migration, hiring, education and professional licensing. VisaProof can start narrow and become portable trust infrastructure."
              />
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {markets.map((item) => (
                <Reveal key={item} delay={0.03}>
                  <TiltCard intensity={8}>
                    <GlowCard className="p-5 hover:bg-white/[0.07] transition">
                      <div className="flex items-center gap-3">
                        <Globe2 className="w-4 h-4 text-cyan-300" />
                        <span className="text-slate-200">{item}</span>
                      </div>
                    </GlowCard>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 pb-28">
          <Reveal>
            <GlowCard className="p-8 md:p-12 bg-gradient-to-r from-cyan-400/10 via-sky-500/10 to-violet-500/10">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
                <div className="max-w-3xl">
                  <p className="text-cyan-300 text-sm uppercase tracking-[0.2em]">Closing statement</p>
                  <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">Prepare once. Verify once. Reuse trust.</h2>
                  <p className="mt-6 text-slate-300 text-lg leading-relaxed">
                    VisaProof turns immigration document checking into a clearer, faster and more reusable verification flow. It gives Solana a practical real-world use case: helping people prove what matters without exposing more than they need to.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a href="#mvp" className="rounded-2xl bg-white text-slate-950 px-6 py-3.5 font-medium inline-flex items-center gap-2 hover:scale-[1.02] transition">
                      View MVP scope
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-slate-300">
                      Concept by Chiara Cerretti · Superteam Australia
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-8 bg-[radial-gradient(circle_at_40%_30%,rgba(34,211,238,0.22),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.16),transparent_52%)] blur-2xl" />
                  <TiltCard intensity={10} className="relative">
                    <div className="rounded-[26px] border border-white/10 bg-white/5 p-4">
                      <img src={docPreview} alt="Verification page preview" className="w-full rounded-2xl border border-white/10 bg-black/20" />
                    </div>
                  </TiltCard>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </section>
      </main>

      <AnimatePresence>
        {isPreviewOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute inset-0 bg-[#040816]/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-5xl"
            >
              <GlowCard className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div id={modalTitleId} className="text-xl md:text-2xl font-semibold truncate">
                      {activeDoc.title} · Preview
                    </div>
                    <div className="mt-2 text-slate-400 text-sm md:text-base">
                      Private file is not shown here—this is a “what it feels like” visual for the ideathon prototype.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-3">
                  <img src={docPreview} alt="Document preview" className="w-full rounded-2xl" />
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm text-slate-400">
                    Proof ref: <span className="font-mono text-slate-200">{activeDoc.onchainRef}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={copyProof}
                      className="rounded-2xl bg-white text-slate-950 px-4 py-2 font-medium inline-flex items-center gap-2 hover:scale-[1.02] transition"
                    >
                      <Copy className="w-4 h-4" />
                      {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy proof"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPreviewOpen(false)}
                      className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 font-medium backdrop-blur-md hover:bg-white/10 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
