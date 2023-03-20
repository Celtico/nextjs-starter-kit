import toast from "react-hot-toast";

export const register = ({ e, setLoading, router }) => {

  fetch("/api/auth/register", {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }),

  }).then(async (res) => {

    setLoading(false);

    if (res.status === 200) {

      toast.success("Account created! Redirecting to login...");

      router.push("/account/login");
      //router.push("/api/auth/signin");

    } else {

      let error = await res.text();
      toast.error(error);

    }

  });
};
