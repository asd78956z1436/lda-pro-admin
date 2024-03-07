<script setup lang="tsx">
import { Form } from '@/components/Form'
import { reactive, ref, onMounted, computed } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import { useAppStore } from '@/store/modules/app'
import { FormSchema } from '@/components/Form'
import { ElMessage, ElIcon } from 'element-plus'

const appStore = useAppStore()

const isMobile = computed(() => appStore.getMobile)

const restaurants = ref<Recordable[]>([])
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' }
  ]
}
onMounted(() => {
  restaurants.value = loadAll()
})

const imageUrl = ref('')

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: 'Item1',
    component: 'Input',
    componentProps: {}
  },
  {
    field: 'field3',
    label: `Det1`,
    component: 'Editor',
    componentProps: {},
    colProps: {
      span: 24
    }
  },
  {
    field: 'field2',
    component: 'Upload',
    label: `AboutP1`,
    componentProps: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      showFileList: false,
      onSuccess: (_response, uploadFile) => {
        imageUrl.value = URL.createObjectURL(uploadFile.raw!)
      },
      beforeUpload: (rawFile) => {
        if (rawFile.type !== 'image/jpeg') {
          ElMessage.error('Avatar picture must be JPG format!')
          return false
        } else if (rawFile.size / 1024 / 1024 > 2) {
          ElMessage.error('Avatar picture size can not exceed 2MB!')
          return false
        }
        return true
      },
      slots: {
        default: () => (
          <>
            {imageUrl.value ? <img src={imageUrl.value} class="avatar" /> : null}
            {!imageUrl.value ? (
              <ElIcon class="avatar-uploader-icon" size="large">
                add
              </ElIcon>
            ) : null}
          </>
        )
      }
    },
    colProps: {
      span: 24
    }
  }
])
</script>

<template>
  <ContentWrap title="Home" message="首頁第一個畫面">
    <Form :schema="schema" label-width="auto" :label-position="isMobile ? 'top' : 'right'" />
  </ContentWrap>
</template>

<style lang="less">
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;

  .text {
    position: absolute;
    left: 50%;
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto;
    line-height: 24px;
    border-radius: 50%;
    transform: translateX(-50%);
  }

  &.current {
    .text {
      color: #fff;
      background: #626aef;
    }
  }

  .holiday {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 6px;
    height: 6px;
    background: var(--el-color-danger);
    border-radius: 50%;
    transform: translateX(-50%);
  }
}

.transfer-footer {
  padding: 6px 5px;
  margin-left: 15px;
}

.el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
