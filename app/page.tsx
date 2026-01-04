"use client";

import React, { useMemo, useState } from "react";

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

type LinkItem = { label: string; desc?: string; href: string; kind?: "primary" | "soft" };
type Procedure = { title: string; bullets: string[]; note?: string; duration?: string };

const procedures: Procedure[] = [
  {
    title: "Procedimiento A (placeholder)",
    duration: "Consulta: 30–45 min",
    bullets: [
      "Qué es: descripción breve para ubicar.",
      "Para quién: casos típicos (general).",
      "Qué incluye: evaluación + plan personalizado.",
      "Cuidados: recomendaciones generales (sin reemplazar consulta médica).",
    ],
    note: "Esto es un ejemplo. Luego lo reemplazamos por tu texto real.",
  },
  {
    title: "Procedimiento B (placeholder)",
    duration: "Sesión: 20–30 min",
    bullets: [
      "Objetivo principal y beneficios esperables.",
      "Cómo se realiza (en términos generales).",
      "Cuántas sesiones (aprox. según caso).",
      "Preguntas frecuentes: dolor, recuperación, controles.",
    ],
  },
  {
    title: "Procedimiento C (placeholder)",
    duration: "Sesión: 30–60 min",
    bullets: [
      "Enfoque integral: evaluación clínica + objetivos.",
      "Resultados: variables según cada paciente.",
      "Seguimiento: control y ajustes.",
      "Contraindicaciones: se evalúan en consulta.",
    ],
  },
];

const locations = [
  { name: "Consultorio 1 (placeholder)", address: "Barrio/ciudad — Dirección aproximada", map: "#" },
  { name: "Consultorio 2 (placeholder)", address: "Barrio/ciudad — Dirección aproximada", map: "#" },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white/70 px-2.5 py-1 text-xs text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-200">
      {children}
    </span>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40",
        className
      )}
    >
      {children}
    </div>
  );
}

function ButtonLink({ item }: { item: LinkItem }) {
  const base =
    "group flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-zinc-400/40 dark:focus:ring-zinc-500/40";
  const style =
    item.kind === "primary"
      ? "border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 dark:border-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      : "border-zinc-200 bg-white/70 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white dark:hover:bg-zinc-900";
  return (
    <a href={item.href} className={cn(base, style)}>
      <div>
        <div className="text-sm font-semibold">{item.label}</div>
        {item.desc && (
          <div className={cn("mt-0.5 text-xs", item.kind === "primary" ? "text-white/80 dark:text-zinc-700" : "text-zinc-600 dark:text-zinc-300")}>
            {item.desc}
          </div>
        )}
      </div>
      <span className={cn("text-xs opacity-80 transition group-hover:opacity-100")}>→</span>
    </a>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{subtitle}</p>}
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-zinc-200/70 dark:bg-zinc-800/70" />;
}

