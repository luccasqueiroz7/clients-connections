import { useState } from "react";
import { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { ModalAddEmail } from "../ModalAddEmail";
import { ModalDeleteEmail } from "../ModalDeleteEmail";
import { ModalEditEmail } from "../ModalEditEmail";
import { ModalDiv, ModalList } from "../style";

export const ModalListEmailsContact = ({
  profileDependency,
  setProfileDependency,
  setListEmailsContact,
  setProfileId,
  profileId,
}) => {
  const [emailsContact, setEmailsContact] = useState([]);
  const [addEmail, setAddEmail] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState(false);

  useEffect(() => {
    api
      .get(`/contacts/${profileId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => {
        setEmailsContact(res.data);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, [profileDependency]);

  return (
    <ModalDiv>
      <h2>
        <p>Emails</p>
        <button onClick={() => setListEmailsContact(false)}>X</button>
      </h2>
      <ModalList>
        <p>
          Adicionar Emails <button onClick={() => setAddEmail(true)}>+</button>
        </p>
        {emailsContact?.emails?.map((elem) => (
          <div key={elem.id}>
            <p>{elem.email}</p>
            <div>
              <AiFillEdit
                color="pink"
                cursor="pointer"
                onClick={() => {
                  setProfileId(elem?.id);
                  setEditEmail(true);
                }}
              />
              <BsTrash
                color="pink"
                cursor="pointer"
                onClick={() => {
                  setProfileId(elem?.id);
                  setDeleteEmail(true);
                }}
              />
            </div>
          </div>
        ))}
      </ModalList>
      {addEmail && (
        <ModalAddEmail
          setProfileDependency={setProfileDependency}
          profileDependency={profileDependency}
          setListEmailsContact={setListEmailsContact}
          setAddEmail={setAddEmail}
          profileId={profileId}
        />
      )}
      {editEmail && (
        <ModalEditEmail
          setProfileDependency={setProfileDependency}
          profileDependency={profileDependency}
          setListEmailsContact={setListEmailsContact}
          setEditEmail={setEditEmail}
          profileId={profileId}
        />
      )}
      {deleteEmail && (
        <ModalDeleteEmail
          setProfileDependency={setProfileDependency}
          profileDependency={profileDependency}
          setListEmailsContact={setListEmailsContact}
          setDeleteEmail={setDeleteEmail}
          profileId={profileId}
        />
      )}
    </ModalDiv>
  );
};
