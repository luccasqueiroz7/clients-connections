import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import { RegisterDiv } from "./style";
import { useState } from "react";
import { toast } from "react-toastify";

export const Register = () => {
  const [emailsCount, setEmailsCount] = useState([]);
  const [phonesCount, setPhonesCount] = useState([]);
  const history = useHistory();

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome obrigatório")
      .matches("[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$", "Permitido apenas letras"),
    username: yup.string().required("Username obrigatório"),
    password: yup.string().required("Senha obrigatória"),
    passwordConfirm: yup
      .string()
      .required("Confirmação de senha obrigatória")
      .oneOf([yup.ref("password")], "Senhas não coincidem"),
    emails: yup.string().required("Adicione um E-mail").email("E-mail inválido"),
    phones: yup
      .string()
      .required("Adicione um Telefone")
      .min(8, "Digite no mínimo 8 caracteres")
      .max(14, "Digite no máximo 14 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    const emails = [...document.querySelectorAll(".emails")].map((email) => email.value);
    const phones = [...document.querySelectorAll(".phones")].map((phone) => phone.value);
    const newData = { ...data, emails: [data.emails, ...emails], phones: [data.phones, ...phones] };
    api
      .post("/clients", newData)
      .then((res) => {
        if (res.data.id) {
          toast.success("Cliente cadastrado");
          setTimeout(() => {
            history.push("/");
          }, 2000);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const addEmailsCount = () => {
    setEmailsCount([...emailsCount, emailsCount.length]);
  };

  const addPhonesCount = () => {
    setPhonesCount([...phonesCount, phonesCount.length]);
  };

  return (
    <RegisterDiv>
      <header className="headerRegistration">
        Cadastro <button onClick={() => history.push("/")}>Voltar</button>
      </header>
      <form className="formRegistration" onSubmit={handleSubmit(onSubmitFunction)}>
        <h2>Crie sua conta</h2>
        <p>
          <span>Rapido e grátis, vamos nessa</span>
        </p>
        <label>
          <p>
            Nome <span>{errors.name?.message}</span>
          </p>
          <input type="text" placeholder="Digite aqui seu nome" {...register("name")} />
        </label>
        <label>
          <p>
            Username <span>{errors.username?.message}</span>
          </p>
          <input type="username" placeholder="Digite aqui seu username" {...register("username")} />
        </label>
        <label>
          <p>
            Senha <span>{errors.password?.message}</span>
          </p>
          <input type="password" placeholder="Digite aqui sua senha" {...register("password")} />
        </label>
        <label>
          <p>
            Confirmar senha <span>{errors.passwordConfirm?.message}</span>
          </p>
          <input
            type="password"
            placeholder="Digite novamente sua senha"
            {...register("passwordConfirm")}
          />
        </label>
        <label>
          <p>
            Email <span>{errors.emails?.message}</span>
          </p>
          <input type="email" placeholder="Digite aqui seu email" {...register("emails")} />
        </label>
        {emailsCount?.map((elem) => (
          <label key={elem}>
            <p>
              <span>{errors.emails?.message}</span>
            </p>
            <input type="email" placeholder="Digite aqui seu email" className="emails" />
          </label>
        ))}

        <div className="divAddField">
          <button type="button" className="addField" onClick={addEmailsCount}>
            Adicione mais um email
          </button>
        </div>

        <label>
          <p>
            Telefones <span>{errors.phones?.message}</span>
          </p>
          <input type="tel" placeholder="Digite aqui seu número" {...register("phones")} />
        </label>
        {phonesCount?.map((elem) => (
          <label key={elem}>
            <p>
              <span>{errors.phones?.message}</span>
            </p>
            <input type="text" placeholder="Digite aqui seu número" className="phones" />
          </label>
        ))}
        <div className="divAddField">
          <button type="button" className="addField" onClick={addPhonesCount}>
            Adicione outro número
          </button>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </RegisterDiv>
  );
};
