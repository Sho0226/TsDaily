import fs from "fs";
import path from "path";

const getJapanDate = () => {
  const now = new Date();
  // UTC+9 hours for Japan Standard Time
  const japanTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return japanTime.toISOString().slice(0, 10).replace(/-/g, "");
};

const today = getJapanDate();
const projectRoot = process.cwd();

const parentDir = path.join(projectRoot, "src", "app", "(daily)");
const dailyPath = path.join(parentDir, today);

if (!fs.existsSync(parentDir)) {
  fs.mkdirSync(parentDir, { recursive: true });
  console.log(`親ディレクトリを作成しました: ${parentDir}`);
}

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
  const filePath = path.join(dailyPath, fileName);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`ファイルを作成しました: ${filePath}`);
  } else {
    console.log(`ファイルはすでに存在します: ${filePath}`);
  }
});
