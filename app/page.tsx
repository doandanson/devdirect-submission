"use client";

import { useEffect, useState } from "react";
import Viewer from "./components/viewer";
import MouseTracker from "./components/mouseTracking";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [isInBox, setIsInBox] = useState(false);
  const [componentData, setComponentData] = useState<any>([]);
  const [openImportWebLayout, setOpenImportWebLayout] = useState(false);
  const [importEvent, setImportEvent] = useState<any>();

  let selected = {};

  const dropComponent = (event: any) => {
    event.preventDefault();
    if (isInBox) {
      setComponentData([...componentData, selected]);
      setIsInBox(false);
    }
  };

  const exportWebsiteLayout = () => {
    const websiteLayout = JSON.stringify(componentData);
    const blob = new Blob([websiteLayout], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "websiteLayout.json";
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const importWebsiteLayout = (event: any) => {
    const file = event.target.files[0];
    const reader: any = new FileReader();

    reader.onload = () => {
      const parsedWebLayout = JSON.parse(reader.result);
      setComponentData(parsedWebLayout);
    };

    reader.readAsText(file);
    setOpenImportWebLayout(false);
  };

  return (
    <div className="h-screen">
      <div
        id="header"
        className="w-full h-50 flex flex-row space-x-4 py-3  justify-center shadow-xl h-fit"
      >
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={() => {
            localStorage.setItem(
              "componentsData",
              JSON.stringify(componentData)
            );
            alert("Web Layout Saved!");
          }}
        >
          save
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={() => {}}
        >
          load
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={() => exportWebsiteLayout()}
        >
          export
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={() => setOpenImportWebLayout(true)}
        >
          import
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          undo
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          redo
        </button>
        <Link href="/consumer" target="_blank">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            view
          </button>
        </Link>
      </div>
      <div className="w-full h-full flex flex-row">
        <div id="component-selector" className="shadow-inner w-1/4 ">
          <div
            draggable
            className="w-full py-5 px-10 text-center border-solid border-2"
            onDrag={() => {
              selected = {
                component: "Paragraph",
                props: {
                  text: "paragraph",
                },
              };
            }}
            onDragEnd={(e) => {
              dropComponent(e);
            }}
          >
            paragraph
          </div>
          <div
            draggable
            className="w-full py-5 px-10 text-center border-solid border-2"
            onDrag={() => {
              selected = {
                component: "Button",
                props: {
                  text: "Button",
                  alert: "",
                },
              };
            }}
            onDragEnd={(e) => {
              dropComponent(e);
              e.preventDefault();
            }}
          >
            button
          </div>
        </div>
        <div id="viewer" className="h-full w-3/4 ">
          <div className="w-full h-50 border-b-2 p-5">
            <MouseTracker />
          </div>
          <div className="p-5 h-full justify-center">
            <Viewer
              componentData={componentData}
              setComponentData={setComponentData}
            />
            <div
              className="w-full h-14 bg-slate-200 flex justify-center"
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDragEnter={(e) => {
                setIsInBox(true);
                e.preventDefault();
              }}
              onDragLeave={(e) => {
                setIsInBox(false);
                e.preventDefault();
              }}
            >
              <AddIcon className="h-full" />
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={openImportWebLayout}
        onClose={() => setOpenImportWebLayout(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col">
          <div className="w-full flex flex-row py-3 space-x-2">
            <input
              type="file"
              accept="application/json"
              onChange={(e) => setImportEvent(e)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={() => importWebsiteLayout(importEvent)}
          >
            import
          </button>
        </Box>
      </Modal>
    </div>
  );
}
