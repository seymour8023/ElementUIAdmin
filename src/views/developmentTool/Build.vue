<template>
    <el-card style="border-radius: 0">
      <div slot="header">
        <span>BuildVueCode Beta v0.1</span>
        <div style="float: right">
          <HelpHint
              content="注意事项！"
          ></HelpHint>
        </div>
      </div>
      <div class="tools">
        <el-alert
            title="WARNING"
            type="info"
            description="正在施工！！！正在施工！！！正在施工！！！正在施工！！！正在施工！！！正在施工！！！"
            show-icon>
        </el-alert>
      </div>
    </el-card>
</template>

<script>
  import HelpHint from '@/components/HelpHint.vue';

  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    mounted: function () {

    },
    components: {
      HelpHint
    }
  }
</script>
<style lang="scss">
  .tools{

  }
</style>