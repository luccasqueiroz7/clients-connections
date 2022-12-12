import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { ModalDiv } from "../style";

export const ModalDeleteEmail = ({
  setDeleteEmail,
  profileDependency,
  setProfileDependency,
  setDeleteListEmailsContact,
  setListEmailsContact,
  profileId,
}) => {
  const onSubmitFunction = () => {
    api
      .delete(`/emails/${profileId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => {
        toast.success("Email deletado");
        setDeleteEmail(false);
        setProfileDependency(!profileDependency);
        if (setListEmailsContact) {
          setListEmailsContact(false);
        }
        if (setDeleteListEmailsContact) {
          setDeleteListEmailsContact(false);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <ModalDiv>
      <h2>
        <p>Deletar Email</p>
        <button onClick={() => setDeleteEmail(false)}>X</button>
      </h2>
      <form>
        <button type="button" onClick={onSubmitFunction}>
          Sim
        </button>
        <button type="button" onClick={() => setDeleteEmail(false)}>
          Não
        </button>
      </form>
    </ModalDiv>
  );
};
