<template lang="html">
    <nav class="nav">
        <template v-for="item in navs">
            <li class="item"><a href="item.link">{{ item.title }}</a></li>
        </template>
    </nav>
</template>

<script>
    export default {
        name: 'Nav'
    }
</script>

<style lang="scss">
    @import '../scss/flexbox';

    .nav {
        @include flexbox;
        @media-screen and (max-width: 600px) {
            width: 100%;
        }
        @media-screen and (min-width: 601px) {
            width: 60%;
            text-align: right;
        }

        .item {
            display: inline-block;

            a {
                display: block;
                width:
            }
        }
    }
</style>
