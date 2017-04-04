<template>
    <div class="scrollview">
        <!-- <div id="fill" ref="fill" key="fill"></div> -->
        <div ref="topLine" key="topLine" id="test"></div>
        <ul>
            <template v-for="item in buf">
                <template v-if="item.title">
                    <li class="item">
                        <h1>{{item.title}}</h1>
                        <p>
                            {{item.content}}
                        </p>
                    </li>
                </template>
            </template>
        </ul>
        <div ref="bottomLine" key="bottomLine"></div>
    </div>
</template>

<style lang="scss" scoped>
    .scrollview {
        ul {
            width: 100%;
        }

        .item {
            display: block;
            width: 100%;
        }
    }
</style>

<script>
    import { offsetFromAround } from '../utils/util';

    let debug = function (str) {
        console.log(str);
    }

    export default {
        name: "ScrollView",
        props: [
            "data",
            "opts",
        ],
        data() {
            return {
                buf: [],
                /**
                 * the top index of render buffer array
                 * @type {Number}
                 */
                topIndex: 0,
                /**
                 * the bottom index of render buffer array,
                 *   it should always equal the end of buffer
                 *   cause when update using array.slice to get new buffer
                 * @type {Number}
                 */
                bottomIndex: 0,
                itemHeight: 0,
                offset: this.opts.offset || 100,
                viewHeight: 0,
                topLineCurPos: 0,
                adjustOffset: 0,
            };
        },
        methods: {
            init() {
                // 计算渲染区域高度
                this.viewHeight = document.documentElement.clientHeight;
                // 初始化渲染buf
                this.buf = this.data;
                this.bottomIndex = this.data.length - 1;

                this.listenScroll();
                // 计算item的高度
                this.$nextTick(() => {
                    let $item = this.$el.querySelector('.item');
                    this.itemHeight = $item.offsetHeight;
                    this.topLineCurPos = Math.round(offsetFromAround(this.$refs.topLine).top);
                    debug(`init|itemHeight: ${this.itemHeight}`)
                });
            },
            listenScroll() {
                let self = this;
                let starTime = Date.now();

                window.addEventListener('scroll', ev => {
                    if (Date.now() - starTime > 1000) {
                        self.$nextTick(() => {
                            self.onScroll();
                            debug(`this.topLineCurPos: ${this.topLineCurPos}`)
                            debug('\n')
                            starTime = Date.now();
                        });
                    }
                });
            },
            onScroll() {
                let scrollOffset = this.calcScrollOffset();
                debug(`scroll offset: ${scrollOffset}`);
                // 若scroll移动的距离小于一个item的高度，不做更新
                // if (Math.abs(scrollOffset) < this.itemHeight) return;
                // offset为负是向上scroll，反之向下
                // slide down
                if (scrollOffset > 0) {
                    this.addItems('top');
                    this.removeItems('bottom');
                }
                // slide up
                else {
                    this.addItems('bottom');
                    this.removeItems('top');
                }
                this.updateBuf();
            },
            calcScrollOffset() {
                let $topLine = this.$refs.topLine;
                let top = Math.round(offsetFromAround($topLine).top);
                debug(`calcScrollOffset|top: ${top}`)
                debug(`calcScrollOffset|topLineCurPos: ${this.topLineCurPos}`)
                debug(`calcScrollOffset|adjustOffset: ${this.adjustOffset}`)
                let offset = top - this.topLineCurPos + this.adjustOffset + 2; // 2 is adjust value, cause the decimal point of height
                this.topLineCurPos = top;
                this.adjustOffset = 0;

                return offset;
            },
            addItems(direction) {
                if (!direction) return;

                let $baseline = direction === 'top' ? this.$refs.topLine : this.$refs.bottomLine;
                let offsettoBaseline = this.offset - Math.abs(Math.round(offsetFromAround($baseline).top));
                let addCount = Math.round(offsettoBaseline / this.itemHeight);
                debug(`addItems|addCount: ${addCount}`);
                debug(`addItems|offsettoBaseline: ${offsettoBaseline}`);
                if (addCount > 0) {
                    if (direction === 'top') {
                        this.topIndex -= addCount;
                        // this.fillRemovedSpace(-addCount * this.itemHeight);
                        this.adjustOffset = addCount * this.itemHeight;
                    }
                    else {
                        this.bottomIndex += addCount;
                    }
                }
            },
            removeItems(direction) {
                if (!direction) return;

                let $baseline = direction === 'top' ? this.$refs.topLine : this.$refs.bottomLine;
                let offsettoBaseline = Math.abs(Math.round(offsetFromAround($baseline).top)) - this.offset;
                debug(`removeItems|direction: ${direction}`)
                debug(`removeItems|offsettoBaseline: ${offsettoBaseline}`)
                let removeCount = Math.floor(offsettoBaseline / this.itemHeight);
                debug(`removeItems|removeCount: ${removeCount}`);
                if (removeCount > 0) {
                    if (direction === 'top') {
                        this.topIndex += removeCount;
                        this.adjustOffset = -removeCount * this.itemHeight;
                        // this.fillRemovedSpace(removeCount * this.itemHeight);
                    }
                    else {
                        this.bottomIndex -= removeCount;
                    }
                }
            },
            fillRemovedSpace(height) {
                let $fill = this.$refs.fill;
                let curHeight = $fill.offsetHeight;
                debug(`fillRemovedSpace| curHeight: ${curHeight}, filledHeight: ${curHeight + height}`);
                $fill.style.height = curHeight + height + 'px';
            },
            updateBuf() {
                // if (this.topIndex < 0 || this.bottomIndex > this.data.length) return;

                let newBuf = [];
                debug(`new buf top: ${this.topIndex}, bottom: ${this.bottomIndex}`);
                for (let i = 0; i < this.buf.length; i++) {
                    if (i < this.topIndex || i > this.bottomIndex) {
                        newBuf[i] = {};
                    }
                    else {
                        newBuf[i] = this.buf[i];
                    }
                }
                this.buf = newBuf;
                // let newBuf = this.data.slice(this.topIndex, this.bottomIndex);
                // this.buf = newBuf;
                // this.buf = this.data;
                debug(this.buf);
            },
        },
        created() {
            this.init();
        }
    }
</script>
