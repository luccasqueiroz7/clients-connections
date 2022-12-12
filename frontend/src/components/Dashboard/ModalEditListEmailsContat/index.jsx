import { useState } from "react";
import { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { ModalEditEmail } from "../ModalEditEmail";
import { ModalDiv, ModalList } from "../style";

export const ModalEditListEmailsContact = ({
  profileDependency,
  setProfileDependency,
  setEditListEmailsContact,
  setProfileId,
  profileId,
}) => {
  const [emailsContact, setEmailsContact] = useState([]);
  const [editEmail, setEditEmail] = useState(false);

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
        <p>Editar Emails</p>
        <button onClick={() => setEditListEmailsContact(false)}>X</button>
      </h2>
      <ModalList>
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
            </div>
          </div>
        ))}
      </ModalList>
      {editEmail && (
        <ModalEditEmail
          setProfileDependency={setProfileDependency}
          profileDependency={profileDependency}
          setEditListEmailsContact={setEditListEmailsContact}
          setEditEmail={setEditEmail}
          profileId={profileId}
        />
      )}
    </ModalDiv>
  );
};
