import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { api } from "../../../services/api";
import { ModalDiv } from "../style";

export const ModalAddEmail = ({
  setAddEmail,
  profileDependency,
  setProfileDependency,
  setListEmailsContact,
  profileId,
}) => {
  const formSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório").email("Email inválido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    let newData = {};
    if (setListEmailsContact) {
      newData = { ...data, contactId: profileId };
    } else {
      newData = { ...data, clientId: profileId };
    }
    api
      .post(`/emails`, newData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => {
        setAddEmail(false);
        setProfileDependency(!profileDependency);
        toast.success("Email adicionado");
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <ModalDiv>
      <h2>
        <p>Adicionar Email</p>
        <button onClick={() => setAddEmail(false)}>X</button>
      </h2>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>
          <p>
            Email <span>{errors.email?.message}</span>
          </p>
          <input placeholder="Email" {...register("email")} />
        </label>

        <button type="submit">Adicionar Email</button>
      </form>
    </ModalDiv>
  );
};
