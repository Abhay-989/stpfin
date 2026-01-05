

import styles from "./style.module.css"; 
import { useNavigate } from "react-router-dom";

import UserLayout from "../../layout/UserLayout";



export default function Home() {
 const navigate = useNavigate();


  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          
          <div className={styles.mainContainer_left}>
            <p>Welcome to Studypoint</p>

            <div 
            onClick={() => navigate("/semester")}
 
              className={styles.buttonJoin}
            >
              Get Started
            </div>
          </div>

          <div className={styles.mainContainer_right}>
            <div>
            
              <img src="/studybook.png" alt="Studybook illustration" />
            </div>
          </div>

        </div>
      </div>
    </UserLayout>
  );
}
