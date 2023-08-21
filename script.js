document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");
  const csvFilePath = "data.csv"; // Set the path to your CSV file

  const fetchData = async () => {
    try {
      const response = await fetch(csvFilePath);
      const text = await response.text();
      const data = Papa.parse(text, { header: true }).data;
      console.log("Parsed data:", data); // Add this line
      return data;
    } catch (error) {
      console.error("Error fetching or parsing CSV data:", error);
      return [];
    }
  };

  const renderData = async () => {
    const data = await fetchData();
    const rows = data
      .map(
        (item) => `
  <tr>
    <td>${item.ID}</td>
    <td>${item.Name}</td>
    <td>${item.Code}</td>
  </tr>
`
      )
      .join("");

    tableBody.innerHTML = rows;
  };

  // Fetch data and render it initially
  renderData();

  // Fetch data every 60 seconds
  setInterval(renderData, 60000);
});
