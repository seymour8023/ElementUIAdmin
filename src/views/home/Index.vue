<template>
  <div class="dashboard-container">
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
            <el-button icon="el-icon-search" size="small" type="primary" @click="onSubmit">查询</el-button>
            <el-button icon="el-icon-refresh" size="small" type="default" @click="onSubmit">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="24">
        <el-form ref="form" :rules="rules" :model="form" label-width="20%" labelPosition="right"
                 class="withborder">
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动区域">
                <el-select disabled="" v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-form-item label="活动时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                  style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"
                                  style="width: 100%;"></el-time-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="即时配送">
                <el-switch v-model="form.delivery"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                  <el-radio label="线上品牌商赞助"></el-radio>
                  <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-form-item label="活动查询">
                <el-input  placeholder="请输入内容" v-model="input5" class="input-with-select">
                  <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动形式">
                <el-input disabled="" placeholder="请输入内容" v-model="inputse5" class="input-with-select special-select" >
                  <el-select disabled="" v-model="inputse5" slot="prepend" placeholder="请选择" >
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                  <el-button disabled=""  type="primary" slot="append" icon="el-icon-search" ></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="num9" label="计数">
                <el-input-number v-model="form.num9" auto-complete="off"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
          <el-form-item style="margin-bottom: 10px;">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'Dashboard',
        data() {
            return {
                "input5": "",
                "inputse5":"",
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
                }
            }
        },
        methods: {
            handleClick(tab, event) {

            },
            onSubmit() {
                alert(window)
            }

        },
        mounted(){
            console.log($)
        }
    }
</script>

<style  lang="scss">
  .dashboard {
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .line {
    text-align: center
  }

  /*select 样式定制*/
  .about .el-select {
    display: block
  }

  /*form 添加border*/
  .withborder {
    border: 1px solid #e6ebf5;
    border-radius: 4px
  }

  .withborder .el-row {
    border-bottom: 1px solid #e6ebf5;
    background: #f5f7fa;
    box-sizing: border-box
  }

  .withborder .el-row:last-child {
    border: none
  }

  .withborder .el-form-item .el-form-item__label {
    padding-top: 10px;
  }

  .withborder .el-form-item {
    margin-bottom: 0;
    height: 100%
  }

  .withborder .el-form-item .el-form-item__content {
    padding: 10px;
    background: #fff;
    height: 100%;
  }

  .withborder .el-form-item__error{position: relative;}

  /*icon demeo*/
  .icon-list li:after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle
  }

  .demo-icon .source > i {
    color: #606266;
    margin: 0 20px;
    font-size: 1.5em;
    vertical-align: middle
  }

  ul.icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    margin: 0;
  }

  .icon-list li {
    float: left;
    width: calc( 100% / 6 );
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    transition: color .15s linear;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-bottom: -1px
  }

  .icon-list li span {
    display: inline-block;
    line-height: normal;
    vertical-align: middle;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    color: #99a9bf
  }

  .icon-list li i {
    display: block;
    font-size: 32px;
    margin-bottom: 15px;
    color: #606266
  }

  .icon-list li .icon-name {
    display: inline-block;
    padding: 0 3px;
    height: 1em;
    color: #606266
  }

  .icon-list li:hover {
    color: #5cb6ff
  }
</style>
