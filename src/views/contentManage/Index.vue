<template>
  <div class="content-manage">
    <!--search content-->
    <el-form  size="small" class="searchcont" label-width="30%" labelPosition="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="审批人">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="审批人">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="活动区域">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="24" >
          <el-form-item style="display: flex;justify-content: flex-end" >
            <el-button icon="el-icon-search" size="small" type="primary" @click="">查询</el-button>
            <el-button icon="el-icon-refresh" size="small" type="default" @click="">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <ToolBar>
      <el-button type="primary" icon="el-icon-plus" size="small">添加</el-button>
    </ToolBar>
    <el-table
            :data="tableData3"
            border
            style="width: 100%">
      <el-table-column
              prop="date"
              label="日期"
              width="180">
      </el-table-column>
      <el-table-column
              prop="name"
              label="标题"
              width="180">
      </el-table-column>
      <el-table-column
              prop="address"
              label="摘要">
      </el-table-column>
      <el-table-column
              label="操作"
              :render-header="tableAction"
              width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="info" icon="el-icon-info" size="small" circle></el-button>
          <el-button @click="handleClick(scope.row)" type="primary" icon="el-icon-edit" size="small" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar.vue';
  import HelpHint from '@/components/HelpHint.vue';
  export default {
    data() {
      return {
          "input5": "",
          form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              "num9": 10,
              desc: ''
          },
          rules: {"num9": [{max: '20', message: '填写错误'}]},
          activeName: 'first',
          formInline: {
              user: '',
              region: ''
          },
        searchParams:{
            postTitle:'',
            postType:'',
            postStatus:'published',
        },
        tableData3: [{
          date: '2016-05-03',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-02',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-04',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-01',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-08',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-06',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-07',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-07',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-07',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-07',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-07',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-07',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-07',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-07',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-07',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-07',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-07',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }, {
          date: '2016-05-07',
          name: 'Lorem ipsum dolor sit amet,',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugit in quae vero. Adipisci blanditiis dignissimos eum facere laudantium quasi ratione repellat vitae! Alias consequatur dolores enim neque similique unde.'
        }]
      }
    },
    methods: {
      handleClick(row) {
        this.$alert(row, '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      },
      tableAction(){
          return this.$createElement('HelpHint',{
          props:{
            content:'查看文章 / 编辑文章'
          }
        },'操作');
      },
    },
    components: {
        ToolBar,HelpHint
    }
  }
</script>
<style>
  .content-manage .el-input,.content-manage .el-select{margin: 0 10px 0 0}
</style>