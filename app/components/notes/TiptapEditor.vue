<template>
  <div v-if="editor" class="tiptap-editor-container">
    <!-- Toolbar -->
    <div class="editor-toolbar">
      <div class="toolbar-group">
        <button 
          @click="editor.chain().focus().toggleBold().run()" 
          :class="{ 'is-active': editor.isActive('bold') }"
          title="Bold"
        >
          <i class="fas fa-bold"></i>
        </button>
        <button 
          @click="editor.chain().focus().toggleItalic().run()" 
          :class="{ 'is-active': editor.isActive('italic') }"
          title="Italic"
        >
          <i class="fas fa-italic"></i>
        </button>
        <button 
          @click="editor.chain().focus().toggleUnderline().run()" 
          :class="{ 'is-active': editor.isActive('underline') }"
          title="Underline"
        >
          <i class="fas fa-underline"></i>
        </button>
        <button 
          @click="editor.chain().focus().toggleStrike().run()" 
          :class="{ 'is-active': editor.isActive('strike') }"
          title="Strikethrough"
        >
          <i class="fas fa-strikethrough"></i>
        </button>
        <button 
          @click="editor.chain().focus().toggleHighlight().run()" 
          :class="{ 'is-active': editor.isActive('highlight') }"
          title="Highlight"
        >
          <i class="fas fa-highlighter"></i>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group">
        <button 
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" 
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          title="Heading 1"
        >
          <span class="heading-icon">H1</span>
        </button>
        <button 
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" 
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          title="Heading 2"
        >
          <span class="heading-icon">H2</span>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group">
        <button 
          @click="editor.chain().focus().toggleBulletList().run()" 
          :class="{ 'is-active': editor.isActive('bulletList') }"
          title="Bullet List"
        >
          <i class="fas fa-list-ul"></i>
        </button>
        <button 
          @click="editor.chain().focus().toggleOrderedList().run()" 
          :class="{ 'is-active': editor.isActive('orderedList') }"
          title="Ordered List"
        >
          <i class="fas fa-list-ol"></i>
        </button>
        <button 
          @click="editor.chain().focus().toggleBlockquote().run()" 
          :class="{ 'is-active': editor.isActive('blockquote') }"
          title="Blockquote"
        >
          <i class="fas fa-quote-right"></i>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group">
        <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()">
          <i class="fas fa-undo"></i>
        </button>
        <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()">
          <i class="fas fa-redo"></i>
        </button>
      </div>

      <div class="toolbar-status ms-auto">
        <span class="char-count">{{ characterCount }} characters</span>
      </div>
    </div>

    <!-- Editor Content -->
    <div class="editor-content-wrapper">
      <editor-content :editor="editor" class="prose-container" />
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import CharacterCount from '@tiptap/extension-character-count'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Start writing your note here...',
  }
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    // Ensure we don't have duplicates if they are somehow pre-registered
    Underline.configure({}),
    Highlight.configure({ multicolor: true }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: null,
      },
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    CharacterCount,
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

const characterCount = computed(() => {
  return editor.value?.storage.characterCount.characters() || 0
})

watch(() => props.modelValue, (value) => {
  const isSame = editor.value?.getHTML() === value
  if (isSame) return
  editor.value?.commands.setContent(value, false)
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
.tiptap-editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.editor-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0.6rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 2rem;
  border: 1px solid rgba(120, 53, 15, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(10px);
}

.toolbar-group {
  display: flex;
  gap: 4px;
}

.toolbar-group button {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #78350F;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.85rem;
}

.toolbar-group button:hover {
  background: rgba(120, 53, 15, 0.1);
  color: #92400E;
}

.toolbar-group button.is-active {
  background: #FBBF24;
  color: #1C1917;
  box-shadow: 0 2px 4px rgba(251, 191, 36, 0.2);
}

.toolbar-group button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.toolbar-divider {
  width: 1px;
  height: 24px;
  background: rgba(120, 53, 15, 0.1);
  margin: 0 0.25rem;
}

.heading-icon {
  font-weight: 800;
  font-size: 0.75rem;
  font-family: var(--font-heading);
}

.toolbar-status {
  margin-left: auto;
  padding-right: 0.5rem;
}

.char-count {
  font-size: 0.75rem;
  color: rgba(120, 53, 15, 0.4);
  font-family: var(--font-sans);
  font-weight: 500;
}

.editor-content-wrapper {
  flex-grow: 1;
}

:deep(.tiptap) {
  outline: none;
  min-height: 500px;
  color: #1C1917;
  font-family: var(--font-sans);
  line-height: 1.8;
  font-size: 1.15rem;
}

:deep(.tiptap p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: rgba(120, 53, 15, 0.3);
  pointer-events: none;
  height: 0;
}

:deep(.tiptap h1) { font-size: 2.5rem; margin-top: 2rem; margin-bottom: 1.5rem; color: #000; font-weight: 700; font-family: var(--font-heading); }
:deep(.tiptap h2) { font-size: 2rem; margin-top: 1.5rem; margin-bottom: 1rem; color: #000; font-weight: 700; font-family: var(--font-heading); }
:deep(.tiptap blockquote) {
  border-left: 4px solid #FBBF24;
  padding: 1rem 1.5rem;
  background: rgba(251, 191, 36, 0.05);
  font-style: italic;
  color: #78350F;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;
}
:deep(.tiptap ul), :deep(.tiptap ol) {
  padding-left: 2rem;
  margin: 1.5rem 0;
}
:deep(.tiptap li) { margin-bottom: 0.75rem; }

.ms-auto { margin-left: auto; }
</style>
