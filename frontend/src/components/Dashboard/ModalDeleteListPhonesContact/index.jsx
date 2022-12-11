import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../../services/api";
import { BsTrash } from "react-icons/bs";
import { ModalDiv, ModalList } from "../style";
import { ModalDeleteNumber } from "../ModalDeleteNumber";
import { toast } from "react-toastify";

export const ModalDeleteListPhonesContact = ({
  setDeleteListPhonesContact,
  setProfileId,
  profileId,
}) => {
  const [phonesContact, setPhonesContact] = useState([]);
  const [deleteNumber, setDeleteNumber] = useState(false);

  useEffect(() => {
    api
      .get(`/contacts/${profileId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => {
        setPhonesContact(res.data);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, [profileId, deleteNumber, phonesContact]);

  return (
    <ModalDiv>
      <h2>
        <p>Deletar Números</p>
        <button onClick={() => setDeleteListPhonesContact(false)}>X</button>
      </h2>
      <ModalList>
        {phonesContact?.phones?.map((elem) => (
          <div key={elem.id}>
            <p>{elem.number}</p>
            <div>
              <BsTrash
                color="pink"
                cursor="pointer"
                onClick={() => {
                  setProfileId(elem?.id);
                  setDeleteNumber(true);
                }}
              />
            </div>
          </div>
        ))}
      </ModalList>
      {deleteNumber && (
        <ModalDeleteNumber
          setDeleteListPhonesContact={setDeleteListPhonesContact}
          setDeleteNumber={setDeleteNumber}
          profileId={profileId}
        />
      )}
    </ModalDiv>
  );
};
