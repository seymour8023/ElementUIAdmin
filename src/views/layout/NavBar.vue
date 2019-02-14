<template>
  <nav class="nav-bar">
    <ScrollPane class="nav-bar-scroll">
      <router-link :to="v.path" class="nav-bar-tag" v-for="(v,i) in nav"
                   :key="i.path" :class="$route.path == v.path ? ' active':''">
        <i class="point"></i>
        {{ v.title }}
        <div v-show="nav.length != 1" class="close-box">
          <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(i)'></span>
        </div>
      </router-link>
    </ScrollPane>
  </nav>
</template>

<script>
  import ScrollPane from '@/components/ScrollPane.vue'

  export default {
    data() {
      return {
        nav: [],
      };
    },
    components: {
      ScrollPane
    },
    watch: {
      '$route': {
        handler: function () {
          let index = this.$Func.hasValInArrayObj(this.nav, 'path', this.$route.path);
          if (index != -1) return;
          this.nav.push({
            path: this.$route.path,
            title: this.$route.meta.title,
          });

        },
        // 深度观察
        deep: true
      }
    },
    methods: {
      closeSelectedTag(i) {
        let nav = this.nav;
        let thisPath = nav[i].path;
        nav.splice(i, 1);
        if (thisPath == this.$route.path) {
          this.$router.push(nav[(nav.length - 1)].path);
        }

      }
    },
    mounted: function () {
      this.nav.push({
        path: this.$route.path,
        title: this.$route.meta.title,
      });
    }
  }
</script>

