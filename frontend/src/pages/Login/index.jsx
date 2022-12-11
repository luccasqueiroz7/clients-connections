import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import { LoginDiv } from "./style";
import { toast } from "react-toastify";

export const Login = () => {
  const history = useHistory();

  const formSchema = yup.object().shape({
    username: yup.string().required("Username obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    api
      .post("/login", data)
      .then((res) => {
        localStorage.setItem("@clients-connections:token", res.data.token);
        toast.success("Login efetuado");
        setTimeout(() => {
          history.push("/dashboard");
        }, 2000);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <LoginDiv>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>
          <p>
            Username <span>{errors.username?.message}</span>
          </p>
          <input type="text" placeholder="Digite aqui seu username" {...register("username")} />
        </label>
        <label>
          <p>
            Senha <span>{errors.password?.message}</span>
          </p>
          <input type="password" placeholder="Digite aqui sua senha" {...register("password")} />
        </label>
        <button type="submit">Entrar</button>
        <p>
          <span>Ainda não possui uma conta?</span>
        </p>
        <button className="redirectRegistration" onClick={() => history.push("/register")}>
          Cadastre-se
        </button>
      </form>
    </LoginDiv>
  );
};
