# 病程管理患者端

## 注意点

1. 切图切二倍图

## 一些全局可用的东西，避免重复

1. 主题色配置在 src/style/theme.less 里，使用：

```css
.test {
  color: var(--themeColor)
}
```

2. 没有数据的时候页面显示暂无数据

```html
<config>
{
  "usingComponents": {
    "nodata": "~@/components/nodata/index"
  }
}
</config>
```

```html
<nodata v-else></nodata>
```

3. 辅助拍照的组件
用法待定

4. 有赞的组件

5. utils/certificate.js 里的去登录

6. 用户信息在store里的patientInfo字段，刚进页面会获取，需要自取

## 调试

```js
// 对接后端本地，在wepy.config.js自定义
npm run dev
// 测试环境
npm run test
// 正式环境
npm run build
```

## 多人开发流程

1. 开发的时候新拉一个分支例如：feature_zy

2. 开发完成之后：git add . && git commit -m ""

3. 切换到master：git pull && git merge feature_zy

4. 有冲突解决冲突，没冲突git push
