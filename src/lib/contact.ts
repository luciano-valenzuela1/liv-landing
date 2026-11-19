/** Contact-form validation. No dependencies. */
export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export const CONTACT_LIMITS = {
  name: 120,
  company: 120,
  email: 160,
  phone: 40,
  message: 1000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s().-]{5,}$/;

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

/** Trims, bounds and validates raw input. Returns either clean data or errors. */
export function parseContact(
  raw: unknown,
): { ok: true; data: ContactPayload } | { ok: false; errors: ContactErrors } {
  const src = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;
  const read = (k: keyof ContactPayload) =>
    typeof src[k] === "string" ? (src[k] as string).trim() : "";

  const data: ContactPayload = {
    name: read("name"),
    company: read("company"),
    email: read("email"),
    phone: read("phone"),
    message: read("message"),
  };

  const errors: ContactErrors = {};
  if (!data.name) errors.name = "Ingresá tu nombre.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Ingresá un email válido.";
  if (!PHONE_RE.test(data.phone)) errors.phone = "Ingresá un celular válido.";
  if (!data.message) errors.message = "Contanos qué necesitás resolver.";
  for (const k of Object.keys(CONTACT_LIMITS) as Array<keyof ContactPayload>) {
    if (data[k].length > CONTACT_LIMITS[k]) errors[k] = "El texto es muy largo.";
  }

  return Object.keys(errors).length
    ? { ok: false, errors }
    : { ok: true, data };
}
