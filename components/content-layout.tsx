import PortfolioLayout from "@/components/PortfolioLayout";
import DesktopUI from "@/components/DesktopUI";

export function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="legacy-portfolio">
      <PortfolioLayout desktopContent={<DesktopUI />}>
        {children}
      </PortfolioLayout>
    </div>
  );
}
