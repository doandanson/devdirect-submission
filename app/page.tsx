"use client";

import { useState } from "react";
import Viewer from "./components/viewer";
import MouseTracker from "./components/mouseTracking";
import AddIcon from "@mui/icons-material/Add";

export default function Home() {
  const [test, setTest] = useState("");
  const [isInBox, setIsInBox] = useState(false);
  const [componentData, setComponentData] = useState<any>([]);
  const [selected, setSelected] = useState<any>({});

  const dropComponent = (event: any) => {
    if (isInBox) {
      // console.log("dropped");
      console.log(selected);
      setComponentData([...componentData, selected]);
      setIsInBox(false);
    }
    setTest("");
  };

  const addSelector = (component: any) => {
    setSelected(component);
  };

  let mockComponent = componentData;

  return (
    <div className="flex flex-wrap flex-col">
      <div
        id="header"
        className="w-full flex flex-row space-x-4 py-3  justify-center shadow-xl"
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          save
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          load
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          export
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          import
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          undo
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          redo
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          view
        </button>
      </div>
      <div className="w-full flex flex-row">
        <div id="component-selector" className="shadow-inner w-1/4 ">
          <div
            draggable={true}
            className="w-full py-5 px-10 text-center border-solid border-2"
            onDrag={() =>
              addSelector({
                component: "Paragraph",
                props: {
                  text: "paragraph",
                },
              })
            }
            onDragEnd={(e) => dropComponent(e)}
          >
            paragraph
          </div>
          <div
            draggable
            className="w-full py-5 px-10 text-center border-solid border-2"
            onDrag={() =>
              addSelector({
                component: "Button",
                props: {
                  text: "Button",
                  alert: "",
                },
              })
            }
            onDragEnd={(e) => dropComponent(e)}
          >
            button
          </div>
        </div>
        <div id="viewer" className="flex flex-col w-3/4 ">
          <div className="w-full border-b-2 p-5">
            <MouseTracker />
            <p>dargging: {test}</p>
          </div>
          <div className="p-5 bg-slate-300">
            <Viewer
              componentData={componentData}
              setComponentData={setComponentData}
            />
            <div className="w-full flex justify-center">
              <AddIcon
                className="w-full bg-white"
                onDragEnter={() => setIsInBox(true)}
                onDragLeave={() => setIsInBox(false)}
              ></AddIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
