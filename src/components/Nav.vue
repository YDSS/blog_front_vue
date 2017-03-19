<template lang="html">
    <nav class="nav">
        <template v-for="item in navs">
            <li class="item"><a href="item.link">{{ item.title }}</a></li>
        </template>
    </nav>
</template>

<script>
    export default {
    }
</script>

<style lang="scss">
</style>
