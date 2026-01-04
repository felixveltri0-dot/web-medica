"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

type LinkItem = {
  label: string;
  desc?: string;
  href: string;
  kind?: "primary" | "soft";
};

type Procedure = {
  slug: string;
  title: string;
  duration?: string;
  bullets: string[];
  note?: string;
};

type Resource = {
  title: string;
  desc: string;
  href: string; // luego va a apuntar a /public/recursos/archivo.pdf
  tag?: string;
};

const DOCTOR_NAME = "Dra. Candela Fernandez";
const HANDLE = "Dracandefernandez";

const procedures: Procedure[] = [
  {
    slug: "ginecologia-integral",
    title: "Ginecología integral (placeholder)",
    duration: "Consulta: 30–45 min",
    bullets: [
      "Qué es: descripción breve para ubicar.",
      "Para quién: casos típicos (general).",
      "Qué incluye: evaluación + plan personalizado.",
      "Cuidados: recomendaciones generales (no reemplaza consulta).",
    ],
    note: "Esto es un ejemplo. Luego lo reemplazamos por tu texto real.",
  },
  {
    slug: "menopausia-salud-hormonal",
    title: "Menopausia y salud hormonal (placeholder)",
    duration: "Consulta: 30–45 min",
    bullets: [
      "Objetivo principal y beneficios esperables.",
      "Enfoque: evaluación integral + seguimiento.",
      "Opciones: se personalizan según cada paciente.",
      "Controles: ajustes en base a evolución.",
    ],
  },
  {
    slug: "estetica-y-funcional",
    title: "Ginecología estética y funcional (placeholder)",
    duration: "Sesión: 30–60 min",
    bullets: [
      "Objetivos: bienestar, confort y funcionalidad.",
      "Cómo se realiza: explicación general (sin reemplazar consulta).",
      "Recuperación: variable según caso.",
      "Seguimiento: controles y cuidados.",
    ],
  },
];

const resources: Resource[] = [
  {
    title: "Guía práctica (PDF)",
    desc: "Checklist simple para tu primera consulta (placeholder).",
    href: "/recursos/guia-practica.pdf",
    tag: "PDF",
  },
  {
    title: "Planilla de síntomas (PDF)",
    desc: "Registro semanal para seguimiento (placeholder).",
    href: "/recursos/planilla-sintomas.pdf",
    tag: "PDF",
  },
  {
    title: "Preguntas frecuentes (PDF)",
    desc: "Respuestas claras a dudas comunes (placeholder).",
    href: "/recursos/faq.pdf",
    tag: "PDF",
  },
];

const locations = [
  { name: "Consultorio 1 (placeholder)", address: "Barrio/ciudad — Dirección aproximada", map: "#" },
  { name: "Consultorio 2 (placeholder)", address: "Barrio/ciudad — Dirección aproximada", map: "#" },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--muted)] px-2.5 py-1 text-xs text-[var(--text)] shadow-sm">
      {children}
    </span>
  );
}

/**
 * Card normal: CUADRO GRANDE (marrón) + texto crema
 * Card inverted: CUADRO INTERNO (crema) + texto marrón
 */
