<template>
  <div class="hello">
    <div class="code"></div>
    <div>
      <pre>
      <code>aaaa
        var app = new Vue({
          message:'hello world!'
        })
      </code>
      </pre>
    </div>
  </div>
</template>

<script>
import markdownpage from "../pages/page1.md";
export default {
  name: "HelloWorld",
  data() {
    return {
      message: markdownpage
    };
  },
  props: {
    msg: String
  },
  created() {
    this.$nextTick(() => {
      document.querySelector(".code").innerHTML = this.message;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
