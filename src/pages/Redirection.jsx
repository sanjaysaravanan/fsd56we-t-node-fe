import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirection = () => {
  const { urlId } = useParams();

  // use the above urlId to get the long url from backend

  const longUlr =
    "https://github.com/sanjaysaravanan/FSD56WE-T-2024-06-30/blob/main/Details.txt";

  useEffect(() => {
    location.replace(longUlr);
  }, []);

  return <h1>Test Content</h1>;
};

export default Redirection;
