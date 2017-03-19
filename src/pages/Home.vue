<template>
    <div class="home">
        <ListView :data="posts"></ListView>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script>
    import { mapState, mapActions } from 'vuex';
    import ListView from '../components/ListView';

    export default {
        name: 'Home',
        components: { ListView },
        computed: {
            ...mapState({
                posts: state => state.post.posts,
            })
        },
        methods: {
            addPage(pageNum) {
                this.$store.dispatch('post/addPage', {
                    pageNum
                });
            }
        },
        created: function() {
            this.addPage(1);
            this.addPage(2);
        }
    };
</script>
