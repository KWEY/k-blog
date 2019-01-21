
<script>
export default {
  name: 'RemoteScript',
  render(createElement) {
    const self = this;
    return createElement('script', {
      attrs: {
        type: 'text/javascript',
        src: this.src,
      },
      on: {
        load(event) {
          self.$emit('load', event);
        },
        error(event) {
          self.$emit('error', event);
        },
        readystatechange(event) {
          if (this.readyState === 'complete') {
            self.$emit('load', event);
          }
        },
      },
    });
  },
  props: {
    src: {
      type: String,
      required: true,
    },
  },
};
</script>
