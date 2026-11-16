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
    <div className="flex max-w-2xl flex-col gap-4">
      <span className="text-eyebrow font-medium text-brand uppercase">
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
