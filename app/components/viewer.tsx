import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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

const Viewer = ({ componentData, setComponentData }: any) => {
  const [componentArray, setComponentArray] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<any>({});
  const [index, setIndex] = useState<any>();

  useEffect(() => {
    setComponentArray(componentData);
  }, [componentData]);

  const openComponentDataEditor = (index: number) => {
    setSelectedComponent(componentArray[index]);
    setIndex(index);
    setOpen(true);
  };

  const HandleTextChange = (event: any) => {
    const tempObject = JSON.parse(JSON.stringify(selectedComponent));
    tempObject.props.text = event.target.value;
    setSelectedComponent(tempObject);
  };

  const HandleAlertChange = (event: any) => {
    const tempObject = JSON.parse(JSON.stringify(selectedComponent));
    tempObject.props.alert = event.target.value;
    setSelectedComponent(tempObject);
  };

  const handleUpdateArray = () => {
    const tempArray = JSON.parse(JSON.stringify(componentArray));
    tempArray.splice(index, 1, selectedComponent);
    setComponentData(tempArray);
    setOpen(false);
  };

  return (
    <div className="flex flex-col justify-center py-2 bg-white">
      {componentArray?.map((item: any, index: number) => {
        if (item.component === "Paragraph") {
          return (
            <p
              onClick={() => openComponentDataEditor(index)}
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
              onClick={() => openComponentDataEditor(index)}
              key={index}
            >
              {item.props.text}
            </button>
          );
        }
      })}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col">
          <div className="w-full flex flex-row py-3 space-x-2">
            <label htmlFor="">Text</label>
            <input
              type="text"
              value={selectedComponent?.props?.text || ""}
              onChange={(e) => HandleTextChange(e)}
            />
          </div>
          {selectedComponent.component === "Button" && (
            <div className="w-full flex flex-row py-3 space-x-2">
              <label htmlFor="">alert</label>
              <input
                type="text"
                value={selectedComponent?.props?.alert || ""}
                onChange={(e) => HandleAlertChange(e)}
              />
            </div>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={() => handleUpdateArray()}
          >
            save
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default Viewer;
