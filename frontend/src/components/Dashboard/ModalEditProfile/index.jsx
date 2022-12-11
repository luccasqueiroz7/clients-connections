import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { api } from "../../../services/api";
import { ModalDiv } from "../style";

export const ModalEditProfile = ({ setEditProfile, profileId }) => {
  const formSchema = yup.object().shape({
    name: yup.string(),
    username: yup.string(),
    password: yup.string(),
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
      .patch(`/clients/${profileId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => {
        setEditProfile(false);
        toast.success("Cliente editado com sucesso");
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <ModalDiv>
      <h2>
        <p>Editar Perfil</p>
        <button onClick={() => setEditProfile(false)}>X</button>
      </h2>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>
          <p>
            Nome <span>{errors.name?.message}</span>
          </p>
          <input placeholder="Nome" {...register("name")} />
        </label>
        <label>
          <p>
            Username <span>{errors.username?.message}</span>
          </p>
          <input placeholder="Username" {...register("username")} />
        </label>
        <label>
          <p>
            Password <span>{errors.password?.message}</span>
          </p>
          <input type="password" placeholder="Password" {...register("password")} />
        </label>
        <button type="submit">Editar Perfil</button>
      </form>
    </ModalDiv>
  );
};
