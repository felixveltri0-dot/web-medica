import Link from "next/link";

type ProcDetail = {
  title: string;
  subtitle?: string;
  description: string;
  includes: string[];
  forWho: string[];
  notes?: string[];
};

const DATA: Record<string, ProcDetail> = {
  "ginecologia-integral": {
    title: "Ginecología integral (placeholder)",
    subtitle: "Evaluación completa y seguimiento personalizado",
    description:
      "Texto placeholder para la descripción larga del procedimiento. Acá va el desarrollo completo: objetivos, qué se evalúa, cómo se planifica el seguimiento y qué esperar.",
    includes: ["Historia clínica", "Evaluación", "Plan personalizado", "Seguimiento"],
    forWho: ["Chequeos preventivos", "Síntomas ginecológicos", "Seguimiento clínico"],
    notes: ["La información es orientativa. Se personaliza en consulta."],
  },
  "menopausia-salud-hormonal": {
    title: "Menopausia y salud hormonal (placeholder)",
    subtitle: "Abordaje integral para síntomas y calidad de vida",
    description:
      "Texto placeholder. Acá va el detalle completo: qué incluye la evaluación, opciones de abordaje y cómo se decide el plan según cada paciente.",
    includes: ["Evaluación integral", "Opciones terapéuticas", "Controles", "Ajustes"],
    forWho: ["Perimenopausia", "Menopausia", "Síntomas (sueño/ánimo/vasomotores)"],
    notes: ["Se evalúan antecedentes y objetivos para definir el plan."],
  },
  "estetica-y-funcional": {
    title: "Ginecología estética y funcional (placeholder)",
    subtitle: "Opciones personalizadas con foco en seguridad",
    description:
      "Texto placeholder. Acá va la explicación general del procedimiento y sus objetivos, sin reemplazar la consulta médica.",
    includes: ["Evaluación", "Plan", "Cuidados", "Seguimiento"],
    forWho: ["Objetivos estéticos", "Confort", "Bienestar íntimo"],
    notes: ["Indicaciones y cuidados se definen según cada caso."],
  },
};

export default function ProcedimientoPage({ params }: { params: { slug: string } }) {
  const item = DATA[params.slug];

  // Estilo coherente con tu sistema (cuadro grande marrón + internos crema)
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto w-[min(980px,calc(100%-32px))] py-10">{children}</div>
    </main>
  );

  const BigCard = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-2xl bg-[var(--text)] text-[var(--bg)] border border-[var(--border)] p-6 shadow-[var(--shadow)]">
      {children}
    </div>
  );

  const InnerCard = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-2xl bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] p-5 shadow-[var(--shadow-soft)]">
      {children}
    </div>
  );

  if (!item) {
    return (
      <Wrapper>
        <BigCard>
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-xl font-semibold">Procedimiento no encontrado</h1>
            <Link
              href="/#procedimientos"
              className="rounded-xl bg-[var(--bg)] px-4 py-2 text-sm font-medium text-[var(--text)]"
            >
              Volver
            </Link>
          </div>
          <p className="mt-3 text-sm opacity-85">
            El enlace existe pero todavía no cargamos contenido para este procedimiento.
          </p>
        </BigCard>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <BigCard>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">{item.title}</h1>
            {item.subtitle && <p className="mt-1 text-sm opacity-85">{item.subtitle}</p>}
          </div>

          <Link
            href="/#procedimientos"
            className="rounded-xl bg-[var(--bg)] px-4 py-2 text-sm font-medium text-[var(--text)]"
          >
            Volver
          </Link>
        </div>

        <InnerCard>
          <p className="text-sm opacity-95">{item.description}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-semibold">¿Qué incluye?</div>
              <ul className="mt-2 space-y-2 text-sm opacity-90">
                {item.includes.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--espresso)]" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold">¿Para quién es?</div>
              <ul className="mt-2 space-y-2 text-sm opacity-90">
                {item.forWho.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--espresso)]" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {item.notes?.length ? (
            <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-4">
              <div className="text-sm font-semibold">Notas</div>
              <ul className="mt-2 space-y-1 text-sm opacity-90">
                {item.notes.map((n) => (
                  <li key={n}>• {n}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/#contacto"
              className="rounded-xl bg-[var(--espresso)] px-4 py-2 text-sm font-medium text-[var(--bg)]"
            >
              Consultar
            </Link>
            <Link
              href="/#procedimientos"
              className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm"
            >
              Ver otros procedimientos
            </Link>
          </div>
        </InnerCard>
      </BigCard>
    </Wrapper>
  );
}
