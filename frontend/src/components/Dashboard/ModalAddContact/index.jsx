import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../../services/api";
import { useState } from "react";
import { ModalDiv } from "../style";
import { DivAddField, Fields } from "./style";
import { toast } from "react-toastify";

export const ModalAddContact = ({ setAddContact, profileDependency, setProfileDependency }) => {
  const [emailsCount, setEmailsCount] = useState([]);
  const [phonesCount, setPhonesCount] = useState([]);

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome obrigatório")
      .matches("[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$", "Permitido apenas letras"),
    emails: yup.string().required("Adicione um E-mail").email("E-mail inválido"),
    phones: yup.string().required("Adicione um Telefone"),
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
      .post("/contacts", newData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => {
        setAddContact(false);
        setProfileDependency(!profileDependency);
        toast.success("Contato adicionado");
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
    <ModalDiv>
      <h2>
        <p>Adicionar Contato</p> <button onClick={() => setAddContact(false)}>X</button>
      </h2>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>
          <p>
            Nome <span>{errors.name?.message}</span>
          </p>
          <input type="text" placeholder="Digite aqui seu nome" {...register("name")} />
        </label>
        <Fields>
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
              <input type="email" placeholder="Digite aqui seu email" required className="emails" />
            </label>
          ))}
        </Fields>

        <DivAddField>
          <button type="button" className="addField" onClick={addEmailsCount}>
            Adicione mais um email
          </button>
        </DivAddField>
        <Fields>
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
              <input type="text" placeholder="Digite aqui seu número" required className="phones" />
            </label>
          ))}
        </Fields>
        <DivAddField>
          <button type="button" className="addField" onClick={addPhonesCount}>
            Adicione outro número
          </button>
        </DivAddField>

        <button type="submit">Adicionar Contato</button>
      </form>
    </ModalDiv>
  );
};
