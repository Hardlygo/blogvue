<template>
    <div>
        <template v-for="(item,index) in PostList">
            <PostCard :post="item" :key="index" />
        </template>
    </div>
</template>
<script>
import PostCard from "@/components/PostCard";
export default {
  components: {
    PostCard
  },
  props: {
    PostList: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
</style>
