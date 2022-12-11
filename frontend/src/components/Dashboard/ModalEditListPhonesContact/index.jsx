import { useState } from "react";
import { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { ModalEditNumber } from "../ModalEditNumber";
import { ModalDiv, ModalList } from "../style";

export const ModalEditListPhonesContact = ({
  setEditListPhonesContact,
  setProfileId,
  profileId,
}) => {
  const [phonesContact, setPhonesContact] = useState([]);
  const [editNumber, setEditNumber] = useState(false);

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
  }, [profileId, editNumber, phonesContact]);

  return (
    <ModalDiv>
      <h2>
        <p>Editar Números</p>
        <button onClick={() => setEditListPhonesContact(false)}>X</button>
      </h2>
      <ModalList>
        {phonesContact?.phones?.map((elem) => (
          <div key={elem.id}>
            <p>{elem.number}</p>
            <div>
              <AiFillEdit
                color="pink"
                cursor="pointer"
                onClick={() => {
                  setProfileId(elem?.id);
                  setEditNumber(true);
                }}
              />
            </div>
          </div>
        ))}
      </ModalList>
      {editNumber && (
        <ModalEditNumber
          setEditListPhonesContact={setEditListPhonesContact}
          setEditNumber={setEditNumber}
          profileId={profileId}
        />
      )}
    </ModalDiv>
  );
};
