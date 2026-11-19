/**
 * Single source of truth for landing copy, taken from the "AltD.dc.html"
 * artboard (D · B corregida, Impeccable).
 *
 * Copy rules (legal constraint, not style) are enforced by
 * scripts/check-copy.mjs: never use employment vocabulary.
 *
 * Items flagged `pending: true` are awaiting client answers. They render the
 * "Pendiente LIV" pill and must be resolved before production
 * (`pnpm check:release` fails while any remain).
 */

export type Audience = "empresa" | "prestador";
export type PillTone = "info" | "custody" | "success" | "warning";

export const ROUTES = {
  terms: "/terminos",
  privacy: "/privacidad",
  contact: "#contacto",
} as const;

export const CONTACT_EMAIL = "consultas@livapp.com.ar";

export const CTA_LABEL = "Crear mi cuenta";
export const LOGIN_LABEL = "Iniciar sesión";

export const NAV_SECTIONS = [
  { id: "respaldo", label: "Respaldo" },
  { id: "beneficios", label: "Beneficios" },
  { id: "como-funciona", label: "Cómo funciona" },
  { id: "rubros", label: "Rubros" },
  { id: "preguntas", label: "Preguntas frecuentes" },
] as const;

export const AUDIENCE_OPTIONS: ReadonlyArray<{
  value: Audience;
  label: string;
}> = [
  { value: "empresa", label: "Necesito un servicio" },
  { value: "prestador", label: "Presto servicios" },
];

export const AUDIENCE_QUESTION = "¿Qué buscás?";

export const AUDIENCE_COPY: Record<
  Audience,
  { h1: string; lead: string; benefitsTitle: string; storyClose: string }
> = {
  empresa: {
    h1: "Contratá por resultado, pagá cuando te entregan.",
    lead: "Definís qué necesitás, lo acordás con un prestador independiente y pagás cuando confirmás la entrega. Si depositás antes, el dinero queda en custodia hasta entonces. Todo dentro de un marco legal sólido y claro.",
    benefitsTitle: "Resolvé lo que necesitás, sin sumar estructura fija.",
    storyClose: "Creá tu cuenta y publicá tu primer briefing.",
  },
  prestador: {
    h1: "Vos ponés el precio. LIV se ocupa del cobro.",
    lead: "Proponés tu tarifa, acordás los hitos con la empresa y, antes de aceptar, ves si el pago ya está en custodia. Cuando entregás, la empresa tiene 48 horas hábiles para aprobar: si no responde, se aprueba sola. Registrarte es gratis.",
    benefitsTitle: "Prestá servicios con autonomía y el pago protegido.",
    storyClose: "Creá tu cuenta y recibí tu primera propuesta.",
  },
};

export type IconName =
  | "Shield"
  | "Lock"
  | "FileCheck"
  | "Building2"
  | "Tag"
  | "MapPin"
  | "Layers"
  | "Receipt"
  | "TrendingUp"
  | "SlidersHorizontal"
  | "Star";

export interface IconItem {
  icon: IconName;
  title: string;
  text: string;
}

export const TRUST_ITEMS: readonly IconItem[] = [
  {
    icon: "Shield",
    title: "Marco legal sólido y claro",
    text: "Una modalidad de contratación encuadrada en el Código Civil y Comercial de la Nación y en la Ley de Modernización Laboral 27.802.",
  },
  {
    icon: "Lock",
    title: "Fondos en custodia",
    text: "El dinero de cada servicio queda resguardado hasta que se valida el cumplimiento de los objetivos acordados.",
  },
  {
    icon: "FileCheck",
    title: "Doble confirmación",
    text: "El pago se libera con la entrega confirmada y la factura del prestador.",
  },
];

export const BENEFITS: Record<Audience, readonly IconItem[]> = {
  empresa: [
    {
      icon: "Building2",
      title: "Sin sumar estructura fija",
      text: "Contratás servicios por proyecto o por evento, cuando los necesitás.",
    },
    {
      icon: "Tag",
      title: "Valor acordado antes de empezar",
      text: "Definís el valor del servicio con el prestador desde el inicio.",
    },
    {
      icon: "MapPin",
      title: "Presencial o remoto",
      text: "Servicios en tu local o a distancia, según lo que necesites.",
    },
    {
      icon: "Layers",
      title: "Todo en un lugar",
      text: "Publicás, encontrás al prestador y seguís el servicio de punta a punta.",
    },
  ],
  prestador: [
    {
      icon: "Receipt",
      title: "Sin perseguir pagos",
      text: "Entregás, la empresa confirma la prestación, facturás y se libera el pago.",
    },
    {
      icon: "TrendingUp",
      title: "Adelanto de Liquidez",
      text: "Con historial en LIV, se habilita la opción de cobrar antes: pedís un adelanto sobre tus servicios aprobados y conocés el costo antes de aceptarlo.",
    },
    {
      icon: "SlidersHorizontal",
      title: "Tu tarifa, tus propuestas",
      text: "Proponés tu tarifa y elegís qué propuestas aceptar.",
    },
    {
      icon: "Star",
      title: "Tu reputación suma",
      text: "Cada servicio bien hecho queda en tu perfil.",
    },
  ],
};

