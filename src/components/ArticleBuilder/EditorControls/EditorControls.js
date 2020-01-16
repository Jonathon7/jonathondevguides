import React from "react";
import styles from "./editorControls.module.scss";
import StyleButton from "./StyleButton";

/**
 * @type {Array} holds the labels for the style buttons and types for the HTML tags
 */
const BLOCK_TYPES = [
  { label: "H1", style: "header-three" },
  { label: "P", style: "paragraph" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" }
];

export default function BlockStyleControls(props) {
  /**
   * @type {Object} editorState - object that holds style format information for the Editor component
   * @type {string} selection - holds the selection state currently being rendered
   * @type {Object} blockType - holds the currently selected blockType
   */
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={styles.buttonsCont}>
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}
