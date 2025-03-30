import styles from "./page.module.css";
import fs from "fs";
import path from "path";

export default function Home() {
  const folderPath = "./src/app/(daily)";

  const items = fs.readdirSync(folderPath);

  const folders = items.filter((item) => {
    const itemPath = path.join(folderPath, item);
    return fs.statSync(itemPath).isDirectory();
  });

  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <h1>TsDairy</h1>
        <h2 className={styles.card}>
          <p className={styles.title}>勉強記録</p>
          <p className={styles.description}>
            {folders.map((item) => {
              return (
                <a href={`/${item}`} key={item} className={styles.link}>
                  {item.replace(/(\d{4})(\d{2})(\d{2})/, "$1年$2月$3日")}
                </a>
              );
            })}
          </p>
        </h2>
      </div>
    </div>
  );
}
