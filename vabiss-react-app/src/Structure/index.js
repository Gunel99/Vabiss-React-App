import React from "react";
import TreeList, {
  Column,
  ColumnChooser,
  HeaderFilter,
  SearchPanel,
  Selection,
} from "devextreme-react/tree-list";
import "./style.scss";
import { data } from "../data/index";

const Structure = () => {
  return (
    <div className="container">
      <div className="row my-5 justify-content-center">
        <div className="col-8">
          <h1 className="text-center fw-bold mb-4">Vabiss React App</h1>
          <TreeList
            dataSource={dataSourceOptions}
            showBorders={true}
            columnAutoWidth={true}
            wordWrapEnabled={true}
            keyExpr="id"
            parentIdExpr="parent_id"
            id="data"
          >
            <SearchPanel visible={true} width={250} />
            <HeaderFilter visible={true} />
            <Selection mode="multiple" />
            <ColumnChooser enabled={true} />

            <Column dataField="name" caption="Name" minWidth={300} />
            <Column dataField="status" caption="Status" minWidth={100} />
          </TreeList>
        </div>
      </div>
    </div>
  );
};

const dataSourceOptions = {
  store: data.map(function (item) {
    return item;
  }),
};

export default Structure;
