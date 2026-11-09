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
  register: "/registro",
  login: "/login",
  terms: "/terminos",
  privacy: "/privacidad",
  contact: "/contacto",
} as const;

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
    h1: "Contratá el servicio que necesitás, con respaldo legal.",
    lead: "Definís qué necesitás, lo acordás con un prestador independiente y pagás con la entrega confirmada. Hasta entonces, los fondos quedan en custodia.",
    benefitsTitle: "Resolvé lo que necesitás, sin sumar estructura fija.",
    storyClose: "Creá tu cuenta y publicá tu primer briefing.",
  },
  prestador: {
    h1: "Prestá servicios con el pago en garantía.",
    lead: "El valor del servicio queda en custodia antes de que empieces. Entregás, presentás tu factura y, con la entrega confirmada, se libera el pago. Vos ponés tu tarifa.",
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
    title: "Marco legal validado",
    text: "Por un estudio jurídico, pensado para cumplir con la normativa argentina.",
  },
  {
    icon: "Lock",
    title: "Fondos custodiados por Balanz",
    text: "El dinero de cada operación no lo administra LIV.",
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
      text: "Presentás tu factura, se confirma la entrega y se libera el pago.",
    },
    {
      icon: "TrendingUp",
      title: "Adelanto de Liquidez",
      text: "Podés solicitar un adelanto financiado por Balanz.",
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
    text: "La empresa publica un briefing: una descripción de qué necesita, para cuándo y qué espera recibir.",
    row: "Briefing publicado",
    state: "Briefing publicado",
    tone: "info",
    keyFact: "Qué se necesita, para cuándo y qué se espera recibir.",
  },
  {
    title: "LIV conecta a las partes",
    text: "LIV la conecta con prestadores disponibles. La empresa propone y el prestador acepta.",
    row: "Propuesta aceptada",
    state: "Propuesta aceptada",
    tone: "info",
    keyFact: "El prestador aceptó la propuesta de la empresa.",
  },
  {
    title: "Se acuerdan hitos y valor",
    text: "Definen juntos el valor y los hitos, las etapas que marcan el alcance del servicio, antes de empezar.",
    row: "Hitos y valor acordados",
    state: "Acordado",
    tone: "info",
    keyFact: "Hitos definidos y valor del servicio acordado.",
  },
  {
    title: "Los fondos quedan en garantía",
    text: "Antes de empezar, la empresa deposita el valor del servicio en una cuenta de custodia gestionada por Balanz. LIV no administra ese dinero.",
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
export const CATEGORIES_MORE = "Y muchos rubros más.";

export const CATEGORIES: ReadonlyArray<{ name: string; examples: string[] }> = [
  {
    name: "Gastronomía y eventos",
    examples: [
      "Catering por evento",
      "Servicio de atención para eventos",
      "Armado y montaje",
    ],
  },
  {
    name: "Logística y depósito",
    examples: ["Distribución", "Armado de pedidos por lote", "Inventario"],
  },
  {
    name: "Salud",
    examples: [
      "Enfermería a domicilio",
      "Kinesiología y rehabilitación",
      "Asesoría nutricional",
    ],
  },
  {
    name: "Administración y finanzas",
    examples: [
      "Conciliación de facturas",
      "Liquidación de impuestos",
      "Gestión de datos",
    ],
  },
  {
    name: "Marketing y diseño",
    examples: ["Identidad visual", "Contenido para redes", "Fotografía"],
  },
  {
    name: "Tecnología",
    examples: ["Desarrollo web", "Soporte técnico", "Implementación de sistemas"],
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
    question: "¿Esto es legal?",
    answer:
      "Sí. Es contratación de servicios entre una empresa y un prestador independiente, no una relación laboral. El modelo está diseñado y respaldado por un estudio jurídico, pensado para cumplir con la normativa argentina.",
  },
  {
    id: "entrega-sin-confirmar",
    question: "¿Qué pasa si la empresa no confirma la entrega?",
    answer: "Respuesta a definir con LIV: proceso ante desacuerdos y plazos.",
    pending: true,
  },
  {
    id: "costo",
    question: "¿Cuánto cuesta usar LIV?",
    answer:
      "Registrarte es gratis para empresas y prestadores. Costo por servicio a confirmar con LIV.",
    pending: true,
  },
  {
    id: "como-cobro",
    question: "¿Cómo me aseguro de cobrar?",
    answer:
      "El valor del servicio se deposita en garantía antes de que empieces. Cuando entregás, presentás tu factura y la empresa confirma la entrega, se libera el pago.",
  },
  {
    id: "balanz",
    question: "¿Quién es Balanz y por qué custodia el dinero?",
    answer:
      "El dinero de cada operación queda en una cuenta de custodia gestionada por Balanz hasta que se libera: no lo administra LIV. Descripción de Balanz a confirmar con LIV.",
    pending: true,
  },
  {
    id: "monotributo",
    question: "¿Necesito ser monotributista para prestar servicios?",
    answer: "Respuesta a confirmar con LIV.",
    pending: true,
  },
  {
    id: "adelanto-liquidez",
    question: "¿Qué es el Adelanto de Liquidez?",
    answer:
      "Un adelanto para prestadores, financiado por Balanz, que podés solicitar. Condiciones a confirmar con LIV.",
    pending: true,
  },
];

export const FINAL_TITLE = "Un solo registro, para los dos lados.";
export const FINAL_TEXT =
  "Es gratis. Al crear tu cuenta elegís si contratás servicios o si los prestás, completás tu perfil y ya podés publicar un briefing o recibir propuestas.";

export const FOOTER_NOTE = "LIV · Fondos custodiados por Balanz.";
export const FOOTER_LEGAL = [
  { href: ROUTES.terms, label: "Términos y condiciones" },
  { href: ROUTES.privacy, label: "Privacidad" },
  { href: ROUTES.contact, label: "Contacto" },
] as const;
