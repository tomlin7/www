export function PageHeading({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-heading" data-koi-avoid>
      <h1>{title}</h1>
      {description && <p className="page-description">{description}</p>}
      {children}
    </header>
  );
}
