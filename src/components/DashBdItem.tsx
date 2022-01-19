import React, { useState } from "react";
import { DashboardItem } from "../interfaces";
import cn from "classnames";
import hidePassword from "../images/hide.png";
import openPassword from "../images/open.png";

type DashboardProps = {
  data: DashboardItem;
  onRemove(name: string): void;
  onEdit(editedData: DashboardItem): void;
};

const DashBdItem: React.FC<DashboardProps> = ({ data, onRemove, onEdit }) => {
  const [isReveal, setIsReveal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState<DashboardItem>({
    name: data.name,
    login: data.login,
    password: data.password,
  });

  const editDataHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [event.target.name]: event.target.value });
  };

  const removeHeandler = (event: React.MouseEvent, name: string) => {
    event.preventDefault();
    onRemove(name);
  };

  const checkEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const revealHeandler = () => {
    setIsReveal((prev) => !prev);
  };

  const saveEditedData = () => {
    onEdit(editData);
    setIsEdit((prev) => !prev);
  };

  const cancelEditData = () => {
    setIsEdit((prev) => !prev);
    setEditData({ ...editData, login: data.login, password: data.password })
  }

  return (
    <div className="dashboard-item">
      <div className="dashboard-item__name">{data.name}:</div>
      <div className="dashboard-item__info">
        <div className="dashboard-item__windows">
          <div className={cn("dashboard-item__window", { "edit-input": isEdit })}>
            <input
              value={editData.login}
              type="text"
              readOnly={!isEdit}
              name="login"
              onChange={(e) => editDataHandler(e)}
            />
          </div>
          <div className={cn("dashboard-item__window", { "edit-input": isEdit })}>
            <input
              value={editData.password}
              readOnly={!isEdit}
              type={isReveal ? "text" : "password"}
              name="password"
              onChange={(e) => editDataHandler(e)}
            />
            <button className="button-reveal" onClick={() => revealHeandler()}>
              <img
                src={isReveal ? openPassword : hidePassword}
                alt="hide-password"
              />
            </button>
          </div>
        </div>
        <div className="dashboard-item__btns">
          {
            isEdit ? 
            <>
            <button
              className="dashboard-item__btn button button-save"
              onClick={() => {
                saveEditedData();
              }}
            >
              {"Save"}
            </button>
            <button
              className="dashboard-item__btn button button-cancel"
              onClick={() => {
                cancelEditData();
              }}
            >
              {"Cancel"}
            </button>
            </>
            :
            <button
              className="dashboard-item__btn button button-edit"
              onClick={() => {
                checkEdit();
              }}
            >
              {"Edit"}
            </button>
          }
          <button
            className="dashboard-item__btn button button-remove"
            onClick={(e) => removeHeandler(e, data.name)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBdItem;
