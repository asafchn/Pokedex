import { useState } from "react";

import {
  useSelectIsFetching,
  useSelectItemsRenderedOnScreen,
} from "../../performanceSlice/hooks";
import { selectPagesInMemory } from "../../performanceSlice/selectors";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";

const PerformanceToggle = () => {
  const [open, setOpen] = useState(false);

  const pagesInMemory = useSelector(selectPagesInMemory);
  const isFetching = useSelectIsFetching();
  const itemsRendered = useSelectItemsRenderedOnScreen();

  return (
    <Stack direction="row">
      {open && (
        <div style={{ marginTop: "8px", padding: "6px" }}>
          <div>Pages in memory: {pagesInMemory}</div>
          <div>Virtual items on screen: {itemsRendered}</div>
          <div>Is fetching: {isFetching ? "Yes" : "No"}</div>
        </div>
      )}
      <button onClick={() => setOpen(!open)}>
        {open ? "Hide Performance" : "Show Performance"}
      </button>
    </Stack>
  );
};

export default PerformanceToggle;
