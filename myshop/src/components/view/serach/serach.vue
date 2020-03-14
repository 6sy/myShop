<template>
  <div>
    <!-- 搜索框 -->
    <div class='search'>
      <input type="text"
             placeholder="男衣"
             v-model='searchText'
             ref='input'>
      <span @click='serach'>搜索</span>
    </div>
    <!-- 搜索历史 -->
    <div class='search-history'>
      <div class='search-history-top'>
        <span class="iconfont icon-sousuo"></span>
        <span>搜索历史</span>
        <span @click='deleteSerachText'>X</span>
      </div>
      <div class='search-history-title'>
        <div v-for="(item,index) in searchHistory"
             :key='index'><span>{{item}}</span></div>
      </div>
    </div>
    <!-- 搜索推荐 -->
    <div class='search-recommend'>
      <div class='search-recommend-top'>
        <span class='iconfont icon-collect'></span>
        <span>热门推荐</span>
      </div>
      <div class='search-recommend-title'>
        <div v-for='(item,index) in searchRecommend'
             :key='index'
             :class='index==2?"red":""'><span>{{item}}</span></div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      // 搜索内容
      searchText: '',
      // 搜索历史
      searchHistory: ['aadsasdasd', 'asdasdasdas', 'asdasdascva', 'asda', 'asdhuoasd'],
      // 搜索推荐
      searchRecommend: ['男衣', '阿迪达斯', '安德玛', '耐克']
    }
  },
  created () {
    this.getSerachText()
  },
  activated () {
    this.$refs.input.focus()
  },
  methods: {
    // 点击搜索按钮
    serach () {
      this.addSerachText()
      this.getSerachText()
      this.$router.push({ name: 'serachItem', params: { searchText: this.searchText } })
    },
    // 获取搜索历史
    async getSerachText () {
      const result = await this.$http({
        method: 'get',
        url: 'api/users/searchHistory',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      console.log(result)
      this.searchHistory = result.data.data
    },
    // 添加搜索历史
    async addSerachText () {
      const result = await this.$http({
        method: 'post',
        url: 'api/users/searchHistory',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ searchText: this.searchText })
      })
      console.log(result)
    },
    // 删除搜索历史
    async deleteSerachText () {
      const result = await this.$http({
        method: 'get',
        url: 'api/users/deletrSearchHistory',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      console.log(result)
      this.getSerachText()
    }
  }
}
</script>
<style scoped>
input {
  padding: 8px 8px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  height: 9px;
  width: 300px;
  margin-left: 10px;
  margin-top: 10px;
  font-size: 12px;
}
input::-webkit-input-placeholder {
  opacity: 0.5;
}
.search {
  height: 45px;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
}
.search span {
  margin-left: 5px;
  font-size: 15px;
}
.search-history {
  width: 100%;
  height: 115px;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 15px;
  box-sizing: border-box;
}
.search-history-top span {
  font-size: 15px;
}
.search-history-top span:nth-child(1) {
  font-size: 25px;
  position: relative;
  left: 0px;
  top: 4px;
}
.search-history-top span:nth-child(3) {
  margin-left: 240px;
}

.search-history-top {
  height: 30px;
  line-height: 28px;
  color: #999999;
}
.search-history-title {
  height: 85px;
  padding: 10px;
  box-sizing: border-box;
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.search-history-title div {
  margin-left: 8px;
  margin-bottom: 20px;
}
.search-history-title span {
  height: 25px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  padding: 3px 5px;
  font-size: 15px;
}
.search-recommend {
  height: 120px;
}
.search-recommend-top {
  height: 30px;
  padding-left: 13px;
}

.search-recommend-top span {
  line-height: 30px;
  font-size: 15px;
  color: #999999;
}
.search-recommend-top span:nth-child(2) {
  margin-left: 6px;
}

.search-recommend-title {
  height: 85px;
  padding: 15px 25px;
  box-sizing: border-box;
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.search-recommend-title div {
  margin-left: 8px;
  margin-bottom: 20px;
}
.search-recommend-title span {
  height: 25px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  padding: 3px 5px;
  font-size: 13px;
}

.red {
  color: red;
}
.green {
  color: green;
}
</style>