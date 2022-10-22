import React, { useEffect, useState } from "react";
import mailSvg from "../assets/mail.svg";
import manSvg from "../assets/man.svg";
import womanSvg from "../assets/woman.svg";
import womanAgeSvg from "../assets/growing-up-woman.svg";
import manAgeSvg from "../assets/growing-up-man.svg";
import mapSvg from "../assets/map.svg";
import phoneSvg from "../assets/phone.svg";
import padlockSvg from "../assets/padlock.svg";
import axios from "axios";

import Footer from "../components/footer/Footer";
import Table from "./Table";

const Main = () => {
  const [user, setUser] = useState("");
  const [screen, setScreen] = useState({
    screen: "",
    value: "",
  });
  const [data, setData] = useState([]);

  // console.log("user", user);
  // console.log("screen:", screen.screen);
  // console.log("value:", screen.value);

  const randomUser = async () => {
    const url = "https://randomuser.me/api/";
    try {
      const { data } = await axios(url);
      //   console.log(data.results[0]);
      setUser(data.results[0]);
      setScreen({
        screen: data.results[0].name.first + " " + data.results[0].name.last,
        value: "name",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("user", user);
  const filteredArray = () => {};

  const handlerUserList = () => {
    const sentence = data.some((item) => item.email === user.email);
    {
      !sentence &&
        setData([
          {
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            phone: user.phone,
            age: user.dob.age,
            id: user.login.uuid,
          },
          ...data,
        ]);
    }
  };

  useEffect(() => {
    randomUser();
  }, []);

  // console.log("data", data);

  const { dob, name, email, phone, location, login, picture, gender } = user;
  return (
    <main>
      <div className="block bcg"></div>
      <div className="block">
        <div className="container">
          <img src={picture?.large} alt="random user" className="user-img" />
          <p className="user-title">
            My {screen?.value ? screen.value : "name"} is
          </p>
          <p className="user-value">
            {screen?.screen ? screen.screen : name?.first + " " + name?.last}
          </p>
          <div className="values-list">
            <button className="icon" data-label="name">
              <img
                src={gender === "male" ? manSvg : womanSvg}
                alt="user"
                id="iconImg"
                onMouseEnter={() =>
                  setScreen({
                    screen: `${name?.first} ${name?.last}`,
                    value: "name",
                  })
                }
              />
            </button>
            <button className="icon" data-label="email">
              <img
                src={mailSvg}
                alt="mail"
                id="iconImg"
                onMouseEnter={() =>
                  setScreen({ screen: email, value: "email" })
                }
              />
            </button>
            <button className="icon" data-label="age">
              <img
                src={gender === "male" ? manAgeSvg : womanAgeSvg}
                alt="age"
                id="iconImg"
                onMouseEnter={() =>
                  setScreen({ screen: dob?.age, value: "age" })
                }
              />
            </button>
            <button className="icon" data-label="street">
              <img
                src={mapSvg}
                alt="map"
                id="iconImg"
                onMouseEnter={() =>
                  setScreen({
                    screen: `${location?.street?.number} ${location?.street?.name}`,
                    value: "street",
                  })
                }
              />
            </button>
            <button className="icon" data-label="phone">
              <img
                src={phoneSvg}
                alt="phone"
                id="iconImg"
                onMouseEnter={() =>
                  setScreen({ screen: phone, value: "phone" })
                }
              />
            </button>
            <button className="icon" data-label="password">
              <img
                src={padlockSvg}
                alt="lock"
                id="iconImg"
                onMouseEnter={() =>
                  setScreen({ screen: login?.password, value: "password" })
                }
              />
            </button>
          </div>
          <div className="btn-group">
            <button
              className="btn"
              type="button"
              onClick={() => {
                return randomUser();
              }}
            >
              new user
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => handlerUserList()}
            >
              add user
            </button>
            <button className="btn" type="button" onClick={() => setData([])}>
              Clear List
            </button>
          </div>

          <Table data={data} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
};

export default Main;
