import React, { useEffect, useState } from "react";
import { DashboardItem, RegisterItem } from "../interfaces";
import DashBdItem from "../components/DashBdItem";
import { Link } from "react-router-dom";

declare let confirm: (question: string) => boolean;

interface DashboardProps {
  login: string;
}

const Dashboard: React.FC<DashboardProps> = ({ login }) => {
  const [dashBdItems, setDashBdItems] = useState<DashboardItem[]>([]);
  const [dashBdItem, setDashBdItem] = useState<DashboardItem>({
    name: "",
    login: "",
    password: "",
  });
  const [users, setUsers] = useState<RegisterItem[]>([]);

  useEffect(() => {
    let data: RegisterItem[] = JSON.parse(
      localStorage.getItem("new-user") || "[]"
    );
    const filterdData: RegisterItem[] = data.filter(
      (item: RegisterItem) => item.login === login
    );
    setUsers(data);
    filterdData[0] && setDashBdItems(filterdData[0].dashBD);
  }, []);

  useEffect(() => {
    localStorage.setItem("new-user", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    setUsers((prev) =>
      prev.map((item: RegisterItem) => {
        if (item.login === login) {
          return {
            ...item,
            dashBD: dashBdItems,
          };
        } else
          return {
            ...item,
          };
      })
    );
  }, [dashBdItems]);

  const fieldItemHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDashBdItem({ ...dashBdItem, [event.target.name]: event.target.value });
  };

  const addItem = () => {
    if (dashBdItem.name && dashBdItem.login && dashBdItem.password) {
      setDashBdItems((prev) => [dashBdItem, ...prev]);
      setDashBdItem({
        name: "",
        login: "",
        password: "",
      });
    }
    console.log(dashBdItems);
  };

  const onRemove = (name: string) => {
    const shouldRemove = confirm("Вы действительно хотите удалить?");
    shouldRemove &&
      setDashBdItems((prev) => prev.filter((item) => item.name !== name));
  };

  const onEdit = (editedData: DashboardItem) => {
    setDashBdItems((prev) =>
      prev.map((item: DashboardItem) => {
        if (item.name === editedData.name) {
          return {
            ...item,
            login: editedData.login,
            password: editedData.password,
          };
        } else
          return {
            ...item,
          };
      })
    );
  };

  return (
    <div className="dashboard__wrapper">
      <div className="dashboard">
        <h2 className="dashboard__title title">
          <span>Dashboard</span>
          <div className="exit-link">
            <Link to="/login">Exit</Link>
          </div>
        </h2>
        <form className="dashboard__form">
          <div className="dashboard__form-field">
            <label>Name of Web-Site:</label>
            <input
              type="text"
              name="name"
              value={dashBdItem.name}
              onChange={(e) => fieldItemHandler(e)}
            />
          </div>
          <div className="dashboard__form-field">
            <label>Login:</label>
            <input
              type="text"
              name="login"
              value={dashBdItem.login}
              onChange={(e) => fieldItemHandler(e)}
            />
          </div>
          <div className="dashboard__form-field">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={dashBdItem.password}
              onChange={(e) => fieldItemHandler(e)}
            />
          </div>
        </form>
        <button className="dashboard__form-btn button" onClick={addItem}>
          Add
        </button>
        {dashBdItems[0] && (
          <div className="dashboard__items">
            {dashBdItems.map((item) => {
              return (
                <DashBdItem data={item} onRemove={onRemove} onEdit={onEdit} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
