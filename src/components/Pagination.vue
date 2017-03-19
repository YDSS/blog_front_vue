<template>
    <div v-if="isMobile()">
        <p class="pagination-m">加载更多</p>
    </div>
    <div v-else>
        <ul class="pagination-pc">
            <template v-for="n in total">
                <li class="item"><a href="javascript:;" @click="toPage(n)">{{ n }}</a></li>
            </template>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .pagination-pc {
        text-align: right;

        .item {
            display: inline-block;

            a {
                display: block;
                width: 20px;
                height: 20px;
                font-size: 16px;
                color: #333;
                text-align: center;
                line-height: 20px;
            }
        }
    }
</style>

<script>
    import { isMobile } from '../utils/util';

    export default {
        name: 'Pagination',
        props: [
            'current',
            'total',
            'toPage',
        ],
        methods: {
            isMobile,
        }
    }
</script>
