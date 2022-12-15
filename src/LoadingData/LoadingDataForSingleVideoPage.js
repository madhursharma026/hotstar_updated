import React from "react";
import { Stack, Skeleton } from "@mui/material/";

function LoadingDataForSingleVideoPage() {
  return (
    <>
      <div className="SingleVideo text-light pt-5">
        <Stack spacing={1}>
          <div
            style={{ background: "#0F1521", borderRadius: "10px", mb: "60px" }}
          >
            {/*<Skeleton className="d-block w-100 carousel_item" variant="rectangular" width="100%" height="38em" />*/}
            <Skeleton
              className="d-block w-100 carousel_item"
              variant="rectangular"
              width="100%"
              height="40em"
            />
          </div>
        </Stack>
        <div className="w-100 pt-3">
          <h6 style={{ fontSize: "24px", borderRadius: "10px" }}>
            <Skeleton variant="h6" style={{ background: "#0F1521" }} />
          </h6>
          <p
            style={{ fontSize: "10px", fontSize: "22px", borderRadius: "10px" }}
          >
            <Skeleton variant="p" style={{ background: "#0F1521" }} />
          </p>
        </div>

        <Stack spacing={1}>
          <Skeleton
            className="d-block carousel_item"
            variant="rectangular"
            width="210px"
            height="275px"
            style={{ borderRadius: "10px", background: "#0F1521" }}
          />
        </Stack>
      </div>
    </>
  );
}
export default LoadingDataForSingleVideoPage;
