import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { ModalDiv } from "../style";

export const ModalDeleteContact = ({
  setDeleteContact,
  profileDependency,
  setProfileDependency,
  profileId,
}) => {
  const onSubmitFunction = () => {
    api
      .delete(`/contacts/${profileId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => {
        setDeleteContact(false);
        setProfileDependency(!profileDependency);
        toast.success("Contato deletado");
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <ModalDiv>
      <h2>
        <p>Deletar Contato</p>
        <button onClick={() => setDeleteContact(false)}>X</button>
      </h2>
      <form>
        <button type="button" onClick={onSubmitFunction}>
          Sim
        </button>
        <button type="button" onClick={() => setDeleteContact(false)}>
          Não
        </button>
      </form>
    </ModalDiv>
  );
};
