import { motion } from "framer-motion";
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
} from "lucide-react";
import type { ReactNode } from "react";

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

function StatusDot({ tone }: { tone: string }) {
  const className = tone === "ok" ? "bg-emerald-300" : tone === "pending" ? "bg-amber-300" : "bg-violet-300";
  return <span className={`h-3 w-3 rounded-full ${className}`} />;
}

export default function VisaProofLanding() {
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
                  <GlowCard key={item.value} className="p-5">
                    <div className="text-2xl md:text-3xl font-semibold text-cyan-300">{item.value}</div>
                    <div className="mt-2 text-sm text-slate-400 leading-snug">{item.label}</div>
                  </GlowCard>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.12 }}
              className="relative"
            >
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

        <section id="problem" className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <SectionTitle
            eyebrow="Problem"
            title="Immigration is slowed down because trust is rebuilt manually every time."
            description="Australia depends on skilled migration, international students and global talent, but applicants still rely on document-heavy workflows that are hard to verify across borders."
          />

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-12">
            {problems.map((item) => (
              <GlowCard key={item.title} className="p-6">
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="mt-3 text-slate-400 leading-relaxed">{item.description}</p>
              </GlowCard>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
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

            <div className="grid gap-4">
              {flow.map((step, index) => {
                const Icon = step.icon;
                return (
                  <GlowCard key={step.title} className="p-6 md:p-7">
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
                );
              })}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <SectionTitle
                eyebrow="Why Solana"
                title="Use Solana as verification infrastructure, not speculation."
                description="This use case needs low-cost, high-volume and tamper-resistant proof. Solana is useful here because it can support fast verification references while keeping sensitive data off-chain."
              />

              <div className="mt-8 grid gap-4">
                {[
                  ["Low-cost proof", "Credential references should be cheap enough to use at scale."],
                  ["Fast verification", "Employers, agents and institutions need quick confidence, not another slow process."],
                  ["Tamper-resistant records", "Verification status should be hard to alter after a trusted issuer confirms it."],
                  ["Composable infrastructure", "The same proof layer can later support hiring, education and licensing."],
                ].map(([title, description]) => (
                  <GlowCard key={title} className="p-5">
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="mt-2 text-slate-400 leading-relaxed">{description}</p>
                  </GlowCard>
                ))}
              </div>
            </div>

            <GlowCard className="p-6 md:p-7">
              <div className="flex items-center gap-3">
                <LockKeyhole className="w-5 h-5 text-cyan-300" />
                <h3 className="text-2xl font-semibold">Fraud-aware by design</h3>
              </div>
              <p className="mt-4 text-slate-400 leading-relaxed">
                The product avoids the risky parts of crypto UX and uses Solana only where it adds real value: verification.
              </p>
              <div className="mt-6 space-y-3">
                {safeguards.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                    <p className="text-slate-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>
        </section>

        <section id="mvp" className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <SectionTitle
            eyebrow="MVP"
            title="Small enough to build. Useful enough to matter."
            description="Start with Australian skilled visa document readiness. Do not wait for government integration. Build for applicants, migration agents and employers first."
          />

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mt-12">
            <GlowCard className="p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-4">
                {mvp.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex gap-3 items-start">
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
            <SectionTitle
              eyebrow="Scale"
              title="Start with immigration. Expand into global proof of credentials."
              description="The same document verification problem exists across migration, hiring, education and professional licensing. VisaProof can start narrow and become portable trust infrastructure."
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {markets.map((item) => (
                <GlowCard key={item} className="p-5">
                  <div className="flex items-center gap-3">
                    <Globe2 className="w-4 h-4 text-cyan-300" />
                    <span className="text-slate-200">{item}</span>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 pb-28">
          <GlowCard className="p-8 md:p-12 bg-gradient-to-r from-cyan-400/10 via-sky-500/10 to-violet-500/10">
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
          </GlowCard>
        </section>
      </main>
    </div>
  );
}
