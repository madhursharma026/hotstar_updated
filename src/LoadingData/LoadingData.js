import React from 'react'
import './LoadingData.css'
import { Stack, Skeleton } from '@mui/material/';


function LoadingData() {

    return (
        <>
            <div className="row">
                <div className="col carousel_item_1 pb-4">
                    <Stack spacing={1}>
                        <div style={{ background: "#0C111B", borderRadius: "10px" }}>
                            <Skeleton className="d-block w-100 carousel_item" variant="rectangular" width="100%" height="275px" />
                        </div>
                    </Stack>
                </div>
                <div className="col carousel_item_2 pb-4">
                    <Stack spacing={1}>
                        <div style={{ background: "#0C111B", borderRadius: "10px" }}>
                            <Skeleton className="d-block w-100 carousel_item" variant="rectangular" width="100%" height="275px" />
                        </div>
                    </Stack>
                </div>
                <div className="col carousel_item_3 pb-4">
                    <Stack spacing={1}>
                        <div style={{ background: "#0C111B", borderRadius: "10px" }}>
                            <Skeleton className="d-block w-100 carousel_item" variant="rectangular" width="100%" height="275px" />
                        </div>
                    </Stack>
                </div>
                <div className="col carousel_item_4 pb-4">
                    <Stack spacing={1}>
                        <div style={{ background: "#0C111B", borderRadius: "10px" }}>
                            <Skeleton className="d-block w-100 carousel_item" variant="rectangular" width="100%" height="275px" />
                        </div>
                    </Stack>
                </div>
                <div className="col carousel_item_5 pb-4">
                    <Stack spacing={1}>
                        <div style={{ background: "#0C111B", borderRadius: "10px" }}>
                            <Skeleton className="d-block w-100 carousel_item" variant="rectangular" width="100%" height="275px" />
                        </div>
                    </Stack>
                </div>
                <div className="col carousel_item_6 pb-4">
                    <Stack spacing={1}>
                        <div style={{ background: "#0C111B", borderRadius: "10px" }}>
                            <Skeleton className="d-block w-100 carousel_item" variant="rectangular" width="100%" height="275px" />
                        </div>
                    </Stack>
                </div>
                <div className="col carousel_item_7 pb-4">
                    <Stack spacing={1}>
                        <div style={{ background: "#0C111B", borderRadius: "10px" }}>
                            <Skeleton className="d-block w-100 carousel_item" variant="rectangular" width="100%" height="275px" />
                        </div>
                    </Stack>
                </div>
                <div className="col carousel_item_8 pb-4">
                    <Stack spacing={1}>
                        <div style={{ background: "#0C111B", borderRadius: "10px" }}>
                            <Skeleton className="d-block w-100 carousel_item" variant="rectangular" width="100%" height="275px" />
                        </div>
                    </Stack>
                </div>
            </div>
        </>
    );
}
export default LoadingData;
