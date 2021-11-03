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
  Lookup,
  StateStoring,
} from "devextreme-react/tree-list";
import "./style.scss";
import { data } from "../data/index";
import Button from "devextreme-react/button";
import Plus from "../assets/img/plus.svg";
import Edit from "../assets/img/pencil.svg";
import Delete from "../assets/img/bin.svg";
import Save from "../assets/img/download.svg";
import Cancel from "../assets/img/exit.svg";
import LocalStore from "devextreme/data/local_store";
import { Row } from "devextreme-react/responsive-box";

const allowedPageSizes = [5, 10, 20];

const expandedRowKeys = [1, 2, 3, 4, 5];

let store = new LocalStore({
  key: "id",
  name: "myData",
  data: data,
});

const Structure = () => {

  const onEditorPreparing = (e) => {
    console.log(store);
    if (e.dataField === "parent_id" && e.row.data.id === 1) {
      e.cancel = true;
      // e.lookup.dataSource._array = [...getAvailable(store._array, e.row.key)];
      // console.log(store);
    }
  };

  const onInitNewRow = (e) => {
    e.parent_id = 1;
  };

  const handleDeleteItem = (e) => {
    console.log(e);
  };

  const handleSave = (e) => {
    const { data, type, key } = e.changes[0];
    console.log(data, type, key, store);

    if (type === "insert") {
      const maxId = Math.max(...store._array.map((item) => item.id));
      data.id = maxId + 1;
      console.log(data);

      store.insert(data).then(
        (dataObj) => {
          console.log("success: ", dataObj);
        },
        (error) => {
          console.log("error: ", error);
        }
      );
    } else if (type === "update") {
      if ((data.parent_id || 0) != 0) {
        let availableParents = getAvailable(store._array, key);
        let foundIndex = availableParents
          .map((a) => a.id)
          .indexOf(data.parent_id);

        if (foundIndex == -1) {
          e.cancel = true;
          alert("mumkun deyil");
          return;
        }
      }

      store.update(key, data).then(
        (dataObj) => {
          console.log("success: ", dataObj);
        },
        (error) => {
          console.log("error: ", error);
        }
      );
    } else if (type === "remove") {
      store.remove(key).then(
        (dataObj) => {
          console.log("success: ", dataObj);
        },
        (error) => {
          console.log("error: ", error);
        }
      );
    }
  };

  const getAvailable = (data, excludeId) => {
    let result = [{ id: 0, name: "---", parent_id: 0, status: true }];
    let parents = data.filter(
      (parent) =>
        (parent.parent_id == 0 || parent.parent_id == null) &&
        parent.id != excludeId
    );

    parents.forEach((element) => getChildren(element));

    return result;

    function getChildren(item) {
      result.push(item);

      if (item.id == 0) return;

      data
        .filter((d) => d.parent_id == item.id && d.id != excludeId)
        .forEach((child) => getChildren(child));
    }
  };

  return (
    <div className="container">
      <div className="row my-5 justify-content-center">
        <div className="col-8">
          <h1 className="text-center fw-bold mb-4">Vabiss React App</h1>
          <div id="tree-list-demo">
            <TreeList
              dataSource={store._array}
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
              onSaving={handleSave}
            >
              <Editing
                allowUpdating={true}
                allowDeleting={true}
                allowAdding={true}
                mode="row"
                useIcons={true}
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
              <Column
                dataField="name"
                caption="Name"
                minWidth={300}
                validationRules={{ type: "required" }}
              ></Column>
              <Column dataField="parent_id" caption="Parent">
                <Lookup
                  dataSource={getAvailable(store._array, -1)}
                  valueExpr="id"
                  displayExpr="name"
                />
                <RequiredRule />
              </Column>
              <Column dataField="status" caption="Status" minWidth={100} />
              <Column type="buttons">
                <Button name="edit" />
                <Button name="delete" onClick={handleDeleteItem} />
              </Column>
            </TreeList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Structure;
