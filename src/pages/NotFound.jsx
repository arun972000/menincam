import Seo from '../components/Seo';
import Button, { ArrowIcon } from '../components/ui/Button';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you’re looking for has moved or no longer exists." path="/404" />
      <section className="flex min-h-[70vh] items-center">
        <div className="container-x text-center">
          <p className="eyebrow mb-5 justify-center">
            <span className="rule-gold" /> 404
          </p>
          <h1 className="font-serif text-5xl text-ivory sm:text-6xl">Page not found.</h1>
          <p className="mx-auto mt-4 max-w-md text-muted">
            This page has moved or doesn’t exist. Let’s get you back on track.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/" size="lg">
              Back home <ArrowIcon />
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Get a quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
