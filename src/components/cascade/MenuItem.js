import { useState } from "react";

const MenuItem = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "10px 20px",
        cursor: "pointer",
        whiteSpace: "nowrap",
        backgroundColor: hovered ? "#d1dfff" : "#fff", // blue.light for hovered
        color: "#485162", // darkBlue.normal for text
        borderBottom: "1px solid #dce0e8", // darkBlue.light for bottom border
      }}
    >
      {item.label}
      {item.children && hovered && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "100%",
            backgroundColor: "#fff", // white background for submenu
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 1,
            border: "1px solid #dce0e8", // darkBlue.light for border
          }}
        >
          {item.children.map((child, index) => (
            <MenuItem key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
