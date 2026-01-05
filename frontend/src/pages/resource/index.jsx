import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./style.module.css";
import UserLayout from "../../layout/UserLayout";

import {
  getResources,
  createResource,
  deleteResource,
} from "../../config/redux/action/resourceAction";


import { BASE_URL } from "../../config";


export default function ResourcePage() {
  const dispatch = useDispatch();
  const { subId } = useParams();

  const { files, loading, uploadSuccess } = useSelector(
    (state) => state.resource
  );
  const authState = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Notes");
  const [selectedFile, setSelectedFile] = useState(null);
  
  useEffect(() => {
  console.log("subId:", subId);
}, [subId]);


  /* ================= FETCH RESOURCES ================= */
  useEffect(() => {
    if (subId) {
      dispatch(getResources(subId));
    }
  }, [subId, dispatch]);

  /* ================= RESET FORM AFTER UPLOAD ================= */
  useEffect(() => {
    if (uploadSuccess) {
      setTitle("");
      setCategory("Notes");
      setSelectedFile(null);
    }
  }, [uploadSuccess]);

  /* ================= FILE HANDLERS ================= */
  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!title || !selectedFile) {
      alert("Title and file are required");
      return;
    }

    if (!subId) {
      alert("Subject ID is missing. Please go back and select a subject.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("subjectId", subId);
    formData.append("file", selectedFile); // 🔥 multer-cloudinary key

    dispatch(createResource(formData));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this resource?")) {
      dispatch(deleteResource(id));
    }
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <h1 className={styles.resourceh1}>Subject Resources</h1>

          <div className={styles.body}>
            {/* ================= UPLOAD SECTION ================= */}
            {authState.loggedIn && subId && (
              <div className={styles.upload}>
                <h3>Upload New Resource</h3>

                <form onSubmit={handleUpload}>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Notes">Notes</option>
                    <option value="Paper">Previous Paper</option>
                    <option value="Syllabus">Syllabus</option>
                    <option value="Assignment">Assignment</option>
                  </select>

                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                  />

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </form>
              </div>
            )}

            {/* ================= RESOURCE LIST ================= */}
            <div className={styles.fileContainer}>
              {loading && !files.length && <p>Loading resources...</p>}

              {!loading && files?.length === 0 && (
                <p className={styles.noResource}>
                  No resources uploaded yet.
                </p>
              )}

              {files?.map((res) => (
                <div key={res._id} className={styles.recContainer}>
                  <div>
                    <h4 className={styles.resTitle}>{res.title}</h4>
                    <span>{res.category}</span>
                    <span className={styles.fileType}>
                      {res.fileType || "FILE"}
                    </span>
                  </div>

                  <div className={styles.viewDownload}>
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View 
                    </a>
                  </div>

                  {authState.loggedIn && (
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(res._id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
