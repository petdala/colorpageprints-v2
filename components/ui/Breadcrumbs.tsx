import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href
    }))
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="font-body text-xs text-text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.href}-${item.label}`} className="flex items-center gap-1.5">
                {isLast ? (
                  <span className="text-text">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-text">
                    {item.label}
                  </Link>
                )}
                {!isLast ? <span aria-hidden>›</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
