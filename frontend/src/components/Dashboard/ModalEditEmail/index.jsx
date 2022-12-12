import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { api } from "../../../services/api";
import { ModalDiv } from "../style";

export const ModalEditEmail = ({
  setEditEmail,
  profileDependency,
  setProfileDependency,
  setEditListEmailsContact,
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
    api
      .patch(`/emails/${profileId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => {
        toast.success("Email editado");
        setEditEmail(false);
        setProfileDependency(!profileDependency);
        if (setListEmailsContact) {
          setListEmailsContact(false);
        }
        if (setEditListEmailsContact) {
          setEditListEmailsContact(false);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <ModalDiv>
      <h2>
        <p>Editar Email</p>
        <button onClick={() => setEditEmail(false)}>X</button>
      </h2>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>
          <p>
            Email <span>{errors.email?.message}</span>
          </p>
          <input placeholder="Email" {...register("email")} />
        </label>

        <button type="submit">Editar Email</button>
      </form>
    </ModalDiv>
  );
};
