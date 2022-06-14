import React, { useRef } from 'react';
import { Editor, getDefaultKeyBinding, RichUtils } from 'draft-js';
import './RichUtils.css';
import '../../node_modules/draft-js/dist/Draft.css';

export default function RichTextEditor({
  editorState,
  setEditorState,
  contentState,
}) {
  const editor = useRef(null);
  const focus = () => editor.current.focus();
  const onChange = (newEditorState) => setEditorState(newEditorState);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType) => {
    console.log(`This should show the block type: ${blockType}`);
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  // render() {
  // const { editorState } = editorState;
  // const contentState = editorState.getCurrentContent();
  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={(blockType) => toggleBlockType(blockType)}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={(inlineStyle) => toggleInlineStyle(inlineStyle)}
      />
      <div className={className} onClick={() => focus()}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={setEditorState}
          placeholder="Tell a story..."
          ref={editor}
          spellCheck={true}
        />
      </div>
    </div>
  );
  // }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'Header1', style: 'header-one' },
  { label: 'Header2', style: 'header-two' },
  { label: 'Header3', style: 'header-three' },
  { label: 'Header4', style: 'header-four' },
  { label: 'Header5', style: 'header-five' },
  { label: 'Header6', style: 'header-six' },
  // { label: 'Blockquote', style: 'blockquote' },
  { label: 'Unordered List', style: 'unordered-list-item' },
  { label: 'Ordered List', style: 'ordered-list-item' },
  // { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props, { editorState }) => {
  // const { editorState } = props;
  const selection = () => editorState.getSelection();
  const blockType = () =>
    editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={() => props.onToggle(`${type.style}`)}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  // { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={() => props.onToggle(`${type.style}`)}
          style={type.style}
        />
      ))}
    </div>
  );
};
