import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

function DataGridComponent() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6"
      );
      const result = await response.json();
      const rowsWithId = result.map((row, index) => ({
        id: index,
        title: row.title,
        location: row.showInfo[0]?.location,
        price: row.showInfo[0]?.price,
      }));
      setData(rowsWithId);
    };

    fetchData();
  }, []);

  const columns = [
    { field: "title", headerName: "名稱", width: 250 },
    { field: "location", headerName: "地標", width: 250 },
    { field: "price", headerName: "票價", width: 200 },
  ];

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(Math.ceil(data.length / 10), prevPage + 1));
  };

  return (
    <div>
      <h1>景點觀光展覽資訊</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data.slice((currentPage - 1) * 10, currentPage * 10)}
          columns={columns}
          pageSize={10}
          paginationMode="client"
          rowsPerPageOptions={[]}
          checkboxSelection={false}
          disableSelectionOnClick
          hideFooterPagination
          hideFooterRowCount
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "8px" }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          上一頁
        </button>
        <span style={{ margin: "0 8px" }}>第 {currentPage} 頁</span>
        <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(data.length / 10)}>
          下一頁
        </button>
      </div>
    </div>
  );
}

export default DataGridComponent;
