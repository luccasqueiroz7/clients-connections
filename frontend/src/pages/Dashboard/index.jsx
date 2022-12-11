import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { ContactField, DashboardDiv, DivFields, SecondHeader } from "./styles";
import divider from "../../assets/Rectangle 34.png";
import { ModalEditProfile } from "../../components/Dashboard/ModalEditProfile";
import { ModalAddEmail } from "../../components/Dashboard/ModalAddEmail";

import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { ModalAddNumber } from "../../components/Dashboard/ModalAddNumber";
import { ModalEditEmail } from "../../components/Dashboard/ModalEditEmail";
import { ModalDeleteEmail } from "../../components/Dashboard/ModalDeleteEmail";
import { ModalEditNumber } from "../../components/Dashboard/ModalEditNumber";
import { ModalDeleteNumber } from "../../components/Dashboard/ModalDeleteNumber";
import { ModalAddContact } from "../../components/Dashboard/ModalAddContact";
import { ModalEditContact } from "../../components/Dashboard/ModalEditContact";
import { ModalDeleteContact } from "../../components/Dashboard/ModalDeleteContact";
import { ModalListEmailsContact } from "../../components/Dashboard/ModalListEmailsContact";
import { ModalEditListEmailsContact } from "../../components/Dashboard/ModalEditListEmailsContat";
import { ModalDeleteListEmailsContact } from "../../components/Dashboard/ModalDeleteListEmailsContact";
import { ModalListPhonesContact } from "../../components/Dashboard/ModalListPhonesContact";
import { ModalEditListPhonesContact } from "../../components/Dashboard/ModalEditListPhonesContact";
import { ModalDeleteListPhonesContact } from "../../components/Dashboard/ModalDeleteListPhonesContact";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const [profile, setProfile] = useState([]);
  // para edição do usuario logado
  const [editProfile, setEditProfile] = useState(false);
  const [addEmail, setAddEmail] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState(false);
  const [addNumber, setAddNumber] = useState(false);
  const [editNumber, setEditNumber] = useState(false);
  const [deleteNumber, setDeleteNumber] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [deleteContact, setDeleteContact] = useState(false);
  const [listEmailsContact, setListEmailsContact] = useState(false);
  const [editListEmailsContact, setEditListEmailsContact] = useState(false);
  const [deleteListEmailsContact, setDeleteListEmailsContact] = useState(false);
  const [listPhonesContact, setListPhonesContact] = useState(false);
  const [editListPhonesContact, setEditListPhonesContact] = useState(false);
  const [deleteListPhonesContact, setDeleteListPhonesContact] = useState(false);
  const [profileId, setProfileId] = useState(false);
  const history = useHistory();

  // Adicionar dependencias useEffect
  useEffect(() => {
    api
      .get("/clients/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@clients-connections:token")}`,
        },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => toast.error(err.response.data.message));
  }, [profile]);

  return (
    <DashboardDiv>
      <header>
        <h1>CLIENTS CONNECTIONS</h1>
        <button
          type="button"
          onClick={() => {
            localStorage.clear();
            history.push("/");
          }}
        >
          Sair
        </button>
      </header>

      <img src={divider} alt="----" className="divider" />

      <SecondHeader>
        <div>
          <h2
            onClick={() => {
              setEditProfile(true);
            }}
          >
            {profile?.name}
          </h2>
          <AiFillEdit
            color="pink"
            cursor="pointer"
            onClick={() => {
              setEditProfile(true);
            }}
          />
        </div>
        <p>{profile?.username}</p>
      </SecondHeader>
      {editProfile && <ModalEditProfile setEditProfile={setEditProfile} profileId={profile?.id} />}

      <img src={divider} alt="----" className="divider" />
      <DivFields>
        <p>
          Emails <button onClick={() => setAddEmail(true)}>+</button>
        </p>
        <div>
          {profile?.emails?.map((elem) => (
            <div key={elem.id}>
              <p
                onClick={() => {
                  setProfileId(elem?.id);
                  setEditEmail(true);
                }}
              >
                {elem.email}
              </p>
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
        </div>
      </DivFields>
      {addEmail && <ModalAddEmail setAddEmail={setAddEmail} profileId={profile?.id} />}
      {editEmail && <ModalEditEmail setEditEmail={setEditEmail} profileId={profileId} />}
      {deleteEmail && <ModalDeleteEmail setDeleteEmail={setDeleteEmail} profileId={profileId} />}

      <DivFields>
        <p>
          Telefones <button onClick={() => setAddNumber(true)}>+</button>
        </p>
        <div>
          {profile?.phones?.map((elem) => (
            <div key={elem.id}>
              <p
                onClick={() => {
                  setProfileId(elem?.id);
                  setEditNumber(true);
                }}
              >
                {elem.number}
              </p>
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
        </div>
      </DivFields>
      {addNumber && <ModalAddNumber setAddNumber={setAddNumber} profileId={profile?.id} />}
      {editNumber && <ModalEditNumber setEditNumber={setEditNumber} profileId={profileId} />}
      {deleteNumber && (
        <ModalDeleteNumber setDeleteNumber={setDeleteNumber} profileId={profileId} />
      )}

      <ContactField>
        <p>
          Contatos <button onClick={() => setAddContact(true)}>+</button>
        </p>
        <div>
          {profile?.contacts?.map((elem) => (
            <div key={elem.id}>
              <div>
                <p
                  onClick={() => {
                    setProfileId(elem?.id);
                    setEditContact(true);
                  }}
                >
                  {elem.name}
                </p>
                <div>
                  <AiFillEdit
                    color="pink"
                    cursor="pointer"
                    onClick={() => {
                      setProfileId(elem?.id);
                      setEditContact(true);
                    }}
                  />
                  <BsTrash
                    color="pink"
                    cursor="pointer"
                    onClick={() => {
                      setProfileId(elem?.id);
                      setDeleteContact(true);
                    }}
                  />
                </div>
              </div>
              <div>
                <p
                  onClick={() => {
                    setProfileId(elem?.id);
                    setListEmailsContact(true);
                  }}
                >
                  Emails
                </p>
                <div>
                  <AiFillEdit
                    color="pink"
                    cursor="pointer"
                    onClick={() => {
                      setProfileId(elem?.id);
                      setEditListEmailsContact(true);
                    }}
                  />
                  <BsTrash
                    color="pink"
                    cursor="pointer"
                    onClick={() => {
                      setProfileId(elem?.id);
                      setDeleteListEmailsContact(true);
                    }}
                  />
                </div>
              </div>
              <div>
                <p
                  onClick={() => {
                    setProfileId(elem?.id);
                    setListPhonesContact(true);
                  }}
                >
                  Telefones
                </p>
                <div>
                  <AiFillEdit
                    color="pink"
                    cursor="pointer"
                    onClick={() => {
                      setProfileId(elem?.id);
                      setEditListPhonesContact(true);
                    }}
                  />
                  <BsTrash
                    color="pink"
                    cursor="pointer"
                    onClick={() => {
                      setProfileId(elem?.id);
                      setDeleteListPhonesContact(true);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContactField>
      {addContact && <ModalAddContact setAddContact={setAddContact} profileId={profile?.id} />}
      {editContact && <ModalEditContact setEditContact={setEditContact} profileId={profileId} />}
      {deleteContact && (
        <ModalDeleteContact setDeleteContact={setDeleteContact} profileId={profileId} />
      )}
      {listEmailsContact && (
        <ModalListEmailsContact
          setListEmailsContact={setListEmailsContact}
          setProfileId={setProfileId}
          profileId={profileId}
        />
      )}
      {editListEmailsContact && (
        <ModalEditListEmailsContact
          setEditListEmailsContact={setEditListEmailsContact}
          setProfileId={setProfileId}
          profileId={profileId}
        />
      )}
      {deleteListEmailsContact && (
        <ModalDeleteListEmailsContact
          setDeleteListEmailsContact={setDeleteListEmailsContact}
          setProfileId={setProfileId}
          profileId={profileId}
        />
      )}
      {listPhonesContact && (
        <ModalListPhonesContact
          setListPhonesContact={setListPhonesContact}
          setProfileId={setProfileId}
          profileId={profileId}
        />
      )}
      {editListPhonesContact && (
        <ModalEditListPhonesContact
          setEditListPhonesContact={setEditListPhonesContact}
          setProfileId={setProfileId}
          profileId={profileId}
        />
      )}
      {deleteListPhonesContact && (
        <ModalDeleteListPhonesContact
          setDeleteListPhonesContact={setDeleteListPhonesContact}
          setProfileId={setProfileId}
          profileId={profileId}
        />
      )}
    </DashboardDiv>
  );
};
