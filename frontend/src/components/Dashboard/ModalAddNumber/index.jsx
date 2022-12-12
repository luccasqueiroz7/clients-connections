import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { api } from "../../../services/api";
import { ModalDiv } from "../style";

export const ModalAddNumber = ({
  setAddNumber,
  profileDependency,
  setProfileDependency,
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
    let newData = {};
    if (setListPhonesContact) {
      newData = { ...data, contactId: profileId };
    } else {
      newData = { ...data, clientId: profileId };
    }
    api
      .post(`/phones`, newData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => {
        setAddNumber(false);
        setProfileDependency(!profileDependency);
        toast.success("Número adicionado");
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <ModalDiv>
      <h2>
        <p>Adicionar Número</p>
        <button onClick={() => setAddNumber(false)}>X</button>
      </h2>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>
          <p>
            Número <span>{errors.number?.message}</span>
          </p>
          <input placeholder="Número" {...register("number")} />
        </label>
        <button type="submit">Adicionar Número</button>
      </form>
    </ModalDiv>
  );
};
