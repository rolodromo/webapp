import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import Quill from 'quill/dist/quill'

const Inline = Quill.import('blots/inline')
const BlockEmbed = Quill.import('blots/block/embed')
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

class QuillRandomTable extends Inline {
  static create(value) {
    const node = super.create(value)
    node.innerHTML = `[${value}]`
    return node
  }
}

QuillRandomTable.blotName = 'rgtable'
QuillRandomTable.className = 'quill-rgtable'
QuillRandomTable.tagName = 'span'

class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = 'divider'
DividerBlot.tagName = 'hr'

Quill.register({
  'formats/rgtable': QuillRandomTable,
  'formats/divider': DividerBlot
})

Vue.use(VueQuillEditor)
