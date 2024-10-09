const Error = ({ error }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>{error}</p>
    </div>
  );
};

Error.getInitialProps = ({ query }) => {
  const { error } = query;
  return { error };
};

export default Error;
