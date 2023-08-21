const csvTableBody = document.getElementById("csvTableBody");

const fetchLatestCSV = async () => {
  try {
    const response = await fetch("/latest-csv");
    const csvData = await response.text();
    const rows = csvData
      .split("\n")
      .map(
        (row) =>
          `<tr>${row
            .split(",")
            .map((cell) => `<td>${cell}</td>`)
            .join("")}</tr>`
      )
      .join("");
    csvTableBody.innerHTML = rows;
  } catch (error) {
    console.error("Error fetching CSV:", error);
  }
};

fetchLatestCSV();
setInterval(fetchLatestCSV, 60000); // Fetch data every 60 seconds
