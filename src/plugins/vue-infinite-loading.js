import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading,
    {slots: {
        noMore: '我表示很无奈，全站的数据都被你看光了~╮(╯▽╰)╭', // you can pass a string value
      },});
