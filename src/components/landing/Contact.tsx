"use client";

import { useState, type FormEvent } from "react";
import {
  CONTACT_EMAIL,
  CONTACT_SUB,
  CONTACT_TITLE,
} from "@/content/landing";
import {
  CONTACT_LIMITS,
  parseContact,
  type ContactErrors,
} from "@/lib/contact";
import { track } from "@/lib/analytics";

type Status = "idle" | "ok";

const FIELD =
  "min-h-12 w-full rounded-lg border border-text-300 bg-base px-4 py-3 text-body text-text-900 placeholder:text-text-500 focus:border-primary-600 focus:outline-2 focus:outline-offset-2 focus:outline-primary-600 aria-[invalid=true]:border-warning";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-body-sm font-semibold text-primary-800">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-body-sm text-warning-text">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form));

    const parsed = parseContact(raw);
    if (!parsed.ok) {
      setErrors(parsed.errors);
      return;
    }
    setErrors({});

    // No backend: hand the message to the visitor's mail client.
    const { name, company, email, phone, message } = parsed.data;
    const body = [
      `Nombre: ${name}`,
      `Empresa: ${company || "-"}`,
      `Email: ${email}`,
      `Celular: ${phone}`,
      "",
      message,
    ].join("\n");
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Consulta desde la landing · ${name}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    form.reset();
    setStatus("ok");
    track({ name: "contact_submit", props: { status: "ok" } });
  }

  const describedBy = (id: string, key: keyof ContactErrors) =>
    errors[key] ? `${id}-error` : undefined;

  return (
    <section id="contacto" className="bg-bone px-4 py-14 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-h1 font-bold text-primary-800">{CONTACT_TITLE}</h2>
          <p className="text-body-lg text-text-600">{CONTACT_SUB}</p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="grid max-w-[880px] grid-cols-1 gap-5 md:grid-cols-2"
        >
          <Field id="contact-name" label="Nombre" error={errors.name}>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={CONTACT_LIMITS.name}
              aria-invalid={!!errors.name}
              aria-describedby={describedBy("contact-name", "name")}
              className={FIELD}
            />
          </Field>
          <Field id="contact-company" label="Empresa" error={errors.company}>
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={CONTACT_LIMITS.company}
              aria-invalid={!!errors.company}
              aria-describedby={describedBy("contact-company", "company")}
              className={FIELD}
            />
          </Field>
          <Field id="contact-email" label="Email" error={errors.email}>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={CONTACT_LIMITS.email}
              aria-invalid={!!errors.email}
              aria-describedby={describedBy("contact-email", "email")}
              className={FIELD}
            />
          </Field>
          <Field id="contact-phone" label="Celular" error={errors.phone}>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              maxLength={CONTACT_LIMITS.phone}
              aria-invalid={!!errors.phone}
              aria-describedby={describedBy("contact-phone", "phone")}
              className={FIELD}
            />
          </Field>
          <div className="md:col-span-2">
            <Field
              id="contact-message"
              label="¿Qué servicios necesitás resolver?"
              error={errors.message}
            >
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                maxLength={CONTACT_LIMITS.message}
                aria-invalid={!!errors.message}
                aria-describedby={describedBy("contact-message", "message")}
                className={FIELD}
              />
            </Field>
          </div>

          {/* Honeypot: hidden from people and assistive tech. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              No completar
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center">
            <button
              type="submit"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-[10px] border border-primary-600 bg-primary-600 px-9 text-body-lg font-bold text-text-0 transition-colors duration-150 hover:border-primary-800 hover:bg-primary-800 md:w-auto"
            >
              Enviar mi consulta
            </button>
            <p role="status" aria-live="polite" className="text-body text-text-600">
              {status === "ok" && (
                <>
                  Se abrió tu correo con la consulta lista para enviar. Si no
                  se abrió, escribinos a{" "}
                  <a className="font-semibold underline" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
