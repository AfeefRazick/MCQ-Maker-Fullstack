/* eslint-disable react/prop-types */

import { ReadNameDesc } from "../ReadNameDesc"
import { MCEPortalMCQ } from "./MCEPortalMCQ"

export const MCEPortal = ({ information, mcqList }) => {
  return (
    <div className="relative mt-16 flex flex-col items-center px-[4%] md:mt-20 md:px-[6%] lg:px-[8%] xl:px-[10%]">
      <ReadNameDesc information={information} />

      <div
        className=" mt-5 flex h-auto w-full flex-col items-center justify-center rounded-xl "
        id="mcq-container"
      >
        {mcqList.map((mcq, index) => {
          return (
            <MCEPortalMCQ
              key={mcq.id}
              mcqObject={mcq}
              mcqid={mcq.id}
              index={index}
              mcqList={mcqList}
            />
          )
        })}
      </div>
    </div>
  )
}
