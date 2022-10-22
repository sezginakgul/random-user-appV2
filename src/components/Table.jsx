import React from "react";

const Table = ({ data }) => {
  return (
    <table className="table">
      {data.length > 0 && (
        <thead>
          <tr className="head-tr">
            <th className="th">Name</th>
            <th className="th">Email</th>
            <th className="th">Phone</th>
            <th className="th">Age</th>
          </tr>
        </thead>
      )}

      <tbody>
        {data.map((item) => {
          return (
            <tr className="body-tr" key={item?.id}>
              <td className="td">{item?.firstName + " " + item?.lastName}</td>
              <td className="td">{item?.email}</td>
              <td className="td">{item?.phone}</td>
              <td className="td">{item?.age}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
