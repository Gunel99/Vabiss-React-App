import React from "react";
import TreeList, {
  Column,
  ColumnChooser,
  Editing,
  HeaderFilter,
  Pager,
  Paging,
  RequiredRule,
  Scrolling,
  SearchPanel,
  Selection,
  Sorting,
  Lookup
} from "devextreme-react/tree-list";
import "./style.scss";
import { data } from "../data/index";
import Button from "devextreme-react/button";
import Plus from "../assets/img/plus.svg";
import Edit from "../assets/img/pencil.svg";
import Delete from "../assets/img/bin.svg";
import Save from "../assets/img/download.svg";
import Cancel from "../assets/img/exit.svg";

const allowedPageSizes = [5, 10, 20];

const expandedRowKeys = [1, 2, 3, 4, 5];

const headDataSource = {
  store: data,
  sort: "name",
};

const Structure = () => {
  const onEditorPreparing = (e) => {
    if (e.dataField === "parent_id" && e.row.data.id === 1) {
      e.cancel = true;
    }
  };

  const onInitNewRow = (e) => {
    e.parent_id = 1;
  };

  return (
    <div className="container">
      <div className="row my-5 justify-content-center">
        <div className="col-8">
          <h1 className="text-center fw-bold mb-4">Vabiss React App</h1>
          <div id="tree-list-demo">
            <TreeList
              dataSource={data}
              showBorders={true}
              columnAutoWidth={true}
              wordWrapEnabled={true}
              showRowLines={true}
              showBorders={true}
              keyExpr="id"
              parentIdExpr="parent_id"
              id="data"
              defaultExpandedRowKeys={expandedRowKeys}
              onEditorPreparing={onEditorPreparing}
              onInitNewRow={onInitNewRow}
            >
              <Editing
                allowUpdating={true}
                allowDeleting={true}
                allowAdding={true}
                mode="row"
              />
              <Sorting mode="multiple" />
              <SearchPanel visible={true} width={250} />
              <HeaderFilter visible={true} />
              <Selection mode="multiple" />
              <Scrolling mode="standard" />
              <Paging enabled={true} />
              <Pager
                showPageSizeSelector={true}
                allowedPageSizes={allowedPageSizes}
                showInfo={true}
                displayMode="compact"
              />

              <Column dataField="name" caption="Name" minWidth={300}>
                <RequiredRule />
              </Column>
              <Column dataField="parent_id" caption="Parent">
                <Lookup
                  dataSource={headDataSource}
                  valueExpr="id"
                  displayExpr="name"
                />
                <RequiredRule />
              </Column>
              <Column dataField="status" caption="Status" minWidth={100} />
              <Column type="buttons">
                <Button name="edit" />
                <Button name="delete" />
              </Column>
            </TreeList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Structure;
