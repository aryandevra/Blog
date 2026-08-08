import { Link } from 'react-router';

import { Button, Container } from '../components';

// Render the 404 page
const PageNotFound = () => {
  return (
    <section className="flex min-h-[calc(100vh-10rem)] items-center bg-linear-to-br from-violet-50 via-white to-indigo-100 px-6 py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {/* Error code */}
          <p className="text-8xl font-extrabold tracking-tight text-violet-600 md:text-9xl">
            404
          </p>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Oops! Page Not Found
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            The page you're looking for doesn't exist, may have been moved or
            the URL might be incorrect.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button className="rounded-xl px-6 py-3 hover:bg-violet-700">
                Go Home
              </Button>
            </Link>

            <Link to="/all-posts">
              <Button
                bgColor="bg-white"
                textColor="text-violet-600"
                className="rounded-xl border border-violet-600 px-6 py-3 hover:bg-violet-50"
              >
                Browse Posts
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PageNotFound;
