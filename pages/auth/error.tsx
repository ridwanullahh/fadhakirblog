import { NextPageContext } from 'next';

interface ErrorProps {
  error: string;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <div>
      <h1>Error</h1>
      <p>{error}</p>
    </div>
  );
};

Error.getInitialProps = ({ query }: NextPageContext) => {
  const { error } = query;
  return { error: error as string };
};

export default Error;
