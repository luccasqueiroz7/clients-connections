import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../../services/api";
import { BsTrash } from "react-icons/bs";
import { ModalDiv, ModalList } from "../style";
import { ModalDeleteEmail } from "../ModalDeleteEmail";
import { toast } from "react-toastify";

export const ModalDeleteListEmailsContact = ({
  setDeleteListEmailsContact,
  profileDependency,
  setProfileDependency,
  setProfileId,
  profileId,
}) => {
  const [emailsContact, setEmailsContact] = useState([]);
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
        <p>Deletar Emails</p>
        <button onClick={() => setDeleteListEmailsContact(false)}>X</button>
      </h2>
      <ModalList>
        {emailsContact?.emails?.map((elem) => (
          <div key={elem.id}>
            <p>{elem.email}</p>
            <div>
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
      {deleteEmail && (
        <ModalDeleteEmail
          setProfileDependency={setProfileDependency}
          profileDependency={profileDependency}
          setDeleteListEmailsContact={setDeleteListEmailsContact}
          setDeleteEmail={setDeleteEmail}
          profileId={profileId}
        />
      )}
    </ModalDiv>
  );
};
