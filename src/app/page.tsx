import { SiteProvider } from "@/context/SiteContext";
import { getSiteData } from "@/lib/site-data";
import { SitePage } from "@/components/layout/SitePage";

export default async function HomePage() {
  const data = await getSiteData();
  return (
    <SiteProvider data={data}>
      <SitePage />
    </SiteProvider>
  );
}
