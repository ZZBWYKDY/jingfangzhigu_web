<template>
    <el-main>
          <el-row
            class="main-header1"
            id="main-header1"
          >
            <h1>经方智谷</h1>
            <h4>—您的私人AI中医诊疗助手—</h4>
          </el-row>
  
          <!-- 中间部分内容 -->
          <el-row class="content" id="content">
            <el-row :gutter="40" class="custom-row">
              <el-col :xs="6" :sm="8" :md="10" :lg="12" :xl="14">
                <div class="rectangle">
                  <h4>【我想知道】</h4>
                  <p>药物属性是热是凉?这个生病能不能吃?</p>
                  <p>更多您想知道的，我们知无不言。</p>
                </div>
              </el-col>
              <el-col :xs="6" :sm="8" :md="10" :lg="12" :xl="14">
                <div class="rectangle">
                  <h4>【我要治病】</h4>
                  <p>我发现今天头有点晕，我生了什么病吗?</p>
                  <p>我突然开始咳嗽打喷嚏，我要吃什么药治疗?</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40" class="custom-row">
              <el-col :xs="6" :sm="8" :md="10" :lg="12" :xl="14">
                <div class="rectangle">
                  <h4>【拍照诊疗】</h4>
                  <p>我不会描述病情，我想上传舌苔照片来分析诊治。</p>
                </div>
              </el-col>
              <el-col :xs="6" :sm="8" :md="10" :lg="12" :xl="14">
                <div class="rectangle">
                  <h4>【其他设备】</h4>
                  <p>我有智能手表可以提供身体健康数据。</p>
                  <p>我想绑定其他可穿戴设备来监测健康情况。</p>
                </div>
              </el-col>
            </el-row>
          </el-row>
          <el-row class="content2">
            <p style="margin: auto 20px; font-size: 16px; font-weight: bold;">你可以问我：</p>
            <div class="content22" style="text-align: left">
              <el-button
                v-for="button in Quebuttons"
                :key="button.text"
                text
                bg
                style="text-align: left"
              >{{ button.text }}</el-button>
            </div>
          </el-row>
    </el-main>
  </template>
  
  <script setup lang="ts">
  const Quebuttons = [
    { text: '我最近头痛伴着流鼻涕,该吃什么药?' },
    { text: '最近中医馆配的酸梅汤很火，请问可以当饮料喝吗？' },
    { text: '胃肠炎可以吃柚子吗？' },
  ] as const;
  </script>
  
  <style src="@/components/chat/main.css"></style>
  