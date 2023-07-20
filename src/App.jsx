import React from 'react'
import Warehouse from "./Warehouse";
const WarehouseMemo = React.memo(Warehouse);

function App() {
  return (
    <>
      <WarehouseMemo></WarehouseMemo>
    </>
  );
}

export default App;
