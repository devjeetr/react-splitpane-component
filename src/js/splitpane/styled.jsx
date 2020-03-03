import styled from "@emotion/styled";

export const LayoutDiv = styled.div(
  ({ height, width, position, top, left, cursor, pointerEvents }) => ({
    overflow: "hidden",
    cursor,
    height,
    width,
    position,
    top,
    left,
    pointerEvents
  })
);
