import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import Quill from 'quill/dist/quill'

const BlockEmbed = Quill.import('blots/block/embed')
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = 'divider'
DividerBlot.tagName = 'hr'

Quill.register({
  'formats/divider': DividerBlot
})

Vue.use(VueQuillEditor)
