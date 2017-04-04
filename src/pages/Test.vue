<template lang="html">
    <ScrollView :data="data" :opts="opts"></ScrollView>
</template>

<script>
    import ScrollView from '../components/ScrollView';

    export default {
        name: 'Test',
        components: { ScrollView },
        data() {
            let opts = {
                offset: 20
            };
            let data = [];
            for (let i = 0; i < 50; i++) {
                data[i] = {
                    title: 'haha' + i,
                    content: 'Hi there!'
                }
            }

            return {
                opts,
                data,
            };
        }
    };
</script>

<style lang="scss">

</style>
