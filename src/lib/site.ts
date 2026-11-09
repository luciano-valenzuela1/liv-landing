/** Production origin. Override per environment with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://liv-landing.netlify.app"
).replace(/\/$/, "");

export const SITE_NAME = "LIV";

export const SITE_TITLE =
  "LIV · Contratá o prestá servicios con respaldo legal y pago en garantía";

export const SITE_DESCRIPTION =
  "Empresas y prestadores independientes en un solo lugar. Acordás hitos y valor, los fondos quedan en custodia de Balanz y el pago se libera con la entrega confirmada. Registrarte es gratis.";
