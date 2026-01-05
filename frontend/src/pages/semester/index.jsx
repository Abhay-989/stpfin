import styles from "./style.module.css";
import UserLayout from "../../layout/UserLayout";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createSemester,
  deleteSemester,
  getSemesters,
} from "../../config/redux/action/semesterAction";



export default function Semester() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const semesterState = useSelector((state) => state.semester);

  /* ================= FETCH SEMESTERS ================= */
  useEffect(() => {
    dispatch(getSemesters());
  }, [dispatch]);

  /* ================= DELETE SEMESTER ================= */
  const handleDeleteSemester = (id) => {
    if (window.confirm("Are you sure you want to delete this semester?")) {
      dispatch(deleteSemester(id));
    }
  };

  /* ================= ADD SEMESTER ================= */
  const handleAddClick = () => {
    const sem = prompt("Enter new semester number:");
    if (!sem) return;

    const semNum = Number(sem);
    if (Number.isInteger(semNum) && semNum > 0) {
      dispatch(createSemester({ number: semNum }));
    } else {
      alert("Please enter a valid semester number");
    }
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>

          {/* LEFT SIDE */}
          <div className={styles.mainContainer_left}>
            <p className={styles.heading}>Select Your Semester</p>

            {semesterState.loading && (
              <p className={styles.loadingHeader}>
                Loading semesters...
              </p>
            )}

            <div className={styles.container_left_Btn}>
              {!semesterState.loading &&
                semesterState.list.length === 0 && (
                  <div className={styles.noDataText}>
                    No semesters found
                  </div>
                )}

              {semesterState.list.map((item) => (
                <div key={item._id} className={styles.semester}>
                  <button
                    className={styles.semesterBtn}
                    onClick={() =>
                      navigate(`/subject/${item._id}`)
                    }
                  >
                    Semester {item.number}
                  </button>

                  {authState.loggedIn && (
                    <button
                      onClick={() =>
                        handleDeleteSemester(item._id)
                      }
                      className={styles.deleteBtn}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))}

              {authState.loggedIn && (
                <button
                  onClick={handleAddClick}
                  className={styles.addBtn}
                >
                  + Add Semester
                </button>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className={styles.mainContainer_right}>
            <img src="/rmbg.png" alt="Study Illustration" />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
