const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5500;

const csvFolderPath = path.join(__dirname, "csv_files");

app.use(express.static("public")); // Serve static files from 'public' folder

app.get("/latest-csv", (req, res) => {
  const files = fs
    .readdirSync(csvFolderPath)
    .filter((file) => file.endsWith(".csv"))
    .map((file) => ({
      name: file,
      modified: fs.statSync(path.join(csvFolderPath, file)).mtimeMs,
    }))
    .sort((a, b) => b.modified - a.modified);

  let latestFile;

  for (const file of files) {
    const filePath = path.join(csvFolderPath, file.name);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    if (fileContent.trim() !== "") {
      latestFile = file;
      break;
    }
  }

  if (latestFile) {
    const filePath = path.join(csvFolderPath, latestFile.name);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    res.send(fileContent);
  } else {
    res.status(404).send("No CSV files with content found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
