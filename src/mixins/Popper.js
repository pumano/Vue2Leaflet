import Vue from 'vue';
import nodeRenderer from '../utils/renderer';
const RendererConstructor = Vue.extend(nodeRenderer);

export default {
  props: {
    content: {
      type: String,
      default: null
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      storedContent: null
    };
  },
  mounted () {
    this.popperOptions = { ...this.options };
  },
  methods: {
    setContent (content) {
      if (this.mapObject) {
        content = this.storedContent ? this.storedContent : this.content ? this.content : content;
        this.mapObject.setContent(content);
        this.storedContent = null;
      } else {
        this.storedContent = content;
      }
    }
  },
  render () {
    if (!this.content) {
      const child = new RendererConstructor({propsData: {nodes: this.$slots.default}});
      child.$mount();
      const htmlString = child.$el;
      child.$destroy();
      this.setContent(htmlString);
    } else {
      this.setContent(this.content);
    }
    return null;
  }
};