import React, { memo } from "react";
import { useSelector } from "react-redux";
import StickerItem from "./StickerItem";
function SticerItemList() {
  const sticker = useSelector((state) => state.sticker);
  const photoData = useSelector((state) => state.photoData);
  console.log(sticker);
  return (
    <>
      {sticker.map((el, id) => {
        return (
          <StickerItem
            key={el.id}
            id={el.id}
            path={el.stickerPath}
            width={photoData.adaptedWidth}
            height={photoData.adaptedHeight}
          />
        );
      })}
    </>
  );
}
export default memo(SticerItemList);
