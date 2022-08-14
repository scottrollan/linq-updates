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
      <div
        className={className}
        onClick={() => focus()}
        style={{
          overflowY: 'scroll',
          overflowX: 'hidden',
          maxHeight: '80vh',
        }}
      >
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={setEditorState}
          placeholder="Enter job details..."
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
    case 'left':
      return 'align-left';
    case 'center':
      return 'align-center';
    case 'right':
      return 'align-right';
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
  // { label: 'Header1', icon: '', style: 'header-one' },
  // { label: 'Header2', icon: '', style: 'header-two' },
  // { label: 'Header3', icon: '', style: 'header-three' },
  // { label: <h4>Header</h4>, icon: '', style: 'header-four' },
  { label: <h5>Sub-Header</h5>, icon: '', style: 'header-five' },
  // { label: 'Header6', icon: '', style: 'header-six' },
  // { label: 'Blockquote', icon: '', style: 'blockquote' },
  // {
  //   label: 'Center',
  //   icon: <FontAwesomeIcon icon={faAlignCenter} />,
  //   style: 'align: center',
  // },
  {
    label: 'Bulleted List',
    icon: <i class="fal fa-list-ul"></i>,
    style: 'unordered-list-item',
  },
  {
    label: 'Numbered List',
    icon: <i class="fal fa-list-ol"></i>,
    style: 'ordered-list-item',
  },

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
          key={JSON.stringify(type.style)}
          active={type.style === blockType}
          label={type.icon ? type.icon : type.label}
          onToggle={() => props.onToggle(`${type.style}`)}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: 'Bold', icon: <i class="fal fa-bold"></i>, style: 'BOLD' },
  {
    label: 'Italic',
    icon: <i class="fal fa-italic"></i>,
    style: 'ITALIC',
  },
  {
    label: 'Underline',
    icon: <i class="fal fa-underline"></i>,
    style: 'UNDERLINE',
  },
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
          label={type.icon ? type.icon : type.label}
          onToggle={() => props.onToggle(`${type.style}`)}
          style={type.style}
        />
      ))}
    </div>
  );
};
