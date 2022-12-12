import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { ModalDiv } from "../style";

export const ModalDeleteNumber = ({
  setDeleteNumber,
  profileDependency,
  setProfileDependency,
  setDeleteListPhonesContact,
  setListPhonesContact,
  profileId,
}) => {
  const onSubmitFunction = () => {
    api
      .delete(`/phones/${profileId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => {
        toast.success("Número deletado");
        setDeleteNumber(false);
        setProfileDependency(!profileDependency);
        if (setDeleteListPhonesContact) {
          setDeleteListPhonesContact(false);
        }
        if (setListPhonesContact) {
          setListPhonesContact(false);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <ModalDiv>
      <h2>
        <p>Deletar Número</p>
        <button onClick={() => setDeleteNumber(false)}>X</button>
      </h2>
      <form>
        <button type="button" onClick={onSubmitFunction}>
          Sim
        </button>
        <button type="button" onClick={() => setDeleteNumber(false)}>
          Não
        </button>
      </form>
    </ModalDiv>
  );
};