export const HOW_TITLE = "Así funciona LIV, paso a paso.";
export const HOW_SUB =
  "El mismo proceso para cualquier rubro: del briefing al pago liberado.";
export const STATUS_CARD_TITLE = "Ejemplo de servicio";
export const CUSTODY_BADGE = "El paso que protege a las dos partes";
export const STORY_NOTE = "Registrarte es gratis.";

export interface StoryStep {
  title: string;
  text: string;
  /** Checklist row label in the StatusCard */
  row: string;
  /** Status pill label */
  state: string;
  tone: PillTone;
  /** Key-fact box in the StatusCard */
  keyFact: string;
  badge?: string;
}

export const STORY_STEPS: readonly StoryStep[] = [
  {
    title: "Se publica el briefing",
    text: "El prestador publica el servicio que ofrece o la empresa lo que necesita. En los dos casos queda claro qué se entrega, para cuándo y con qué resultado.",
    row: "Briefing publicado",
    state: "Briefing publicado",
    tone: "info",
    keyFact: "Qué se necesita, para cuándo y qué se espera recibir.",
  },
  {
    title: "LIV conecta a las partes",
    text: "LIV conecta a empresas con necesidades concretas con prestadores independientes que ofrecen sus servicios. El prestador propone y la empresa acepta.",
    row: "Propuesta aceptada",
    state: "Propuesta aceptada",
    tone: "info",
    keyFact: "La empresa aceptó la propuesta del prestador.",
  },
  {
    title: "Se acuerdan hitos y valor",
    text: "Definen juntos los objetivos y los hitos (las etapas que marcan el alcance del servicio) y acuerdan el valor antes de empezar.",
    row: "Hitos y valor acordados",
    state: "Acordado",
    tone: "info",
    keyFact: "Hitos definidos y valor del servicio acordado.",
  },
  {
    title: "El cobro, en manos de LIV",
    text: "La empresa puede depositar el valor del servicio antes de empezar, con condiciones preferenciales: el dinero queda en custodia en una cuenta exclusiva de una entidad bancaria regulada hasta que se confirma la entrega. Si elige pagar después, LIV le gestiona el cobro y se lo liquida al prestador.",
    row: "Fondos en custodia",
    state: "En custodia",
    tone: "custody",
    keyFact: "El valor del servicio queda protegido hasta la entrega.",
    badge: CUSTODY_BADGE,
  },
  {
    title: "Entrega y factura",
    text: "El prestador realiza el servicio y presenta su factura. La empresa confirma la entrega.",
    row: "Entrega confirmada y factura",
    state: "Entregado",
    tone: "success",
    keyFact: "Entrega confirmada por la empresa y factura del prestador.",
  },
  {
    title: "Se libera el pago",
    text: "Con la doble confirmación se libera el pago. Ambas partes se califican y el servicio queda en sus perfiles.",
    row: "Pago liberado",
    state: "Pago liberado",
    tone: "success",
    keyFact: "Empresa y prestador se califican mutuamente.",
  },
];

export const CATEGORIES_TITLE = "Servicios de todos los rubros.";
export const CATEGORIES_SUB = "Algunos ejemplos de lo que se resuelve en LIV.";
export const CATEGORIES_MORE = "¿No ves tu rubro?";
export const CATEGORIES_MORE_LINK = "Registrate gratis y publicá tu briefing igual.";

export const CATEGORIES: ReadonlyArray<{ name: string; examples: string[] }> = [
  {
    name: "Gastronomía, hotelería y eventos",
    examples: [
      "Catering por evento",
      "Atención de salón por evento",
      "Armado y montaje",
    ],
  },
  {
    name: "Logística y depósito",
    examples: [
      "Distribución por ruta",
      "Armado de pedidos por lote",
      "Recuento de inventario",
    ],
  },
  {
    name: "Salud",
    examples: [
      "Refuerzo de enfermería por campaña",
      "Programas de rehabilitación",
      "Auditoría de historias clínicas",
    ],
  },
  {
    name: "Comercio y e-commerce",
    examples: [
      "Carga de catálogo",
      "Fotografía de producto",
      "Preparación de envíos por lote",
    ],
  },
  {
    name: "Administración y finanzas",
    examples: [
      "Conciliación de facturas",
      "Liquidación de impuestos",
      "Ordenamiento de datos",
    ],
  },
  {
    name: "Marketing y diseño",
    examples: [
      "Identidad visual",
      "Contenido para redes por campaña",
      "Fotografía",
    ],
  },
  {
    name: "Tecnología",
    examples: [
      "Desarrollo web",
      "Soporte técnico por incidente",
      "Implementación de sistemas",
    ],
  },
  {
    name: "Mantenimiento y oficios",
    examples: ["Electricidad", "Refacciones", "Instalaciones"],
  },
];

