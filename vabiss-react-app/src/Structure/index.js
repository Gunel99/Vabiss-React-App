import React from "react";
import { Template } from "devextreme-react/core/template";
import TreeList, {
  Column,
  ColumnChooser,
  HeaderFilter,
  SearchPanel,
  Selection,
  Lookup,
} from "devextreme-react/tree-list";
import EmployeeCell from "./EmployeeCell.js";
import { employees, priorities, tasks } from "../data/data";
import "./style.scss";
import LocalStore from "devextreme/data/local_store";
import DataSource from "devextreme/data/data_source";

const expandedKeys = [1, 2];
const selectedKeys = [1, 29, 42];

const states = [
  { id: 1, state: "Alabama", capital: "Montgomery" },
  { id: 2, state: "Alaska", capital: "Juneau" },
  { id: 3, state: "Arizona", capital: "Phoenix" },
  // ...
];

const Structure = () => {
  return (
    <div className="container">
      <div className="row my-5 justify-content-center">
        <div className="col-10">
          <h1 className="text-center fw-bold mb-4">Vabiss React App</h1>
          <TreeList
            dataSource={dataSourceOptions}
            showBorders={true}
            columnAutoWidth={true}
            wordWrapEnabled={true}
            defaultExpandedRowKeys={expandedKeys}
            defaultSelectedRowKeys={selectedKeys}
            keyExpr="Task_ID"
            parentIdExpr="Task_Parent_ID"
            id="tasks"
          >
            <SearchPanel visible={true} width={250} />
            <HeaderFilter visible={true} />
            <Selection mode="multiple" />
            <ColumnChooser enabled={true} />

            <Column dataField="Task_Subject" width={300} />
            <Column
              dataField="Task_Assigned_Employee_ID"
              caption="Assigned"
              allowSorting={true}
              minWidth={200}
              cellTemplate="employeeTemplate"
            >
              <Lookup
                dataSource={employees}
                displayExpr="Name"
                valueExpr="ID"
              />
            </Column>
            <Column dataField="Task_Status" caption="Status" minWidth={100}>
              <Lookup dataSource={statuses} />
            </Column>
            <Column
              dataField="Task_Priority"
              caption="Priority"
              visible={false}
            >
              <Lookup
                dataSource={priorities}
                valueExpr="id"
                displayExpr="value"
              />
            </Column>
            <Column
              dataField="Task_Completion"
              caption="% Completed"
              minWidth={100}
              customizeText={customizeTaskCompletionText}
              visible={false}
            />
            <Column
              dataField="Task_Start_Date"
              caption="Start Date"
              dataType="date"
            />
            <Column
              dataField="Task_Due_Date"
              caption="Due Date"
              dataType="date"
            />

            <Template name="employeeTemplate" render={EmployeeCell} />
          </TreeList>
        </div>
      </div>
    </div>
  );
};

const dataSourceOptions = {
  store: tasks.map(function (task) {
    employees.forEach(function (employee) {
      if (task.Task_Assigned_Employee_ID === employee.ID) {
        task.Task_Assigned_Employee = employee;
      }
    });
    return task;
  }),
};

function customizeTaskCompletionText(cellInfo) {
  return `${cellInfo.valueText}%`;
}

const statuses = [
  "Not Started",
  "Need Assistance",
  "In Progress",
  "Deferred",
  "Completed",
];

export default Structure;