"use client";

import { useEffect, useState } from "react";

const Consumer = () => {
  const [componentData, setComponentData] = useState<any>([]);

  useEffect(() => {
    const storedComponentDataString: string | any =
      localStorage.getItem("componentsData");
    const storedComponentData = JSON.parse(storedComponentDataString);
    setComponentData(storedComponentData);
  }, []);

  return (
    <div className="flex flex-col justify-center py-2 bg-white">
      {componentData.map((item: any, index: number) => {
        if (item.component === "Paragraph") {
          return (
            <p
              className="text-center mb-3 mx-10 py-2 px-4 bg-white"
              key={index}
            >
              {item.props.text}
            </p>
          );
        } else if (item.component === "Button") {
          return (
            <button
              className="bg-blue-500 text-white py-2 px-4 border border-blue-700 rounded mb-3 mx-10"
              onClick={() => alert(item.props.alert)}
              key={index}
            >
              {item.props.text}
            </button>
          );
        }
      })}
    </div>
  );
};

export default Consumer;