function Toast({ text, onClose }: { text: string; onClose: () => void }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 2600);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[min(560px,calc(100%-24px))] -translate-x-1/2">
      <div className="rounded-2xl border border-zinc-200 bg-white/90 p-4 text-sm text-zinc-900 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-white">
        {text}
      </div>
    </div>
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
    { label: "Consultorios / sedes", desc: "Dónde atiendo y cómo llegar", href: "#sedes" },
    { label: "Contacto", desc: "Turnos y consultas", href: "#contacto" },
    { label: "Productos", desc: "Recomendados / tienda (placeholder)", href: "#productos" },
    { label: "Preguntas frecuentes", desc: "Dudas típicas antes de reservar", href: "#faq" },
  ];

  return (
    <main className="relative">
      {/* Fondo suave */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-zinc-200/60 blur-3xl dark:bg-zinc-800/30" />
        <div className="absolute top-72 left-[-140px] h-[380px] w-[380px] rounded-full bg-zinc-200/50 blur-3xl dark:bg-zinc-800/20" />
        <div className="absolute top-[680px] right-[-160px] h-[420px] w-[420px] rounded-full bg-zinc-200/50 blur-3xl dark:bg-zinc-800/20" />
      </div>

      <div className="mx-auto w-[min(980px,calc(100%-32px))] py-10">
        {/* Header */}
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900">
              <span className="text-lg font-bold">MD</span>
            </div>
            <div>
              <div className="text-xl font-semibold leading-tight">Dra. X (placeholder)</div>
              <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                Ginecología estética y funcional • Menopausia • Bienestar integral
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>Atención personalizada</Badge>
                <Badge>Enfoque basado en evidencia</Badge>
                <Badge>Consultas presenciales y online</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((v) => !v)}
              className="rounded-xl border border-zinc-200 bg-white/70 px-4 py-2 text-sm text-zinc-900 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white dark:hover:bg-zinc-900"
            >
              {dark ? "Modo claro" : "Modo oscuro"}
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText("Hola! Quiero pedir un turno.");
                setToast("Mensaje copiado ✅");
              }}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Copiar mensaje
            </button>
          </div>
        </header>

        {/* Linktree */}
        <section className="mt-8">
          <Card>
            <div className="text-sm font-semibold">Accesos rápidos</div>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {nav.map((item) => (
                <ButtonLink key={item.label} item={item} />
              ))}
            </div>

            <div className="mt-5 text-xs text-zinc-600 dark:text-zinc-400">
              *Esto es demo con placeholders. Reemplazamos con tus textos reales cuando me los pases.
            </div>
          </Card>
        </section>

        {/* BIO */}
        <section id="bio" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle
              title="Biografía profesional"
              subtitle="Presentación clara (sin texto definitivo todavía)."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Aquí va una descripción profesional de la médica: formación, experiencia, enfoque clínico,
                  filosofía de atención y para quién está pensada la consulta.  
                  (Placeholder: lo reemplazamos por tu bio real).
                </p>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Card className="p-4">
                    <div className="text-xs text-zinc-600 dark:text-zinc-300">Especialidades</div>
                    <div className="mt-1 text-sm font-semibold">Menopausia • Salud íntima • Estética funcional</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-xs text-zinc-600 dark:text-zinc-300">Modalidad</div>
                    <div className="mt-1 text-sm font-semibold">Presencial • Online • Seguimiento</div>
                  </Card>
                </div>
              </div>

              <div>
                <div className="rounded-2xl border border-zinc-200 bg-white/70 p-4 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-300">
                  <div className="font-semibold text-zinc-900 dark:text-white">Info rápida</div>
                  <Divider />
                  <div className="mt-3 space-y-2">
                    <div>• Turnos: WhatsApp / formulario</div>
                    <div>• Horarios: (placeholder)</div>
                    <div>• Idiomas: ES / EN (si aplica)</div>
                    <div>• Obras sociales: (placeholder)</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* PROCEDIMIENTOS */}
        <section id="procedimientos" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle
              title="Procedimientos"
              subtitle="Cada propuesta bien explicada (estructura profesional y fácil de leer)."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {procedures.map((p) => (
                <div key={p.title} className="rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold">{p.title}</div>
                    {p.duration && <Badge>{p.duration}</Badge>}
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-white" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {p.note && <div className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">{p.note}</div>}
                  <div className="mt-4 flex gap-2">
                    <a
                      href="#contacto"
                      className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      Consultar
                    </a>
                    <button
                      onClick={() => setToast("Demo: acá podríamos abrir un modal con más detalle.")}
                      className="rounded-xl border border-zinc-200 bg-white/70 px-4 py-2 text-sm text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white dark:hover:bg-zinc-900"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* SEDES */}
        <section id="sedes" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle
              title="Consultorios / sedes"
              subtitle="Dónde atenderte (placeholder). Luego ponemos direcciones exactas, Google Maps y horarios."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {locations.map((l) => (
                <div key={l.name} className="rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
                  <div className="text-sm font-semibold">{l.name}</div>
                  <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{l.address}</div>
                  <div className="mt-4 flex gap-2">
                    <a
                      href={l.map}
                      className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      Ver mapa
                    </a>
                    <a
                      href="#contacto"
                      className="rounded-xl border border-zinc-200 bg-white/70 px-4 py-2 text-sm text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white dark:hover:bg-zinc-900"
                    >
                      Pedir turno
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle
              title="Contacto"
              subtitle="Dejame tus datos y te contactamos (demo). Luego lo conectamos a WhatsApp/Email real."
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setToast("Enviado (demo) ✅ — luego lo conectamos a un envío real.");
              }}
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
            >
              <input
                className="rounded-xl border border-zinc-200 bg-white/70 px-3 py-2 text-sm outline-none dark:border-zinc-800 dark:bg-zinc-950/40"
                placeholder="Nombre"
              />
              <input
                className="rounded-xl border border-zinc-200 bg-white/70 px-3 py-2 text-sm outline-none dark:border-zinc-800 dark:bg-zinc-950/40"
                placeholder="WhatsApp o Email"
              />
              <textarea
                className="md:col-span-2 min-h-[110px] rounded-xl border border-zinc-200 bg-white/70 px-3 py-2 text-sm outline-none dark:border-zinc-800 dark:bg-zinc-950/40"
                placeholder="Mensaje (ej: quiero info de...)"
              />
              <div className="md:col-span-2 flex flex-wrap gap-2">
                <button className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                  Enviar
                </button>
                <button
                  type="button"
                  onClick={() => setToast("Demo: botón directo a WhatsApp (se configura).")}
                  className="rounded-xl border border-zinc-200 bg-white/70 px-4 py-2 text-sm text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white dark:hover:bg-zinc-900"
                >
                  WhatsApp directo
                </button>
              </div>
            </form>
          </Card>
        </section>

        {/* PRODUCTOS */}
        <section id="productos" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle
              title="Productos (placeholder)"
              subtitle="Puede ser: ebooks, guías, cursos, suplementos recomendados, skincare, etc."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {["Producto 1", "Producto 2", "Producto 3"].map((p) => (
                <div key={p} className="rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
                  <div className="text-sm font-semibold">{p}</div>
                  <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                    Descripción breve (placeholder). Precio, beneficios y link de compra.
                  </div>
                  <button
                    onClick={() => setToast("Demo: acá iría a checkout / MercadoPago / TiendaNube.")}
                    className="mt-4 w-full rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-8 scroll-mt-24">
          <Card>
            <SectionTitle title="Preguntas frecuentes" subtitle="Respuestas cortas, claras y tranquilizadoras." />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                ["¿Cómo reservo un turno?", "Por WhatsApp o por el formulario. Confirmamos disponibilidad y modalidad."],
                ["¿Hacés consultas online?", "Sí (placeholder). Ideal para evaluación inicial y seguimientos."],
                ["¿Los resultados son iguales para todos?", "No. Dependen de cada caso. En consulta se ajusta el plan."],
                ["¿Esto reemplaza una consulta médica?", "No. La info es orientativa. Siempre se evalúa en consulta."],
              ].map(([q, a]) => (
                <div key={q} className="rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
                  <div className="text-sm font-semibold">{q}</div>
                  <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{a}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Footer */}
        <footer className="mt-10 pb-6 text-center text-xs text-zinc-600 dark:text-zinc-400">
          © {year} Dra. X (placeholder). Sitio informativo. No reemplaza consulta médica.
        </footer>
      </div>

      {toast && <Toast text={toast} onClose={() => setToast(null)} />}
    </main>
  );
}
