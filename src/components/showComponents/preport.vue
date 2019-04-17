<template>
<div style="padding:20px;margin:5% 10%;border:1px solid #3299cc">
  <el-upload class="upload" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="true"
             :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
    <div slot="tip" class="el-upload__tip">请上传大小不超过2m的文件</div>
  </el-upload>
</div>
</template>

<script>
    export default {
        name: "preport",
      data() {
        return {
          fileList: [{
            name: '实验报告一.pdf',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
            {name: '实验报告二.pdf',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }]
        };
      },
      methods: {
        submitUpload() {
          this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        }
      }
    }
</script>

<style scoped>

</style>
