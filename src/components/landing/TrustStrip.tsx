import { TRUST_ITEMS } from "@/content/landing";
import { IconBox } from "@/components/ui/Icon";

export function TrustStrip() {
  return (
    <section id="respaldo" className="relative px-4 md:px-6">
      {/* Skip-link target: start of the content after the hero */}
      <span id="contenido" tabIndex={-1} />
      <h2 className="sr-only">Qué respalda a LIV</h2>
      <ul className="mx-auto -mt-[88px] grid max-w-[1200px] grid-cols-1 gap-px overflow-hidden rounded-2xl border border-text-300 bg-text-300 shadow-card lg:grid-cols-3">
        {TRUST_ITEMS.map((item) => (
          <li
            key={item.title}
            className="flex items-start gap-3.5 bg-base px-4 py-[18px] md:px-6 md:py-7"
          >
            <IconBox name={item.icon} />
            <div className="flex min-w-0 flex-col gap-1">
              <h3 className="text-h4 font-semibold min-[1180px]:whitespace-nowrap">
                {item.title}
              </h3>
              <p className="text-body text-text-600">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
