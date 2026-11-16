interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  body?: string;
}

/** The eyebrow, title and lead every section opens with. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  body,
}: SectionHeadingProps) {
  return (
    <div className="flex max-w-2xl flex-col gap-5">
      <span className="inline-flex items-center gap-3 text-eyebrow font-medium text-brand">
        <span aria-hidden="true" className="h-1 w-6 rounded-full bg-brand" />
        {eyebrow}
      </span>
      <h2 id={id} className="text-title text-balance">
        {title}
      </h2>
      {body ? (
        <p className="text-lead text-pretty text-muted-foreground">{body}</p>
      ) : null}
    </div>
  );
}
