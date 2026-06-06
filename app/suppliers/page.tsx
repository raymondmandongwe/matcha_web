import { PageHero } from '../components/PageHero';
import { ManufacturerInfo } from '../components/ManufacturerInfo';

export default function SuppliersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Behind the Scenes"
        title="Made With Care, By Partners We Trust"
        description="From canning to roasting, every batch of Love Matcha passes through trusted South African hands before it reaches you."
      />
      <ManufacturerInfo />
    </main>
  );
}
