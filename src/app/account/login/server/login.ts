import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export const login = ({ e, setLoading, router }) => {

  const options = {
    redirect: false,
    email: e.currentTarget.email.value,
    password: e.currentTarget.password.value,
    // @ts-ignore
  }
  // @ts-ignore
  signIn("credentials", options).then(({ ok, error }) => {

    setLoading(false);

    if (ok) {
      
      window.location.href = "/account";

    } else {

      toast.error(error);

    }

  });
};
