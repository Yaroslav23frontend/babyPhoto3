import React, { useContext, useRef, useState } from "react";
const ActiveContext = React.createContext();
export function useActive() {
  return useContext(ActiveContext);
}
export default function ActiveProivider({ children }) {
  const [editText, setEditText] = useState({
    data: {
      text: "",
      font: "",
      color: "",
      scale: "",
      opacity: "",
      point: "",
      rotateText: "",
      surfaceHeight: "",
      surfaceWidth: "",
    },
    edit: false,
  });
  const [active, setActive] = useState("");
  const [tempRotate, setTempRotate] = useState(0);
  const [tempScale, setTempScale] = useState(1);
  const [tempPosition, setTempPosition] = useState({ x: 0, y: 0 });
  const [frameActive, setFrameActive] = useState(false);
  const [headerVisability, setHeaderVisability] = useState(true);
  const [footerVisability, setFooterVisability] = useState(true);
  const [brightness, setBrightness] = useState(1);
  const [imgRotate, setImgRotate] = useState(0);
  const [contrast, setContrast] = useState(1);
  const [modalVisability, setModalVisability] = useState(false);
  const [massege, setMassege] = useState("");
  const [onCloseMassege, setOnCloseMassege] = useState("");
  const [textEditVisability, setTextEditVisability] = useState(false);
  const [stickerListVisability, setStickerListVisability] = useState(false);
  const [filterVisability, setFilterVisability] = useState(false);
  const [mirrorX, setMirrorX] = useState(1);
  const [mirrorY, setMirrorY] = useState(1);
  const [framesVisability, setFramesVisability] = useState(false);
  const sticker = useRef("");
  const refImage = useRef();
  const viewShot = useRef();
  const value = {
    editText,
    setEditText,
    setTempRotate,
    tempRotate,
    setTempScale,
    tempScale,
    active,
    setActive,
    frameActive,
    setFrameActive,
    headerVisability,
    setHeaderVisability,
    footerVisability,
    setFooterVisability,
    brightness,
    setBrightness,
    contrast,
    setContrast,
    imgRotate,
    setImgRotate,
    modalVisability,
    setModalVisability,
    onCloseMassege,
    setOnCloseMassege,
    massege,
    setMassege,
    viewShot,
    textEditVisability,
    setTextEditVisability,
    stickerListVisability,
    setStickerListVisability,
    refImage,
    filterVisability,
    setFilterVisability,
    mirrorX,
    setMirrorX,
    mirrorY,
    setMirrorY,
    framesVisability,
    setFramesVisability,
    tempPosition,
    setTempPosition,
    sticker,
  };
  return (
    <ActiveContext.Provider value={value}>{children}</ActiveContext.Provider>
  );
}
