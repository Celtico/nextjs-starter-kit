import toast from "react-hot-toast";

/**
 * RegisterModel
 * @param e
 * @param setLoading
 * @param router
 * @constructor
 */
const RegisterModel = ({ e, setLoading, router }) => {
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
    } else {
      let error = await res.text();
      toast.error(error);
    }
  });
};

export default RegisterModel;
