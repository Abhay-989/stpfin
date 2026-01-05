import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./style.module.css";
import UserLayout from "../../layout/UserLayout";

import {
  getSubjects,
  createSubject,
  deleteSubject,
} from "../../config/redux/action/subjectAction";


export default function SubjectPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { semId } = useParams(); // ✅ React Router param

  const { list, loading } = useSelector((state) => state.subject);
  const authState = useSelector((state) => state.auth);

  /* ================= FETCH SUBJECTS ================= */
  useEffect(() => {
    if (semId) {
      dispatch(getSubjects(semId));
    }
  }, [semId, dispatch]);

  /* ================= DELETE SUBJECT ================= */
  const handleDeleteSubject = (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      dispatch(deleteSubject(id));
    }
  };

  /* ================= ADD SUBJECT ================= */
  const handleAddSubject = () => {
    const name = prompt("Enter Subject Name:");
    if (name?.trim()) {
      dispatch(createSubject({ name, semesterId: semId }));
    }
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <h1 className={styles.name}>Subjects</h1>

          <div className={styles.subjects}>
            {loading && (
              <p className={styles.loadingText}>Loading...</p>
            )}

            {!loading && list.length === 0 && (
              <p className={styles.noDataText}>
                No subjects found for this semester.
              </p>
            )}

            {list.map((sub) => (
              <div key={sub._id} className={styles.subject}>
                <button
                  className={styles.subjectBtn}
                  onClick={() =>
                    navigate(`/resource/${sub._id}`)

                  }
                >
                  {sub.name}
                </button>

                {authState.loggedIn && (
                  <button
                    onClick={() => handleDeleteSubject(sub._id)}
                    className={styles.deleteBtn}
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}

            {authState.loggedIn && (
              <button
                onClick={handleAddSubject}
                className={styles.addBtn}
              >
                + Add Subject
              </button>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
