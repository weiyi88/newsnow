// 定义返回数据的接口
interface MyNewsRes {
  // 根据API返回格式定义
  data: {
    id: string
    title: string
    url: string
    // ...其他字段
  }[]
}

export default defineSource(async () => {
  // 1. 获取数据
  const url = "https://api.mynews.com/news"
  const res: MyNewsRes = await $fetch(url)

  // 2. 转换为标准 NewsItem 格式
  return res.data.map(item => ({
    id: item.id,
    title: item.title,
    url: item.url,
    // 可选:添加发布时间
    pubDate: new Date(item.date).getTime(),
    // 可选:添加额外信息
    extra: {
      info: item.views,
      hover: item.description,
    },
  }))
})
