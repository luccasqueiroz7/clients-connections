import { useState } from "react";
import { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { ModalAddNumber } from "../ModalAddNumber";
import { ModalDeleteNumber } from "../ModalDeleteNumber";
import { ModalEditNumber } from "../ModalEditNumber";
import { ModalDiv, ModalList } from "../style";

export const ModalListPhonesContact = ({ setListPhonesContact, setProfileId, profileId }) => {
  const [phonesContact, setPhonesContact] = useState([]);
  const [addNumber, setAddNumber] = useState(false);
  const [editNumber, setEditNumber] = useState(false);
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
  }, [profileId, editNumber, phonesContact]);

  return (
    <ModalDiv>
      <h2>
        <p>Telefones</p>
        <button onClick={() => setListPhonesContact(false)}>X</button>
      </h2>
      <ModalList>
        <p>
          Adicionar Números <button onClick={() => setAddNumber(true)}>+</button>
        </p>
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
      {addNumber && (
        <ModalAddNumber
          setListPhonesContact={setListPhonesContact}
          setAddNumber={setAddNumber}
          profileId={profileId}
        />
      )}
      {editNumber && (
        <ModalEditNumber
          setListPhonesContact={setListPhonesContact}
          setEditNumber={setEditNumber}
          profileId={profileId}
        />
      )}
      {deleteNumber && (
        <ModalDeleteNumber
          setListPhonesContact={setListPhonesContact}
          setDeleteNumber={setDeleteNumber}
          profileId={profileId}
        />
      )}
    </ModalDiv>
  );
};
