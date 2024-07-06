import { useSearchParams } from "react-router-dom";
import { userVerification } from "../apis";
import { useEffect, useState } from "react";

const VerifyUser = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [msg, setMessage] = useState("");

  const verifyUser = async () => {
    setLoading(true);
    try {
      const data = await userVerification(searchParams.get("token"));
      setMessage(data.msg);
    } catch (e) {
      setMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // function to call an api /verify-user ( pass the token in header )
  // api will verify the token's validity then will send a success response meaning that user is  verified in the DB

  return <h1>{msg}</h1>;
};

export default VerifyUser;
