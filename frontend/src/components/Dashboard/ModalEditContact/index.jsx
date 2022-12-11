import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { api } from "../../../services/api";
import { ModalDiv } from "../style";

export const ModalEditContact = ({ setEditContact, profileId }) => {
  const formSchema = yup.object().shape({
    name: yup.string(),
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
      .patch(`/contacts/${profileId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => {
        toast.success("Contato editado");
        setEditContact(false);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <ModalDiv>
      <h2>
        <p>Editar Contato</p>
        <button onClick={() => setEditContact(false)}>X</button>
      </h2>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>
          <p>
            Nome <span>{errors.name?.message}</span>
          </p>
          <input placeholder="Nome" {...register("name")} />
        </label>
        <button type="submit">Editar Contato</button>
      </form>
    </ModalDiv>
  );
};
