const codeInput = document.getElementById('codeInput');
const previewFrame = document.getElementById('previewFrame');
const splitter = document.getElementById('splitter');
const editorPanel = document.getElementById('editor-panel');
const previewPanel = document.getElementById('preview-panel');

const editor = CodeMirror.fromTextArea(codeInput, {
    mode: 'htmlmixed',
    theme: 'dracula',
    lineNumbers: true,
    lineWrapping: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    extraKeys: {
        "Ctrl-Space": cm => cm.showHint({ completeSingle: false }),
        "Cmd-Space": cm => cm.showHint({ completeSingle: false }),
        "Ctrl-I": cm => cm.showHint({ completeSingle: false })
    },
    hintOptions: { completeSingle: false }
});

const DEFAULT = ``;

editor.setValue(localStorage.getItem('lastCode') || DEFAULT);

function updatePreview() {
    const doc = previewFrame.contentWindow.document;
    doc.open();
    doc.write(editor.getValue());
    doc.close();
}
updatePreview();

let timer;
editor.on('change', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        localStorage.setItem('lastCode', editor.getValue());
        updatePreview();
    }, 300);
});

editor.on('inputRead', (cm, change) => {
    const ch = change.text && change.text[0];
    if (!ch || !(/[a-zA-Z0-9<_\.\-\#]/.test(ch))) return;

    try {
        const token = cm.getTokenAt(cm.getCursor());
        const inner = CodeMirror.innerMode(cm.getMode(), token.state).mode.name || '';
        let hintFunc = null;

        if (/xml|html/.test(inner)) hintFunc = CodeMirror.hint.html;
        else if (/css/.test(inner)) hintFunc = CodeMirror.hint.css;
        else if (/javascript|ecma/.test(inner)) hintFunc = CodeMirror.hint.javascript;
        else hintFunc = CodeMirror.hint.anyword;

        cm.showHint({ hint: hintFunc, completeSingle: false });
    } catch {
        cm.showHint({ hint: CodeMirror.hint.anyword, completeSingle: false });
    }
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    const blob = new Blob([editor.getValue()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meu_codigo.html';
    a.click();
    URL.revokeObjectURL(url);
});

document.getElementById('reloadBtn').addEventListener('click', updatePreview);

document.getElementById('smartBtn').addEventListener('click', () => {
    previewPanel.classList.toggle('smartphone-mode');
    const iframe = previewPanel.querySelector('iframe');

    if (previewPanel.classList.contains('smartphone-mode')) {
        iframe.style.width = '375px';
        iframe.style.height = '667px';
        previewPanel.style.alignItems = 'center';
    } else {
        iframe.style.width = '100%';
        iframe.style.height = 'calc(100% - 36px)';
        previewPanel.style.alignItems = 'flex-start';
    }
});

document.getElementById('fsBtn').addEventListener('click', () => {
    document.body.classList.toggle('fullscreen-preview');
    const fs = document.body.classList.contains('fullscreen-preview');
    const iframe = previewPanel.querySelector('iframe');

    if (fs) {
        editorPanel.style.display = 'none';
        splitter.style.display = 'none';
        previewPanel.style.flex = '1 1 100%';
        iframe.style.width = '100%';
        iframe.style.height = '100vh';
    } else {
        editorPanel.style.display = '';
        splitter.style.display = '';
        iframe.style.height = 'calc(100% - 36px)';
    }
    editor.refresh();
});
let isResizing = false;

splitter.addEventListener('mousedown', () => {
    isResizing = true;
    document.body.style.userSelect = 'none'; // evita seleção de texto
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.userSelect = '';
});

document.addEventListener('mousemove', e => {
    if (!isResizing) return;

    if (window.innerWidth > 768) {
        // Horizontal
        const minWidth = 200;
        const maxWidth = window.innerWidth - 200;
        const newWidth = Math.min(maxWidth, Math.max(minWidth, e.clientX));
        editorPanel.style.flex = `0 0 ${newWidth}px`;
    } else {
        // Vertical
        const minHeight = 150;
        const maxHeight = window.innerHeight - 150;
        const newHeight = Math.min(maxHeight, Math.max(minHeight, e.clientY));
        editorPanel.style.flex = `0 0 ${newHeight}px`;
    }
    editor.refresh();
});
