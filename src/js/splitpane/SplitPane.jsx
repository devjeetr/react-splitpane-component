import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { clamp, curry } from "ramda";
import PropTypes from "prop-types";
import * as R from "ramda";
import ResizeObserver from "resize-observer-polyfill";
import './splitpane.scss';

const getValue = (value, reference) => {
  if (typeof value === "number") return value;
  if (value.endsWith("%")) {
    return (+value.substring(0, value.length - 1) / 100.0) * reference;
  }
  if (value.endsWith("px")) {
    return +value.substring(0, value.length - 2);
  }

  throw new Error("Unrecognized value format: " + value);
};

const LayoutDiv = styled.div(
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

const getResizeCursor = type => (type === "h" ? "ew-resize" : "ns-resize");

const offsetProp = R.prop("offset");
const totalProp = R.prop("total");

const createTemplateColumns = (position, thickness) =>
  `${offsetProp(position)}px ${thickness}px ${totalProp(position) -
    offsetProp(position) -
    thickness}px`;

const getParentStyles = (offset, total, handleThickness, type) => {
  const templateItems = createTemplateColumns(
    { offset: offset * total, total },
    handleThickness
  );

  const gridTemplateColumns = type === "h" ? templateItems : "1fr";
  const gridTemplateRows = type === "h" ? "1fr" : templateItems;

  const parentStyles = css`
    display: grid;
    grid-template-columns: ${gridTemplateColumns};
    grid-template-rows: ${gridTemplateRows};
    height: 100%;
    width: 100%;
  `;

  return parentStyles;
};

const allExist = R.pipe(R.map(R.isNil), R.none);

const getOffset = (
  { height, width },
  { height: parentHeight, width: parentWidth },
  handleThickness,
  type
) =>
  getValue(
    type === "h" ? width : height,
    (type === "h" ? parentWidth : parentHeight) - handleThickness
  );

const useResizeObserver = (ref, onResize) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(ref.current);
  }, []);
};

const dragStartHandler = curry(
  (
    {
      onMouseDown = R.identity,
      onMouseMove = R.identity,
      onMouseUp = R.identity
    },
    e
  ) => {
    const mouseUp = e => {
      onMouseUp(e);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };

    onMouseDown(e);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", mouseUp);
  }
);

const SplitPane = ({ children, handleThickness = 3, type = "h" }) => {
  const childNodes = React.Children.toArray(children);
  const parentRef = useRef();
  const firstRef = useRef();
  const [offset, setOffset] = useState();
  const [total, setTotal] = useState();
  const [cursor, setCursor] = useState("auto");
  const [panePointerEvents, setPanePointerEvents] = useState("auto");
  const childProps = React.Children.map(children, c => c.props);

  // handle resizing using the ResizeObserver API
  useResizeObserver(parentRef, entries => {
    for (let entry of entries) {
      setTotal(
        type === "h" ? entry.contentRect.width : entry.contentRect.height
      );
    }
  });

  // This is where we adjust the height/width
  // of the panes
  useLayoutEffect(() => {
    const rect = parentRef.current.getBoundingClientRect();
    const total = type === "h" ? rect.width : rect.height;

    const offsetValue = getOffset(childProps[0], rect, handleThickness, type);
    setOffset(offsetValue / total);
    setTotal(total);
  }, []); // need this to be an empty array so useLayoutEffect gets called only once.

  const onMouseMove = e => {
    e.preventDefault();

    const parentRect = parentRef.current.getBoundingClientRect();
    const clamper = clamp(0, 1.0);

    const newOffset =
      type === "h" ? e.clientX - parentRect.left : e.clientY - parentRect.top;

    setOffset(clamper(newOffset / total));

    setPanePointerEvents("none");
    setCursor(getResizeCursor(type));
  };

  const onMouseUp = e => {
    setPanePointerEvents("auto");
    setCursor("auto");
  };
  const onDragStart = dragStartHandler({ onMouseMove, onMouseUp });

  return (
    <LayoutDiv
      ref={parentRef}
      css={
        allExist([offset, total])
          ? getParentStyles(offset, total, handleThickness, type)
          : {}
      }
      style={{ height: "100%", width: "100%" }}
      cursor={cursor}
      className="split-pane-root"
    >
      <LayoutDiv
        ref={firstRef}
        css={childProps[0].styles}
        pointerEvents={panePointerEvents}
        className="split-pane-second-pane"
      >
        {childNodes[0]}
      </LayoutDiv>
      <LayoutDiv
        className="split-pane-handle"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.0)",
          cursor: getResizeCursor(type)
        }}
        onMouseDown={onDragStart}
      ></LayoutDiv>
      <LayoutDiv
        pointerEvents={panePointerEvents}
        css={childProps[1].styles}
        className="split-pane-second-pane"
      >
        {childNodes[1]}
      </LayoutDiv>
    </LayoutDiv>
  );
};

export const HorizontalSplitPane = props => <SplitPane type="h" {...props} />;
export const VerticalSplitPane = props => <SplitPane type="v" {...props} />;