function Card({
  children,
  className,
  inverted = false,
}: {
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <div
      className={cn(
        inverted
          ? "rounded-2xl bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] p-5 shadow-[var(--shadow-soft)]"
          : "rounded-2xl bg-[var(--text)] text-[var(--bg)] border border-[var(--border)] p-5 shadow-[var(--shadow)]",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Linktree buttons (Accesos rápidos)
 * - hover-selectable = hover a #DEE7EE (lo define globals.css)
 */
function ButtonLink({ item }: { item: LinkItem }) {
  const base =
    "hover-selectable group flex w-full items-center justify-between gap-3 rounded-2xl border border-[var(--border)] px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

  // Siempre crema con texto marrón dentro de cuadro grande
  const style = "bg-[var(--bg)] text-[var(--text)]";

  return (
    <a href={item.href} className={cn(base, style)}>
      <div>
        <div className="text-sm font-semibold">{item.label}</div>
        {item.desc && <div className="mt-0.5 text-xs opacity-80">{item.desc}</div>}
      </div>
      <span className="text-xs opacity-80 transition group-hover:opacity-100">→</span>
    </a>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-1 text-sm opacity-80">{subtitle}</p>}
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-[var(--border)]" />;
}

function Toast({ text, onClose }: { text: string; onClose: () => void }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 2600);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[min(560px,calc(100%-24px))] -translate-x-1/2">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 text-sm text-[var(--text)] shadow-lg">
        {text}
      </div>
    </div>
  );
}

function ResourceCard({ r, onCopy }: { r: Resource; onCopy: (url: string) => void }) {
  return (
    <Card inverted className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-semibold">{r.title}</div>
        {r.tag && (
          <span className="rounded-full border border-[var(--border)] bg-[var(--muted)] px-2.5 py-1 text-xs">
            {r.tag}
          </span>
        )}
      </div>

      <div className="mt-2 text-sm opacity-90">{r.desc}</div>

      <div className="mt-4 flex flex-wrap gap-2">
        {/* Descargar => btn-primary (CEAFAA) */}
        <a href={r.href} className="btn-primary" download>
          Descargar
        </a>

        {/* Copiar link (no lo pediste con color principal, lo dejo secundario) */}
        <button
          type="button"
          onClick={() => onCopy(r.href)}
          className="hover-selectable rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm text-[var(--text)] transition"
        >
          Copiar link
        </button>
      </div>

      <div className="mt-3 text-xs opacity-70">
        Si el PDF todavía no existe, luego lo subimos en <b>/public/recursos</b>.
      </div>
    </Card>
  );
}

export default function Page() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  React.useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    const isDark =
      saved ? saved === "dark" : window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    setDark(!!isDark);
  }, []);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const nav: LinkItem[] = [
    { label: "Biografía profesional", desc: "Formación, enfoque y estilo de atención", href: "#bio", kind: "primary" },
    { label: "Procedimientos", desc: "Detalle claro de cada propuesta", href: "#procedimientos" },
    { label: "Recursos gratis", desc: "Archivos descargables (PDFs, guías, planillas)", href: "#recursos" },
    { label: "Consultorios / sedes", desc: "Dónde atiendo y cómo llegar", href: "#sedes" },
    { label: "Contacto", desc: "Turnos y consultas", href: "#contacto" },
    { label: "Productos", desc: "Recomendados / tienda (placeholder)", href: "#productos" },
    { label: "Preguntas frecuentes", desc: "Dudas típicas antes de reservar", href: "#faq" },
  ];

  const copyUrl = (path: string) => {
    const url = typeof window !== "undefined" ? window.location.origin + path : path;
    navigator.clipboard?.writeText(url);
    setToast("Link copiado ✅");
  };

  return (
    <main className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* HERO CON IMAGEN + TEXTO */}
    <section className="relative w-full h-[70vh] overflow-hidden">
      <img
        src="/doctora.jpg"
        alt="Dra. Candela Fernandez"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[var(--cream)]" />

      <div className="relative z-10 flex h-full items-end px-6 pb-10">
        <div>
          <h1 className="text-[28px] font-semibold text-white leading-tight">
            Advanced Women&apos;s Health
          </h1>
          <p className="mt-1 text-sm text-white/90">
            Ginecología de precisión
          </p>
        </div>
      </div>
    </section>

    {/* TODO LO QUE YA TENÍAS SIGUE ABAJO */}
    
      {/* Fondo suave con tus tonos */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[var(--ice)]/70 blur-3xl" />
        <div className="absolute top-72 left-[-140px] h-[380px] w-[380px] rounded-full bg-[var(--ice)]/55 blur-3xl" />
        <div className="absolute top-[680px] right-[-160px] h-[420px] w-[420px] rounded-full bg-[var(--sand)]/45 blur-3xl" />
      </div>

      <div className="mx-auto w-[min(980px,calc(100%-32px))] py-10">
        {/* Header */}
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--espresso)] text-[var(--bg)] shadow-sm">
              <span className="text-lg font-bold">MD</span>
            </div>
            <div>
              <div className="text-xl font-semibold leading-tight">{DOCTOR_NAME}</div>
              <div className="mt-1 text-sm text-[var(--text2)]">
                @{HANDLE} · Ginecología · Menopausia · Enfoque integral
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>Atención personalizada</Badge>
                <Badge>Enfoque basado en evidencia</Badge>
                <Badge>Consultas presenciales y online</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
          

            {/* Copiar mensaje => btn-primary (CEAFAA) */}
            <button
              onClick={() => {
                navigator.clipboard?.writeText("Hola! Quiero pedir un turno.");
                setToast("Mensaje copiado ✅");
              }}
              className="btn-primary"
            >
              Copiar mensaje
            </button>
          </div>
        </header>

        {/* 1) Accesos rápidos (CUADRO GRANDE = marrón) */}
        <section className="mt-8">
          <Card>
            <div className="text-sm font-semibold">Accesos rápidos</div>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {nav.map((item) => (
                <ButtonLink key={item.label} item={item} />
              ))}
            </div>

            <div className="mt-5 text-xs opacity-80">
              *Esto es demo con placeholders. Reemplazamos con tus textos reales cuando me los pases.
            </div>
          </Card>
        </section>

        {/* 2) BIO */}
        <section id="bio" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle title="Biografía profesional" subtitle="Presentación clara (sin texto definitivo todavía)." />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <p className="text-sm opacity-90">
                  Aquí va una descripción profesional: formación, experiencia, enfoque clínico y para quién está pensada la consulta.
                  (Placeholder)
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Card inverted className="p-4">
                    <div className="text-xs opacity-70">Especialidades</div>
                    <div className="mt-1 text-sm font-semibold">Menopausia • Salud íntima • Enfoque integral</div>
                  </Card>

                  <Card inverted className="p-4">
                    <div className="text-xs opacity-70">Modalidad</div>
                    <div className="mt-1 text-sm font-semibold">Presencial • Online • Seguimiento</div>
                  </Card>
                </div>
              </div>

              <div>
                <Card inverted className="p-4">
                  <div className="font-semibold">Info rápida</div>
                  <Divider />
                  <div className="mt-3 space-y-2 text-sm opacity-90">
                    <div>• Turnos: (placeholder)</div>
                    <div>• Horarios: (placeholder)</div>
                    <div>• Idiomas: ES / EN (si aplica)</div>
                    <div>• Cobertura: (placeholder)</div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </section>

        {/* 3) PROCEDIMIENTOS */}
        <section id="procedimientos" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle title="Procedimientos" subtitle="Cada propuesta explicada de forma simple y profesional." />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {procedures.map((p) => (
                <Card key={p.slug} inverted className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold">{p.title}</div>
                    {p.duration && (
                      <span className="rounded-full border border-[var(--border)] bg-[var(--muted)] px-2.5 py-1 text-xs">
                        {p.duration}
                      </span>
                    )}
                  </div>

                  <ul className="mt-3 space-y-2 text-sm opacity-90">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--espresso)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {p.note && <div className="mt-3 text-xs opacity-70">{p.note}</div>}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {/* Ver más => btn-primary (CEAFAA) */}
                    <Link href={`/procedimientos/${p.slug}`} className="btn-primary">
                      Ver más
                    </Link>

                    {/* Consultar (secundario) */}
                    <a
                      href="#contacto"
                      className="hover-selectable rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm transition"
                    >
                      Consultar
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </section>

        {/* 4) RECURSOS */}
        <section id="recursos" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle title="Recursos gratis" subtitle="Descargas gratuitas (PDFs, guías y planillas)." />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {resources.map((r) => (
                <ResourceCard key={r.href} r={r} onCopy={copyUrl} />
              ))}
            </div>
          </Card>
        </section>

        {/* 5) SEDES */}
        <section id="sedes" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle title="Consultorios / sedes" subtitle="Luego ponemos direcciones exactas, Google Maps y horarios." />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {locations.map((l) => (
                <Card key={l.name} inverted className="p-5">
                  <div className="text-sm font-semibold">{l.name}</div>
                  <div className="mt-2 text-sm opacity-90">{l.address}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {/* Ver mapa => btn-primary (CEAFAA) */}
                    <a href={l.map} className="btn-primary">
                      Ver mapa
                    </a>

                    {/* Pedir turno (secundario) */}
                    <a
                      href="#contacto"
                      className="hover-selectable rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm transition"
                    >
                      Pedir turno
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </section>

        {/* 6) CONTACTO */}
        <section id="contacto" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle title="Contacto" subtitle="Dejame tus datos y te contactamos (demo)." />

            <Card inverted className="p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setToast("Enviado (demo) ✅ — luego lo conectamos a un envío real.");
                }}
                className="grid grid-cols-1 gap-3 md:grid-cols-2"
              >
                <input
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm outline-none"
                  placeholder="Nombre"
                />
                <input
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm outline-none"
                  placeholder="WhatsApp o Email"
                />
                <textarea
                  className="md:col-span-2 min-h-[110px] rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm outline-none"
                  placeholder="Mensaje"
                />

                <div className="md:col-span-2 flex flex-wrap gap-2">
                  {/* Enviar => btn-primary (CEAFAA) */}
                  <button className="btn-primary" type="submit">
                    Enviar
                  </button>

                  {/* WhatsApp directo (secundario) */}
                  <button
                    type="button"
                    onClick={() => setToast("Luego lo conectamos a WhatsApp real.")}
                    className="hover-selectable rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm transition"
                  >
                    WhatsApp directo
                  </button>
                </div>
              </form>
            </Card>
          </Card>
        </section>

        {/* 7) PRODUCTOS */}
        <section id="productos" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle title="Productos (placeholder)" subtitle="Ebooks, guías, cursos, etc." />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {["Producto 1", "Producto 2", "Producto 3"].map((p) => (
                <Card key={p} inverted className="p-5">
                  <div className="text-sm font-semibold">{p}</div>
                  <div className="mt-2 text-sm opacity-90">Descripción breve (placeholder).</div>

                  {/* Comprar => btn-primary (CEAFAA) */}
                  <button onClick={() => setToast("Demo: luego conectamos pagos.")} className="btn-primary mt-4 w-full">
                    Comprar
                  </button>
                </Card>
              ))}
            </div>
          </Card>
        </section>

        {/* 8) FAQ */}
        <section id="faq" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle title="Preguntas frecuentes" subtitle="Respuestas cortas, claras y tranquilizadoras." />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                ["¿Cómo reservo un turno?", "Por WhatsApp o por el formulario (placeholder)."],
                ["¿Hacés consultas online?", "Sí (placeholder). Ideal para evaluación y seguimiento."],
                ["¿Esto reemplaza una consulta médica?", "No. La info es orientativa. Se evalúa en consulta."],
                ["¿Los resultados son iguales para todos?", "No. Dependen de cada caso y objetivos."],
              ].map(([q, a]) => (
                <Card key={q} inverted className="p-5">
                  <div className="text-sm font-semibold">{q}</div>
                  <div className="mt-2 text-sm opacity-90">{a}</div>
                </Card>
              ))}
            </div>
          </Card>
        </section>

        <footer className="mt-10 pb-6 text-center text-xs text-[var(--text2)]">
          © {year} {DOCTOR_NAME}. Sitio informativo. No reemplaza consulta médica.
        </footer>
      </div>

      {toast && <Toast text={toast} onClose={() => setToast(null)} />}
    </main>
  );
}
