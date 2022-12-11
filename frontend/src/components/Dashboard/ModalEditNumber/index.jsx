import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { api } from "../../../services/api";
import { ModalDiv } from "../style";

export const ModalEditNumber = ({
  setEditNumber,
  setEditListPhonesContact,
  setListPhonesContact,
  profileId,
}) => {
  const formSchema = yup.object().shape({
    number: yup.string().required("Número obrigatório"),
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
      .patch(`/phones/${profileId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => {
        toast.success("Número editado");
        setEditNumber(false);
        if (setListPhonesContact) {
          setListPhonesContact(false);
        }
        if (setEditListPhonesContact) {
          setEditListPhonesContact(false);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <ModalDiv>
      <h2>
        <p>Editar Número</p>
        <button onClick={() => setEditNumber(false)}>X</button>
      </h2>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>
          <p>
            Número <span>{errors.number?.message}</span>
          </p>
          <input placeholder="Número" {...register("number")} />
        </label>

        <button type="submit">Editar Número</button>
      </form>
    </ModalDiv>
  );
};