export const FAQ_TITLE = "Preguntas frecuentes";
export const FAQ_PENDING_LABEL = "Pendiente LIV";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  pending?: boolean;
}

export const FAQ: readonly FaqItem[] = [
  {
    id: "es-legal",
    question: "¿Es legal contratar a través de LIV?",
    answer:
      "Sí. LIV conecta empresas con prestadores independientes dentro del marco del Código Civil y Comercial. No se contrata tiempo a disposición: se contratan entregables con objetivos medibles. Cada servicio queda documentado de punta a punta: briefing, hitos, entrega y factura.",
  },
  {
    id: "custodia",
    question: "¿Cómo funciona la custodia de fondos?",
    answer:
      "Podés depositar el valor acordado antes de empezar. En ese caso, el dinero queda en custodia en una cuenta exclusiva de una entidad bancaria regulada y se libera al prestador cuando se valida cada hito.",
  },
  {
    id: "no-conforme",
    question: "¿Qué pasa si no estoy conforme con la entrega?",
    answer:
      "Mientras haya un reclamo abierto, el dinero sigue en custodia. Primero se le pide la corrección al prestador. Si no hay acuerdo, LIV revisa la evidencia cargada contra lo pactado en el briefing y define si corresponde liberar el pago o devolvértelo.",
  },
  {
    id: "sin-aprobacion",
    question: "¿Y si no apruebo ni reclamo a tiempo?",
    answer:
      "Tenés 48 horas hábiles desde que el prestador carga la entrega. Pasado ese plazo sin reclamos, el hito se aprueba automáticamente y se libera el pago.",
  },
  {
    id: "prestador-no-se-presenta",
    question: "¿Qué pasa si el prestador no se presenta?",
    answer:
      "Recuperás el 100% de lo depositado, o lo dejás como saldo a favor, sin costo. Podés volver a publicar el briefing para que lo tome otro prestador.",
  },
  {
    id: "costo",
    question: "¿Cuánto cuesta?",
    answer:
      "Registrarte es gratis. LIV cobra un fee sobre cada servicio y una membresía mensual según la cantidad de briefings que publiques. El prestador no paga nada.",
  },
  {
    id: "requisitos-prestador",
    question: "¿Qué necesito para ofrecer mis servicios?",
    answer:
      "Validar tu identidad en la app y estar inscripto en Monotributo o Autónomos para facturar. Si tu actividad es regulada (salud, electricidad, higiene y seguridad, entre otras), también necesitás matrícula vigente.",
  },
  {
    id: "monotributo",
    question: "¿Y si todavía no estoy inscripto en Monotributo?",
    answer:
      "Te acompañamos en el alta para que puedas facturar desde tu primer servicio.",
  },
  {
    id: "cuando-cobro",
    question: "¿Cuándo cobro?",
    answer:
      "Cargás la entrega en la app y la empresa tiene 48 horas hábiles para aprobarla. Una vez aprobada, o vencido ese plazo, cargás tu factura y liberamos el pago a tu cuenta bancaria o billetera virtual. En cada briefing ves si los fondos ya están en custodia o si el pago es diferido, antes de aceptar.",
  },
  {
    id: "adelanto-liquidez",
    question: "¿Cuándo puedo pedir un Adelanto de Liquidez?",
    answer:
      "Se habilita a medida que construís historial en LIV, con servicios cumplidos y bien calificados. Es opcional: antes de pedirlo ves cuánto te cuesta.",
  },
];

export const FINAL_TITLE = "Un solo registro, para los dos lados.";
export const FINAL_TEXT =
  "Es gratis. Al crear tu cuenta elegís si contratás servicios o si los prestás, completás tu perfil y ya podés publicar un briefing o recibir propuestas.";

export const FOOTER_NOTE = "LIV · Servicios con respaldo legal y pago en garantía.";
export const FOOTER_LEGAL = [
  { href: ROUTES.terms, label: "Términos y condiciones" },
  { href: ROUTES.privacy, label: "Privacidad" },
  { href: ROUTES.contact, label: "Contacto" },
] as const;

export const CONTACT_TITLE = "Estamos para ayudarte";
export const CONTACT_SUB = "¿Sabés cuánto puede ahorrar tu empresa?";
export const CONTACT_ANALYSIS_LABEL = "Quiero mi análisis sin cargo";
