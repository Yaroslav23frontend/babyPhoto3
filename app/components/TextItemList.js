import React, { memo } from "react";

import { useSelector } from "react-redux";
import TextItem from "./TextItem";
function TextItemList() {
  const text = useSelector((state) => state.text);
  const photoData = useSelector((state) => state.photoData);
  console.log("textItem list");
  return (
    <>
      {text.map((el, id) => {
        return (
          <TextItem
            key={el.id}
            font={el?.font}
            color={el?.color}
            text={el?.text}
            id={id}
            idMain={el.id}
            width={photoData.adaptedWidth}
            height={photoData.adaptedHeight}
          />
        );
      })}
    </>
  );
}
export default memo(TextItemList);
