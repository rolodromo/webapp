<template>
  <div class='storycubes pt-3' :class='size' >
    <generate-button class='generate-pos' @generate='regenerate'></generate-button>
    <div v-html='rawText'></div>
  </div>
</template>

<script>
import rpgen from '@rolodromo/rpgen'
import GenerateButton from '@/components/generator/GenerateButton.vue'

export default {
  name: 'GeneratorViewer',
  components: {
    GenerateButton
  },
  props: {
    generator: {
      type: Object,
      default() {
        return {
          data: {
            tpls: '',
            tables: ''
          }
        }
      }
    }
  },
  data() {
    return {
      rawText: ''
    }
  },
  computed: {
    tpls() {
      return this.generator.data.tpls
    },
    tables() {
      return this.generator.data.tables
    },
    size() {
      return this.$vuetify.breakpoint.name
    }
  },
  created() {
    this.engine = rpgen.generator.create(`${this.tpls}\n\n${this.tables}`)
    this.rawText = this.engine.generate()
    console.log('generator', this.tpls)
  },
  methods: {
    regenerate() {
      this.rawText = this.engine.generate()
    }
  }
}
</script>

<style>
.storycubes .generate-pos {
  top: -3.8em !important;
  right: -1em !important;
}
.storycubes {
  text-align: center;
  min-width: 400px !important;
  position: relative;
}

.storycubes.xs {
  font-size: 1.5em;
}

.storycubes.sm {
  font-size: 2.5em;
}

.storycubes.md {
  font-size: 3em;
}

.storycubes.lg {
  font-size: 3.8em;
}

.storycubes.xl {
  font-size: 4.2em;
}

.storycubes .gi {
}

.storycubes p {
  margin-bottom: -10px;
}

.storycubes .glossy {
  /*width: 230px;*/
  /*height: 25px;*/

  margin: 10px auto;
  position: relative;

  background: #94c4fe;
  background: -webkit-gradient(linear, left top, left bottom, color-stop(31%, #94c4fe), color-stop(100%, #d3f6fe));
  background: -webkit-linear-gradient(top, #94c4fe 31%, #d3f6fe 100%);
  background: -moz-linear-gradient(top, #94c4fe 31%, #d3f6fe 100%);
  background: -o-linear-gradient(top, #94c4fe 31%, #d3f6fe 100%);
  background: -ms-linear-gradient(top, #94c4fe 31%, #d3f6fe 100%);
  background: linear-gradient(to bottom, #94c4fe 31%, #d3f6fe 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#94c4fe', endColorstr='#d3f6fe', GradientType=0);

  border-radius: 0.4em;

  border: 1px solid #4864a9;

  display: inline-flex;
  padding-top: 1em;
  padding-bottom: 1em;
  color: #000;
  /*font-size: 0.750em;*/
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);

  position: relative;
}

.storycubes .glossy:before {
  /*content: "";*/
  /*width: 220px;*/
  /*height: 16px;*/
  height: auto;

  display: block;
  position: absolute;
  left: 5px;

  border-radius: 0.3em;

  background: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.7) 8%,
    rgba(255, 255, 255, 0) 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(255, 255, 255, 1)),
    color-stop(8%, rgba(255, 255, 255, 0.7)),
    color-stop(100%, rgba(255, 255, 255, 0))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.7) 8%,
    rgba(255, 255, 255, 0) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.7) 8%,
    rgba(255, 255, 255, 0) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.7) 8%,
    rgba(255, 255, 255, 0) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.7) 8%,
    rgba(255, 255, 255, 0) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#00ffffff', GradientType=0);
}

.storycubes i.gi {
  color: #c6d084;
  text-shadow: -1px -1px 0 #000, 0 -1px 0 #000, 1px -1px 0 #000, -1px 0 0 #000, 2px 0 2px #000, -2px 2px 2px #000,
    0 2px 2px #000, 2px 2px 2px #000;
}
</style>
