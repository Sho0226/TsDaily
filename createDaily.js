import fs from "fs";

const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const dailyPath = `./src/app/(daily)/${today}`;

if (!fs.existsSync(dailyPath)) {
  fs.mkdirSync(dailyPath);
  console.log(`今日学習するためのフォルダを作成しました: ${dailyPath}`);
} else {
  console.log(`今日のフォルダはすでに存在します: ${dailyPath}`);
}

const templates = {
  "page.tsx": `import styles from "./page.module.css";
      
  export default function Page() { 
    return <div className={styles.daily}>Daily Note for ${today}</div>; 
  }`,
  "page.module.css": `.daily {
    font-size: 2rem;
    text-align: center;
  }`,
  "README.md": `# Daily Note for ${today}
  - [ ] 今日のTODO
  - [ ] 今日の学習内容
  - [ ] 今日の振り返り`,
};

Object.entries(templates).forEach(([fileName, content]) => {
  const filePath = `${dailyPath}/${fileName}`;

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`ファイルを作成しました: ${filePath}`);
  } else {
    console.log(`ファイルはすでに存在します: ${filePath}`);
  }
});
