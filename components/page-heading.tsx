export function PageHeading({
  index,
  title,
  description,
  children,
}: {
  index: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-heading" data-koi-avoid>
      <p className="eyebrow">
        {index} / {title.toLowerCase()}
      </p>
      <h1>{title}</h1>
      <p className="page-description">{description}</p>
      {children}
    </header>
  );
}
