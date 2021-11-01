//@ts-ignore
import initLayoutContainer from "./opentok";

export const options = {
  maxRatio: 1, // The narrowest ratio that will be used (default 2x3)
  minRatio: 1, // The widest ratio that will be used (default 16x9)
  fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
  alignItems: "center", // Can be 'start', 'center' or 'end'. Determines where to place items when on a row or column that is not full
  bigClass: "OT_big", // The class to add to elements that should be sized bigger
  bigPercentage: 0.85, // The maximum percentage of space the big ones should take up
  bigFixedRatio: false, // fixedRatio for the big ones
  bigAlignItems: "center", // How to align the big items
  smallAlignItems: "center", // How to align the small row or column of items if there is a big one
  maxWidth: Infinity, // The maximum width of the elements
  maxHeight: Infinity, // The maximum height of the elements
  smallMaxWidth: Infinity, // The maximum width of the small elements
  smallMaxHeight: Infinity, // The maximum height of the small elements
  bigMaxWidth: Infinity, // The maximum width of the big elements
  bigMaxHeight: Infinity, // The maximum height of the big elements
  bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
  bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
  bigFirst: "row", // Whether to place the big one in the top left (true) or bottom right (false).
  // You can also pass 'column' or 'row' to change whether big is first when you are in a row (bottom) or a column (right) layout
  animate: false, // Whether you want to animate the transitions
  window: window, // Lets you pass in your own window object which should be the same window that the element is in
  ignoreClass: "OT_ignore", // Elements with this class will be ignored and not positioned. This lets you do things like picture-in-picture
};
export default initLayoutContainer;
