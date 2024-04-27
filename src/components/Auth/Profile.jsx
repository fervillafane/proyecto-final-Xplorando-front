import React, { useEffect, useState } from "react";
import { getUser } from "../Utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { SlPencil } from "react-icons/sl";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: [{ id: "", name: "" }],
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId, token);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className={styles.profileContainer}>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {user && (
        <div className={styles.userInfo}>
          <h2>Perfil de Usuario</h2>
          <div className={styles.fieldContainer}>
            <div className={styles.field}>
              <p className={styles.label}>Nombre:</p>
              <p className={styles.value}>{user.firstName}</p>
              <SlPencil  className={styles.icon} />
            </div>
            <div className={styles.field}>
              <p className={styles.label}>Apellido:</p>
              <p className={styles.value}>{user.lastName}</p>
              <SlPencil  className={styles.icon} />
            </div>
            <div className={styles.field}>
              <p className={styles.label}>Email:</p>
              <p className={styles.value}>{user.email}</p>
              <SlPencil  className={styles.icon} />
            </div>
            <div className={styles.field}>
              <p className={styles.label}>Roles:</p>
              <ul className={styles.rolesList}>
                {user.roles && user.roles.length > 0 ? (
                  user.roles.map((role) => (
                    <li key={role.id} className="card-text">
                      {role.name}
                    </li>
                  ))
                ) : (
                  <li>No roles assigned</li>
                )}
              </ul>
              <SlPencil  className={styles.icon} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
