import {
  CATEGORIES,
  CATEGORIES_MORE,
  CATEGORIES_SUB,
  CATEGORIES_TITLE,
} from "@/content/landing";

export function Categories() {
  return (
    <section id="rubros" className="bg-bone px-4 py-14 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-h1 font-bold text-primary-800">
            {CATEGORIES_TITLE}
          </h2>
          <p className="text-body-lg text-text-600">{CATEGORIES_SUB}</p>
        </div>
        <ul className="flex flex-col">
          {CATEGORIES.map((c) => (
            <li
              key={c.name}
              className="flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-text-300 py-[18px]"
            >
              <h3 className="text-h4 font-semibold max-md:basis-full md:flex-[0_0_280px]">
                {c.name}
              </h3>
              <p className="text-body text-text-600 max-md:basis-full md:flex-[1_1_400px]">
                {c.examples.join(" · ")}
              </p>
            </li>
          ))}
          <li className="border-t border-text-300 py-[18px] text-body font-semibold text-primary-600">
            {CATEGORIES_MORE}
          </li>
        </ul>
      </div>
    </section>
  );
}
