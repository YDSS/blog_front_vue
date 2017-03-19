<template>
    <div class="listview">
        <ul>
            <template v-for="post in getCurPageList()">
                <li class="item">
                    <h2>{{ post.title }}</h2>
                    <p class="time">{{ post.time }}</p>
                    <p class="abs">{{ post.abstract }}</p>
                </li>
            </template>
        </ul>
        <Pagination :current="curPage" :total="data.size" :toPage="toPage"></Pagination>
    </div>
</template>

<style lang="scss" scoped>
    .listview {
        padding: 0 10%;

        .item {
            margin-bottom: 10px;

            .time {
                color: #666;
                font-size: 12px;
            }

            .abs {
                color: #666;
                font-size: 14px;
            }
        }
    }
</style>

<script>
    import Pagination from './Pagination';

    export default {
        name: 'ListView',
        props: [
            /**
             * key为页数，value为该页的数据list，
             *  list为Array
             * @type Map
             */
            'data',
        ],
        components: { Pagination },
        data() {
            return {
                curPage: 1,
            }
        },
        methods: {
            getCurPageList() {
                let list = this.data.get(this.curPage);

                return list;
            },
            toPage(pageNum) {
                this.curPage = pageNum;
            }
        }
    }
</script>
