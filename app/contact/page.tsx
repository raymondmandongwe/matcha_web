import { PageHero } from '../components/PageHero';
import { ContactForm } from '../components/ContactForm';

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Get in Touch"
        title="We'd Love to Hear From You"
        description="Questions, feedback, or a stockist enquiry? Send us a note and the team will reply within two business days."
      />
      <ContactForm />
    </main>
  );
}
